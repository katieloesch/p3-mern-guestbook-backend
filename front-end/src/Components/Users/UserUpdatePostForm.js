import React, { useEffect, useState } from 'react'
import { getOneUser, updateOneUserPost } from './api'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneUserPost } from './api';

export default function UserUpdatePostForm() {
    const navigate = useNavigate();
    const params = useParams()

    const [post, setPost] = useState({})
    const [updateFormData, setUpdateFormData] = useState({})

    useEffect(
        () => {
        getOneUserPost(params.id,params.postId)
        .then(results => results.json())
        .then(data => {
            setPost(data)
            setUpdateFormData({title: data.title, content: data.content, author: data.author})
        })
    }, [params.id, params.postId])
    
    function handleUpdateFormChange(e) {
        const newInput = {...updateFormData, [e.target.name]: e.target.value}
        setUpdateFormData(newInput)
    }

    async function handleUpdatePost (e) {
        e.preventDefault()
        await updateOneUserPost(params.id, params.postId, updateFormData)
        navigate(`/users/${params.id}/account`)
    }

  return (
    <div>
        <h1>Edit Post</h1>
        <form onSubmit={(e) => handleUpdatePost(e)} className='flex flex-col gap-5'>
            <ul>
                <li><label>Title:
                    <input
                        name="title"
                        onChange={handleUpdateFormChange}
                        value={updateFormData.title}
                    ></input>
                </label></li>
                
                <li><label>Content:
                    <textarea
                    name="content"
                    onChange={handleUpdateFormChange}
                    value={updateFormData.content}
                    required
                    ></textarea>
                </label></li>
        
                <li className='py-2'> <button type="button" onClick={() => navigate(`/users/${params.id}/account`)}>Cancel</button></li>
                <li className='py-2'><button type="submit">Save Changes</button></li>
            </ul>
        </form>
    </div>
  )
}
