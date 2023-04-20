import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { users } from "../config/mongoCollections.js"

export const authenticate = async (req, res, next) => {
    const userCtn = await users();
    const token = req.cookies.token;
    const { _id } = jwt.verify(token, 'private-key')
    const user = await userCtn.findOne({ _id: new ObjectId(_id) });
    req.user = user;
    next()
}

export const authorize = (roleT) => {
    const middleware = async (req, res, next) => {
        if(req.user && req.user.type === roleT) {
            next();
        } else {
            return res.status(401).send({ message: 'Unauthorized access' });
        }
    }
    return middleware;
}
