import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnection } from './config/db.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';

config();
const app = express();

//database connection
dbConnection();
const port = process.env.PORT || 5000 ;

app.use('/images',express.static('public/images'))

//middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/post',postRouter);


app.listen(port,()=>{
  console.log(`server is listening on port ${port}`)
})

