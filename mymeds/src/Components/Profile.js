import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import swal from 'sweetalert'
const Profile = (props) => {
    let navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('oid');
        localStorage.removeItem('rzp_device_id');
        localStorage.removeItem('rzp_checkout_anon_id');
        navigate('/')
        swal({
            text: "You are log out",
            icon: "warning",
            buttons: false,
            timer: 1500
        });
    }

    const [profiledata, setProfiledata] = useState({ name: "", email: "", phone_number: "", address: "", pincode: "", state: "", city: "" })

    const getuserdata = async () => {

        const response = await fetch(`http://localhost:5000/user/searchdata/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token':localStorage.getItem('token')
            }
        });
        const respo = await response.json()
        setProfiledata(respo)
    }

    useEffect(() => {
        getuserdata()
        // eslint-disable-next-line
    }, [])

    const prodata = (e) => {
        setProfiledata({ ...profiledata, [e.target.name]: e.target.value })
    }

    const [uaddress, setUaddress] = useState([])

    let id = localStorage.getItem('id')

    const editaddress = async (id, address, pincode, state, city, email, phone_number) => {
        const response = await fetch(`http://localhost:5000/user/updateaddress/${id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ address, pincode, state, city, email, phone_number }),
        })
        const json = await response.json();
        let newaddress = JSON.parse(JSON.stringify(uaddress))
        if (json.success === false) {
            swal({
                text: "Profile Not update",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        } else {
            for (let index = 0; index < uaddress.length; index++) {
                const element = uaddress[index];
                if (element._id === id) {
                    newaddress[index].email = email
                    newaddress[index].phone_number = phone_number
                    newaddress[index].address = address
                    newaddress[index].pincode = pincode
                    newaddress[index].state = state
                    newaddress[index].city = city
                    break;
                }
            }
            swal({
                text: "Profile Update Successfully",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        }
        setUaddress(newaddress);
    }
    const ref = useRef(null)

    const refClose = useRef(null)

    const [u_address, setU_address] = useState({ id: "", eaddress: "", epincode: "", estate: "", ecity: "", eemail: "", ephone: '' })

    const handleupdate = () => {
        ref.current.click()
        setU_address({ id: localStorage.getItem('id'), eaddress: profiledata.address, epincode: profiledata.pincode, estate: profiledata.state, ecity: profiledata.city, eemail: profiledata.email, ephone: profiledata.phone_number })
    }


    const handleToClick = (e) => {
        editaddress(u_address.id, u_address.eaddress, u_address.epincode, u_address.estate, u_address.ecity, u_address.eemail, u_address.ephone)
        refClose.current.click()

    }

    const onChange = (e) => {
        setU_address({ ...u_address, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container">
                <p>MyMeds.com &gt; Profile</p>
                <h2>My Profile</h2>
                <div className="row">
                    <div className="col-8">
                        <form className='container'>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" onChange={prodata} id="name" value={profiledata.name} name='name' aria-describedby="username" placeholder="Enter Usename" readOnly />
                            </div>
                            <div className="form-group pt-3">
                                <label htmlFor="emial">Email address</label>
                                <input type="text" className="form-control" onChange={prodata} id="email" value={profiledata.email} name='email' aria-describedby="emailHelp" placeholder="example : xyz@gmail.com" readOnly />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="phoneno">Phone NO.</label>
                                <input type="text" className="form-control" onChange={prodata} id="phoneno" value={profiledata.phone_number} name='phoneno' aria-describedby="emailHelp" placeholder="example : xyz@gmail.com" readOnly />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" onChange={prodata} id="address" value={profiledata.address} name='address' placeholder="Address" readOnly />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="pincode">Pincode</label>
                                <input type="text" className="form-control" onChange={prodata} id="pincode" value={profiledata.pincode} name='pincode' placeholder="pincode" readOnly />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="state">State</label>
                                <input type="text" className="form-control" onChange={prodata} id="state" value={profiledata.state} name='state' placeholder="State" readOnly />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control" onChange={prodata} id="city" value={profiledata.city} name='city' placeholder="City" readOnly />
                            </div>
                        </form>
                    </div>
                    <div className="col-4">
                        <div className="container text-center my-4">
                            <button type="submit" className="btn btn-light border shadow-sm w-50" onClick={handleupdate}>Edit Profile</button>
                        </div>
                        <div className="container text-center my-4">
                            <button className='btn btn-warning w-25 border shadow-sm w-50' onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>


                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Profile</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="eemail" name="eemail" value={u_address.eemail} onChange={onChange} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Phone No.</label>
                                        <input type="text" className="form-control" id="ephone" name="ephone" value={u_address.ephone} onChange={onChange} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="eaddress" name="eaddress" value={u_address.eaddress} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pincode" className="form-label">Pincode</label>
                                        <input type="text" className="form-control" id="epincode" name="epincode" value={u_address.epincode} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text" className="form-control" id="estate" name="estate" value={u_address.estate} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" id="ecity" name="ecity" value={u_address.ecity} onChange={onChange} required />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <Link to='/' type="button" className="btn btn-primary" onClick={handleToClick}>Update</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
