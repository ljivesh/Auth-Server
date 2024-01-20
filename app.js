import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {connectAuthDb} from './db.js';
import authRouter from './routes/auth-routes.js';
import { verifyToken } from './middlewares/verify-token.js';
console.log(process.env.TEST);


connectAuthDb(process.env.MONGO_URI);

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(bodyParser.json());
app.use('/', authRouter);
app.get('/test-token', verifyToken, async (req, res)=> {
    res.json({type: 'SUCCESS', message: 'Token is valid...'});
})

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Auth Server started at port ${port}`));