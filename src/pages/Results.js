import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../actions/userActions';
import map from 'lodash.map';


const Results = ({ match }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const searchResults = useSelector((state) => state.userSearch);

    const { loading, userSearch, error } = searchResults;

    useEffect(() => {
        dispatch(searchUser(match.params.name))
    }, [match, dispatch])


    return (
        <div class="results">
            <div class="results-grid">
                {map(userSearch.items, (result) => {
                    return <div class="result-card">
                        <img className='result-image' src={result.avatar_url} alt="profile-img" />
                        <div class="result-login">{result.login}</div>
                        <div class="result-details" onClick={() => history.push(`/profile/${result.login}`)}>View Details &#8594;</div>
                    </div>
                })}
            </div>
        </div>


    )
}

export default Results
