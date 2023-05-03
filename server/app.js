import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import configureRoutes from './routes/index.js';
// Do not remove this import
import socket from './sockets/index.js';
import { xss } from 'express-xss-sanitizer'

const app = express();
const port = 3001

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(xss())

var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,POST,PUT,DELETE',
  preflightContinue: false,
  credentials: true
}));

configureRoutes(app)

app.listen(port, () => {
    console.log(`Your routes will be running on http://localhost:${port}`);
});
