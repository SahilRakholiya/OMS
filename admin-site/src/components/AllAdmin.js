import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminCard from '../card/AdminCard'
import axios from 'axios'

const AllAdmin = () => {

    const navigate = useNavigate()

    const [admins, setAdmins] = useState([])
    useEffect(() => {
        if (!localStorage.getItem('id')) {
            navigate('/')
        }else{
            displayadmin()
        }
    }, [])

    const displayadmin = () => {
        axios.get('http://localhost:5000/admin/displayAdmin',{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        })
        .then((response)=>{setAdmins(response.data)})
        .catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className='container'>
            <h2>All Admin</h2>
            {/* <div className="row">
                <div className="col-12  d-flex">
                    <div className="input-group w-50 border-color">
                        <input type="text" className="form-control form-input" aria-label="Amount (to the nearest dollar)" onChange={changesearch} id='email' name='email' placeholder='Search Email...' />
                    </div>
                    <button className='btn mx-3 btn-outline-secondary shadow-sm' onClick={handledata} >All Data</button>
                </div>
            </div> */}

            <div className="row my-2">
                {/* {search.length === 0 ? users.length === 0 ? 'No data found' :  */}
                {admins.map((admin) => {
                    return <div className="col-md-4" key={admin._id}><AdminCard admin={admin} /></div>
                })}
                {/* {search.map((user) => {
                    return <div className="col-md-4" key={user._id}><UserCard user={user} /></div>
                }) */}

            </div>
        </div>
    )
}

export default AllAdmin