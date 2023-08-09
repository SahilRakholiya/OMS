import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import CancelOrderCard from './Card/CancelOrderCard'
import axios from 'axios'

const CancelOrder = () => {

    const [data, setdata] = useState([])

    const uid = localStorage.getItem('id')

    useEffect(() => {
        displaycancel()
    }, [])

    const displaycancel = () => {
        axios.get(`http://localhost:5000/order/cancelOrderDisplay/${uid}`
            , {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            .then((resp) => {
                console.log(resp.data)
                setdata(resp.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="container">
                <p>MyMeds.com &gt; Order &gt; Cancelled Orders</p>
                <h2>Cancelled Orders</h2>

                <div className="row">
                    {data.map((orderdata) => {
                        return <CancelOrderCard key={orderdata._id} orderdata={orderdata} />
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CancelOrder
