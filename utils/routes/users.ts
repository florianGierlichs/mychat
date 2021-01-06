import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.send(error);
        console.log('error', error);
    }
});

router.get('/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const existingUser = await User.findOne({
            username: username,
        });
        res.send(existingUser);
    } catch (error) {
        res.send(error);
        console.log('error', error);
    }
});

router.post('/signup', async (request, response) => {
    const {
        body: { username, password },
    } = request;
    try {
        const existingUser = await User.findOne({
            username: username,
        });

        if (existingUser) {
            return response.status(400).send({ message: `Username already exists.` });
        }

        const newUser = new User({
            username: username,
            password: password,
        });

        await newUser.save();
        response.status(200).send();
    } catch (error) {
        response.status(500).send({ error: error });
    }
});

export default router;
