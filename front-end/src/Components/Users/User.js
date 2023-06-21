import React from 'react'
import { useNavigate } from "react-router-dom";
import { getToAccountPage } from "./api";

export default function User(props) {
  const navigate = useNavigate();

  async function handleClick() {
    if (props.tokenInLocalStorage) {

        let token = JSON.parse(localStorage.getItem('divorceJWT')) 

        if (token.id === props.id) {
          let response = await getToAccountPage(token.id, token)  

        if (response.status === 200) {
          navigate(`/users/${token.id}/account`)    
        } 
        } else {
          navigate(`/users/${props.id}`);
        }
      } else {
        navigate(`/users/${props.id}`)
      }    
  }
  
  return (
        <div className='hover:cursor-pointer' onClick={handleClick}>
          <h2>{props.name}</h2>
        </div>
  )
}
