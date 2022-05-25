import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';

function Deatils() {
    const [detail, setDetail]= useState([])
    const id=useParams()
    let itemID=id.id

    let Nav=useNavigate()

    useEffect(()=>{
        detailData()
    },[])

    const detailData = async () => {
        let prodList = await axios('https://e-comm-backend-deploy.herokuapp.com/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        let productDetail=prodList.data
        let findData=productDetail.find((item)=>{
            return(
                item._id===itemID
            )
        })
        setDetail(findData)        
    }

  return (
    <div>
        <div className='detail-flex'>
        <div>
        <img className='detail-img' src={detail.image} alt='image'/>
        </div>
        <div className='detail-info'>
            <h1>{detail.name}</h1>
            <p>Brand:{detail.brand}</p>
            <p>Catogary:{detail.catogary}</p>
            <h3>Price:${detail.price}</h3>
            <p>Spec:{detail.specification}</p>
            <h4>CustomerID:{detail.custID}</h4>
            <Button variant="contained">Buy Now</Button> <Button onClick={()=>Nav('/')} variant="contained">Back</Button>
        </div>
        </div>
    </div>
  )
}

export default Deatils