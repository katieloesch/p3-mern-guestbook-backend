import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createNewUserPost, deleteOneUserPost, getOneUser, getToDeleteAccountPage, getToUpdateAccountPage, getToUpdatePasswordPage } from './api'

export default function UserAccount() {
    const navigate = useNavigate();
    const params = useParams()

    const [user, setUser] = useState({})
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        })
    }, [params.id])

    async function handleDeleteAccount() {
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToDeleteAccountPage(params.id, token)
     
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/delete`)
        }
    }

    async function handleUpdateAccount() {
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToUpdateAccountPage(params.id, token)
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/update`)
        }
    }

    async function handleUpdatePassword() {
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToUpdatePasswordPage(params.id, token)
   
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/update/password`)
        } 
    }

    const template = {
        title: '',
        content: '',
        author: ''
    }

    const [formData, setFormData] = useState(template)

    function handleFormChange(e) {
        const newInput = {...formData, [e.target.name]: e.target.value}
        setFormData(newInput)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        formData.author = user.name
        await createNewUserPost(params.id, formData)

        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        
        })
        setFormData({title: '',
        content: '', author: ''})
        setShowForm(false)
    }

    async function handleDeletePost (e, postId) {        
        await deleteOneUserPost(params.id, postId)
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        })
    }

    let display;
   
    if (user.posts) {
      display = user.posts.map((post) => {
        return <div key={post._id}>
                    <Link to={`/users/${user._id}/posts/${post._id}`} className='flex flex-col py-5 px-10 text-center items-center' key={post._id}>
                        <h2 className='block font-bold text-lg'>{post.title}</h2>
                        <p className='text-justify'>{post.content}</p>
                        <p>Entry ID: {post._id}</p>
                    </Link>
                        <button onClick={(e) => (handleDeletePost(e, post._id))}>Delete Post</button>
                        <button onClick={(e) => navigate(`/users/${params.id}/posts/${post._id}/update`)}>Edit Post</button>
                </div>
    })

    } else {
      display = <p>Loading...</p>
    }
    
  return (
    <div className='flex flex-col px-10 pb-5 pt-4 h-100'>
        <h2 className='text-2xl font-bold'>{user.name}</h2>
        <h2 className='text-xl pb-5'>{user.username}</h2>
        <button className='pb-5 hover:text-pink' onClick={handleDeleteAccount}>delete account</button>
        <button className='pb-5 hover:text-pink' onClick={handleUpdateAccount}>update username / display name</button>
        <button className='pb-5 hover:text-pink' onClick={handleUpdatePassword}>update password</button>
        {!showForm && <button className='pb-5 hover:text-pink' onClick={() => (setShowForm(!showForm))}>Add new post</button>}
        {showForm && <div className='mb-10 mt-2'>
                        <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
                            <ul>
                                <li key='title' className='mb-1'><label>Title: </label></li>
                                <li className='mb-5'> <input name="title" onChange={handleFormChange} style={{ width: "25vw" }}></input></li>
                                <li key='content'  className='mb-1'><label>Content: </label></li>
                                <li><textarea
                                    name="content"
                                    onChange={handleFormChange}
                                    required
                                    style={{ width: "25vw", height: "10vh"}}
                                ></textarea></li>
                                <li className='py-2 hover:text-pink' key='cancel-btn'> <button type="button" onClick={() => (setShowForm(!showForm))}>Cancel</button></li>
                                <li className='py-2 hover:text-pink' key='submit-btn'><button type="submit">Submit New Post</button></li>
                            </ul>
                        </form>
                    </div>}
        <div>
            <Link to={`/users/${params.id}/posts`} className='text-2xl font-bold'>Posts:</Link>
            {display}
        </div>
        
    </div>
  )
}