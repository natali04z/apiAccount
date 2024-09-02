import express, {json} from 'express'
import dbConnect from '../database/config.js'
import '../database/config.js'
import accountRouter from '../route/accountRoute.js'

class Server {

    constructor(){
        this.app = express()
        this.listen()
        this.dbConnect()
        this.pathAccount = '/api/account'
        this.route()
    }

    async dbConnect(){
        await dbConnect()
    }

    route()  {
        this.app.use(json())
        this.app.use(this.pathAccount, accountRouter)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running')
        })
    }
}

export default Server