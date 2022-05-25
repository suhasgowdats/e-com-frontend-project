import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

function AddProduct() {
    const [prod, setProd] = useState({
        name: '',
        image: '',
        price: '',
        brand: '',
        catogary: '',
        specification: ''
    });
    const [prodMsg, setProdMsg]=useState('')


    const productHandel = (e) => {
        setProd({ ...prod, [e.target.name]: e.target.value })
    }
    const prodSubmit = async (e) => {
        e.preventDefault();
        let custID = JSON.parse(localStorage.getItem('user'))._id
        let prodInfo = { ...prod, custID }
        const obj = {
            url: 'https://e-comm-backend-deploy.herokuapp.com/addProduct',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            data: prodInfo
        }
        let rslt = await axios(obj)
        console.log(rslt.data)
        setProd({
            name: '',
            image: '',
            price: '',
            brand: '',
            catogary: '',
            specification: ''
        })
        setProdMsg(rslt.data)
    }
    setTimeout(()=>{
        setProdMsg('')
    },3000)



    return (
        <div>
            <form onSubmit={prodSubmit}>
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={prod.name} onChange={productHandel} type='text' name='name' label="Item name" variant="standard" />
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={prod.image} onChange={productHandel} type='text' name='image' label="paste image url" variant="standard" /><br></br><br></br>
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={prod.price} onChange={productHandel} type='numb' name='price' label="Item price" variant="standard" />
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={prod.brand} onChange={productHandel} type='text' name='brand' label="Item brand" variant="standard" /><br></br><br></br>
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={prod.catogary} onChange={productHandel} type='text' name='catogary' label="Item catogary" variant="standard" />
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={prod.specification} onChange={productHandel} type='text' rows='2' name='specification' label="Item specification" variant="standard" /><br></br><br></br>
                <Button variant="contained" type='submit' >Upload<DownloadIcon /></Button>
            </form>
            <p style={{color:"green"}}>*{prodMsg}</p>
        </div>
    )
}

export default AddProduct