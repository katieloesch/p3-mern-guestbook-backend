import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToAccountPage } from '../Users/api';

export default function NavBar(props) {
  const navigate = useNavigate();

  async function gotToAccount() {
    if (props.tokenInLocalStorage) {

      let token = JSON.parse(localStorage.getItem('divorceJWT')) 
      let response = await getToAccountPage(token.id, token)
       
      if (response.status === 200) {
        navigate(`/users/${token.id}/account`)
          
      } else {
        navigate('/users/login')
      }

    } else {
      navigate('/users/login')
    }

  }

  function logUserOut() {
    localStorage.removeItem("divorceJWT")
    props.setTokenInLocalStorage(false)
    navigate('/users/logout')
  }


  return (
        <ul className='font-semibold hidden md:flex items-center text-center justify-center mb-2'>
            <li className='p-4  hover:text-pink'><Link to='/'>Home</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/posts'>Posts</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/users'>Users</Link></li>
            <li className='p-4  hover:text-pink hover:cursor-pointer' onClick={gotToAccount}>Account</li>
            {!props.tokenInLocalStorage && <li className='p-4  hover:text-pink'><Link to='/users/create'>Sign Up</Link></li>}
            {!props.tokenInLocalStorage && <li className='p-4  hover:text-pink'><Link to='/users/login'>Log In</Link></li>}
            {props.tokenInLocalStorage && <li className='p-4  hover:text-pink hover:cursor-pointer' onClick={logUserOut}>Log Out</li>}

        </ul>

        
  )
}
