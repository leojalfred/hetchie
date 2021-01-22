import { Router } from 'express'
import putUser from './putUser'
import putPreferences from './putPreferences'
import putList from './putList'
import putFirms from './putUserFirms'
import saveList from './saveList'
import deleteList from './deleteList'

const router = Router()
router.put('/', putUser)
router.put('/preferences', putPreferences)
router.put('/list', putList)
router.put('/lists', putFirms)
router.put('/save-list', saveList)
router.delete('/list', deleteList)

export default router
