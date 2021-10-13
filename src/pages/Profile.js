import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { FiArrowLeft } from "react-icons/fi";
import { VscFolder, VscOctoface, VscStarFull } from "react-icons/vsc";
import { Fade } from "react-awesome-reveal";
import CountUp from 'react-countup';
import moment from 'moment';
import map from 'lodash.map';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getUserRepos, getUserStarred } from '../actions/userActions';
import { replace } from 'lodash';
import Loader from '../components/Loader';
import Error from '../components/Error';


const Profile = ({ match }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const repoError = true;
    const starredError = true;

    const { loading: userLoading, error: userError, getUser: user } = useSelector((state) => state.getUser);
    const { loading: repoLoading, userRepos: repos } = useSelector((state) => state.userRepos);
    const { loading: starredLoading, userStarred: starred } = useSelector((state) => state.userStarred);

    const goBackHandler = () => {
        history.goBack()
    }

    useEffect(() => {
        dispatch(getUserInfo(match.params.name))
        dispatch(getUserRepos(match.params.name))
        dispatch(getUserStarred(match.params.name))
    }, [dispatch, match])

    return (
        <Fade direction={'left'}>
            {userLoading ? <Loader msg={'Loading Profile'} /> : userError ? <Error error={'Error occurred when getting profile'} /> : <div className='profile'>
                <div className="back-btn" onClick={() => goBackHandler()}>
                    <div className="icon">
                        <FiArrowLeft />
                    </div>
                    <div className="text">
                        Back
                    </div>
                </div>
                {/* <span className='user-type'>{user.type === 'User' ? '👤' : '🛡️'}</span> */}
                <div className="img-container">
                    <img className='profile-img' src={user.avatar_url} alt="" />
                    <span className='profile-name'>{user.name}</span>
                    <span className='profile-bio'>{user.bio}</span>
                    {/* <div className='view-on-github'>View Profile on Github</div> */}
                </div>
                <div className="follow-social">
                    <div className="following-followers">
                        <div className="follows">
                            <span className='followers-number'><CountUp duration={1} end={user.followers} separator=',' /></span>
                            <span className="text">Followers</span>
                        </div>
                        <div className="follows">

                            <span className='following-number'><CountUp duration={5} end={user.following} /></span>
                            <span className="text">Following</span>
                        </div>
                    </div>
                    <div className="blog-twitter-email">
                        <div className="social">
                            🌎 Website
                            <br />
                            <span>{user.blog}</span>
                        </div>
                        <div className="social">
                            📩 Twitter
                            <br />
                            <span>{user.twitter_username}</span>
                        </div>
                    </div>
                </div>

                <br />
                <div className="info">
                    <div className="section-heading"><VscOctoface /> Profile</div>
                    <div className="info-grid">
                        <div className="item">
                            📍 Location
                            <br />
                            <span>{user.location}</span>
                        </div>
                        <div className="item">
                            🏢 Organizations
                            <br />
                            <span>{user.company}</span>
                        </div>
                        <div className="item">
                            📅 Date Joined
                            <br />
                            <span>{moment(user.created_at).format('MM-DD-YYYY')}</span>
                        </div>
                        <div className="item">
                            📅 Last Updated
                            <br />
                            <span>{moment(user.updated_at).format('MM-DD-YYYY')}</span>
                        </div>
                        <div className="item">
                            💵 Hireable?
                            <br />
                            <span>{user.hireable ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="item">
                            👨‍💻 Site Admin?
                            <br />
                            <span>{user.site_admin ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="item">
                            Public Gists
                            <br />
                            <span>{user.public_gists}</span>
                        </div>
                        <div className="item">
                            Public Repos
                            <br />
                            <span>{user.public_repos}</span>
                        </div>
                        <div className="item">
                            Starred
                            <br />
                            <span>{starred.length}</span>
                        </div>
                    </div>
                </div>

                {repoLoading ? <Loader msg={'Loading Repositories'} /> : repoError ? <Error error={'Error occurred when getting Repositories'} /> : <div className="items">
                    <div className="section-heading"><VscFolder /> Public Repositories</div>
                    <div className="items-grid">

                        {map(repos, (repo) => {
                            return <a className='items' rel="noreferrer" href={replace(repo.url, 'api.github.com/repos', 'github.com')} target='_blank'>
                                <div className="icon"><VscFolder /></div>
                                <div className="name">{repo.name}</div>
                            </a>
                        })}

                    </div>
                </div>}

                {starredLoading ? <Loader msg={'Loading Starred Repositories'} /> : starredError ? <Error error={'Error occurred when getting Stars'} /> : <div className="items">
                    <div className="section-heading"><VscStarFull /> Starred Repositories</div>
                    <div className="items-grid">
                        {map(starred, (star) => {
                            return <a className='items' rel="noreferrer" href={replace(star.url, 'api.github.com/repos', 'github.com')}>
                                <div className="icon"><VscStarFull /></div>
                                <div className="name">{star.name}</div>
                            </a>
                        })}
                    </div>
                </div>}


            </div>}

        </Fade>

    )
}

export default Profile
