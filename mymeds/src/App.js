import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './Components/Login'
// import Footer from './Components/Footer'
import Sign from './Components/Sign'
import Order from './Components/Order'
import Cart from './Components/Cart'
import Home from './Components/Home'
import Profile from './Components/Profile'
import Forgotpassword from './Components/Forgotpassword'
import BeautyProduct from './Components/Products/BeautyProduct'
import MedicineProduct from './Components/Products/MedicineProduct'
import WellnessProduct from './Components/Products/WellnessProduct'
import ProtState from './context/productdata/ProtState'
import HealtthCornar from './HealtthCornar'
import Orderdata from './Components/Orderdata'
import Trackorder from './Components/Trackorder'
import CancelOrder from './Components/CancelOrder'


const App = () => {

  return (
    <div>
      <ProtState>
        <Router>
          <div style={{ top: '0', position: 'fixed', overflow: 'none', width: '100%', zIndex: '1' }}>
            <Navbar />
          </div>

          <div style={{ marginTop: '175px'}}>
          
            <Routes>
              <Route path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Sign  />} />
              <Route exact path='/order' element={<Order />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/profile' element={<Profile  />} />
              <Route exact path='/forgotpassword' element={<Forgotpassword />} />
              <Route exact path='/beauty' element={<BeautyProduct />} />
              <Route exact path='/medicine' element={<MedicineProduct />} />
              <Route exact path='/wellness' element={<WellnessProduct />} />
              <Route exact path='/beautyproduct' element={<BeautyProduct />} />
              <Route exact path='/healthcornar' element={<HealtthCornar />} />
              <Route exact path='/orderdata' element={<Orderdata />} />
              <Route exact path='/trackorder' element={<Trackorder />} />
              <Route exact path='/cancelorder' element={< CancelOrder/>} />
            </Routes>
          </div>
        </Router>
      </ProtState>
    </div>
  )
}

export default App
