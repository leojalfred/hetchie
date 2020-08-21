import 'regenerator-runtime/runtime.js'
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import helmet from 'helmet'
import keys from './config/keys'
import users from './routes/users'
import locations from './routes/locations'
import practices from './routes/practices'
import firms from './routes/firms'
import rankings from './routes/rankings'
import qualifications from './routes/qualifications'
import passportConfig from './config/passport'

mongoose.set('useFindAndModify', false)
try {
  ;(async () => {
    await mongoose.connect(keys.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })()
} catch (error) {
  console.log(error)
}

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
  helmet.contentSecurityPolicy({
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
  })
)
app.use(helmet.dnsPrefetchControl())
app.use(helmet.expectCt())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())

app.use(passport.initialize())
passportConfig(passport)

const production = process.env.NODE_ENV === 'production'
if (production) {
  const filepath = path.join(__dirname, '../')
  app.use(express.static(filepath))
}

app.use('/api/users', users)
app.use('/api/locations', locations)
app.use('/api/practices', practices)
app.use('/api/firms', firms)
app.use('/api/rankings', rankings)
app.use('/api/qualifications', qualifications)

if (production)
  app.get('*', (request, response) => {
    const file = path.join(__dirname, '../index.html')
    response.sendFile(file)
  })

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server up and running on port ${port}!`))
