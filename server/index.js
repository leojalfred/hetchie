import 'regenerator-runtime/runtime.js'
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import sanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import passport from 'passport'
import insecure from './routes/users/insecure'
import secure from './routes/users/secure'
import locations from './routes/locations'
import practices from './routes/practices'
import firms from './routes/firms'
import config from './config/passport'

try {
  ;(async () => {
    const db = process.env.DEPLOYED ? 'production' : 'development'
    await mongoose.connect(
      `mongodb+srv://admin:FFPk4ASWQH1xwKH3@hetchie-l0pca.mongodb.net/${db}`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )
  })()
} catch (error) {
  console.log(error)
}

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(sanitize())

const options = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ['fonts.gstatic.com'],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'ajax.cloudflare.com',
        'static.cloudflareinsights.com',
      ],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
    },
  },
}
app.use(helmet(options))

config(passport)

app.use('/api/users', insecure)
app.use('/api/users', passport.authenticate('jwt', { session: false }), secure)
app.use(
  '/api/locations',
  passport.authenticate('jwt', { session: false }),
  locations
)
app.use(
  '/api/practices',
  passport.authenticate('jwt', { session: false }),
  practices
)
app.use('/api/firms', passport.authenticate('jwt', { session: false }), firms)

if (process.env.NODE_ENV === 'production') {
  const filepath = path.join(__dirname, '../')
  app.use(express.static(filepath))

  app.get('*', (request, response) => {
    const file = path.join(__dirname, '../index.html')
    response.sendFile(file)
  })
}

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server up and running on port ${port}!`))
