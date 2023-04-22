import express from 'express';
import cookieParser from 'cookie-parser';
import configureRoutes from './routes/index.js';
import socket from './sockets/index.js';

const app = express();
const port = 3001

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

configureRoutes(app)

app.listen(port, () => {
    console.log(`Your routes will be running on http://localhost:${port}`);
});
