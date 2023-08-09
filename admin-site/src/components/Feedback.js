import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"
import swal from 'sweetalert'
import FeedCard from '../card/FeedCard'
import { useNavigate } from 'react-router-dom'

const Feedback = () => {
    const navigate = useNavigate()

    const [feedback, setFeedback] = useState([])

    function display() {
        axios.get('http://localhost:5000/feedback/display', {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
            .then((resp) => {
                if (resp.data.success == false) {
                } else {
                    setFeedback(resp.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const [search, setSearch] = useState([])
    const [emailsearch, setEmailsearch] = useState({ username: '' })
    const changesearch = (e) => {
        setEmailsearch({ ...emailsearch, [e.target.name]: e.target.value })
        searchpro(emailsearch.username)
    }
    const searchpro = async (username) => {
        const response = await fetch('http://localhost:5000/feedback/search/' + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const resp = await response.json()
        if (resp.success === false) {
            swal({
                text: "Feedback Not Found",
                icon: "warning",
                buttons: false,
                timer: 1500
            });
        } else {
            setSearch(resp)
            display()
        }
    }

    const handledata = () => {
        search.length = 0;
        display()
    }

    useEffect(() => {
        if (!localStorage.getItem('id')) {
            navigate('/')
        } else {
            display()
        }
    }, [])

    return (
        <div>
            <div className="container">
                <h2>Feedback Details</h2>
                <div className="row">
                    <div className="col-12  d-flex">
                        <div className="input-group w-50 border-color">
                            <input type="text" className="form-control form-input" aria-label="Amount (to the nearest dollar)" onChange={changesearch} id='username' name='username' placeholder='Search Username...' />
                        </div>
                        <button className='btn mx-3 btn-outline-secondary shadow-sm' onClick={handledata} >All Data</button>
                    </div>
                </div>

                <div className="row my-2">
                    {search.length === 0 ? feedback.map((feed) => {
                        return <div className="col-md-4" key={feed._id}> <FeedCard key={feed._id} feed={feed} /></div>
                    }) : search.map((feed) => {
                        return <div className="col-md-4" key={feed._id}> <FeedCard key={feed._id} feed={feed} /></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Feedback
