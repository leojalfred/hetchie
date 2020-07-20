import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import keys from './config/keys'
import users from './routes/users'
import locations from './routes/locations'
import practices from './routes/practices'
import passportConfig from './config/passport'

const app = express()
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

const port = 3001
app.listen(port, () => console.log(`Server up and running on port ${port}!`))
