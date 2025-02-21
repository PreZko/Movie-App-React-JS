const express = require('express')
const app = express()

require('dotenv').config()
require('express-async-errors')

const cors = require('cors')
const metricsRouter = require('./routes/metrics')
const connectDB = require('./db/connect')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

const corsOptions = { origin: process.env.CORS_ORIGIN }
const port = process.env.PORT || 5000

//middleware
app.use(cors(corsOptions))
app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('<h1>Metrics API</h1><a href="/api/v1/metrics">Metrics route</a>')
})

app.use('/api/v1/metrics', metricsRouter)

//errors
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
