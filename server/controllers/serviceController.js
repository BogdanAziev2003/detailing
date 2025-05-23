const { Service } = require('./../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const { create } = require('domain')
const { where } = require('sequelize')

class ServiceController {
  async create(req, res, next) {
    try {
      const { name, description, price, discount, duration_minutes } = req.body
      console.log(req.body)
      const { photo_url } = req.files

      if (!req.files || !req.files.photo_url) {
        return next(ApiError.badRequest('Файл изображения не был загружен'))
      }

      let fileName = uuid.v4() + '.jpg'
      photo_url.mv(path.join(__dirname, '..', 'static', fileName))
      console.log('fileName' + fileName)
      const service = await Service.create({
        name,
        description,
        price,
        discount,
        duration_minutes,
        photo_url: fileName,
      })
      console.log('create')
      return res.json(service)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res) {
    const { id } = req.params
    const services = await Service.findOne({
      where: { id },
    })
    res.json(services)
  }

  async getAll(req, res) {
    const services = await Service.findAll()
    return res.json(services)
  }
}

module.exports = new ServiceController()
