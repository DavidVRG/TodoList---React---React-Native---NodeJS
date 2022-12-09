import mongoose from 'mongoose'

const TodoSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    todotext: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Todo', TodoSchema)