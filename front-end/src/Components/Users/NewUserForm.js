import React from 'react'
import { useState } from 'react';
import { createNewUser, findOnLogIn, getAllUsers } from './api';
import { Link, useNavigate } from "react-router-dom";

export default function NewUserForm(props) {
  const navigate = useNavigate();

  const template = {
    username: '',
    name: '',
    password: '',
    posts: []
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
  const newUser = await createNewUser(formData)

  if (newUser.error == "username already exists") {
    alert("The username you entered already exists, please choose a different username!")
  } else {
    await getAllUsers()
    .then(results => results.json())
    .then(data => {
        props.setUsers(data)})
  
  const userData = await findOnLogIn(formData)  
  const user = userData.user
  const id = user[0]._id
  const token = {
    token: userData.token,
    id: id
  }

  localStorage.setItem("divorceJWT", JSON.stringify(token))
  props.setTokenInLocalStorage(true)

  if (userData.error) {
    alert("Server error, couldn't log in!")
  } else {
    setFormData(template)
    navigate(`/users/${id}/account`)
    setFormData(template)
    }
  }
}

  return (
    <div className='h-100'>
        <form onSubmit={handleFormSubmit}>
          <br />
            <h1 className='text-2xl font-bold pb-8'>Sign Up</h1>
            <ul className='flex flex-col'>
                <li className='py-1 font-bold'><label>Username:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='username' required placeholder='JaneDoe93' onChange={handleFormChange}></input></li>
                <li className='py-1 font-bold'><label>Display Name:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='name' required placeholder='Jane D.' onChange={handleFormChange}></input></li>
                <li className='py-1 font-bold'><label>Password:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='password' required type='password' placeholder='enter password' onChange={handleFormChange}></input></li>
                <li className='py-2 font-bold'><button type="submit" className=' hover:text-pink text-lightpurple'>Submit</button></li>
                <li className='py-2'> <button type="button" onClick={handleCancel} className='font-bold hover:text-pink text-lightpurple'>Cancel</button></li>
                <li className='flex justify-center gap-4'><span>Already have an account?</span><Link to='/users/login' className='font-bold hover:text-pink text-lightpurple'> Log In </Link> </li>
            </ul> 
        </form>
    </div>
  )
}