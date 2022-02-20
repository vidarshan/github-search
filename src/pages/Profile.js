import React, { useEffect, useRef, useState } from "react";
import {
  getUserInfo,
  getUserRepos,
  getUserStarred,
} from "../actions/userActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import {
  BsGlobe,
  BsEnvelope,
  BsSearch,
  BsTwitter,
  BsGithub,
} from "react-icons/bs";
import {
  Container,
  Image,
  Paper,
  Button,
  ActionIcon,
  Tabs,
  Tab,
  Text,
  Group,
  Grid,
  Col, Pagination
} from "@mantine/core";
import { searchUser } from "../actions/userActions";
import RepositoryCard from '../components/RepositoryCard';
import { useParams } from "react-router";


const Profile = ({ match }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [pages, setPages] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState(1);
  // const years = useRef(0);
  // const months = useRef(0);
  // const days = useRef(0);

  // const [isCopied, setIsCopied] = useState(false);
  // const [copiedLink, setCopiedLink] = useState(null);

  const searchResults = useSelector((state) => state.userSearch);
  const { loading, userSearch, error } = searchResults;

  // const getDuration = (createdDate) => {
  //   let interval;
  //   console.log(createdDate);

  //   if (createdDate) {
  //     // interval = intervalToDuration({
  //     //   start: new Date(),
  //     //   end: new Date(createdDate),
  //     // });

  //     // years.current = interval.years;
  //     // months.current = interval.months;
  //     // days.current = interval.days;
  //   }
  // };

  // const {
  //   loading: userLoading,
  //   error: userError,
  //   getUser: user,
  // } = useSelector((state) => state.getUser);
  const {
    loading: repoLoading,
    error: repoError,
    userRepos: repos,
  } = useSelector((state) => state.userRepos);
  // const {
  //   loading: starredLoading,
  //   error: starredError,
  //   userStarred: starred,
  // } = useSelector((state) => state.userStarred);

  // const goBackHandler = () => {
  //   // history.goBack();
  // };

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Copied Link",
  //     description: "Repo clone URL Copied to the clipboard.",
  //   });
  // };
  // const copyToClipboard = (text, id) => {
  //   setCopiedLink(id);
  //   setIsCopied(false);
  //   navigator.clipboard.writeText(text + ".git");
  //   setIsCopied(true);

  //   if (isCopied) {
  //     // openNotificationWithIcon("success");
  //   }
  // };

  const handlerPageChange = (e) => {
    setActivePage(e)
    console.log(activePage)

  }

  useEffect(() => {

    if (userSearch) {

      if (Math.round(userSearch.public_repos % 50) > 0) {
        setPages(Math.round(userSearch.public_repos / 50) + 1)
        console.log("d", activePage)
      } else {
        setPages(Math.round(userSearch.public_repos / 50))
        console.log("e", activePage)
      }


    }
  }, [userSearch])

  useEffect(() => {
    dispatch(getUserRepos(params.name, activePage));
  }, [activePage])


  useEffect(() => {
    console.log(params);
    // dispatch(getUserInfo(match.params.name));

    // dispatch(getUserStarred(match.params.name));
  }, [dispatch, match]);

  return (
    <Paper sx={{ minHeight: "100vh" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          backgroundColor: "#2b3137",
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
        <Text sx={{ fontSize: "1rem" }} weight={400}>
          @{userSearch.login}
        </Text>
        <Group sx={{ marginTop: '1rem' }} direction="row" position="center">
          <Text align="center">
            {userSearch.followers} <br /> Followers
          </Text>
          <Text align="center">
            {userSearch.following} <br /> Following
          </Text>
        </Group>
        <Group sx={{ marginTop: "1rem" }} direction="row" position="center">
          <ActionIcon
            loading={loading}
            variant="filled"
            radius="xl"
            color="green"
            size="lg"
          >
            <BsSearch />
          </ActionIcon>
          <ActionIcon
            loading={loading}
            variant="filled"
            radius="xl"
            color="cyan"
            size="lg"
          >
            <BsGlobe />
          </ActionIcon>
          <ActionIcon
            loading={loading}
            variant="filled"
            radius="xl"
            color="blue"
            size="lg"
          >
            <BsTwitter />
          </ActionIcon>
          <ActionIcon
            loading={loading}
            variant="filled"
            radius="xl"
            color="yellow"
            size="lg"
          >
            <BsEnvelope />
          </ActionIcon>
        </Group>
      </Container>
      <Container sx={{ marginTop: '1rem' }}>
        <Tabs color='green' active={activeTab} onTabChange={setActiveTab}>
          <Tabs.Tab label="Repositories">
            <Grid>
              <Col span={6}>
                <RepositoryCard name='Sample-repo' description={`nfrebfhbe rferbferfer ybreygfyr erebvurev nrenvuireburebg breugburegb urebgreg brehvbrf hvbhr ebverbvbef hvbefb verbvb`} forksCount={34023} starsCount={45942} language='TypeScript' size={29232} />
              </Col>
              {/* {repoLoading ? <div>loading</div> : repos.map((repo) => {
                return <Col span={6}>
                  <RepositoryCard name={repo.name} description={repo.description} forksCount={repo.forks_count} starsCount={repo.stargazers_count} language={repo.language} size={repo.size} />
                </Col>
              })} */}
            </Grid>
            <Group sx={{ margin: '2rem 0' }} position='center'>
              <Pagination color='green' radius='md' total={pages} page={activePage} onChange={(e) => handlerPageChange(e)} />
            </Group>
          </Tabs.Tab>
          <Tabs.Tab label="Starred">Second tab content</Tabs.Tab>
          <Tabs.Tab label="Gists">Third tab content</Tabs.Tab>
        </Tabs>
      </Container>
    </Paper>
  );
};

export default Profile;
