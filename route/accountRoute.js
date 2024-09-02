import { Router } from 'express'
import { getAccount, postAccount, depositMoney, withdrawMoney, deleteAccount } from '../controller/accountController.js'

const accountRouter = Router()

accountRouter.get('/', getAccount)
accountRouter.post('/', postAccount)
accountRouter.put('/', depositMoney)
accountRouter.put('/', withdrawMoney)
accountRouter.delete('/:id', deleteAccount)

export default accountRouter
