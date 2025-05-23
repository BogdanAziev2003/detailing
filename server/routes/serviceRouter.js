const Router = require('express')
const router = new Router()
const serviceController = require('./../controllers/serviceController')
const checkRole = require('./../middlewere/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), serviceController.create)
router.get('/', serviceController.getAll)
router.get('/:id', serviceController.getOne)

module.exports = router