const jwt = require("jsonwebtoken");
const redisClient = require("../helpers/redis");

const authenticator = async(req,res,next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token) return res.status(401).send("log in again");
        const istokenValid = await jwt.verify(token, process.env.JWT-SECRET);
        if(!istokenValid) return res.send("something wrong, log in again");
        const isTokenBlacklist = await redisClient.get(token);
        if(isTokenBlacklist) return res.send("unauthorized");
        req.body.userId = istokenValid.userid;
        req.body.city = istokenValid.city;
        next()
    }
    catch(err){
        res.send(err.message);
    }
}
module.exports = {
    authenticator
}