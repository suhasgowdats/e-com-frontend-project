import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            nav('/')
        }
    })
    const nav=useNavigate()
    const [log, setLog]=useState({
        email:"",
        password:""
    });
    const [logmsg, setLogmsg]=useState('')
    const handelInput=(e)=>{
        setLog({...log,[e.target.name]:e.target.value})
    }


    const submitLog=async(e)=>{
        e.preventDefault()
        let options={
            url:'https://e-comm-backend-deploy.herokuapp.com/login',
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            data:log
        }
        let res=await axios(options)
        if(res.data==="Wrong Password.. Please enter correct password"){
            setLogmsg("Wrong Password.. Please enter correct password")
        }else if(res.data==="User doesnt exist.. Please signin"){
            setLogmsg("User doesnt exist.. Please signin")
        }else{
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem('token',JSON.stringify(res.data.token))
            nav("/")
        }
        setTimeout(()=>{
            setLogmsg("")
        },3000)

    }
    


    return (
        <div className='log-div'>
            <h1>Login</h1>
            <form onSubmit={submitLog}>
                <TextField id="outlined-basic1" required='required' value={log.email} type='email' name='email' label="Email" onChange={handelInput} variant="outlined" /><br></br><br></br>
                <TextField id="outlined-basic2" required='required' value={log.password} type='password' name='password' label="Password" onChange={handelInput} variant="outlined"  /><br></br><br></br>
                <Button variant="contained" type='submit' >login</Button>
            </form>
            <p style={{color:"red"}}>{logmsg}</p>
        </div>
    )
}

export default Login