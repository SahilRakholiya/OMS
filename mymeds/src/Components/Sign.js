import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import validator from 'validator'
import isEmail from 'validator/lib/isEmail'
import swal from 'sweetalert'
const Sign = (props) => {
    let navigate = useNavigate()
    const [userdata, setUserdata] = useState({ name: "", email: "", password: "", otp: "", phone_number: "", address: "", pincode: "", state: "", city: "" })

    useEffect(() => {
        document.title = "MyMeds - SignUp"
    }, [])

    const [error, setError] = useState(false)
    const [otperror, setOtperror] = useState(false)
    const [nameerror, setNameerror] = useState(false)
    const [emailerror, setEmailerror] = useState(false)
    const [passworderror, setPassworderror] = useState(false)
    const [phoneerror, setPhoneerror] = useState(false)
    const [addresserror, setAddresserror] = useState(false)
    const [stateerror, setStateerror] = useState(false)
    const [pinerror, setPinerror] = useState(false)
    const [cityerror, setCityerror] = useState(false)

    const handleSignup = async (e) => {
        const { name, email, password, phone_number, address, pincode, state, city } = userdata;
        e.preventDefault();
        if (otperror === true || nameerror === true || emailerror === true || passworderror === true || phoneerror === true || addresserror === true || stateerror === true || pinerror === true || cityerror === true ||name.length===0|| email.length===0|| password.length===0|| otp.length===0|| phone_number.length===0|| address.length===0||pincode.length===0|| state.length===0|| city.length===0) {
            setError(true)
        } else {
            setError(false)
            const response = await fetch("http://localhost:5000/user/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, phone_number, address, pincode, state, city })
            });

            const json = await response.json()
            console.log(json);
            if (json.success) {
                swal({
                    text: "Your Account Created",
                    icon: "success",
                    buttons:false,
                    timer:1500
                  });
            } else {
                swal({
                    text: "Please Try again",
                    icon: "error",
                    buttons:false,
                    timer:1500
                  });
            }
        }
    }

    function onChangename(e) {
        let item = e.target.value;
        if (item.length < 3 || !isNaN(item)) {
            setNameerror(true)
        } else {
            setNameerror(false)
        }
        setUserdata({ ...userdata, name: item })
    }

    const [otp, setOtp] = useState("")

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

    function onChangephone(e) {
        let item = e.target.value;
        if (isNaN(item) || item.length < 10 || item.length > 10) {
            setPhoneerror(true)
        } else {
            setPhoneerror(false)
        }
        setUserdata({ ...userdata, phone_number: item })
    }

    function onChangeaddress(e) {
        let item = e.target.value
        if (validator.isEmpty(item) || item.length < 15) {
            setAddresserror(true)
        } else {
            setAddresserror(false)
        }
        setUserdata({ ...userdata, address: item })
    }

    const otpchange = (e) => {
        let item = e.target.value;
        if (item == otp && !validator.isEmpty(item)) {
            setOtperror(false)
        } else {
            setOtperror(true)
        }
    }

    function onChangepin(e) {
        let item = e.target.value
        if (isNaN(item) || item.length < 6 || item.length > 6) {
            setPinerror(true)
        } else {
            setPinerror(false)
        }
        setUserdata({ ...userdata, pincode: item })
    }

    function onChangestate(e) {
        let item = e.target.value
        if (!isNaN(item) || item.length < 3) {
            setStateerror(true)
        } else {
            setStateerror(false)
        }
        setUserdata({ ...userdata, state: item })
    }

    function onChangecity(e) {
        let item = e.target.value
        if (!isNaN(item) || item.length < 3) {
            setCityerror(true)
        } else {
            setCityerror(false)
        }
        setUserdata({ ...userdata, city: item })
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

    return (
        <div>
            <p className='container'>MyMeds.com &gt; SignUp</p>
            <div className="container my-1 w-75">
                <h1 className='text-center'>Create Account</h1>
                <div className="row">
                    <div className="col text-end">
                        <img src="./images/signup.jpg" alt="signup" className='rounded' height={'700'} />
                    </div>
                    <div className="col">
                        <form className='w-75' onSubmit={handleSignup}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" onChange={onChangename} id="name" name='name' aria-describedby="username" placeholder="Enter Usename" />
                                {nameerror ? <span className='text-danger'>Not Valid Username</span> : ""}
                            </div>
                            <div className="form-group pt-3">
                                <label htmlFor="emial">Email address</label>
                                <input type="text" className="form-control" onChange={onChangeemail} id="email" name='email' aria-describedby="emailHelp" placeholder="example : xyz@gmail.com" />
                                <span className="text-primary" style={{ cursor: 'pointer' }} onClick={verifyotp}>Send OTP</span>
                                {emailerror ? <span className='text-danger mx-3'>Not Valid Email</span> : ""}
                            </div>
                            <div className="form-group pt-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" onChange={onChangepassword} id="password" name='password' placeholder="Password" />
                                {passworderror ? <span className='text-danger'>Not Valid password , password length must be 6 </span> : ""}
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="otp">OTP</label>
                                <input type="text" className="form-control" onChange={otpchange} id="otp" name='otp' placeholder="OTP" />
                                {otperror ? <span className='text-danger'>OTP NOT VALID</span> : ""}
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="phone-number">Phone No.</label>
                                <input type="text" className="form-control" onChange={onChangephone} id="phone_number" name='phone_number' placeholder="Phone No." />
                                {phoneerror ? <span className='text-danger'>Not Valid phone number , phone number must be 10 digits </span> : ""}

                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" onChange={onChangeaddress} id="address" name='address' placeholder="Address" />
                                {addresserror ? <span className='text-danger'>Not Valid Address , Address must be 15 character</span> : ""}

                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="pincode">Pincode</label>
                                <input type="text" className="form-control" onChange={onChangepin} id="pincode" name='pincode' placeholder="pincode" />
                                {pinerror ? <span className='text-danger'>Not Valid Pincode , Pincode must be 6 digits</span> : ""}
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="state">State</label>
                                <input type="text" className="form-control" onChange={onChangestate} id="state" name='state' placeholder="State" />
                                {stateerror ? <span className='text-danger'>Not Valid State</span> : ""}
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control" onChange={onChangecity} id="city" name='city' placeholder="City" />
                                {cityerror ? <span className='text-danger'>Not Valid City</span> : ""}
                            </div>

                            <div className="d-flex pt-4 justify-content-end">
                                <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
                            </div>
                            <div className="container text-center">
                                <button type="submit" className="btn btn-secondary">SignUp</button>
                            </div>
                            {error ? <span className='text-danger'>Invalid Credential</span> : ""}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Sign
