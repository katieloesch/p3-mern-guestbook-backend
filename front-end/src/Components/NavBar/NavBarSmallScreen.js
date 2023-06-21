import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToAccountPage } from '../Users/api';

export default function NavBarSmallScreen(props) {
  const navigate = useNavigate();

  function logUserOut() {
    localStorage.removeItem("divorceJWT")
    props.setTokenInLocalStorage(false)
    navigate('/users/logout')
    props.showMenu()
  }

  async function gotToAccount() {
    let token = JSON.parse(localStorage.getItem('divorceJWT')) 

    if (token) {
      const id = token.id  
      let response = await getToAccountPage(id, token)
   
  if (response.status === 200) {
    navigate(`/users/${id}/account`)
    props.showMenu()
      
  } } else {
    navigate('/users/login')
    props.showMenu()
  }
  }
 
  return (
    <>
    <ul className={props.hamburger ? 'flex-col flex fixed inset-0 mt-1/4 bg-white backdrop-blur-lg text-white text-xl dark:bg-slate-600/50 md:hidden' : 'hidden'}>
        <li className='hover:text-pink p-4 mt-10 flex justify-center items-center cursor-pointer text-darkpurple'>{props.close}</li>
        <li onClick={props.showMenu} className='hover:text-pink p-4 font-bold text-darkpurple'><Link to='/posts'>Posts</Link></li>
        <li onClick={props.showMenu} className='hover:text-pink p-4 font-bold text-darkpurple'><Link to='/users'>Users</Link></li>
        <li className='hover:text-pink p-4 font-bold  text-darkpurple hover:cursor-pointer' onClick={gotToAccount}>Account</li>
        {!props.tokenInLocalStorage && <li className='hover:text-pink p-4 font-bold text-darkpurple' onClick={props.showMenu}><Link to='/users/create'>Sign Up</Link></li>}
        {!props.tokenInLocalStorage && <li className='hover:text-pink p-4 font-bold text-darkpurple' onClick={props.showMenu}><Link to='/users/login'>Log In</Link></li>}
        {props.tokenInLocalStorage && <li className='hover:text-pink p-4 font-bold text-darkpurple hover:cursor-pointer' onClick={logUserOut}>Log Out</li>}
    </ul>
    <br />
    </>
  )
}
