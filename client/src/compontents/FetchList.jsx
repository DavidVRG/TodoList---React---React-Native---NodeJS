import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Spinner from './Spinner'
import Moment from 'react-moment';
import DeleteTodo from './DeleteTodo';
import NewTodo from './NewTodo'
import UpdateTodo from './UpdateTodo';

export default function FetchList() {

    const [loading, setLoading] = useState(true)
    const [updateBox, setUpdateBox] = useState(false)
    const [itemId, setItemId] = useState('')
    const [updateText, setUpdateText] = useState('')
    const [list, setList] = useState([])
    const [refreshKey, setRefreshKey] = useState(0);
    const [showAdd, setShowAdd] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch('http://192.168.1.64:5000/api/todo/list')
            .then(res => res.json())
            .then(data => {
                return data.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date)
                }).reverse()
            })
            .then(data => setList(data))
        setLoading(false)
    }, [refreshKey])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='w-full flex items-center flex-col space-y-3'>
            {updateBox && (
                <div className='h-full absolute top-0 bottom-0 right-0 left-0 z-50 flex justify-center items-top pt-16 w-full bg-[#00296b] bg-opacity-50'>
                    <div className='bg-[#0e3b85] h-[200px] w-[300px] rounded-md shadow-lg flex justify-center items-center flex-col p-4 relative'>
                        <div className='absolute top-2 right-4 cursor-pointer' onClick={() => setUpdateBox((prevState) => (!prevState))}>X</div>
                        <h2 className='font-semibold mb-3'>Update your Todo!</h2>
                        <form className='flex flex-col' onSubmit={(event) => UpdateTodo({event, itemId, setRefreshKey, updateText, setUpdateBox})}>
                            <input
                                type="text"
                                value={updateText}
                                onChange={(event) => setUpdateText(event.target.value)}
                                className='p-1 rounded-md shadow-sm text-gray-800'
                            />
                            <button
                                type="submit"
                                className='mt-2 bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out rounded-md shadow-sm py-2 px-1'>Submit</button>
                        </form>
                    </div>
                </div>
            )}

            <div className='bg-red-500 p-2 rounded-md 
                cursor-pointer hover:bg-red-600 transition 
                ease-in-out duration-200 mb-6'
                onClick={() => setShowAdd((prevState) => !prevState)}
            >Add a new Todo!</div>
            {showAdd && <NewTodo refresh={setRefreshKey} setShowAdd={setShowAdd} />}

            {!loading && (
                list.map(item => {
                    return (
                        <div key={item._id} className="flex justify-between items-center bg-[#00296b] hover:bg-[#002664] p-3 rounded-md shadow-md w-[90%]">
                            <div className='flex flex-col sm:flex-row space-x-2 sm:space-x-4'>
                                <div className='pl-2'>{item.todotext}</div>
                                <Moment format="YYYY.MM.DD - hh:mm:ss" date={item.date} className="opacity-50" />
                            </div>
                            <div className='flex space-x-2'>
                                <button className='bg-green-600 hover:bg-green-700 trainsition ease-in-out duration-200 p-1 sm:p-2 rounded-md shadow-md'
                                    onClick={() => { setUpdateBox((prevState) => (!prevState)); setItemId(item._id) }}>Update</button>
                                <button className='bg-red-600 hover:bg-red-700 trainsition ease-in-out duration-200 p-1 sm:p-2 rounded-md shadow-md'
                                    onClick={() => DeleteTodo({ item, setRefreshKey })}>Delete</button>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}