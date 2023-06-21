import React from 'react'
import User from './User'

export default function Users(props) {

  let allUsers = <h3>Loading...</h3>

  if (props.users.length > 0) {
    allUsers = props.users.map((user) => {
      return <div className="font-bold leading-7"><User 
      username={user.username}
                   name={user.name}
                   posts={user.posts}
                   id={user._id}
                   key={user._id}
                   setUsers={props.setUsers}
                   tokenInLocalStorage={props.tokenInLocalStorage}
              />

              </div>
        })
  }

  return (
    <div>
      <br />
        <h1 className='font-bold text-2xl pb-4'>Users</h1>
        {allUsers}
        <br />
    </div>
  )
}
