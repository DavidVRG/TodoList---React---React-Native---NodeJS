import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function RegisterForm() {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    username: '',
  })
  const { email, password, username } = userData

  async function onSubmit(event) {
    event.preventDefault()
    const res = await fetch('http://192.168.1.64:5000/api/auth/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)

    })
    if (res.ok) {
      toast("Register is successfully!")
    } else {
      toast("Register error! Please try again!")
    }

  }

  function onChange(event) {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className='flex flex-col mx-auto items-center mt-8 pt-3 pb-5 rounded-md shadow-md bg-[#003f88] w-[300px]'>
      <h1 className='text-3xl mb-4 text-white'>Register</h1>
      <form className='flex flex-col space-y-2' onSubmit={onSubmit}>
        <input
          type="text"
          placeholder='Name'
          minLength="6"
          name='username'
          className='p-1 rounded-sm shadow-sm'
          value={username}
          onChange={onChange}
        />
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
          Register
        </button>
      </form>
    </div>
  )
}
