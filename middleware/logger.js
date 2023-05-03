

const MongoDB = require("winston-mongodb");

// const logger = winston.createLogger({
//     level: "error",
//     format: winston.format.json(),
//     transports: [
//        MongoDB({
//             db: process.env.MONGO_URL,
//             options: {useUnifiedTopology:true},
//             collections: 'logs',
//         })
//     ],
// })
const winston = require('winston');
const { createLogger, transports } = winston;

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'error',
      db: process.env.MONGO_URL,
      options: { useUnifiedTopology: true },
      collection: 'logs',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  ],
});
module.exports = logger