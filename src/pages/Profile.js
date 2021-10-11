import React, { useEffect } from 'react';
import moment from 'moment';
import map from 'lodash.map';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getUserRepos, getUserGists, getUserStarred } from '../actions/userActions';


const Profile = ({ match }) => {

    const dispatch = useDispatch();
    const { loading: userLoading, error: errorLoading, getUser: user } = useSelector((state) => state.getUser);
    const { loading: repoLoading, error: repoError, userRepos: repos } = useSelector((state) => state.userRepos);
    const { loading: gistLoading, error: gistError, userGists: gists } = useSelector((state) => state.userGists);
    const { loading: starredLoading, error: starredError, userStarred: starred } = useSelector((state) => state.userStarred);

    useEffect(() => {
        dispatch(getUserInfo(match.params.name))
        dispatch(getUserRepos(match.params.name))
        dispatch(getUserGists(match.params.name))
        dispatch(getUserStarred(match.params.name))
    }, [dispatch])

    return (
        <div className='profile'>
            <div class="img-container">
                <img className='profile-img' src={user.avatar_url} alt="" />
                <span className='profile-name'>{user.name}</span>
                <span className='profile-bio'>{user.bio}</span>
                <span>Github {user.type}</span>
            </div>
            <div class="follow-social">
                <div class="following-followers">
                    <div className="follows">
                        <span className='followers-number'>{user.followers}</span>
                        <span className="text">Followers</span>
                    </div>
                    <div className="follows">
                        <span className='following-number'>{user.following}</span>
                        <span className="text">Following</span>
                    </div>
                </div>
                <div class="blog-twitter-email">
                    <div class="social">
                        Website
                        <br />
                        <span>{user.blog}</span>
                    </div>
                    <div class="social">
                        Twitter
                        <br />
                        <span>{user.twitter_username}</span>
                    </div>
                </div>
            </div>
            <br />
            <div class="info">
                <div class="section-heading">Profile</div>
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
                <div class="items-grid">

                    {map(repos, (repo) => {
                        return <div className='repos'>{repo.name}</div>
                    })}

                </div>
            </div>

            <div class="items">
                <div class="items-grid">
                    {map(starred, (star) => {
                        return <div className='starred'>{star.name}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile
