import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'


export default function NewTodo({refresh, setShowAdd}) {

    const [todo, setTodo] = useState('')

    async function onSubmit(event) {
        event.preventDefault()
        await fetch('http://192.168.1.64:5000/api/todo/addTodo', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access_Token': sessionStorage.getItem('Access_Token')
            },
            body: JSON.stringify({ todotext: todo })
        })
            .then(res => {
                if (res.ok) {
                    toast("Todo create is successfully!")
                    refresh(key => key + 1)
                    setShowAdd((prevState) => (!prevState))
                } else {
                    toast("Todo create error!")
                    throw new Error('Todo create error!')
                }
            })
            .catch(err => console.log('Todo create error!'))
    }

    return (
        <form className='flex space-x-2 mb-6' onSubmit={onSubmit}>
            <input
                type="text"
                name="todo"
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
                placeholder="Add a new Todo"
                className="p-1 rounded-md shadow-sm text-gray-800"
            />
            <button
                type="submit"
                className="px-2 py-1 rounded-md shadow-sm bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out"
            >
                Submit
            </button>
        </form>
    )
}