import React, { useState, useEffect } from 'react'
import OrderCard from '../card/OrderCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style.css'
import swal from 'sweetalert';
const Order = () => {

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('id')) {
      navigate('/')
    } else {

      displayorder()
    }
    // eslint-disable-next-line
  }, [])

  const [order, setOrder] = useState([])

  function displayorder() {
    axios.get(`http://localhost:5000/order/displayAllUserOrder`, {
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
      .then((response) => {
        setOrder(response.data)
        console.log(response.data)
      })
      .catch((error) => console.log(error))
  }

  const dispatch = async (oid) => {
    const reponse = await fetch(`http://localhost:5000/order/dispatch/${oid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      }
    })
    const resp = await reponse.json()
    if (resp.success === false) {
      swal({
        text: resp.message,
        icon: "warning",
        buttons: false,
        timer: 1500
      });
    } else {
      if (resp.success === true) {
        swal({
          text: resp.message,
          icon: "success",
          buttons: false,
          timer: 1500
        });
      } else {
        swal({
          text: resp.message,
          icon: "success",
          buttons: false,
          timer: 1500
        });
        axios.get(`http://localhost:5000/email/dispatch/${oid}`, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        })
          .then((reponse) => {
            console.log(reponse)
          }).catch((error) => { console.log(error) })
      }
    }

    displayorder()
  }

  const deliveryotp = (oid) => {
    axios.get(`http://localhost:5000/email/orderotp/${oid}`, {
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
      .then((reponse) => {
        if (reponse.data.success === false) {
          swal({
            text: "Order not dispatch",
            icon: "warning",
            buttons: false,
            timer: 1500
          });
        } else {
          if (reponse.data.success === true) {
            swal({
              text: "OTP already send",
              icon: "success",
              buttons: false,
              timer: 1500
            });
          } else {
            swal({
              text: 'OTP send successfuly',
              icon: "success",
              buttons: false,
              timer: 1500
            });
          }
        }
      }).catch((error) => { console.log(error) })
  }

  const [data, setdata] = useState({ username: '' })
  const [searchdata, setsearchdata] = useState([])

  const searchChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
    search(data.username)
  }

  const search = async (uname) => {
    const reponse = await fetch('http://localhost:5000/order/search/' + uname, {
      method: "GET",
      headers: {
        'Content-Type': 'applicatoin/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await reponse.json()
    if (json.success === false) {
      swal({
        text: json.message,
        icon: "warning",
        buttons: false,
        timer: 1500
      });
    } else {
      setsearchdata(json)
    }
  }

  function handledata() {
    searchdata.length = 0
    displayorder()
  }

  return (
    <>
      <div className='container'>
        <h2 >Order</h2>
        <div className="row">
          <div className="col-12  d-flex">
            <div className="input-group w-50 border-color">
              <input type="text" className="form-control form-input" aria-label="Amount (to the nearest dollar)" id='username' name='username' onChange={searchChange} placeholder='Search Username...' />
            </div>
            <button className='btn mx-3 btn-outline-secondary shadow-sm' onClick={handledata}>All Data</button>
          </div>
        </div>
        <div className="scrollbar-order" style={{ marginTop: '10px' }} >
          <div style={{ marginRight: '15px' }}>
            {searchdata.length === 0 ? order.map((orderdata) => {
              return <OrderCard key={orderdata._id} orderdata={orderdata} dispatch={dispatch} deliveryotp={deliveryotp} />
            }) : searchdata.map((orderdata) => {
              return <OrderCard key={orderdata._id} orderdata={orderdata} dispatch={dispatch} deliveryotp={deliveryotp} />
            })}
          </div>
        </div>

      </div>
    </>


  )
}

export default Order
