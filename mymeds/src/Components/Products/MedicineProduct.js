import React, { useContext, useEffect, useState } from 'react'
import MedicineCard from '../Card/MedicineCard'
import ProtContext from '../../context/productdata/ProtContext'
import swal from 'sweetalert'

const MedicineProduct = (props) => {
  const context = useContext(ProtContext)

  const { medicine_product, displayMedicine, addtocart } = context

  const [searchdata, setSearchdata] = useState([])
  const [searchQuery, setSearchQuery] = useState({ mname: "" });

  useEffect(() => {
    displayMedicine()
  }, [])

  const searchchange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value })
    fetchData(searchQuery.mname)
  }

  const fetchData = async (mname) => {
    const response = await fetch('http://localhost:5000/medicine/searchClient/' + mname, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (json.success === false) {
      swal({
        text: "No Product Found",
        icon: "error",
        buttons: false,
        timer: 1500
      });
    } else {
      setSearchdata(json)
    }
  }

  const handledata = () => {
    searchdata.length = 0
    displayMedicine()
  }




  return (
    <div className='container'>
      <div className="row">
        <div className="col-2 p-1" style={{ position: 'fixed', left: '0', height: '90vh' }}>
          <div className='p-2' style={{ height: '78.5vh' }}>
            <div className="d-flex justify-content-between">
              <h3>Category</h3>
              <button className="btn btn-light btn-sm border rounded" onClick={handledata}>All Products</button>
            </div>
            <div className="d-flex" style={{ marginTop: '20px' }}>
              <input type="text" placeholder='Search product name' name='mname' onChange={searchchange} className='form-control' />
              {/* <button className="btn btn-warning btn-sm mx-2" onClick={() => { searchpro(data.pname) }}> Filter</button> */}
            </div>
          </div>

        </div>
      </div>
      <div className="col-10" style={{ position: 'absolute', right: '0' }}>
        <div className="container">
          <div className="row my-3">
            {searchdata.length === 0 ? medicine_product.map((medicine) => {
              return <div className="col-md-3" key={medicine._id}>
                <MedicineCard key={medicine._id} medicine={medicine} addtocart={addtocart} />
              </div>
            }) : searchdata.map((medicine) => {
              return <div className="col-md-3" key={medicine._id}>
                <MedicineCard key={medicine._id} medicine={medicine} addtocart={addtocart} />
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicineProduct
