import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import OrderDataCard from './Card/OrderDataCard'

const Orderdata = () => {

    const [order, setOrder] = useState([])

    let oid = localStorage.getItem('oid')

    function handelorder() {
        axios.get(`http://localhost:5000/order/displayOrderAllData/${oid}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
            .then((res) => {
                setOrder(res.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        handelorder()
    }, [])

    return (
        <div>
            <div className="container" style={{ marginTop: '22vh' }}>
                <h2>All Product</h2>
                {order.map((odata) => {
                    return odata.orders.map((o) => {
                        return <div className="my-3" key={o._id}>
                            <OrderDataCard o={o} />
                        </div>
                    })
                })}
            </div>
            <Footer />
        </div >
    )
}

export default Orderdata

