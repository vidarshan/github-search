import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { VscFolder, VscOctoface, VscStarFull } from "react-icons/vsc";
import { Fade } from "react-awesome-reveal";
import CountUp from "react-countup";
import moment from "moment";
import map from "lodash.map";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  getUserRepos,
  getUserStarred,
} from "../actions/userActions";
import { replace } from "lodash";
import Loader from "../components/Loader";
import { Row, Col, Typography, Button } from "antd";
import Error from "../components/Error";

const { Title } = Typography;

const Profile = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    loading: userLoading,
    error: userError,
    getUser: user,
  } = useSelector((state) => state.getUser);
  const {
    loading: repoLoading,
    error: repoError,
    userRepos: repos,
  } = useSelector((state) => state.userRepos);
  const {
    loading: starredLoading,
    error: starredError,
    userStarred: starred,
  } = useSelector((state) => state.userStarred);

  const goBackHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getUserInfo(match.params.name));
    dispatch(getUserRepos(match.params.name));
    dispatch(getUserStarred(match.params.name));
  }, [dispatch, match]);

  return (
    <Fade direction={"left"}>
      {userLoading ? (
        <Loader msg={"Loading Profile"} />
      ) : userError ? (
        <Error error={"Error occurred when getting profile"} />
      ) : (
        <div className="profile">
          <div className="back-btn" onClick={() => goBackHandler()}>
            <div className="icon">
              <FiArrowLeft />
            </div>
            <div className="text">Back</div>
          </div>
          <Row justify="center">
            <img className="profile-img" src={user.avatar_url} alt="" />
          </Row>
          <Row justify="center">
            <Title level={3}>{user.name}</Title>
          </Row>
          <Row justify="center">
            <Title level={5}>{user.bio}</Title>
          </Row>
          <Row>
            <Col>
              <Button>View Profile on Github</Button>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <CountUp duration={1} end={user.followers} separator="," />
            </Col>
            <Col span={12}>
              <CountUp duration={5} end={user.following} />
            </Col>
          </Row>
          <Row>
            <Col> 🌎 Website {user.blog}</Col>
            <Col>
              📩 Twitter {`https://twitter.com/${user.twitter_username}`}
            </Col>
          </Row>
          <Row>Profile</Row>
          <Row>
            <Col>📍 Location {user.location}</Col>
            <Col>🏢 Organizations {user.company}</Col>
            <Col>
              📅 Date Joined {moment(user.created_at).format("MM-DD-YYYY")}
            </Col>
            <Col>
              📅 Last Updated {moment(user.updated_at).format("MM-DD-YYYY")}
            </Col>
            <Col>💵 Hireable? {user.hireable ? "Yes" : "No"}</Col>
            <Col>💵 Hireable? {user.hireable ? "Yes" : "No"}</Col>
            <Col>💵 Hireable? {user.hireable ? "Yes" : "No"}</Col>
            <Col>💵 Hireable? {user.hireable ? "Yes" : "No"}</Col>
            <Col>💵 Hireable? {user.hireable ? "Yes" : "No"}</Col>
            <Col>💵 Hireable? {user.hireable ? "Yes" : "No"}</Col>
            <Col>💵 Hireable? {user.hireable ? "Yes" : "No"}</Col>
          </Row>

          <br />

          {repoLoading ? (
            <Loader msg={"Loading Repositories"} />
          ) : repoError ? (
            <Error error={"Error occurred when getting Repositories"} />
          ) : (
            <div className="items">
              <div className="section-heading">
                <VscFolder /> Public Repositories
              </div>
              <div className="items-grid">
                {map(repos, (repo) => {
                  return (
                    <a
                      className="items"
                      rel="noreferrer"
                      href={replace(
                        repo.url,
                        "api.github.com/repos",
                        "github.com"
                      )}
                      target="_blank"
                    >
                      <div className="icon">
                        <VscFolder />
                      </div>
                      <div className="name">{repo.name}</div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {starredLoading ? (
            <Loader msg={"Loading Starred Repositories"} />
          ) : starredError ? (
            <Error error={"Error occurred when getting Stars"} />
          ) : (
            <div className="items">
              <div className="section-heading">
                <VscStarFull /> Starred Repositories
              </div>
              <div className="items-grid">
                {map(starred, (star) => {
                  return (
                    <a
                      className="items"
                      rel="noreferrer"
                      href={replace(
                        star.url,
                        "api.github.com/repos",
                        "github.com"
                      )}
                    >
                      <div className="icon">
                        <VscStarFull />
                      </div>
                      <div className="name">{star.name}</div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </Fade>
  );
};

export default Profile;
