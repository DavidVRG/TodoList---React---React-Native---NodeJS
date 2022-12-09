import express from 'express'
import { verifyToken } from './verifyToken.js'
import Todo from '../models/Todo.js'

const router = express.Router()

router.get('/list', async (req, res) => {
    const todoList = await Todo.find()
    res.status(200).send(todoList)
})

router.post('/addTodo', verifyToken, async (req, res) => {
    const todo = new Todo({
        userid: req.user.id,
        todotext: req.body.todotext
    })

    try {
        await todo.save()
        res.status(200).send(todo)
    } catch (error) {
        res.status(400).send("Todo create error!")
    }

})

router.delete('/deleteTodo/:id', verifyToken, async (req, res) => {
    try {
        const userMatch = await Todo.findOne({ userid: req.user.id, _id: req.params.id })
        if (userMatch) {
            await Todo.deleteOne(userMatch)
            res.status(200).send("Todo delete is successfully!")
        } else {
            res.status(400).send("Todo delete error!")
        }
    } catch (error) {
        res.status(400).send("Todo delete error!")
    }
})

router.put('/updateTodo/:id', verifyToken, async (req, res) => {
    try {
        const userMatch = await Todo.findOne({ userid: req.user.id, _id: req.params.id })
        if (userMatch) {
            await Todo.updateOne(userMatch, { $set: req.body }, { new: true })
            res.status(200).send("Todo update is successfully")
        } else{
            res.status(400).send("Todo update error!")
        }
    } catch (error) {
        res.status(400).send("Todo update error!")
    }
})

export default router