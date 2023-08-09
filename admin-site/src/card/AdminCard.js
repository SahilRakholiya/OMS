import React from 'react'

const AdminCard = (props) => {
    const { admin } = props
    return (
        <div>
            <div className='list-group my-2'>
                <span className='list-group-item'>Username : {admin.name}</span>
                <span className='list-group-item'>Email : {admin.email}</span>
                <span className='list-group-item'>Phone no : {admin.phone_number}</span>
            </div>
        </div>
    )
}

export default AdminCard
