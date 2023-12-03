import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnection } from './config/db.js';

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


app.listen(port,()=>{
  console.log(`server is listening on port ${port}`)
})

