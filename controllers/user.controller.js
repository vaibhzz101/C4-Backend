const user = require("../models/user.model")

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const redisClient = require("../helpers/redis")


const signup = async(req,res)=> {
    try {
        const {email, name, password, city} = req.body;

        const isUserPresent = await user.findOne({email});
        if(isUserPresent){
            return res.send("user is present already, login");
        }
        const hash = await bcrypt.hash(password,6)
        const newuser = new user({name, email, password:hash, city});
    await newuser.save();
    res.send("signup successfull")
    }
    catch(err){
        res.send(err.message)
    }
}

const login = async (req,res)=>{
    try{
        const {email, password } = req.body;
        const isUserPresent = await user.findOne({email});
    if(!isUserPresent) return res.send("user not present please signup ")
    const isPassCorrect = await bcrypt.compare(password, isUserPresent.password);
    if(!isPassCorrect) return res.send("invalid input")
     const token = await jwt.sign({userId:isUserPresent._id, city:isUserPresent.city}, process.env.JWT-SECRET)
     res.send({message: "login successfull", token})
    }
    catch(err){
        res.send(err.message)
    }
}
const logout = async(req,res)=> {
    try{
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token) return res.status(403);
        await redisClient.set(token,token);
        res.send("logout successfull")
    }
    catch(err){
        res.send(err.message)
    }
}
module.exports= { login, logout, signup}