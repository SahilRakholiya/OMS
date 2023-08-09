import React from 'react'

const FeedCard = (props) => {
    const {feed}=props
    return (
        <div>
            <div className='list-group my-2'>
                <span className='list-group-item'>Username : {feed.user_name}</span>
                <span className='list-group-item'>Topic : {feed.topic}</span>
                <span className='list-group-item'>Description: {feed.description}</span>
            </div>
        </div>
    )
}

export default FeedCard
