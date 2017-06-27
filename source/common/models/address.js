import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema({
    address: { type: String, default: '' },
    latitude:Number,
    longitude:Number,
    city_id: Number,
    tag: String,
    detail:String    
})


const Address = mongoose.model('Address', AddressSchema)

export default Address
