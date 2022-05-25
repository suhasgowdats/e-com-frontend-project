import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { NavLink } from 'react-router-dom'



function MyProducts() {

    const [mylist, setMylist]=useState([])

    useEffect(()=>{
        myItem()
    },[])

    const myItem=async()=>{
        let Id=JSON.parse(localStorage.getItem('user'))._id
        let myprod= await axios('https://e-comm-backend-deploy.herokuapp.com/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        let datas=myprod.data
        let Filtered=datas.filter((item)=>{
            return(
                item.custID===Id
            )
        })
        setMylist(Filtered)
    }
    

    const redispMylist=async()=>{
        let Id=JSON.parse(localStorage.getItem('user'))._id
        let myprod= await axios('https://e-comm-backend-deploy.herokuapp.com/products')
        let datas=myprod.data
        let Filtered=datas.filter((item)=>{
            return(
                item.custID===Id
            )
        })
        setMylist(Filtered)
    }
     
    const delteHandel= async(id)=>{
        // console.log(id)
        let qq=await axios.delete(`https://e-comm-backend-deploy.herokuapp.com/myproduct/${id}`)
        redispMylist()        
    }


  return (
    <>
    {
        mylist.length>0?<div className='flex-div'>
        {
            mylist.map((item,i)=>{
                return(
                    <div className='card-div1' key={i}>
                        <img className='card-img' src={item.image} alt='img'/>
                    <div  className='card-info'>
                            <h3 >{item.name}</h3>
                            <h3>Price:${item.price}</h3>
                            <p>Spec:{item.specification}</p>
                    </div>
                    <div>
                    <button className='btn' onClick={()=>delteHandel(item._id)} ><DeleteOutlineOutlinedIcon/></button><NavLink to={`/updateproduct/${item._id}`}><button className='btn btn-edit'><EditOutlinedIcon/></button></NavLink>
                    </div>
                    </div>
                )
            })
        }
    </div>:<h1>Add products that you wish to sell</h1>
    }
    </>
  )
}

export default MyProducts