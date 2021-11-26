import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { VscFolder, VscOctoface, VscStarFull } from "react-icons/vsc";
import { Fade } from "react-awesome-reveal";
import CountUp from "react-countup";
import moment from "moment";
import intervalToDuration from "date-fns/intervalToDuration";
import map from "lodash.map";
import {
  FolderTwoTone,
  StarTwoTone,
  TwitterOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  getUserRepos,
  getUserStarred,
} from "../actions/userActions";
import { replace } from "lodash";
import Loader from "../components/Loader";
import { Row, Col, Typography, Button, PageHeader, Space, Card } from "antd";
import { getGithubContributions } from "github-contributions-counter";
import Error from "../components/Error";

const { Title } = Typography;

const Profile = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const years = useRef(0);
  const months = useRef(0);
  const days = useRef(0);

  const getDuration = (createdDate) => {
    let interval;
    console.log(createdDate);

    if (createdDate) {
      interval = intervalToDuration({
        start: new Date(),
        end: new Date(createdDate),
      });

      years.current = interval.years;
      months.current = interval.months;
      days.current = interval.days;
    }
  };

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
          <PageHeader
            className="site-page-header"
            onBack={() => goBackHandler()}
            title="Back to Results"
          />
          <Row className="main-row">
            <Col xs={24} sm={6} md={6} lg={4} xl={3} xxl={3}>
              <img className="profile-img" src={user.avatar_url} alt="" />
            </Col>
            <Col xs={24} sm={16}>
              <Row>
                <Col>
                  <Title level={2}>{user.name}</Title>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Title level={5}>{user.bio}</Title>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  {getDuration(user.created_at)}
                  <Title level={5}>
                    Member for {years.current} years, {months.current} months,{" "}
                    {days.current} days
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Row>
                    <Title level={4}>{user.followers}</Title>
                  </Row>
                  <Row>
                    <Title level={5}>Followers</Title>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row>
                    <CountUp duration={5} end={user.following} />
                  </Row>
                  <Row>
                    <Title level={5}>Following</Title>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={24}>
                  <Button
                    block
                    type="primary"
                    style={{ backgroundColor: "#1ba14c" }}
                  >
                    View Profile on Github
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "black" }}
                    icon={<GlobalOutlined />}
                    block
                  >
                    Website
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button
                    style={{ backgroundColor: "#1DA1F2" }}
                    icon={<TwitterOutlined />}
                    block
                  >
                    Twitter
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* <Col span={12}> 🌎 Website {user.blog}</Col>
            <Col span={12}>
              📩 Twitter {`https://twitter.com/${user.twitter_username}`}
            </Col> */}

          {repoLoading ? (
            <Loader msg={"Loading Repositories"} />
          ) : repoError ? (
            <Error error={"Error occurred when getting Repositories"} />
          ) : (
            <>
              <Row justify="center" style={{ marginTop: "1rem" }}>
                <Title level={4}>
                  <FolderTwoTone /> Public Repositories
                </Title>
              </Row>
              <Row style={{ borderBottom: "1px solid grey" }}>
                {map(repos, (repo) => {
                  return (
                    <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                      <Card hoverable style={{ margin: "1rem" }}>
                        <Row justify="center">
                          <FolderTwoTone style={{ fontSize: "32px" }} />
                        </Row>
                        <Row justify="center">
                          <p>{repo.name}</p>
                        </Row>
                        <Button block>View Repository</Button>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </>
          )}

          {starredLoading ? (
            <Loader msg={"Loading Starred Repositories"} />
          ) : starredError ? (
            <Error error={"Error occurred when getting Stars"} />
          ) : (
            <>
              <Row justify="center" style={{ marginTop: "1rem" }}>
                <Title level={4}>
                  <StarTwoTone /> Starred Repositories
                </Title>
              </Row>
              <Row>
                {map(starred, (star) => {
                  return (
                    <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                      <Card hoverable style={{ margin: "1rem" }}>
                        <Row justify="center">
                          <StarTwoTone style={{ fontSize: "32px" }} />
                        </Row>
                        <Row justify="center">
                          <p>{star.name}</p>
                        </Row>
                        <Button block>View Repository</Button>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
        </div>
      )}
    </Fade>
  );
};

export default Profile;
