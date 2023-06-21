import React from 'react'
import { useState } from 'react';
import { findOnLogIn } from './api';
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin(props) {
  const navigate = useNavigate();

  const template = {
    username: '',
    password: '',
  }

const [formData, setFormData] = useState(template)
function handleFormChange(e) {
    const newInput = {...formData, [e.target.name]: e.target.value}
    setFormData(newInput)
}

function handleCancel() {
     navigate("/");
}

async function handleFormSubmit(e) {
  e.preventDefault()

  const userData = await findOnLogIn(formData)

  if (userData.error) {
    alert("Invalid username or password, couldn't log in!")
  } else {
    const user = userData.user
    const id = user[0]._id
    const token = {
      token: userData.token,
      id: id
    }

    localStorage.setItem("divorceJWT", JSON.stringify(token))
    props.setTokenInLocalStorage(true)
    setFormData(template)
    navigate(`/users/${id}/account`)
  }
}


  return (
    <div className='h-100'>
        <form onSubmit={handleFormSubmit}>
          <br />
            <h1 className='text-2xl font-bold pb-8'>Log In</h1>
            <ul className='flex flex-col'>
                <li className='py-1 font-bold'><label>Username:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='username' required onChange={handleFormChange}></input></li>
                <li className='py-1 font-bold'><label>Password:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='password' required type='password' onChange={handleFormChange}></input></li>
                <li className='py-2'><button type="submit" className='text-lightpurple hover:text-pink font-bold'>Log In</button></li>
                <li className='py-2'> <button type="button" onClick={handleCancel} className='font-bold hover:text-pink text-lightpurple'>Cancel</button></li>
                <li className='flex justify-center gap-4'><span>Don't have an account? </span><Link to='/users/create' className='font-bold hover:text-pink text-lightpurple'> Sign Up </Link> </li>
                
            </ul> 
        </form>
    </div>
  )
}