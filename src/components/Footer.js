import React from 'react'
import moment from 'moment'
import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='footer'>
            <div class="text">
                &copy; {moment().format('YYYY')} vidarshan. | Powered by Github API
            </div>

            <a class="icon" href='https://github.com/vidarshanadithya' target='_blank' rel="noreferrer">
                <AiFillGithub />
            </a>
        </div>
    )
}

export default Footer
