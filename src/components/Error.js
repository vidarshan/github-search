const Error = ({ error }) => {
    return (
        <div className='error'>
            <img src={'../images/error.png'} alt="" />
            <div class="msg">
                {error}
            </div>
        </div>
    )
}


Error.defaultProps = {
    error: 'An Error Occurred. Please Try again Later!'
}

export default Error
