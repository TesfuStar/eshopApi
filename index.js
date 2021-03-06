const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const app = express();
const authRouter = require('./routes/Auth')
const userRouter = require('./routes/User')
const ProductRouter = require('./routes/Product')
const CartRouter = require('./routes/Cart')
const OrderRouter = require('./routes/Order')

app.use(express.json());

app.use(cors());
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('dbconnected successfull'))
.catch((err)=>{console.log(err)})
const PORT = process.env.PORT || 5000;

app.use('/api',authRouter)
app.use('/api/user',userRouter)
app.use('/api/product',ProductRouter)
app.use('/api/cart',CartRouter)
app.use('/api/order',OrderRouter)

app.listen(PORT,()=>console.log("server is runningg"))