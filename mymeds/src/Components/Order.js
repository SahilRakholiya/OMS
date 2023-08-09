import React, { useState, useEffect } from 'react'
import OrderCard from './Card/OrderCard'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import swal from 'sweetalert';

const Order = () => {

    let navigate = useNavigate();

    useEffect(() => {
        document.title = "MyMeds - Order"
        if (!localStorage.getItem('token')) {
            navigate('/login')
        } else {
            displayorder()
        }
        // eslint-disable-next-line
    }, [])

    const [order, setOrder] = useState([])

    let uid = localStorage.getItem('id')

    function displayorder() {
        axios.get(`http://localhost:5000/order/displayOrder/${uid}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
            .then((response) => {
                setOrder(response.data)
            })
            .catch((error) => console.log(error))
    }

    const cancel = async (id) => {
        const response = await fetch(`http://localhost:5000/order/cancel/${id}`,{
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })

        const resp = await response.json()
        if (resp.success === false) {
            swal({
                text: resp.message,
                icon: "error",
                buttons: false,
                timer: 1500
            });
        } else {
            displayorder()
        }
    }

    return (
        <>
            <div className='container'>
                <p>MyMeds.com &gt; Order</p>
                <div className="d-flex justify-content-between">
                    <h2 >Your Order</h2> <Link to='/cancelorder' className='text-decoration-none mx-3 fs-5 p-2'>Cancelled Orders</Link>
                </div>
                <div className="row">
                    {order.map((orderdata) => {
                        return <OrderCard key={orderdata._id} orderdata={orderdata} cancel={cancel} />
                    })}
                </div>
            </div>
            <Footer />
        </>


    )
}

export default Order
