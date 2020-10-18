import { Router } from 'express'
import register from './register'
import verify from './verify'
import login from './login'
import put from './put'
import preferences from './preferences'
import putList from './putList'
import putFirms from './putFirms'
import saveList from './saveList'

const router = Router()
router.post('/register', register)
router.get('/verify', verify)
router.post('/login', login)
router.put('/', put)
router.put('/preferences', preferences)
router.put('/list', putList)
router.put('/lists', putFirms)
router.put('/save-list', saveList)

export default router
