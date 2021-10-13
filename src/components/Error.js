import React from 'react'
import { BsEmojiFrown } from 'react-icons/bs';

const Error = () => {
    return (
        <div className='error'>
            <img src={'../images/error.png'} alt="" />
            <div class="msg">
                An Error Occurred. Please Try again Later!
            </div>
        </div>
    )
}

export default Error
