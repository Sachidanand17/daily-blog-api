import express = require("express");
const app = express()
import path = require('path')
require('dotenv').config({path: path.join(__dirname, '../.env')}) //
const port = process.env.API_PORT
import {createConnection} from 'typeorm'
import cors = require('cors')
import bodyParser = require('body-parser')
const router = express.Router()
import isAuthenticated from "./middleware/isAuthenticated";
import SessionController from "./controllers/SessionController";
import Blog from "./entities/Blog";
import User from "./entities/User";
import BlogController from "./controllers/BlogController";
import UserController from "./controllers/UserController";

const main = async () => {

    app.use(bodyParser.json())
    app.use(cors({origin: process.env.FRONTEND_SERVER, credentials: true}))

    //Creating database connection
    await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT as any,
        username: process.env.DB_USER as string,
        password: process.env.DB_PWD as string,
        database: process.env.DB_NAME as string,
        synchronize: true,
        entities: [
            Blog, User
        ],
        logging: true,
    })

    router.post('/user', UserController.create)

    router.put('/session', SessionController.create)
    router.get('/session', isAuthenticated, SessionController.show)
    router.delete('/session', isAuthenticated, SessionController.destroy)

    router.get('/blog', isAuthenticated ,BlogController.fetch)
    router.get('/blog/index', isAuthenticated ,BlogController.index)
    router.post('/blog',isAuthenticated, BlogController.create)
    router.delete('/blog/:id',isAuthenticated, BlogController.destroy)
    router.get('/blog/:id',isAuthenticated,BlogController.getIndividual)
    router.put('/blog/:id',isAuthenticated,BlogController.update)

    app.use('/api', router)

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}/api`)
    })
}

main()


