import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

export default function RegisterForm() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = userData

    async function onSubmit(event) {
        event.preventDefault()
        await fetch('http://192.168.1.64:5000/api/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)

        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    toast("Login error! Please try again!")
                    throw new Error('Login error!');
                }
            })
            .then(data => {
                toast("Login is successfully!")
                sessionStorage.setItem("Access_Token", data.Access_Token)
                navigate('/')

            })
            .catch(err => console.log('Loggin error!'))

    }

    function onChange(event) {
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className='flex flex-col mx-auto items-center mt-8 pt-3 pb-5 rounded-md shadow-md bg-[#003f88] w-[300px]'>
            <h1 className='text-3xl mb-4 text-white'>Login</h1>
            <form className='flex flex-col space-y-2' onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    className='p-1 rounded-sm shadow-sm'
                    value={email}
                    onChange={onChange}
                />
                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    minLength="6"
                    className='p-1 rounded-sm shadow-sm'
                    value={password}
                    onChange={onChange}
                />
                <button type="submit" className='bg-red-600 p-1 rounded-sm shadow-sm text-white font-semibold hover:bg-red-700
        transition ease-in-out duration-200'>
                    Login
                </button>
            </form>
        </div>
    )
}
