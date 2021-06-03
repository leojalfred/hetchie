import { Router } from 'express'
import passport from 'passport'
import insecure from './users/insecure'
import secure from './users/secure'
import firms from './firms'
import locations from './locations'
import practices from './practices'
import rankings from './rankings'
import qualifications from './qualifications'
import schools from './schools'

const router = Router()
router.use('/api/users', insecure)
router.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  secure
)
router.use(
  '/api/firms',
  passport.authenticate('jwt', { session: false }),
  firms
)
router.use(
  '/api/locations',
  passport.authenticate('jwt', { session: false }),
  locations
)
router.use(
  '/api/practices',
  passport.authenticate('jwt', { session: false }),
  practices
)
router.use(
  '/api/rankings',
  passport.authenticate('jwt', { session: false }),
  rankings
)
router.use(
  '/api/qualifications',
  passport.authenticate('jwt', { session: false }),
  qualifications
)
router.use(
  '/api/schools',
  passport.authenticate('jwt', { session: false }),
  schools
)

export default router
