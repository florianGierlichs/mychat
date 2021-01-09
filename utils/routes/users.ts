import express from 'express';
import { ExistingUser } from '../../interfaces';
import User from '../models/User';

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
            username: username,
        });

        if (existingUser) {
            return res.status(400).send({ message: `Username already exists.` });
        }

        const newUser = new User({
            username: username,
            password: password,
        });

        await newUser.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send({ error: error });
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
            return res.status(404).send({ message: `Username doesn't exist` });
        }

        if (existingUser.password !== password) {
            return res.status(401).send({ message: `Wrong password` });
        }

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
