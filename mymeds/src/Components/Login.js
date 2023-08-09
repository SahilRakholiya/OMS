import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import swal from 'sweetalert'
import isEmail from 'validator/lib/isEmail'
import validator from 'validator'

const Login = (props) => {

  useEffect(() => {
    document.title = "MyMeds - Login"
    // eslint-disable-next-line
  }, [])

  let navigate = useNavigate()

  const [userdata, setUserdata] = useState({ email: "", password: "" })

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userdata
    const response = await fetch("http://localhost:5000/user/login", {
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
      navigate("/");
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

  const onChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value })
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
    <div>
      <p className='container'>MyMeds.com &gt; Login</p>
      <div className="container my-2 w-50 ">

        <div className="row">
          <div className="col">
            <img src="./images/login.jpg" alt="login" className='login-img' />
          </div>
          <div className="col">
            <h1>Login</h1>
            <form >
              <div className="form-group pt-3">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="text" className="form-control" id="email" name='email' onChange={onChangeemail} aria-describedby="emailHelp" placeholder="Enter Email" required />
                {emailerror ? <span className='text-danger'>Not Valid Email</span> : ""}
              </div>
              <div className="form-group pt-3">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" name='password' onChange={onChangepassword} placeholder="Enter Password" required />
                {passworderror ? <span className='text-danger'>Not Valid password , password length must be 6 </span> : ""}
              </div>


            </form>
            <div className="d-flex pt-4 justify-content-between">
              <Link to='/forgotpassword' className='text-primary border-0 bg-white text-decoration-none'> Forgot password?</Link>

              <Link to='/signup' style={{ textDecoration: 'none' }}>SignUp</Link>
            </div>
            <div className="container text-center my-5">
              <button type="submit" className="btn btn-secondary" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Login
