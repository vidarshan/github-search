import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Fade } from "react-awesome-reveal";
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
  CopyOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  getUserRepos,
  getUserStarred,
} from "../actions/userActions";
import Loader from "../components/Loader";
import {
  Row,
  Col,
  Typography,
  Button,
  PageHeader,
  Card,
  notification,
} from "antd";
import Error from "../components/Error";

const { Title } = Typography;

const Profile = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const years = useRef(0);
  const months = useRef(0);
  const days = useRef(0);

  const [isCopied, setIsCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

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

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Copied Link",
      description: "Repo clone URL Copied to the clipboard.",
    });
  };
  const copyToClipboard = (text, id) => {
    setCopiedLink(id);
    setIsCopied(false);
    navigator.clipboard.writeText(text + ".git");
    setIsCopied(true);

    if (isCopied) {
      openNotificationWithIcon("success");
    }
  };

  useEffect(() => {
    dispatch(getUserInfo(match.params.name));
    dispatch(getUserRepos(match.params.name));
    dispatch(getUserStarred(match.params.name));
  }, [dispatch, match]);

  return (
    <Fade direction={"left"}>
      <PageHeader
        className="site-page-header"
        onBack={() => goBackHandler()}
        title="Back to Search Results"
      />
      {userLoading ? (
        <Loader />
      ) : userError ? (
        <Error error={"Error occurred when getting profile"} />
      ) : (
        <div className="profile">
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
                  {console.log(user.login)}
                  <Title level={2}>{user.name ? user.name : user.login}</Title>
                </Col>
              </Row>
              <Row>
                {user.bio && <Col className="col-spacing col-spacing-top" xs={24}>
                  <p className="bio">{user.bio}</p>
                </Col>}

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
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
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
                {user.blog && (
                  <Col className="col-spacing" xs={24} md={7} lg={6}>
                    <Button
                      href={user.blog}
                      target="_blank"
                      rel="noreferrer"
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
                )}

                {user.twitter_username && (
                  <Col className="col-spacing" xs={24} md={7} lg={6}>
                    <Button
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noreferrer"
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
                )}
              </Row>
            </Col>
          </Row>
          {repoLoading ? (
            <Loader msg={"Loading Repositories"} />
          ) : repoError ? (
            <Error error={"Error occurred when getting Repositories"} />
          ) : repos.length ? (
            <>
              <Row justify="center" style={{ marginTop: "1rem" }}>
                <Title level={4}>
                  <FolderTwoTone /> Public Repositories
                </Title>
              </Row>
              <Row style={{ borderBottom: "1px solid grey" }}>
                {map(repos, (repo, key) => {
                  return (
                    <Col key={key} xs={24} sm={12} md={8} lg={8} xl={6}>
                      <Card hoverable style={{ margin: "1rem" }}>
                        <Row justify="center">
                          <FolderTwoTone style={{ fontSize: "32px" }} />
                        </Row>
                        <Row justify="center">
                          <p>{repo.name}</p>
                        </Row>
                        <Row>
                          <Col span={20}>
                            <Button
                              style={{
                                color: "#20c162",
                                borderColor: "#20c162",
                                backgroundColor: "transparent",
                              }}
                              href={repo.html_url}
                              target="_blank"
                              rel="noreferrer"
                              block
                              type="default"
                            >
                              View Repository
                            </Button>
                          </Col>
                          <Col span={4}>
                            <Button
                              onClick={() =>
                                copyToClipboard(repo.html_url, repo.id)
                              }
                              type="link"
                            >
                              {isCopied && copiedLink === repo.id ? (
                                <CheckOutlined />
                              ) : (
                                <CopyOutlined />
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : (
            <>
              <Row style={{ marginTop: "1rem" }} justify="center">
                <Title level={4}>
                  <StarTwoTone twoToneColor="orange" /> Starred Repositories
                </Title>
              </Row>
              <Row justify="center">
                <Title level={3}>This User has no starred repos</Title>
              </Row>
            </>
          )}

          {starredLoading ? (
            <Loader msg={"Loading Starred Repositories"} />
          ) : starredError ? (
            <Error error={"Error occurred when getting Stars"} />
          ) : starred.length ? (
            <>
              <Row justify="center" style={{ marginTop: "1rem" }}>
                <Title level={4}>
                  <StarTwoTone twoToneColor="orange" /> Starred Repositories
                </Title>
              </Row>
              <Row>
                {map(starred, (star, key) => {
                  return (
                    <Col key={key} xs={24} sm={12} md={8} lg={8} xl={6}>
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
                            <Button
                              style={{
                                color: "#20c162",
                                borderColor: "#20c162",
                                backgroundColor: "transparent",
                              }}
                              href={star.html_url}
                              target="_blank"
                              rel="noreferrer"
                              block
                            >
                              View Repository
                            </Button>
                          </Col>
                          <Col span={4}>
                            <Button
                              style={{ color: "orange" }}
                              onClick={() =>
                                copyToClipboard(star.html_url, star.id)
                              }
                              type="link"
                            >
                              {isCopied && copiedLink === star.id ? (
                                <CheckOutlined />
                              ) : (
                                <CopyOutlined />
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : (
            <>
              <Row style={{ marginTop: "1rem" }} justify="center">
                <Title level={4}>
                  <StarTwoTone twoToneColor="orange" /> Starred Repositories
                </Title>
              </Row>
              <Row justify="center">
                <Title level={3}>This User has no starred repos</Title>
              </Row>
            </>
          )}
        </div>
      )}
    </Fade>
  );
};

export default Profile;
