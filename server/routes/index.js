const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const serviceRouter = require('./serviceRouter')

router.use('/user', userRouter)
router.use('/service', serviceRouter)


module.exports = router