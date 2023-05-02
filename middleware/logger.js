const winston = require("winston")

const MongoDB = require("winston-mongodb");

const logger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    transports: [
        new MongoDB({
            db: process.env.MONGO_URL,
            options: {useUnifiedTopology:true},
            collections: 'logs',
        })
    ],
})
module.exports = logger