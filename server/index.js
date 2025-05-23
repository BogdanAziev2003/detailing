require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middlewere/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload( {} ))
app.use('/api', router)


// Замыкающий
app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')


        await sequelize.sync()
        // await sequelize.sync({ force: true })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`) )

    }catch(e){
        console.log(e)
    }
}

start()