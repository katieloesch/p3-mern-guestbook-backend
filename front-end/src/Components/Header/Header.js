import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import NavBarSmallScreen from '../NavBar/NavBarSmallScreen'

export default function Header(props) {

    const [hamburger, setHamburger] = useState(false)

    function showMenu() {
        setHamburger(!hamburger)
    }

    const icons = {
        hamburger: (<svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" width="1.9em" height="1.9em" viewBox="0 0 16 16">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/>
                    </svg>),
        close: (<svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m7 7l10 10M7 17L17 7"/>
                </svg>)
    }

  return (
    <div className='mb-5 fixed top-0 inset-x-0 bg-lightpurple text-[black]content-center  text-black dark:bg-gray-900 dark:text-white '>
        <h1 className='font-allura  text-darkpurple text-center  sm:text-5xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl  font-bold pt-5  '>Divorce Party Guest Book</h1>
        <NavBar tokenInLocalStorage={props.tokenInLocalStorage} setTokenInLocalStorage={props.setTokenInLocalStorage}/>
        <div className='flex justify-center  cursor-pointer md:hidden'> 
            {icons.hamburger}
        </div>
        <NavBarSmallScreen showMenu={showMenu} hamburger={hamburger} close={icons.close} tokenInLocalStorage={props.tokenInLocalStorage} setTokenInLocalStorage={props.setTokenInLocalStorage}/>
    </div>
  )
}
