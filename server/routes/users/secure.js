import { Router } from 'express'
import put from './put'
import preferences from './preferences'
import putList from './putList'
import putFirms from './putFirms'
import saveList from './saveList'
import deleteList from './deleteList'

const router = Router()
router.put('/', put)
router.put('/preferences', preferences)
router.put('/list', putList)
router.put('/lists', putFirms)
router.put('/save-list', saveList)
router.delete('/list', deleteList)

export default router
