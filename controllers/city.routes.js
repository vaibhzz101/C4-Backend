const city = require("../models/city")
const auth = require("../middleware/auths");
const {validapi = require("../middleware/validateip")
const logger = require("../middleware/logger")

const Router = require("express")

const cityRouter = Router();
cityRouter.get('/ipinfo', auth, validapi, async(req,res)=> {
    const {ip } = req.query
    const cachedcity = await getAsync(ip);
    if(cachedcity){
        logger.info(`get cache data for${ip}`);
        res.send(cachedcity);
    }
    else{
        try{
            const city = await
        }
    }
})