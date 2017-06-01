import mongoose from 'mongoose'
import PassHash from 'password-hash'
import to from 'await-to-js'
const Schema = mongoose.Schema


const UserSchema = new Schema({
    email: { type: String, unique: true, default: '' },
    password: String,
    token: String,
    username: { type: String },
    avatar: {
        type: String,
        default: "avatar.jpg"
    },
    balance: { type: Number, default: 0 },
    current_address: { type: Schema.Types.ObjectId, ref: 'Address' },
    active: { type: Boolean, default: true },
    mobile: { type: String, unique: true },
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
        let user
        try {
            user = await this.findOne({ mobile: values.mobile }).exec()
        } catch (e) {
            //log error
            throw e
        }
        if (user) return false
        values.password = PassHash.generate(values.password)
        await this.create(values)

        return true
    }
    static async login(values) {
        let user
        try {
            user = await this.findOne({ mobile: values.mobile }).exec()
        } catch (e) {
            //log error
            throw e
        }
        if (!user || !PassHash.verify(values.password, user.password)) return false
        return true
    }
    static async search(query, limit = 1, page = 1, sort = { createdAt: 'desc' }) {
        let range = page > 1 ? limit * (page - 1) : 0
        try {
            let values = await this.find(query).skip(range).sort(sort).exec()
        } catch (e) {
            //log error
            throw e
        }
        return values
    }
    static async findAndUpdate(filter, parameters) {
        // parameters.updateAt = new Date()
        try {
            await this.findAndUpdate(filter, parameters)
        } catch (e) {
            //log error
            throw e
        }
    }
}

UserSchema.loadClass(UserClass)
const User = mongoose.model('User', UserSchema)

export default User
