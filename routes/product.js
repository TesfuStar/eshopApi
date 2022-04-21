const Product = require('../models/Product');

const { verifyTokenAndAuthorization,verifyTokenAndAdmin } = require('./verifytoken');

const router = require('express').Router();

//create product
router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    const newProduct = Product(req.body)
    try{
    const savedProduct = await newProduct.save()

        res.status(200).json(savedProduct)

    }catch(err){
        res.status(500).json(err)
    }
})
//update product
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
    

        res.status(200).json(updatedProduct)

    }catch(err){
        res.status(500).json(err)
    }
})
//delate

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    
    try{
      await Product.findByIdAndDelete(req.params.id)

       res.status(200).json("Product has been deleted succcessfully")

   }catch(err){
       res.status(500).json(err)
   }
})

//get
router.get("/find/:id",async(req,res)=>{
    
    try{
     const product =  await Product.findById(req.params.id)
       res.status(200).json(product)
   }catch(err){
       res.status(500).json(err)
   }
})


// GETALLPRODUCT
router.get("/",async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    
   try{
      let products;
      if(qNew){
          products = await Product.find().sort({createdAt:-1}).limit(1)
      }else if(qCategory){
          products = await Product.find({
              categories:{
                  $in:[qCategory]
              }
          })
      }
      
 
      else{
          products =await Product.find()
      }
      
       res.status(200).json(products)
   }catch(err){
       res.status(500).json(err)
   }
})


//get product by search

router.get('/search',async(req,res)=>{
    const {searchQuery,desc}=req.query
    try{
        const title = new RegExp(searchQuery,'i')
       const products = await Product.find({title})
       res.status(200).json(products)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports =router