const config = require('./utils/services/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/services/logger')

var morgan = require('morgan')
const ninosController = require('./controllers/ninos.controll')
const bloqueController = require('./controllers/bloque.controll')

logger.info('connecting...',)



const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info(`Connected to ${config.ENVIRONMENT} `)
  } catch (error) {
    logger.error(`Error connecting to ${config.ENVIRONMENT} MongoDB:`, error.message)
  }
}

connectToMongoDB()

// morgan.token('statusColor', (req, res) => {
//   var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
//     ? res.statusCode
//     : undefined

//   var color = status >= 500 ? 31
//     : status >= 400 ? 33
//       : status >= 300 ? 36
//         : status >= 200 ? 32
//           : 0;

//   return '\x1b[' + color + 'm' + status + '\x1b[0m';
// });

// morgan.token('body', function (req) {
//   //return
//   return JSON.stringify(req.body)
// })

// app.use(morgan('\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - :body'));

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())

app.use('/api/ninos', ninosController) 
app.use('/api/donadores', require('./controllers/doners.controll'))
app.use('/api/bloques', bloqueController)
app.use('/api/users', require('./controllers/user.controll'))

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app