import React from 'react'
import SpinnerSvg from '../assets/Spinner.svg'

export default function Spinner() {
    return (
        <div className='flex items-center justify-center fixed left-0 bottom-0 top-0 right-0 z-50 bg-[#00296b] bg-opacity-90'>
            <div>
                <img src={SpinnerSvg} alt="Spinner" className='h-24' />
            </div>
        </div>
    )
}