import React from 'react'

function Profile() {
    const auth= JSON.parse(localStorage.getItem('user'))
  return (
    <div style={{textAlign:"left",paddingLeft:'300px'}}>
       <h1>Name:{auth.name}</h1>
       <h1>Email:{auth.email}</h1>
    </div>
  )
}

export default Profile