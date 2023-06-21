import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneUserPost } from './api'

export default function ShowUserPost() {
    const params = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        getOneUserPost(params.id, params.postId)
        .then(results => results.json())
        .then(data => {
            setPost(data)})
    }, [params.id, params.postId])

    let display;
   
    if (post) {
        display = <div className='flex flex-col py-5 px-10 text-center items-center'>
                        <h2 className='block font-bold text-lg'>{post.title}</h2>
                        <br />
                        <p className='text-justify'>{post.content}</p>
                        <br />
                        <p>Entry ID: {post._id}</p>
                    </div>

    } else {
      display = <p>Loading...</p>
    }
  
  return (
    <div>
        {display}
    </div>
  )
}
