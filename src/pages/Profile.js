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


const Profile = ({ match }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { loading: userLoading, error: errorLoading, getUser: user } = useSelector((state) => state.getUser);
    const { loading: repoLoading, error: repoError, userRepos: repos } = useSelector((state) => state.userRepos);
    const { loading: starredLoading, error: starredError, userStarred: starred } = useSelector((state) => state.userStarred);

    const goBackHandler = () => {
        history.goBack()
    }

    useEffect(() => {
        dispatch(getUserInfo(match.params.name))
        dispatch(getUserRepos(match.params.name))
        dispatch(getUserStarred(match.params.name))
    }, [dispatch])

    return (

        <div className='profile'>
            <div class="back-btn" onClick={() => goBackHandler()}>
                <div class="icon">
                    <FiArrowLeft />
                </div>
                <div class="text">
                    Back to Results
                </div>
            </div>
            {/* <span className='user-type'>{user.type === 'User' ? '👤' : '🛡️'}</span> */}
            <div class="img-container">
                <img className='profile-img' src={user.avatar_url} alt="" />
                <span className='profile-name'>{user.name}</span>
                <span className='profile-bio'>{user.bio}</span>
            </div>
            <div class="follow-social">
                <div class="following-followers">
                    <div className="follows">
                        <span className='followers-number'><CountUp duration={1} end={user.followers} separator=',' /></span>
                        <span className="text">Followers</span>
                    </div>
                    <div className="follows">

                        <span className='following-number'><CountUp duration={5} end={user.following} /></span>
                        <span className="text">Following</span>
                    </div>
                </div>
                <div class="blog-twitter-email">
                    <div class="social">
                        🌎 Website
                        <br />
                        <span>{user.blog}</span>
                    </div>
                    <div class="social">
                        📩 Twitter
                        <br />
                        <span>{user.twitter_username}</span>
                    </div>
                </div>
            </div>

            <br />
            <div class="info">
                <div class="section-heading"><VscOctoface /> Profile</div>
                <div class="info-grid">
                    <div class="item">
                        📍 Location
                        <br />
                        <span>{user.location}</span>
                    </div>
                    <div class="item">
                        🏢 Organizations
                        <br />
                        <span>{user.company}</span>
                    </div>
                    <div class="item">
                        📅 Date Joined
                        <br />
                        <span>{moment(user.created_at).format('MM-DD-YYYY')}</span>
                    </div>
                    <div class="item">
                        📅 Last Updated
                        <br />
                        <span>{moment(user.updated_at).format('MM-DD-YYYY')}</span>
                    </div>
                    <div class="item">
                        💵 Hireable?
                        <br />
                        <span>{user.hireable ? 'Yes' : 'No'}</span>
                    </div>
                    <div class="item">
                        👨‍💻 Site Admin?
                        <br />
                        <span>{user.site_admin ? 'Yes' : 'No'}</span>
                    </div>
                    <div class="item">
                        Public Gists
                        <br />
                        <span>{user.public_gists}</span>
                    </div>
                    <div class="item">
                        Public Repos
                        <br />
                        <span>{user.public_repos}</span>
                    </div>
                    <div class="item">
                        Starred
                        <br />
                        <span>{starred.length}</span>
                    </div>
                </div>
            </div>

            <div class="items">
                <div class="section-heading"><VscFolder /> Public Repositories</div>
                <div class="items-grid">

                    {map(repos, (repo) => {
                        return <a className='items' href={replace(repo.url, 'api.github.com/repos', 'github.com')} target='_blank'>
                            <div class="icon"><VscFolder /></div>
                            <div class="name">{repo.name}</div>
                        </a>
                    })}

                </div>
            </div>

            <div class="items">
                <div class="section-heading"><VscStarFull /> Starred Repositories</div>
                {console.log(starred)}
                <div class="items-grid">
                    {map(starred, (star) => {
                        return <div className='items' href={replace(star.url, 'api.github.com/repos', 'github.com')}>
                            <div class="icon"><VscStarFull /></div>
                            <div class="name">{star.name}</div>
                        </div>
                    })}
                </div>
            </div>
        </div>

    )
}

export default Profile
