import React from 'react'

const UserCard = (props) => {

  const {user} = props
  return (
    <div className='list-group my-2'>
      <span className='list-group-item'>Username : {user.name}</span>
      <span className='list-group-item'>Email : {user.email}</span>
      <span className='list-group-item'>Phone no : {user.phone_number}</span>  
      <span className='list-group-item'>Address : {user.address}</span>  
      <span className='list-group-item'>Pincode : {user.pincode}</span>  
      <span className='list-group-item'>State : {user.state}</span>  
      <span className='list-group-item'>City : {user.city}</span>  
    </div>
  )
}

export default UserCard
