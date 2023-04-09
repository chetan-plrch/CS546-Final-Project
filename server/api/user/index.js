import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { users } from "../../data/mongoCollections.js";
import { errorType, roleType } from '../../util.js';
import { authenticate, authorize } from '../middleware/index.js';

const router = Router();

router.get('/user', authenticate, async (req, res) => {
    return res.send(req.user);
});

const validateUser = (user) => {
    return true;
}

router.post('/signup', async (req, res) => {
    try {
        console.log('request recieved')
        const user = req.body;
        const userCtn = await users();
        validateUser(user)
        const { insertedId } = await userCtn.insertOne(user);
        if (insertedId) {
            return res.status(200).send({ message: 'Successfully created user' });
        } else {
            return res.status(500).send({ message: 'Unable to create user record' });
        }
    } catch(e) {
        console.log(e)
        if(e.ERROR_TYPE === errorType.BAD_INPUT) {
            return res.status(400).send({ message: e.message });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
})

router.post('/login', async (req, res) => {
    const userObj = req.body;
    const userCtn = await users();
    const user = await userCtn.findOne({ username: userObj.username });
    const token = jwt.sign({ _id: user._id, username: user.username }, 'private-key');
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return res.status(200).send({ message: 'User successfully loggedin' });
})

router.get('/check', authenticate, authorize(roleType.ADMIN), (req, res) => {
    return res.status(200).send({ message: 'This is authorized' })
})

export default router;