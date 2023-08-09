import React, { useState } from 'react'
import ProtContext from './ProtContext'
import swal from 'sweetalert'

const ProtState = (props) => {

    const [medicine_product, setMedicine_product] = useState([])

    const displayMedicine = async () => {
        const respons = await fetch("http://localhost:5000/medicine/displayClient", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {
            // document.getElementById('beau').text = 'No Data Found'
        } else {
            setMedicine_product(resp)
        }
    }

    const [beauty_product, setBeauty_product] = useState([])

    const dispalyBeauty = async () => {
        const respons = await fetch("http://localhost:5000/beautyproduct/displayClient", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {

        } else {
            setBeauty_product(resp)
        }
    }

    const [wellness_product, setWellness_product] = useState([])

    const displayWellness = async () => {
        const respons = await fetch("http://localhost:5000/wellnessproduct/displayClient", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await respons.json()
        if (resp.success === false) {
            // document.getElementById('beau').text = 'No Data Found'
        } else {
            setWellness_product(resp)
        }

    }

    // cart 
    // add to cart 
    let id = localStorage.getItem('id')

    const addtocart = async (p_id) => {
        if (!localStorage.getItem('id')) {
            swal({
                text: "You are not login",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        } else {
            const respones = await fetch("http://localhost:5000/cart/insert/" + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')

                },
                body: JSON.stringify({ p_id })
            })
            const json = await respones.json()

            if (json.success === false) {
                swal({
                    text: "You are not login",
                    icon: "error",
                    buttons: false,
                    timer: 1500
                });
            } else {
                console.log(json)
                swal({
                    text: "Product added in Cart ,Check Cart",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
            }
        }

    }

    const [cart_data, setCate_data] = useState([])
    const displaycart = async () => {
        const respones = await fetch("http://localhost:5000/cart/display/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            }
        })
        const respo = await respones.json()
        if (respo.success === false) { } else {
            const data = respo
            console.log(data)
            setCate_data(data)
        }
    }

    const deletecart = async (bid) => {
        const respones = await fetch(`http://localhost:5000/cart/delete/${id}/` + bid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            }
        })
        respones.json()
        const newcartdata = cart_data.filter((cartdata) => { return cartdata._id !== id })
        setCate_data(newcartdata)
        displaycart()
    }

    const increment = async (bid) => {
        const respones = await fetch(`http://localhost:5000/cart/incrementQuantity/${id}/` + bid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            }
        })
        respones.json()
        displaycart()
    }
    const decrement = async (bid) => {
        const respones = await fetch(`http://localhost:5000/cart/decrementQuantity/${id}/` + bid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        })
        const res = await respones.json()
        if (res.success === false) {

        } else {
            displaycart()
        }
    }

    const [searchpro, setsearchpro] = useState([])

    const searchproduct = async (pname) => {
        const response = await fetch('http://localhost:5000/homepage/searchData/' + pname, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (json.success === false) {
            swal({
                text: "Product Not Found",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        } else {
            setsearchpro(json.all_data)
            console.log(json.all_data)
        }
    }

    return (
        <ProtContext.Provider value={{ searchproduct, searchpro, medicine_product, displayMedicine, beauty_product, dispalyBeauty, wellness_product, displayWellness, addtocart, cart_data, displaycart, deletecart, increment, decrement }}>
            {props.children}
        </ProtContext.Provider>
    )
}

export default ProtState
