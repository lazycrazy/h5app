import mongoose from 'mongoose'
import PassHash from 'password-hash'
import to from 'await-to-js'
import log from '../logger'
import jwt from 'jsonwebtoken'
import config from '../../config'
import map from '../map'

const Schema = mongoose.Schema


const AbcSchema = new Schema({
    id: Number,
    password: String,
}, { timestamps: true })


class AbcClass {
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
    static async search(query, limit = 0, page = 1, sort = { createdAt: 'desc' }) {
        let range = page > 1 ? limit * (page - 1) : 0
        let [err, values] = await to(this.find(query, '-__v -password -token').skip(range).limit(limit).sort(sort).exec())
        if (err) {
            log.error('Abc:search:' + err)
            return null
        }
        return values
    }
}

AbcSchema.loadClass(AbcClass)
const Abc = mongoose.model('Abc', AbcSchema)

export default Abc
