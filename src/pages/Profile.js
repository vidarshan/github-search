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
  GithubOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  LinkOutlined,
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
            title="Back to Search Results"
          />
          <Row className="main-row">
            <Col
              className="flex-col"
              xs={24}
              sm={24}
              md={6}
              lg={6}
              xl={6}
              xxl={4}
            >
              <img className="profile-img" src={user.avatar_url} alt="" />
            </Col>
            <Col xs={24} sm={24} md={18}>
              <Row>
                <Col className="col-spacing-top">
                  <Title level={2}>{user.name}</Title>
                </Col>
              </Row>
              <Row>
                <Col className="col-spacing col-spacing-top" xs={24}>
                  <p className="bio">{user.bio}</p>
                </Col>
              </Row>
              <Row>
                <Col className="col-spacing col-spacing-top" span={24}>
                  {getDuration(user.created_at)}
                  <p className="duration">
                    Member for {years.current} years, {months.current} months,{" "}
                    {days.current} days.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="col-spacing col-center" xs={12} md={6} lg={4}>
                  <p className="followers-following">
                    <UserAddOutlined />
                    {user.followers} Followers{" "}
                  </p>
                </Col>
                <Col className="col-spacing col-center" xs={12} md={6} lg={4}>
                  <p className="followers-following">
                    <UserDeleteOutlined />
                    {user.following} Following
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="col-spacing" xs={24} md={10} lg={10}>
                  <Button
                    style={{
                      background: "green",
                      borderColor: "green",
                      color: "white",
                    }}
                    block
                    type="default"
                  >
                    <GithubOutlined /> View Profile on Github
                  </Button>
                </Col>
                <Col className="col-spacing" xs={24} md={7} lg={6}>
                  <Button
                    style={{
                      background: "transparent",
                      borderColor: "grey",
                      color: "grey",
                    }}
                    type="default"
                    icon={<GlobalOutlined />}
                    block
                  >
                    Website
                  </Button>
                </Col>
                <Col className="col-spacing" xs={24} md={7} lg={6}>
                  <Button
                    style={{
                      background: "transparent",
                      borderColor: "#1DA1F2",
                      color: "#1DA1F2",
                    }}
                    type="default"
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
                        <Row>
                          <Col span={20}>
                            <Button block type="primary">
                              View Repository
                            </Button>
                          </Col>
                          <Col span={4}>
                            <Button>
                              <LinkOutlined />
                            </Button>
                          </Col>
                        </Row>
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
                  <StarTwoTone twoToneColor="orange" /> Starred Repositories
                </Title>
              </Row>
              <Row>
                {map(starred, (star) => {
                  return (
                    <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                      <Card hoverable style={{ margin: "1rem" }}>
                        <Row justify="center">
                          <StarTwoTone
                            twoToneColor="orange"
                            style={{
                              fontSize: "32px",
                            }}
                          />
                        </Row>
                        <Row justify="center">
                          <p>{star.name}</p>
                        </Row>
                        <Row>
                          <Col span={20}>
                            <Button block>View Repository</Button>
                          </Col>
                          <Col span={4}>
                            <Button style={{ color: "orange" }} type="default">
                              <LinkOutlined />
                            </Button>
                          </Col>
                        </Row>
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
