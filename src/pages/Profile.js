import React, { useEffect, useRef, useState } from "react";
import {
  getUserGists,
  getUserInfo,
  getUserRepos,
  getUserStarred,
} from "../actions/userActions";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import {
  BsGlobe,
  BsEnvelope,
  BsSearch,
  BsTwitter,
  BsGithub, BsFillFileEarmarkCodeFill, BsFillXCircleFill, BsFillStarFill, BsFillFileZipFill
} from "react-icons/bs";
import {
  Container,
  Image,
  Paper,
  Button,
  ActionIcon,
  Tabs,
  Alert,
  Text,
  Group,
  Grid,
  Col, Pagination
} from "@mantine/core";
import { searchUser } from "../actions/userActions";
import RepositoryCard from '../components/RepositoryCard';
import { useParams } from "react-router";
import { RiGitRepositoryLine, RiStarLine } from 'react-icons/ri';


const Profile = ({ match }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [repoPages, setRepoPages] = useState(1);
  const [gistsPages, setGistsPages] = useState(1);
  const [starredPages, setStarredPages] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const alload = true;
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
  }

  useEffect(() => {

    if (userSearch) {

      if (activeTab === 0) {
        if (Math.round(userSearch.public_repos % 50) > 0) {
          setRepoPages(Math.round(userSearch.public_repos / 50) + 1)
          console.log("d", activePage)
        } else {
          setRepoPages(Math.round(userSearch.public_repos / 50))
          console.log("e", activePage)
        }
      }

      if (activeTab === 1) {
        if (Math.round(userSearch.public_repos % 50) > 0) {
          setGistsPages(Math.round(userSearch.public_repos / 50) + 1)
          console.log("d", activePage)
        } else {
          setGistsPages(Math.round(userSearch.public_repos / 50))
          console.log("e", activePage)
        }
      }


      if (activeTab === 2) {
        if (Math.round(userSearch.public_repos % 50) > 0) {
          setStarredPages(Math.round(userSearch.public_repos / 50) + 1)
          console.log("d", activePage)
        } else {
          setStarredPages(Math.round(userSearch.public_repos / 50))
          console.log("e", activePage)
        }
      }


    }
  }, [userSearch])

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
      dispatch(getUserRepos(params.name, 1))
    } else if (activeTab === 1) {
      dispatch(getUserStarred(params.name, 1));
    } else {
      dispatch(getUserGists(params.name, 1));
    }
  }, [activeTab])

  useEffect(() => {

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
        <Tabs grow variant="pills" color='green' active={activeTab} onTabChange={setActiveTab}>
          <Tabs.Tab icon={<BsFillFileZipFill />} label="Repositories">
            <Grid>
              {/* {alload ? <Col span={12}><Spinner /></Col> : <Col span={6}>
                <RepositoryCard name='Sample-repo' description={`nfrebfhbe rferbferfer ybreygfyr erebvurev nrenvuireburebg breugburegb urebgreg brehvbrf hvbhr ebverbvbef hvbefb verbvb`} forksCount={34023} starsCount={45942} language='TypeScript' size={29232} />
              </Col>} */}

              {repoLoading ? <Col span={12}><Spinner /></Col> : repos && repos.length ? repos.map((repo) => {
                return <Col span={6}>
                  <RepositoryCard name={repo.name} description={repo.description} forksCount={repo.forks_count} starsCount={repo.stargazers_count} language={repo.language} size={repo.size} />
                </Col>
              }) : <Col sx={{ marginTop: '1rem' }} span={12}><Alert icon={<BsFillXCircleFill size={16} />} title="OOPS!" color="red" radius="md">
                This user has no public repos.
              </Alert></Col>}
            </Grid>
            <Group sx={{ margin: '3rem 0' }} position='center'>
              <Pagination size="md" color='green' radius='xl' total={repoPages} page={activePage} onChange={(e) => handlerPageChange(e)} />
            </Group>
          </Tabs.Tab>
          <Tabs.Tab icon={<BsFillStarFill />} label="Starred">
            <Grid>
              {starredLoading ? <Col span={12}><Spinner /></Col> : starred && starred.length ? starred.map((star) => {
                return <Col span={6}>
                  <RepositoryCard name={star.name} description={star.description} language={star.language} size={star.size} />
                </Col>
              }) : <Col sx={{ marginTop: '1rem' }} span={12}><Alert icon={<BsFillXCircleFill size={16} />} title="OOPS!" color="red" radius="md">
                This user has no starred repos.
              </Alert></Col>}
            </Grid>
            <Group sx={{ margin: '3rem 0' }} position='center'>
              <Pagination size="md" color='green' radius='xl' total={starredPages} page={activePage} onChange={(e) => handlerPageChange(e)} />
            </Group>
          </Tabs.Tab>
          <Tabs.Tab icon={<BsFillFileEarmarkCodeFill />} label="Gists">

            <Grid>
              {gistsLoading ? <Col span={12}><Spinner /></Col> : gists && gists.length ? gists.map((gist) => {
                return <Col span={6}>
                  <RepositoryCard name={gist.id} />
                </Col>
              }) : <Col sx={{ marginTop: '1rem' }} span={12}><Alert icon={<BsFillXCircleFill size={16} />} title="OOPS!" color="red" radius="md">
                This user has no gists.
              </Alert></Col>}
            </Grid>
            <Group sx={{ margin: '3rem 0' }} position='center'>
              <Pagination size="md" color='green' radius='xl' total={gistsPages} page={activePage} onChange={(e) => handlerPageChange(e)} />
            </Group>
          </Tabs.Tab>
        </Tabs>
      </Container>
    </Paper>
  );
};

export default Profile;
