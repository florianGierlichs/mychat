import express from 'express';
import { ExistingUser } from '../../interfaces';
import User from '../models/User';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

const router = express.Router();

//
// -- get --
//

router.get('/', async (_, res) => {
    try {
        const users: ExistingUser[] | null = await User.find({});
        res.send(users);
    } catch (error) {
        res.send(error);
        console.log('error', error);
    }
});

router.get('/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const existingUser: ExistingUser | null = await User.findOne({
            username: username,
        });
        res.send(existingUser);
    } catch (error) {
        res.send(error);
        console.log('error', error);
    }
});

//
// -- post --
//

router.post('/signup', async (req, res) => {
    const {
        body: { username, password },
    } = req;

    try {
        const existingUser: ExistingUser | null = await User.findOne({
            username,
        });

        if (existingUser) {
            return res.status(400).send({ message: `Username already exists.` });
        }

        hash(password, 10, async function (_err, hash: string) {
            const newUser = new User({
                username,
                password: hash,
            });

            await newUser.save();
            const jwt = sign({ username }, process.env['SECRET_KEY']!);

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('jwt', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/',
                })
            );
            res.status(200).json({ jwt });
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {
    const {
        body: { username, password },
    } = req;

    try {
        const existingUser: ExistingUser | null = await User.findOne({
            username: username,
        });

        if (!existingUser) {
            return res.status(401).send({ message: `Username or password is wrong!` });
        }

        compare(password, existingUser.password, function (_err, result) {
            if (!result) {
                return res.status(401).send({ message: `Username or password is wrong!` });
            }
            const jwt = sign({ username }, process.env['SECRET_KEY']!, { expiresIn: '1h' });

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('jwt', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/',
                })
            );
            res.status(200).json();
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
