import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { users } from "../config/mongoCollections.js"
import jwtConfig from '../config/jwtConfig.js';

export const authenticate = async (req, res, next) => {
    try {
        const userCtn = await users();
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        let decoded;

        try {   
            decoded = jwt.verify(token, jwtConfig.secret);
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized request: Invalid token' });
        }

        const { _id } = decoded;
        // const sanitizedId = sanitize(_id);
        const user = await userCtn.findOne({ _id: new ObjectId(_id) });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized request: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authenticate middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const destroyToken = async (req, res, next) => {
    try {
        // Setting the token cookie to an empty value and expire it immediately
        res.cookie('token', '', {
            expires: new Date(0)
        });

        res.cookie("userId", '', {
            expires: new Date(0)
          });
          res.cookie("firstname",'', {
            expires: new Date(0)
          });
          res.cookie("role", '', {
            expires: new Date(0)
          });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error in destroyToken middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const notAuthenticate = async (req, res, next) => {
    if(req.path === '/is-loggedin') {
        return next()
    }
    
    try {
        const token = req.cookies.token;

        if (token) {
            return res.status(301).json({ redirect: "/" });
        }
        next();
    } catch (error) {
        console.error('Error in notAuthenticate middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}