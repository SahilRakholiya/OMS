import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddBeauty from './components/AddBeauty'
import AddWellness from './components/AddWellness'
import AddMedicine from './components/AddMedicine'
import Users from './components/Users'
import DashBoard from './components/DashBoard'
import Order from './components/Order'
import BeautyData from './Display-data/BeautyData'
import WellnessData from './Display-data/WellnessData'
import MedicineData from './Display-data/MedicineData'
import Orderdata from './components/Orderdata'
import Feedback from './components/Feedback'
import Signup from './components/Signup'
import Login from './components/Login'
import AllAdmin from './components/AllAdmin'
// import Quantity from './components/Quantity'
const App = () => {
  return (
    <div>
      <div className='container-fluid' style={{ position: "absolute" }}>
        <Router>
          <div className="row">
            <div className='col-2' style={{ position: 'fixed', height: '100vh', backgroundColor: 'rgb(72, 72, 72)', left: '0', top: '0' }}>
              <Navbar />
            </div>

            <div className='col-10' style={{ position: 'absolute', right: '0', top: '0' }}>
              <Routes>

                <Route exact path='/' element={<Login />} />
                <Route exact path='/signup' element={<Signup />} />
                {/* <Route exact path='/home' element={<Home />} /> */}
                <Route path='/dashboard' element={<DashBoard />} />
                {/* <Route path='/quantity' element={<Quantity />} /> */}
                <Route path='/user' element={<Users />} />
                <Route path='/addbeauty' element={<AddBeauty />} />
                <Route path='/addwellness' element={<AddWellness />} />
                <Route path='/addmedicine' element={<AddMedicine />} />
                <Route path='/order' element={<Order />} />
                <Route path='/displaybeautyproduct' element={<BeautyData />} />
                <Route path='/displaywellnessproduct' element={<WellnessData />} />
                <Route path='/displaymedicine' element={<MedicineData />} />
                <Route path='/orderdata' element={<Orderdata />} />
                <Route path='/feedback' element={<Feedback />} />
                <Route path='/alladmin' element={<AllAdmin />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </div>
  )
}
export default App
