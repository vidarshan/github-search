import React from 'react'

const Loader = ({ msg }) => {
    return (
        <div className='loader'>
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <div class="text">{msg}</div>
        </div>
    )
}

Loader.defaultProps = {
    msg: "Loading Details"
}

export default Loader
