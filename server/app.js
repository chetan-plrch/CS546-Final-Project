import express from 'express';
import cookieParser from 'cookie-parser';
import configureRoutes from './api/index.js';

const app = express();
const port = 3001

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

configureRoutes(app)

app.listen(port, () => {
    console.log('Server listening on port: ', port)
});
