import React, { useState } from 'react'
import swal from 'sweetalert';
import validator from 'validator';
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [userdata, setUserdata] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = userdata
        const response = await fetch("http://localhost:5000/admin/loginAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save token and redirect 
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem('id', json.id)
            navigate('/dashboard')
            swal({
                text: "Successfully Login",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        } else {
            swal({
                text: "Not Login Try Again",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        }
    }

    const [emailerror, setEmailerror] = useState(false)
    const [passworderror, setPassworderror] = useState(false)

    function onChangeemail(e) {
        let item = e.target.value;
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

    return (
        <div className='container bg-light border rounded shadow p-3' style={{ width: '35vw',marginTop:'20vh'}}>
            <h2 className='text-center'>Admin Login</h2>
            <form className='container'>
                <div className="form-group pt-3">
                    <label htmlFor="exampleInputEmail1" className='my-2'>Email</label>
                    <input type="text" className="form-control bg-transparent" id="email" name='email' onChange={onChangeemail} aria-describedby="emailHelp" placeholder="Enter Email"  />
                    {emailerror ? <span className='text-danger'>Not Valid Email</span> : ""}
                </div>
                <div className="form-group pt-3">
                    <label htmlFor="exampleInputPassword1" className='my-2'>Password</label>
                    <input type="password" className="form-control bg-transparent" id="password" name='password' onChange={onChangepassword} placeholder="Enter Password"/>
                    {passworderror ? <span className='text-danger'>Not Valid password , password length must be 6 </span> : ""}
                </div>
                <div className="my-3">
                    <button className='btn btn-secondary' onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
