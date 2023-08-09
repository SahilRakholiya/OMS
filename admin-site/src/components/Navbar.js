import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style.css'
import swal from 'sweetalert'

const Navbar = () => {
  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    localStorage.removeItem('oid')
    navigate('/')
    swal({
      text: "You are log out",
      icon: "warning",
      buttons: false,
      timer: 1500
    });
  }

  return (
    <>
      <div className="container">
        <div className="brand-title">
          <div className='text-center logo-title'>
            <Link to="/" className='text-decoration-none text-white'>MyMeds</Link>
          </div>
        </div>

        <ul className='list-group my-5'>
          <li className='list-group p-2 ps-4'><Link to="/dashboard" className='text-decoration-none'> Dashboard</Link></li>
          <li className='list-group p-2 ps-4'><Link to="/user" className='text-decoration-none'> Users</Link></li>
          <li className='list-group p-2 ps-4'><Link to="/signup" className='text-decoration-none'> Admin</Link></li>
          <li className='list-group p-2 ps-4'><Link to="/addbeauty" className='text-decoration-none'> Beauty</Link></li>
          <li className='list-group p-2 ps-4'><Link to="/addwellness" className='text-decoration-none'> Wellness</Link></li>
          <li className='list-group p-2 ps-4'><Link to="/addmedicine" className='text-decoration-none'> Medicine</Link></li>
          <li className='list-group p-2 ps-4'><Link to="/quantity" className='text-decoration-none'> Quantity</Link></li>
          <li className='list-group p-2 ps-4'><Link to="/order" className='text-decoration-none'> Order</Link></li>
          <li className='list-group p-2 ps-4'><Link to="/feedback" className='text-decoration-none'> Feedback</Link></li>
        </ul>


        <ul className='list-group' >
          <li className='list-group p-2 ps-4'><Link to="/" className='text-decoration-none' onClick={handlelogout}> Logout</Link></li>
        </ul>
      </div>



    </>
  )
}

export default Navbar
