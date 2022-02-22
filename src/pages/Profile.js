import React, { useEffect, useState } from "react";
import {
  getUserGists,
  getUserRepos,
  getUserStarred,
  getRate,
} from "../actions/userActions";
import Spinner from "../components/Spinner";
import { GoPrimitiveDot } from "react-icons/go";
import { colors } from "../data/Colors";
import {
  BsGlobe,
  BsEnvelope,
  BsTwitter,
  BsGithub,
  BsFillFileEarmarkCodeFill,
  BsFillXCircleFill,
  BsFillStarFill,
  BsFillFileZipFill,
  BsClockFill,
  BsPinAngleFill,
  BsBriefcaseFill,
  BsEmojiDizzyFill,
  BsX,
} from "react-icons/bs";
import {
  Container,
  Image,
  Paper,
  Anchor,
  ActionIcon,
  Tabs,
  Alert,
  Text,
  Group,
  Divider,
  Grid,
  Col,
  Pagination,
  Card,
} from "@mantine/core";
import { searchUser } from "../actions/userActions";
import RepositoryCard from "../components/RepositoryCard";
import { useParams } from "react-router";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "@mantine/notifications";
const Profile = ({ match }) => {


  const params = useParams();
  const dispatch = useDispatch();
  const notifications = useNotifications();
  const [repoPages, setRepoPages] = useState(1);
  const [gistsPages, setGistsPages] = useState(1);
  const [starredPages, setStarredPages] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [userLangStats, setUserLangStats] = useState([]);

  const searchResults = useSelector((state) => state.userSearch);

  const {
    loading: searchLoading,
    userSearch,
    error: searchError,
  } = searchResults;
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
  const {
    loading: gistsLoading,
    error: gistsError,
    userGists: gists,
  } = useSelector((state) => state.userGists);


  useEffect(() => {
    if (gistsError || starredError || repoError) {
      notifications.showNotification({
        title: "Oops!",
        message: "Error Fetching Data.",
        icon: <BsX />,
        color: "red",
        duration: 10000,
      });
    }
    //eslint-disable-next-line
  }, [gistsError, starredError, repoError]);

  const handlerPageChange = (e) => {
    setActivePage(e);
  };

  const searchHandler = () => {
    dispatch(searchUser(params.name));
  };

  const generateLanguageChartData = (repos) => {
    const languageStats = [];
    const langaugesByRepo = [];

    repos.map((repoLang, key) => {
      if (!langaugesByRepo.some((el) => el.name === repoLang.language)) {
        langaugesByRepo.push({ id: key, name: repoLang.language, count: 1 });
      } else {
        let indexOfLang = langaugesByRepo.findIndex(
          (i) => i.name === repoLang.language
        );
        langaugesByRepo[indexOfLang].count =
          langaugesByRepo[indexOfLang].count + 1;
      }
    });

    let langCountTotal = langaugesByRepo.reduce((sum, p) => sum + p.count, 0);

    langaugesByRepo.map((l, key) => {
      languageStats.push({
        id: key,
        name: l.name === null ? "Misc" : l.name,
        value: Math.round((l.count / langCountTotal) * 100),
        color: colors.filter((lang) => {
          return lang.language === l.name;
        }).length
          ? colors.filter((lang) => {
            return lang.language === l.name;
          })[0].color
          : "#AFAFAF",
      });
    });

    setUserLangStats(languageStats);
  };

  useEffect(() => {
    if (userSearch) {
      if (activeTab === 0) {
        if (Math.round(userSearch.public_repos % 50) > 0) {
          setRepoPages(Math.round(userSearch.public_repos / 50) + 1);
          console.log("d", activePage);
        } else {
          setRepoPages(Math.round(userSearch.public_repos / 50));
          console.log("e", activePage);
        }
      }

      if (activeTab === 1) {
        if (Math.round(userSearch.public_repos % 50) > 0) {
          setGistsPages(Math.round(userSearch.public_repos / 50) + 1);
          console.log("d", activePage);
        } else {
          setGistsPages(Math.round(userSearch.public_repos / 50));
          console.log("e", activePage);
        }
      }

      if (activeTab === 2) {
        if (Math.round(userSearch.public_repos % 50) > 0) {
          setStarredPages(Math.round(userSearch.public_repos / 50) + 1);
          console.log("d", activePage);
        } else {
          setStarredPages(Math.round(userSearch.public_repos / 50));
          console.log("e", activePage);
        }
      }
    }
  }, [userSearch]);

  useEffect(() => {

    if (activeTab === 0) {
      dispatch(getUserRepos(params.name, activePage));
    } else if (activeTab === 1) {
      dispatch(getUserStarred(params.name, activePage));
    } else if (activeTab === 2) {
      dispatch(getUserGists(params.name, activePage));
    }

  }, [activePage])

  useEffect(() => {
    if (activeTab === 0) {
      dispatch(getUserRepos(params.name, 1));
    } else if (activeTab === 1) {
      dispatch(getUserStarred(params.name, 1));
    } else {
      dispatch(getUserGists(params.name, 1));
    }
  }, [activeTab]);

  useEffect(() => {
    searchHandler();
    dispatch(getRate());
  }, [dispatch, match]);

  useEffect(() => {
    if (repos && repos.length) {
      generateLanguageChartData(repos);
    }
  }, [repos]);

  return (
    <Paper sx={{ minHeight: "100vh" }}>
      {!searchError ? searchLoading ? <Spinner /> : (
        <>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              backgroundColor: "#2b3137",
              color: "white",
            }}
            fluid
          >
            <Image
              fit="contain"
              sx={{ width: "130px", height: "130px" }}
              radius="xl"
              src={userSearch.avatar_url}
            />
            <Text sx={{ marginTop: "1.5rem", fontSize: "2rem" }} weight={700}>
              {userSearch.name}
            </Text>
            <Text sx={{ fontSize: "1rem" }} weight={600}>
              @{userSearch.login}
            </Text>
            <Group sx={{ marginTop: "1rem" }} direction="row" position="center">
              <Text size="sm" weight={700} align="center">
                {userSearch.followers
                  ? userSearch.followers.toLocaleString()
                  : "-"}{" "}
                <br /> Followers
              </Text>
              <Text size="sm" weight={700} align="center">
                {userSearch.following
                  ? userSearch.following.toLocaleString()
                  : "-"}{" "}
                <br /> Following
              </Text>
            </Group>
            <Group sx={{ marginTop: "1rem" }} direction="row" position="center">
              <Anchor href={userSearch.html_url} target="_blank">
                <ActionIcon
                  variant="filled"
                  radius="xl"
                  color="green"
                  size="lg"
                >
                  <BsGithub />
                </ActionIcon>
              </Anchor>

              {userSearch.blog && (
                <Anchor href={userSearch.blog} target="_blank">
                  <ActionIcon
                    variant="filled"
                    radius="xl"
                    color="cyan"
                    size="lg"
                  >
                    <BsGlobe />
                  </ActionIcon>
                </Anchor>
              )}

              {userSearch.twitter_username && (
                <Anchor
                  href={`https://www.twitter.com/${userSearch.twitter_username}`}
                  target="_blank"
                >
                  <ActionIcon
                    variant="filled"
                    radius="xl"
                    color="blue"
                    size="lg"
                  >
                    <BsTwitter />
                  </ActionIcon>
                </Anchor>
              )}
              {userSearch.email && (
                <Anchor
                  href={`https://www.twitter.com/${userSearch.twitter_username}`}
                  target="_blank"
                >
                  <ActionIcon
                    variant="filled"
                    radius="xl"
                    color="yellow"
                    size="lg"
                  >
                    <BsEnvelope />
                  </ActionIcon>
                </Anchor>
              )}
            </Group>
          </Container>
          <Container>
            <Grid>
              <Col sx={{ marginTop: "2rem" }} span={12}>
                <Card radius="md" withBorder>
                  <Grid>
                    {userSearch.company && (
                      <Col
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        span={4}
                      >
                        <BsBriefcaseFill />
                        <Text
                          color="gray"
                          sx={{ marginTop: "1rem" }}
                          align="center"
                          weight={700}
                          size="xs"
                        >
                          {userSearch.company}
                        </Text>{" "}
                      </Col>
                    )}
                    {userSearch.created_at && (
                      <Col
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        span={4}
                      >
                        <BsClockFill />
                        <Text
                          color="gray"
                          sx={{ marginTop: "1rem" }}
                          align="center"
                          weight={700}
                          size="xs"
                        >
                          Member since{" "}
                          {moment(userSearch.created_at).format("DD-MMM-YYYY")}
                        </Text>{" "}
                      </Col>
                    )}
                    {userSearch.location && (
                      <Col
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        span={4}
                      >
                        <BsPinAngleFill />
                        <Text
                          color="gray"
                          sx={{ marginTop: "1rem" }}
                          align="center"
                          weight={700}
                          size="xs"
                        >
                          {userSearch.location}
                        </Text>
                      </Col>
                    )}
                  </Grid>
                </Card>
              </Col>
              <Col span={12}>
                <Card radius="md" withBorder>
                  <Divider sx={{ marginBottom: '1.5rem' }} label='Most used languages' labelPosition='center' />
                  <Group position="apart">
                    {userLangStats.map((lang) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <GoPrimitiveDot size='20' color={lang.color} />{" "}
                          <Text
                            sx={{ marginTop: ".5rem" }}
                            color="gray"
                            weight={800}
                            size="xs"
                          >
                            {lang.name}
                          </Text>
                        </div>
                      );
                    })}
                  </Group>
                </Card>
              </Col>
            </Grid>
          </Container>
          <Container sx={{ marginTop: "2rem" }}>
            <Tabs
              grow
              variant="default"
              color="green"
              active={activeTab}
              onTabChange={setActiveTab}
            >
              <Tabs.Tab icon={<BsFillFileZipFill />} label="Repositories">
                <Grid>
                  {repoLoading ? (
                    <Col span={12}>
                      <Spinner />
                    </Col>
                  ) : repos && repos.length ? (
                    repos.map((repo) => {
                      return (
                        <Col span={6}>
                          <RepositoryCard
                            name={repo.name}
                            description={repo.description}
                            forksCount={repo.forks_count}
                            starsCount={repo.stargazers_count}
                            language={repo.language}
                            size={repo.size}
                          />
                        </Col>
                      );
                    })
                  ) : (
                    <Col sx={{ marginTop: "1rem" }} span={12}>
                      <Alert
                        icon={<BsFillXCircleFill size={16} />}
                        title="OOPS!"
                        color="red"
                        radius="md"
                      >
                        This user has no public repos.
                      </Alert>
                    </Col>
                  )}
                </Grid>
                <Group sx={{ margin: "3rem 0" }} position="center">
                  <Pagination
                    size="md"
                    color="green"
                    radius="xl"
                    total={repoPages}
                    page={activePage}
                    onChange={(e) => handlerPageChange(e)}
                  />
                </Group>
              </Tabs.Tab>
              <Tabs.Tab icon={<BsFillStarFill />} label="Starred">
                <Grid>
                  {starredLoading ? (
                    <Col span={12}>
                      <Spinner />
                    </Col>
                  ) : starred && starred.length ? (
                    starred.map((star) => {
                      return (
                        <Col span={6}>
                          <RepositoryCard
                            name={star.name}
                            description={star.description}
                            language={star.language}
                            size={star.size}
                          />
                        </Col>
                      );
                    })
                  ) : (
                    <Col sx={{ marginTop: "1rem" }} span={12}>
                      <Alert
                        icon={<BsFillXCircleFill size={16} />}
                        title="OOPS!"
                        color="red"
                        radius="md"
                      >
                        This user has no starred repos.
                      </Alert>
                    </Col>
                  )}
                </Grid>
                <Group sx={{ margin: "3rem 0" }} position="center">
                  <Pagination
                    size="md"
                    color="green"
                    radius="xl"
                    total={starredPages}
                    page={activePage}
                    onChange={(e) => handlerPageChange(e)}
                  />
                </Group>
              </Tabs.Tab>
              <Tabs.Tab icon={<BsFillFileEarmarkCodeFill />} label="Gists">
                <Grid>
                  {gistsLoading ? (
                    <Col span={12}>
                      <Spinner />
                    </Col>
                  ) : gists && gists.length ? (
                    gists.map((gist) => {
                      return (
                        <Col span={6}>
                          <RepositoryCard name={gist.id} />
                        </Col>
                      );
                    })
                  ) : (
                    <Col sx={{ marginTop: "1rem" }} span={12}>
                      <Alert
                        icon={<BsFillXCircleFill size={16} />}
                        title="OOPS!"
                        color="red"
                        radius="md"
                      >
                        This user has no gists.
                      </Alert>
                    </Col>
                  )}
                </Grid>
                <Group sx={{ margin: "3rem 0" }} position="center">
                  <Pagination
                    size="md"
                    color="green"
                    radius="xl"
                    total={gistsPages}
                    page={activePage}
                    onChange={(e) => handlerPageChange(e)}
                  />
                </Group>
              </Tabs.Tab>
            </Tabs>
          </Container>
        </>
      ) : (
        <Container fluid>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <BsEmojiDizzyFill size="30" />
            <Text weight={600} sx={{ marginTop: "1rem" }}>
              Whoops!
            </Text>
            <Text size="sm" weight={600} sx={{ marginTop: ".5rem" }}>
              {searchError.split(" - ")[1] === "404"
                ? "User Not Found"
                : "An error Occurred"}
            </Text>
          </Paper>
        </Container>
      )}
    </Paper>
  );
};

export default Profile;
