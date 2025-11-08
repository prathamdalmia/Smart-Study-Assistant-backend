const mongoose = require("mongoose")
const asynchandler = require("express-async-handler")
require("dotenv").config()

const connectdb = asynchandler(async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected ${conn.connection.host}`);
    }catch(err){
        console.log(`Error occured while connecting to DB : ${err}`)
        process.exit(1);
    }

})

module.exports = connectdb