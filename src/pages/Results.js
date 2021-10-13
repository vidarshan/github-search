import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../actions/userActions';
import map from 'lodash.map';
import { Fade } from 'react-awesome-reveal';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';


const Results = ({ match }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const searchResults = useSelector((state) => state.userSearch);


    const { loading, userSearch, error } = searchResults;

    const goBackHandler = () => {
        history.goBack()
    }

    useEffect(() => {
        dispatch(searchUser(match.params.word))

        { console.log(match.params) }
    }, [match, dispatch])


    return (
        <Fade direction={'left'}>
            {loading ? <Loader /> : error ? <h1>Error</h1> : <>
                <div className="results">
                    <div className="back-btn" onClick={() => goBackHandler()}>
                        <div className="icon">
                            <FiArrowLeft />
                        </div>
                        <div className="text">
                            Back
                        </div>
                    </div>
                    <div className="results-grid">
                        {map(userSearch.items, (result) => {
                            return <Link className="result-card" to={`/profile/${result.login}`}>
                                <img className='result-image' src={result.avatar_url} alt="profile-img" />
                                <div className="result-login">{result.login}</div>
                            </Link>
                        })}
                    </div>
                </div>
            </>}

        </Fade>
    )
}

export default Results
