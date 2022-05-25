import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';


function UpdateProd() {
    const [edit, setEdit]=useState({
        name:'',
        image:'',
        price:'',
        brand:'',
        catogary:'',
        specification:''
    })

    const Nav=useNavigate()

    useEffect(()=>{
        findProdHandel()
    },[])

    const id = useParams().id

    const findProdHandel=async()=>{
        let infoGet= await axios('https://e-comm-backend-deploy.herokuapp.com/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        let prodDetail=infoGet.data;
        let findprod=prodDetail.find((item)=>{
            return(
                item._id===id
            )            
        })
        setEdit(findprod)
    }

    const Editchange=(e)=>{
        setEdit({...edit,[e.target.name]:e.target.value})
    }

    const editSubmit=async(e)=>{
        e.preventDefault();
        let res= await axios.put(`hhttps://e-comm-backend-deploy.herokuapp.com/product/${id}`,edit)
        Nav('/myproducts')        
    }


    return (
        <div>
            <form onSubmit={editSubmit}>
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={edit.name} onChange={Editchange}  type='text' name='name' label="Item name" variant="standard" />
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={edit.image} onChange={Editchange}  type='text' name='image' label="paste image url" variant="standard" /><br></br><br></br>
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={edit.price} onChange={Editchange}  type='number' name='price' label="Item price" variant="standard" />
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={edit.brand} onChange={Editchange} type='text' name='brand' label="Item brand" variant="standard" /><br></br><br></br>
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={edit.catogary} onChange={Editchange}  type='text' name='catogary' label="Item catogary" variant="standard" />
                <TextField style={{ margin: '20px', width: '300px' }} required='required' value={edit.specification} onChange={Editchange} type='text' rows='2' name='specification' label="Item specification" variant="standard" /><br></br><br></br>
                <Button variant="contained" type='submit' >Update<UpdateIcon/></Button>
            </form>
        </div>
    )
}

export default UpdateProd