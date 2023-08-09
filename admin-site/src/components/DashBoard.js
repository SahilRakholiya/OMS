import React, { useState, useEffect } from 'react'
import '../style.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const DashBoard = () => {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState([])

  const display = async () => {
    const response = await fetch('http://localhost:5000/dashboard/count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const respo = await response.json()
    setDashboard(respo)
    console.log(respo)
  }

  useEffect(() => {
    if (!localStorage.getItem('id')) {
      navigate('/')
    } else {
      display()

    }
  }, [])


  return (
    <div className='container my-2'>
      <h2>DashBoard</h2>
      <div>
        {dashboard.map((element) => {
          return <div className="row">
            <div className='d-flex'>
            <Link to="/user" className='text-decoration-none text-dark m-2' style={{ width: '18vw' }}>
                <div className='container bg-success text-light border rounded p-3 shadow-sm'>
                  <h4>Client Site Users</h4>
                  <h5>
                    {element.user_count}
                  </h5>
                </div>
              </Link>

              <Link to="/addmedicine" className='text-decoration-none text-dark m-2' style={{ width: '18vw' }}>
                <div className='container bg-danger text-light border rounded p-3 shadow-sm'>
                  <h4>Total Medicine product</h4>
                  <h5>
                    {element.medicine_product_count}
                  </h5>
                </div>
              </Link>

              <Link to="/addbeauty" className='text-decoration-none text-dark m-2' style={{ width: '18vw' }}>
                <div className='container bg-primary text-light border rounded p-3 shadow-sm'>
                  <h4>Total Beauty product</h4>
                  <h5>
                    {element.beauty_product_count}
                  </h5>
                </div>
              </Link>

              <Link to="/addwellness" className='text-decoration-none text-dark m-2' style={{ width: '18vw' }}>
                <div className='container bg-warning text-light border rounded p-3 shadow-sm'>
                  <h4>Total Wellness product</h4>
                  <h5>
                    {element.wellness_product_count}
                  </h5>
                </div>
              </Link>

            </div>
            <Link to="/order" className='text-decoration-none text-dark m-2' style={{ width: '19.5vw' }}>
              <div className='container bg-info text-light border rounded p-3 shadow-sm'>
                <h4>Total Orders</h4>
                <h5>
                  {element.order_count}
                </h5>
              </div>
            </Link>
          </div>

        })}
      </div>

    </div>
  )
}

export default DashBoard
