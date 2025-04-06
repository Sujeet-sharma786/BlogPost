const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();

mongoose.set('strictQuery', false);


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log(err);
})