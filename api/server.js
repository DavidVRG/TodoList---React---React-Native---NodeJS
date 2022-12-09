import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'


const app = express()
dotenv.config()

// MONGODB CONNECT
mongoose.connect(process.env.MONGODB_CONNECT, () => console.log('DB connected!'))


// IMPORT ROUTES
import authRoute from './routes/auth.js'
import todoRoute from './routes/todo.js'

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/auth', authRoute)
app.use('/api/todo', todoRoute)

app.listen(5000, '0.0.0.0', () => console.log('Node server is running!'))