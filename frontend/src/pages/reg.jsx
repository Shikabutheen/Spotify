import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/user';

const Register = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
     const {registerUser,btnload}=UserData()

     const navigate=useNavigate()

    const submithandler=e=>{
        e.preventDefault()
       registerUser(name,email,password,navigate);
       
        
    }

  return (
  <>
  <div className='flex items-center justify-center h-screen max-h-screen'>

    <div className='bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full'>

        <h2 className=' text-3xl font-semibold  text-center mb-8'>  Register to Spotify</h2>

        <form action="#" className=' mt-8' onSubmit={submithandler}>

            <div className='mb-4'>
                <label className=' block text-sm font-medium mb-1'>
                    Name
                </label>
                <input type="text" placeholder='Your Name' className='auth-input' value={name} onChange={e=>setName(e.target.value) } required />
            </div>
            <div className='mb-4'>
                <label className=' block text-sm font-medium mb-1'>
                    Email or username
                </label>
                <input type="email" placeholder='Email or username' className='auth-input' value={email} onChange={e=>setEmail(e.target.value) } required />
            </div>




            <div className='mb-4'>
                <label className=' block text-sm font-medium mb-1'>
                    Password
                </label>
                <input type="password" placeholder='password' className='auth-input'  value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <button disabled={btnload} className='auth-btn'>{btnload?"Please Wait...":"Register"}</button>
        </form>
        <div className='text-center mt-6'>
            <Link to='/login' className='etxt-sm text-gray-400 hover:text-gray-300'>
            
            have account?</Link>

        </div>

    </div>


  </div>
  </>
  )
}

export default Register;