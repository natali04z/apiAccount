import { model, Schema } from "mongoose"

const AccountSchema = new Schema({
    account_number: {
        type: String,
        unique: true,
        required: true
    },
    client_document: {
        type: String,
        maxlength: [10, 'Max 10 characters'],
        minlength: [8, 'Min 8 characters']
    },
    opening_date: {
        type: Date
    },
    balance: {
        type: Number
    },
    access_key: {
        type: String,
        required: true,
        maxlength: [70, 'Max 70 characters']
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    }
})

export default model('Account', AccountSchema)