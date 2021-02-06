import { Router } from 'express'
import Ranking from '../../models/Ranking'
import get from '../shared/get'
import put from './putRanking'

const router = Router()
router.get('/', get(Ranking))
router.put('/', put)

export default router
