import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouters.js';
import orderRouter from './routers/orderRouter.js';


dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/amazonas",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.get('/',(req,res)=>{
    res.send();
});
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})

const port=5000;
app.listen(port,()=>{
    console.log('server worker');
})