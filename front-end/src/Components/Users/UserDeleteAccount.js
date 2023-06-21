import { useNavigate, useParams } from 'react-router-dom'
import React from 'react'
import { deleteOneUser, getAllUsers, getToAccountPage } from './api';

export default function UserDeleteAccount(props) {
    const params = useParams()
    const navigate = useNavigate();

    async function handleDelete() {
        const response = await deleteOneUser(params.id)

        localStorage.removeItem("divorceJWT")
        props.setTokenInLocalStorage(false)
        navigate(`/users/deleteSuccessful`)

        if (response.error) {
            alert('error user could not be deleted')
        } else {
            await getAllUsers()
                .then(results => results.json())
                .then(data => {
                props.setUsers(data)})
        }}

        async function handleCancel() {
            let token = JSON.parse(localStorage.getItem('divorceJWT'))       
            let response = await getToAccountPage(params.id, token)
    
            if (response.status === 401) {
                navigate('/users/login')
            }
            if (response.status === 200) {
                navigate(`/users/${params.id}/account`)
            }
        }

  return (
    <div>
        <br />
        <ul>
            <li className='py-2 font-bold'>  <h1> Are you sure you want to delete your account??</h1></li>
            <li className='py-2 font-bold '> <button type="button" onClick={handleDelete} className='text-lightpurple  hover:text-pink'>Yes, delete my account</button></li>
            <li className='py-2 font-bold '> <button type="button" onClick={handleCancel} className='text-lightpurple hover:text-pink'>Cancel</button></li>
        </ul> 
    </div>
  )
}
