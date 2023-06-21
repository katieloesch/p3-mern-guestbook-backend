import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOneUser } from './api'


export default function ShowUser() {
    const params = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)})
    }, [params.id])


    let display;
   
    if (user.posts) {
      display = user.posts.map((post) => {
        return <Link to={`/users/${user._id}/posts/${post._id}`} className='flex flex-col py-5 px-10 text-center items-center' key={post._id}>
                    <h2 className='block font-bold text-lg'>{post.title}</h2>
                    <p className='text-justify'>{post.content}</p>
                    <p>Entry ID: {post._id}</p>
                </Link>
    })

    } else {
      display = <p>Loading...</p>
    }
    

  return (
    <div className='px-10 pb-5 pt-4 h-100'>
        <h2 className='text-2x font-bold'>{user.name}</h2>
        <br/>
        <h2 className='text-xl pb-5 font-bold'>{user.username}</h2>
        <div>
            <Link to={`/users/${params.id}/posts`} className='text-2xl font-bold'>Posts:</Link>
            {display}
        </div>
    </div>
  )
}
