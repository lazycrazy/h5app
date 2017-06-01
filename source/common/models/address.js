import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema({
    address: { type: String, default: '' },
    latitude:Number,
    longitude:Number,
    city_id: Number,
    tag: String,
    detail:String,
    updated_at: Date,
    created_at: {
        type: Date,
        default: Date.now
    }
})


const Address = mongoose.model('Address', AddressSchema)

export default Address
