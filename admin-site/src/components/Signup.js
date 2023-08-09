import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import isEmail from 'validator/lib/isEmail'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
const Signup = () => {

    const [userdata, setUserdata] = useState({ name: '', email: '', password: '', phone_number: '' })
    const [emailerror, setEmailerror] = useState(false)
    const [passworderror, setPassworderror] = useState(false)
    const [nameerror, setNameerror] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('id')) {
            navigate('/')
        }
    }, [])

    function onChangeemail(e) {
        let item = e.target.value;
        if (isEmail(item)) {
            setEmailerror(false)
        } else {
            setEmailerror(true)
        }
        setUserdata({ ...userdata, email: item })
    }
    function onChangename(e) {
        let item = e.target.value;
        if (item.length < 3 || item.length === 0) {
            setNameerror(true)
        } else {
            setNameerror(false)
        }
        setUserdata({ ...userdata, name: item })
    }

    function onChangepassword(e) {
        let item = e.target.value
        if (validator.isEmpty(item) || item.length < 6) {
            setPassworderror(true)
        } else {
            setPassworderror(false)
        }
        setUserdata({ ...userdata, password: item })
    }
    const [otp, setOtp] = useState("")
    const [otperror, setOtperror] = useState(false)
    const otpchange = (e) => {
        let item = e.target.value;
        if (item == otp && !validator.isEmpty(item)) {
            setOtperror(false)
        } else {
            setOtperror(true)
        }
    }

    const verifyotp = async () => {
        const respones = await fetch('http://localhost:5000/email/otp/' + userdata.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await respones.json()
        setOtp(json.otp)
    }
    const [phoneerror, setPhoneerror] = useState(false)

    function onChangephone(e) {
        let item = e.target.value;
        if (isNaN(item) || item.length < 10 || item.length > 10) {
            setPhoneerror(true)
        } else {
            setPhoneerror(false)
        }
        setUserdata({ ...userdata, phone_number: item })
    }

    const insert = async (e) => {
        const { name, email, password, phone_number } = userdata;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/admin/insertAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, phone_number })
        });

        const json = await response.json()
        console.log(json);
        if (!json.success === false) {
            swal({
                text: "Your Account Created",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        } else {
            swal({
                text: "Please Try again",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        }

    }

    return (
        <div className='container bg-light border rounded shadow p-3' style={{ width: '35vw', marginTop: '20vh' }}>
            <h2 className='text-center'>Create New Admin</h2>
            <form className='container'  >
                <div className="form-group pt-3">
                    <label htmlFor="exampleInputEmail1" >Username</label>
                    <input type="text" className="form-control bg-transparent" id="name" name='name' onChange={onChangename} aria-describedby="emailHelp" placeholder="Enter Usename" />
                    {nameerror ? <span className='text-danger'>Not Valid Username</span> : ""}
                </div>
                <div className="form-group pt-3" >
                    <label htmlFor="exampleInputEmail1" >Email</label>
                    <input type="text" className="form-control bg-transparent" id="email" name='email' onChange={onChangeemail} aria-describedby="emailHelp" placeholder="Enter Email" />
                    <span className="text-primary" style={{ cursor: 'pointer' }} onClick={verifyotp}>Send OTP</span>
                    {emailerror ? <span className='text-danger mx-3'>Not Valid Email</span> : ""}
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="otp">OTP</label>
                    <input type="text" className="form-control bg-transparent" onChange={otpchange} id="otp" name='otp' placeholder="OTP" />
                    {otperror ? <span className='text-danger'>OTP NOT VALID</span> : ""}
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="exampleInputPassword1" >Password</label>
                    <input type="password" className="form-control bg-transparent" id="password" name='password' onChange={onChangepassword} placeholder="Enter Password" />
                    {passworderror ? <span className='text-danger'>Not Valid password , password length must be 6 </span> : ""}
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="phone-number">Phone No.</label>
                    <input type="text" className="form-control bg-transparent" onChange={onChangephone} id="phone_number" name='phone_number' placeholder="Phone No." />
                    {phoneerror ? <span className='text-danger'>Not Valid phone number , phone number must be 10 digits </span> : ""}
                </div>
                <div className="d-flex justify-content-between my-3">
                    <button className='btn btn-secondary' onClick={insert}>Insert</button>
                    <Link to="/alladmin" className='text-decoration-none'>View All Admin</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
