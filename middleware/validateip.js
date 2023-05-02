const Joi = require('joi')
const axios = require("axios")
const logger = require("../middleware/logger")
function validateIp(req,res,next){
    const schema = Joi.object({
        ip: Joi.string().ip({version: ['ipv4']}).required(),

    });
    const {error} = schema.validate(req.query);
    if(error){
        return res.status(400).send("bad request")
    }
    next()
}
async function getCityForIP(ip) {
    try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`)
        const city = response.data;
        return city;
    }
    catch(error){
        logger.error(error)
        throw error;
    }
}
module.exports= {
    validateIp, getCityForIP }