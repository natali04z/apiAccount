import { Router } from 'express'
import { getAccount, postAccount, depositMoney, putRetire, deleteAccount, getAllActiveAccounts } from '../controller/accountController.js'

const accountRouter = Router()

accountRouter.get('/', getAccount)
accountRouter.post('/', postAccount)
accountRouter.put('/', depositMoney)
accountRouter.put('/retire', putRetire)
accountRouter.delete('/:id', deleteAccount)
accountRouter.get('/', getAllActiveAccounts)

export default accountRouter
