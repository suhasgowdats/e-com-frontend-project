import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Nav() {
  const Nav = useNavigate()
  const auth = localStorage.getItem('user')
  const handelLogout = () => {
    localStorage.clear();
  }
  return (
    <div className='header-nav'>
      <img className='logo' src='https://tse4.mm.bing.net/th?id=OIP.n-JxazmGp8bGPStS3f06vgHaHa&pid=Api&P=0&w=171&h=171' alt='logo'/>
      {
        auth ? <ul className='ul-nav'>
          <li><NavLink to='/'>Product</NavLink></li>
          <li><NavLink to='/myproducts'>My Products</NavLink></li>
          <li><NavLink to='/addproducts'>Add products</NavLink></li>
          <li><NavLink to='/profile'>Profile</NavLink></li>
          <li><NavLink onClick={handelLogout} to='/login'>Logout ({JSON.parse(auth).name})</NavLink></li>
        </ul> : <ul className='ul-nav entry'>
          <li><NavLink to='/signin'>Signin</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
        </ul>
      }
    </div>
  )
}

export default Nav