import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: uuidv4()
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('User', UserSchema)