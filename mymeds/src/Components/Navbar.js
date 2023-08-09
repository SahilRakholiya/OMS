import React, { useContext, useState } from 'react'
import './style/style.css'
import { Link, useNavigate } from 'react-router-dom'
import ProtContext from '../context/productdata/ProtContext'
const Navbar = () => {
    let navigate = useNavigate()
    const [searchdata, setSearchdata] = useState({ pname: '' })

    const changesearch = (e) => {
        setSearchdata({ ...searchdata, [e.target.name]: e.target.value })
        searchproduct(searchdata.pname)
    }

    const context = useContext(ProtContext)
    const { searchproduct } = context

    return (
        <div>

            <nav className="navbar">
                <div className="nav">
                    <div className="navbar-logo-search">
                        <Link to="/" className="logo">MyMeds</Link>
                        <input type='text' className='inputbox' id='pname' name="pname" onChange={changesearch} placeholder='Search for medicine & wellness products...' />
                        <ul className='nav-item'>
                            <li><Link className='links' to="/order"><img className='icons' src="./icon/shopping-bag.png" alt="" /> Order</Link></li>
                            <li><Link className='links' to="/cart"><img className='icons' src="./icon/shopping-cart.png" alt="" /> Cart</Link></li>
                            {!localStorage.getItem('token') ? <li><Link className='links' to="/login"><img className='icons' src="./icon/user.png" alt="" /> Login/Sign up</Link></li> :
                                <li><button className='bg-transparent border-0'><Link className='links' to="/profile"><img className='icons' src="./icon/user.png" alt="" /> Profile</Link></button></li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="nav-menu">

                <ul className='menu-item'>
                    <li className='list-menu'>
                        <Link to="/medicine" className='text-decoration-none text-white'>
                            <img src="./icon/medicline.png" alt="" style={{ height: '40px', width: '40px' }} />    Medicine</Link>
                    </li>

                    <li className='list-menu'>
                        <Link to="/wellness" className='text-decoration-none text-white'>
                            <img src="./icon/wellness.png" alt="" style={{ height: '40px', width: '40px' }} />   Wellness</Link>
                    </li>

                    <li className='list-menu'>
                        <Link to="/beauty" className='text-decoration-none text-white'>
                            <img src="./icon/beauty.png" alt="" style={{ height: '40px', width: '40px' }} />  Beauty</Link>
                    </li>
                    <li className='list-menu'>
                        <Link to="/healthcornar" className='text-decoration-none text-white'>
                            <img src="./icon/health.png" alt="" style={{ height: '40px', width: '40px' }} />  Health Corner</Link>
                    </li>
                </ul>
            </div>


        </div>
    )
}

export default Navbar
