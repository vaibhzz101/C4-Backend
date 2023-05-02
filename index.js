const express = require("express");

const connection = require("./config/db");

// const UserRouter  = require("./routes/user.routes");
const redisClient = require("./helpers/redis");
const winston = require("winston")
require("dotenv").config();
const logger = require("./middleware/logger")


const app = express();
app.use(express.json());

app.get("/", async(req,res)=> {
    res.send("home route")
})

// app.use("/user", UserRouter)

app.listen(9090, async()=> {
    try{
        await connection();
        console.log("connected to DB")
    }
    catch(err){
console.log(err.message)

    }
    console.log("server is running at 9090")
})