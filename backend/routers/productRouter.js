import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';



const productRouter=express.Router();
productRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const products=await Product.find({});
    res.json(products);
}));

productRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
    const createdProducts=await Product.insertMany(data.products);
    res.json({createdProducts});
}));
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
            res.send(product);

    }else{
        res.status(403).send({message:"Product Not Found"});
    }
}))
export default productRouter;