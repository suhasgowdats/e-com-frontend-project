import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Signin from './components/Signin';
import PrivateComp from './components/PrivateComp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import MyProducts from './components/MyProducts';
import Deatils from './components/Deatils';
import UpdateProd from './components/UpdateProd';
import Profile from './components/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComp/>}>
          <Route path='/' element={<Products/>}/>
          <Route path='/myproducts' element={<MyProducts/>}/>
          <Route path='/addproducts' element={<AddProduct/>}/>
          <Route path='/updateproduct/:id' element={<UpdateProd/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/detail/:id' element={<Deatils/>}/>
          </Route>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/login' element={<Login/>}/>
        </Routes>

      </BrowserRouter>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
