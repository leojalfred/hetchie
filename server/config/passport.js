import { Strategy, ExtractJwt } from 'passport-jwt'
import mongoose from 'mongoose'

const User = mongoose.model('users')

export default passport => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
      },
      async ({ id }, done) => {
        try {
          const user = await User.findById(id)
          if (user) return done(null, user)
          return done(null, false)
        } catch (error) {
          console.log(error)
        }
      }
    )
  )
}
