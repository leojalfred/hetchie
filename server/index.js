import 'regenerator-runtime/runtime.js'
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import keys from './config/keys'
import users from './routes/users'
import locations from './routes/locations'
import practices from './routes/practices'
import firms from './routes/firms'
import rankings from './routes/rankings'
import qualifications from './routes/qualifications'
import passportConfig from './config/passport'

const app = express()

const production = process.env.NODE_ENV === 'production'
if (production) {
  const filepath = path.join(__dirname, '../')
  app.use(express.static(filepath))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.use(passport.initialize())
passportConfig(passport)

app.use('/users', users)
app.use('/locations', locations)
app.use('/practices', practices)
app.use('/firms', firms)
app.use('/rankings', rankings)
app.use('/qualifications', qualifications)

if (production)
  app.get('*', (request, response) => {
    const file = path.join(__dirname, '../index.html')
    response.sendFile(file)
  })

const port = 3001
app.listen(port, () => console.log(`Server up and running on port ${port}!`))
