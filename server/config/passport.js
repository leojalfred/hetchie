import { Strategy, ExtractJwt } from 'passport-jwt'

export default function configPassport(passport) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
      },
      (user, done) => {
        try {
          return done(null, user)
        } catch (error) {
          console.log(error)
          return done(error)
        }
      }
    )
  )
}
