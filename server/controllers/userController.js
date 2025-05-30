const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('./../models/models')


const generateJwt = (id, email, role, phone, name) => {
    return jwt.sign(
        {id, email, role, phone, name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async registration(req, res, next) {
        const { email, password, role, phone, name} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        if(!phone){
            return next(ApiError.badRequest('Номер телефона не был введен'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь c таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password_hash: hashPassword, name, phone, role})
        const token = generateJwt(user.id, user.email, user.role, user.phone, user.name) 

        return res.json({token})
    }

    async login(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password_hash)
        if(!comparePassword){
            return next(ApiError.internal("Введен не верный пароль"))
        }
        const token = generateJwt(user.id, user.email, user.role, user.phone, user.name)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.phone, req.user.name)
        return res.json({token})
    }

}

module.exports = new UserController()