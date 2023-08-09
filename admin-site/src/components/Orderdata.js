import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../style.css'
import { useNavigate } from 'react-router-dom'

const Orderdata = () => {

    const [order, setOrder] = useState([])

    let uid = localStorage.getItem('id')
    let oid = localStorage.getItem('oid')

    function handelorder() {
        axios.get(`http://localhost:5000/order/displayOrderAllData/${oid}`,{
            headers:{
                'auth-token':localStorage.getItem('token')
              }
        })
            .then((res) => {
                setOrder(res.data)
            })
            .catch((error) => console.log(error))
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('id')) {
            navigate('/')
        } else {
            handelorder()
        }
    }, [])

    return (
        <div>
            <div className="container">
                <h2>Orders</h2>
                <div className="scrollbar-order">
                    <div className="container">

                        {order.map((odata) => {
                            return odata.orders.map((o) => {
                                return <div className="my-3" key={o._id}>
                                    <div className="d-flex border rounded bg-light">
                                        <div className="p-3">
                                            <img src={"http://127.0.0.1:8887/" + o.image_name} alt="" className='img rounded my-2' style={{ height: "30vh" }} />
                                        </div>
                                        <div className="fs-5 m-5 p-4">
                                            <h5> {o.medicine_name === undefined && o.beauty_product_name === undefined ? o.wellness_product_name : o.wellness_product_name === undefined && o.beauty_product_name === undefined ? o.medicine_name : o.beauty_product_name}</h5>
                                            <span>Category : {o.beauty_category === undefined && o.wellness_category !== undefined ? o.wellness_category : o.wellness_category === undefined && o.beauty_category !== undefined ? o.beauty_category : o.medicine_name !== '' ? 'No category' : 'xyz'} </span><br />
                                            <span>Price : <span>₹ {o.amount}</span> </span><br />
                                            <span>Quantity : {o.quantity}</span><br />
                                            <span>Company : {o.company}</span><br />
                                            {/* <button className='btn btn-warning my-4'>Buy it Again</button>
                                    <span className='text-primary p-3 fs-6'>Cancel order</span> */}
                                        </div>
                                    </div>

                                </div>
                            })
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Orderdata

