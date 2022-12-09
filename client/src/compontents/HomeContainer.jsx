import React from 'react'
import FetchList from './FetchList'

export default function HomeContainer() {

    return (
        <div className='flex justify-center mt-12 text-white'>
            <div className='flex flex-col items-center 
        bg-[#003f88] p-5 rounded-md shadow-md w-[90%] lg:w-[70%]'>
                <h1 className='text-2xl font-bold uppercase mb-1'>Todo List</h1>
                <span className='mb-2 opacity-50 text-center'>You can delete and update if the todo is yours!</span>
                <FetchList />
            </div>
        </div>
    )
}