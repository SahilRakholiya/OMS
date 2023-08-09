import React, { useEffect, useState } from 'react'
import UserCard from '../card/UserCard'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  const getusers = async () => {
    const respons = await fetch("http://localhost:5000/user/display", {
      method: 'GET',
      headers: {
        'Context-Type': 'application/json',

        'auth-token': localStorage.getItem('token')
      }

    })
    const respo = await respons.json()
    if (respo.success === false) {

    } else {
      setUsers(respo);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('id')) {
      navigate('/')
    } else {
      getusers()
    }
    // eslint-disable-next-line
  },)

  const [search, setSearch] = useState([])
  const [emailsearch, setEmailsearch] = useState({ email: '' })
  const changesearch = (e) => {
    setEmailsearch({ ...emailsearch, [e.target.name]: e.target.value })
    searchpro(emailsearch.email)
  }
  const searchpro = async (email) => {
    const response = await fetch('http://localhost:5000/user/search/' + email, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      }
    })
    const resp = await response.json()
    if (resp.success === false) {
      swal({
        text: "User Not Found",
        icon: "warning",
        buttons: false,
        timer: 1500
      });
    } else {
      setSearch(resp)
      getusers()
    }
  }

  const handledata = () => {
    search.length = 0;
    getusers()
  }

  return (
    <div className='container my-2'>
      <h2>All Users</h2>
      <div className="row">
        <div className="col-12  d-flex">
          <div className="input-group w-50 border-color">
            <input type="text" className="form-control form-input" aria-label="Amount (to the nearest dollar)" onChange={changesearch} id='email' name='email' placeholder='Search Email...' />
          </div>
          <button className='btn mx-3 btn-outline-secondary shadow-sm' onClick={handledata} >All Data</button>
        </div>
      </div>

      <div className="row my-2">
        {search.length === 0 ? users.length === 0 ? 'No data found' : users.map((user) => {
          return <div className="col-md-4" key={user._id}><UserCard user={user} /></div>
        }) : search.map((user) => {
          return <div className="col-md-4" key={user._id}><UserCard user={user} /></div>
        })}
      </div>

    </div>
  )
}

export default Users
