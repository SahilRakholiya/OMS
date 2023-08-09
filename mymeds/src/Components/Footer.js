import React from 'react'
import './style/style.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="container my-5 d-flex">
                <div className="con d-flex ">
                    <h3>MyMeds</h3><span className='span py-2'>.com</span>
                    <p style={{paddingLeft:'170px'}}>MyMeds.com is one of India’s most trusted pharmacies, dispensing quality medicines at reasonable prices to over 7 million happy customers – PAN India. <br/>24*7 available for your Health</p>
                </div>
            </div>
            <div className="container my-5">
                <hr />
                <div className="container justify my-5 d-block p-0">
                    <h5 className='font-weight-bold'>OUR PAYMENT PARTNERS</h5>
                    <div className='d-flex '>
                        <span ><img className='img-foot' src="./payment/gpay.png" style={{paddingLeft:'0'}} alt="gpay" /></span>
                        <img className='img-foot' src="./payment/phone.png" alt="phonepe" />
                        <img className='img-foot' src="./payment/paypal.png" alt="paypal" />
                        <img className='img-foot' src="./payment/paytm.png" alt="paytm" />
                        <img className='img-foot' src="./payment/master.png" alt="master" />
                        <img className='img-foot' src="./payment/visa.png" alt="visa" />
                    </div>
                </div>

                <p className='mb-3'></p>
                <hr />
                <ul className='footer-menu'>
                    <li><a href="/medicine">Medicine</a></li>
                    <li><a href="/wellness">Wellness</a></li>
                    <li><a href="/beauty">Beauty</a></li>
                    <li><a href="/healthcornar">Health</a></li>
                    <li><p>Developed in 2023</p></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
