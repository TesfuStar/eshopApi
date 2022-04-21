const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    
    title:{type:String,required:true},
    img:{type:String,required:true,unique:true},
    price:{type:Number,required:true},
    categories:{type:String,required:true},
    size:{type:String,required:false}, 
    description:{type:String,required:true},
},  {timestamps:true})

module.exports = mongoose.model("Product",ProductSchema)


// "title":"coat",
//     "img":"image",
//     "price":200,
//     "categories":["menfashion"],
//     "description":"best coat for summer"