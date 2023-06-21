import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers, getOneUser, getToAccountPage, updateOneUser } from './api';

export default function UserUpdateAccount(props) {
  const navigate = useNavigate();
  const params = useParams()
  const [formData, setFormData] = useState({})

  useEffect(() => {
      getOneUser(params.id)
      .then(results => results.json())
      .then(data => {       
          setFormData({
            username: data.username,
            name: data.name
          })
        })
  }, [params.id])

  function handleFormChange(e) {
      const newInput = {...formData, [e.target.name]: e.target.value}
      setFormData(newInput)
  }
  
  async function handleCancel() {
    let token = JSON.parse(localStorage.getItem('divorceJWT'))       
    let response = await getToAccountPage(params.id, token)

    if (response.status === 401) {
        navigate('/users/login')
    }
    if (response.status === 200) {
        navigate(`/users/${params.id}/account`)
    }}
  
  async function handleFormSubmit(e) {
    e.preventDefault()
    const updatedUser = await updateOneUser(formData, params.id)
  
    if (updatedUser.error) {
      alert("Server Error, account could not be updated!")
    } else {

      await getAllUsers()
      .then(results => results.json())
      .then(data => {
          props.setUsers(data)})

    let token = JSON.parse(localStorage.getItem('divorceJWT'))       
    let response = await getToAccountPage(params.id, token)
      if (response.status === 401) {
            navigate('/users/login')
      }
      if (response.status === 200) {
            navigate(`/users/${params.id}/account`)
      }
    }
  }
    return (
      <div className='h-100'>
        <br />
          <form onSubmit={handleFormSubmit}>
              <h1 className='text-2xl font-bold pb-8'>Update Account Settings</h1>
              <ul className='flex flex-col'>
                  <li className='py-1 font-bold'><label>Username:</label></li>
                  <li className='py-2'><input className='px-2 py-1' value={formData.username} name='username' required onChange={handleFormChange}></input></li>
                  <li className='py-1 font-bold'><label>Display Name:</label></li>
                  <li className='py-2'><input className='px-2 py-1' value={formData.name} name='name' required onChange={handleFormChange}></input></li>
                         <li className='py-2 font-bold'><button className="hover:text-pink" type="submit">Submit</button></li>
                  <li className='py-2 font-bold'> <button type="button" className="hover:text-pink" onClick={handleCancel}>Cancel</button></li>
              </ul> 
          </form>
      </div>
    )
  }
    