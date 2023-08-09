import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OrderDataCard from './Card/OrderDataCard'

const Trackorder = () => {

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

    const [data, setData] = useState({ dispatch: '', otp: '' })

    const displayorder = async () => {
        const response = await fetch(`http://localhost:5000/order/displayOrderdata/${oid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            }
        })
        const json = await response.json()
        setData({ dispatch: json.dispatch, otp: json.otp })
        console.log(json)
    }

    let mystyle = {
        width: '0%'
    }

    if (data.dispatch === true && !data.otp) {
        mystyle = { width: '50%' }
    } else {
        if (data.otp === true) {
            mystyle = {
                width: '100%'
            }
        } else {
            mystyle = {
                width: '0%'
            }
        }
    }


    useEffect(() => {
        handelorder()
        displayorder()
    }, [])

    return (
        <div>
            <div className="container">
                <h2>TrackOrder</h2>

                <div className="progress" style={{ marginTop: '5vh' }}>
                    <div className="progress-bar" role="progressbar" style={mystyle} aria-valuemin="0" aria-valuemax="100">{mystyle.width}</div>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Order shipped</span>
                    <span>Order Dispatch</span>
                    <span>Delivery Done</span>
                </div>

                {order.map((odata) => {
                    return odata.orders.map((o) => {
                        return <div className="my-3" key={o._id}>
                            <OrderDataCard o={o} />
                        </div>
                    })
                })}

            </div>
        </div>
    )
}

export default Trackorder
