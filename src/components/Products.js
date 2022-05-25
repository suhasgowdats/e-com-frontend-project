import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom"
import DetailsIcon from '@mui/icons-material/Details';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';




function Products() {
    const [search, setSearch]=useState()
    const [list, setList] = useState([]);
    useEffect(() => {
        productData()
    }, [])


    const productData = async () => {
    //https://git.heroku.com/e-com-project-backend.git
        let prodList = await axios('https://e-comm-backend-deploy.herokuapp.com/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        setList(prodList.data)
    }
    

    const searchHanel=(e)=>{
        setSearch(e.target.value) 
    }

    const searchEnter= async()=>{
        const ress=await axios(`https://e-comm-backend-deploy.herokuapp.com/search/${search}`,{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        if(search){
            setList(ress.data)
        }
    }

    const cancelSearch=async()=>{
        let prodList = await axios('https://e-comm-backend-deploy.herokuapp.com/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        setList(prodList.data)
        setSearch('')
    }

    return (
        <>
            <div>
                <input type='text' className='serachBar' value={search} placeholder='search here'  onChange={searchHanel}/><button className='cancelBtn'onClick={cancelSearch}><CancelOutlinedIcon/></button>
                <button className='searchBtn'onClick={searchEnter}><SearchOutlinedIcon/></button>
            </div>

            {
                list.length>0 ?<div className='flex-div'>
                {
                    list.map((item, i) => {
                        return (
                            <div className='card-div' key={i}>
                                <img className='card-img' src={item.image} alt='img' />
                                <div className='card-info'>
                                    <h3 >{item.name}</h3>
                                    <p>Brand:{item.brand}</p>
                                    <h3>Price:${item.price}</h3>
                                </div>
                                <NavLink to={`/detail/${item._id}`}  ><button className='view-btn'>View <DetailsIcon /></button></NavLink>
                            </div>
                        )
                    })
                }
            </div>:<h1>Sorry login error</h1>
            }
        </>
    )
}

export default Products