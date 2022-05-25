import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signin() {
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            nav('/')
        }
    },[])
    const [user, setUser]=useState({
        name:'',
        email:'',
        password:''
    })
    const nav=useNavigate()

    const changeHandel=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const signSubmit= async (e)=>{
        e.preventDefault()
        let options={
            url:'https://e-comm-backend-deploy.herokuapp.com/register',
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            data:user
        }
        let res=await axios(options)
        console.log(res.data)
        setUser({
            name:'',
            email:'',
            password:''
        })
        localStorage.setItem('user', JSON.stringify(res.data.rslt))
        localStorage.setItem('token', JSON.stringify(res.data.token))                
        nav('/')
    }
    

  return (
    <div className='sign-div'>
        <h1>Register</h1>
      <form onSubmit={signSubmit}>
      <TextField id="outlined-basic" required='required' value={user.name} type='text'  name='name' label="Name" onChange={changeHandel}  variant="outlined" /><br></br><br></br>
      <TextField id="outlined-basic1" required='required' value={user.email} type='email' name='email' label="Email" onChange={changeHandel} variant="outlined" /><br></br><br></br>
      <TextField id="outlined-basic2" required='required' value={user.password} type='password' name='password' label="Password" onChange={changeHandel} variant="outlined" /><br></br><br></br>
      <Button variant="contained" type='submit' >Signup</Button>   
      </form>
    </div>
  )
}

export default Signin