import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../actions/userActions';

const Profile = ({ match }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo(match.params.name))
    }, [dispatch])

    return (
        <div>
            Profile
        </div>
    )
}

export default Profile
