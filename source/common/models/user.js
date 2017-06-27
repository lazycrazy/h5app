import mongoose from 'mongoose'
import PassHash from 'password-hash'
import to from 'await-to-js'
import log from '../logger'
import jwt from 'jsonwebtoken'
import config from '../../config'
import map from '../map'

const Schema = mongoose.Schema


const UserSchema = new Schema({
    // email: { type: String, unique: true, default: '' },
    password: String,
    token: String,
    username: { type: String, unique: true },
    avatar: {
        type: String,
        default: "avatar.jpg"
    },
    balance: { type: Number, default: 0 },
    current_address: { type: Schema.Types.ObjectId, ref: 'Address' },
    active: { type: Boolean, default: true },
    // mobile: { type: String, unique: true },
    city: String
        // updated_at: Date,
        // created_at: {
        //     type: Date,
        //     default: Date.now
        // }
}, { timestamps: true })


class UserClass {
    // `fullName` becomes a virtual
    // get fullName() {
    //     return `${this.firstName} ${this.lastName}`;
    // }

    // set fullName(v) {
    //     const firstSpace = v.indexOf(' ');
    //     this.firstName = v.split(' ')[0];
    //     this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
    // }

    // `getFullName()` becomes a document method
    // getFullName() {
    //     return `${this.firstName} ${this.lastName}`;
    // }

    // `findByFullName()` becomes a static
    // static findByFullName(name) {
    //     const firstSpace = name.indexOf(' ');
    //     const firstName = name.split(' ')[0];
    //     const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1);
    //     return this.findOne({ firstName, lastName });
    // }

    static async add(values) {
        values.password = PassHash.generate(values.password)
        return await to(this.create(values))
    }
    static async signup(values) {
        let [err, user] = await to(this.findOne({ username: values.username }).exec())
        if (err) {
            log.error('signup:' + err)
            return { status: 0, message: '用户查找失败' }
        }
        if (user) {
            let res = await this.login(values)
            return res ? { status: 1, message: '登录成功', user: res } : { status: 0, message: '登录失败' }
        }
        let [err3, res] = await to(map.getLocationByIP())
        if (err3 || !res || res.status == "1") {
            log.error('signup:' + err3 + (res && res.message))
            return { status: 0, message: '获取用户位置失败' }
        }
        values.city = res.result.ad_info.city
        values.password = PassHash.generate(values.password)
        let [err1, newUser] = await to(this.create(values))
        if (err1 || !newUser) {
            log.error('signup:' + err1)
            return { status: 0, message: '创建用户失败' }
        }
        let token = jwt.sign({ id: newUser.id }, config.appkey, {
            'expiresIn': 1440 // 设置过期时间})
        })
        newUser.token = token
        let [err2, savedUser] = await to(newUser.save())
        if (err2) {
            log.error('login:' + err)
            return null
        }
        return { status: 1, user: savedUser, message: '注册成功' }
    }
    static async login(values) {
        let [err, user] = await to(this.findOne({ username: values.username }, '-__v -createdAt').exec())
        if (err || !user) {
            if (err)
                log.error('login:' + err)
            return null
        }
        if (!user || !PassHash.verify(values.password, user.password)) return null

        let token = jwt.sign({ id: user.id }, config.appkey, {
            'expiresIn': 1440 // 设置过期时间})
        })
        user.token = token
        user.updatedAt = new Date()
        let [err2, savedUser] = await to(user.save())
        if (err2) {
            log.error('login:' + err)
            return null
        }

        return savedUser
    }
    static async search(query, limit = 0, page = 1, sort = { createdAt: 'desc' }) {
        let range = page > 1 ? limit * (page - 1) : 0
        let [err, values] = await to(this.find(query, '-__v -password -token').skip(range).limit(limit).sort(sort).exec())
        if (err) {
            log.error('User:search:' + err)
            return null
        }
        return values
    }
    static async modify(filter, parameters) {
        return await to(this.findOneAndUpdate(filter, parameters))
    }
    static async revoked(filter, token) {
        let [err, user] = await to(this.findOne(filter, 'token'))
        if (err) {
            log.error('revoked:' + err)
            return true
        }
        if (!user || !user.token || user.token !== token)
            return true
        return false
    }
}

UserSchema.loadClass(UserClass)
const User = mongoose.model('User', UserSchema)

export default User
