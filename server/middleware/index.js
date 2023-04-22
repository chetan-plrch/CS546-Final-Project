import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { users } from "../config/mongoCollections.js"
import jwtConfig from '../config/jwtConfig.js';

export const authenticate = async (req, res, next) => {
    const userCtn = await users();
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized request' })
    }
    const { _id } = jwt.verify(token, jwtConfig.secret)
    const user = await userCtn.findOne({ _id: new ObjectId(_id) });
    if (!user) {
        return res.status(401).send({ message: 'Unauthorized request' })
    }
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
