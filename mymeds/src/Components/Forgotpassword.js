import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import swal from 'sweetalert'
import validator from 'validator'
import isEmail from 'validator/lib/isEmail'

const Forgotpassword = (props) => {

    const [userdata, setUserdata] = useState({ email: "", password: "" })

    const [data, setdata] = useState([])

    const [emailerror, setEmailerror] = useState(false)
    const [otperror, setOtperror] = useState(false)
    const [passworderror, setPassworderror] = useState(false)
    const [error, setError] = useState(false)

    let navigate = useNavigate()
    const forgotpass = async (e) => {
        e.preventDefault()
        const { email, password } = userdata
        if (otperror === true || emailerror === true || passworderror=== true || email.length===0|| password.length===0) {
            setError(true)
        } else {
            setError(false)
            console.log(email)
            const response = await fetch("http://localhost:5000/user/update/" + email, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({ password }),
            })

            const newpass = await JSON.parse(JSON.stringify(data))
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.email === email) {
                    newpass[index] = password
                    break;
                }
            }
            setdata(newpass)
            const json = await response.json()

            if (json.success) {
                navigate('/')
                swal({
                    text: "Password Forget Successfully",
                    icon: "success",
                    buttons:false,
                    timer:1500
                  });
            } else {
                swal({
                    text: "Password Not Forget",
                    icon: "error",
                    buttons:false,
                    timer:1500
                  });
            }
        }


    }

    function onChangeemail(e) {
        let item = e.target.value
        if (isEmail(item)) {
            setEmailerror(false)
        } else {
            setEmailerror(true)
        }
        setUserdata({ ...userdata, email: item })
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

    const verifyotp = async () => {
        const respones = await fetch('http://localhost:5000/email/forgetpassotp/' + userdata.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await respones.json()
        setOtp(json.otp)
    }

    const otpchange = (e) => {
        let item = e.target.value;
        if (item == otp && !validator.isEmpty(item)) {
            setOtperror(false)
        } else {
            setOtperror(true)
        }
    }

    return (
        <>
            <div className='container'>
                <p>MyMeds.com &gt; Login &gt; forgotpassword</p>
                <form className='container w-50'>
                    <h3 className='Forgot Password'>Forgot Password</h3>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={onChangeemail} aria-describedby="emailHelp" placeholder="Enter Email : xyz@gmail.com" required />
                        <span className='text-primary' style={{ cursor: 'pointer' }} onClick={verifyotp}>Send OTP</span>
                        {emailerror ? <span className='text-danger mx-3'>Not Valid Email</span> : ""}
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1">OTP</label>
                        <input type="text" className="form-control" id="otp" name='otp' onChange={otpchange} aria-describedby="emailHelp" placeholder="Enter OTP" required />
                        {otperror ? <span className='text-danger'>Not Valid OTP</span> : ""}
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChangepassword} placeholder="Password" required />
                        {passworderror ? <span className='text-danger'>Not Valid password , password length must be 6 </span> : ""}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className='btn btn-warning shadow' onClick={forgotpass}>Forgot Password</button>
                        <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
                    </div>
                    {error ? <span className='text-danger'>Invalid Credential </span> : ""}

                </form>
            </div>
            <Footer />
        </>
    )
}

export default Forgotpassword
