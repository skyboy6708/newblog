import express from 'express';
import mongoose from "mongoose";
import config from './config/index.js';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

// import api/service
import postRoutes from './routes/api/post.js';
import userRoutes from './routes/api/user.js';

const app = express();
const {MONGO_URI} = config;
const {JWT_SECRET} = config;
app.use(hpp());
app.use(helmet());

app.use(cors({origin : true, credentials : true}));
app.use(morgan("dev"));
app.use(express.json())

mongoose.connect(MONGO_URI,{
   useNewUrlParser : true,
    useUnifiedTopology: true,
}).then( ()=> console.log("MongoDB connecting Success!!!")).catch((e)=> console.log(e));
app.get('/');

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

export default app;