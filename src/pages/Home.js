import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsMoonStarsFill, BsAt, BsSearch, BsX } from "react-icons/bs";
import { VscGithub } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import { searchUser, getRate } from "../actions/userActions";
import {
  Paper,
  ActionIcon,
  useMantineColorScheme,
  Container,
  Space,
  Button,
  Group,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import Spinner from "../components/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotifications();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const [keyword, setKeyword] = useState();

  const searchResults = useSelector((state) => state.userSearch);
  const rateLimit = useSelector((state) => state.limit);



  const { loading, userSearch, error } = searchResults;
  const { loading: rateLimitLoading, error: rateLimitError, limit } = rateLimit;

  const searchHandler = (event) => {
    dispatch(searchUser(keyword));
  };

  useEffect(() => {
    if (Object.keys(userSearch).length) {
      navigate(`/profile/${userSearch.login}`);
    }
  }, [userSearch]);

  useEffect(() => {
    if (error) {
      notifications.showNotification({
        title: "Oops!",
        message: "No users found with the username you entered. Try Again!",
        icon: <BsX />,
        color: "red",
        duration: 10000,
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(getRate());
  }, [dispatch])

  return (
    <Paper sx={{ borderRadius: "0px", paddingTop: '1rem' }}>

      <Container
        sx={{
          maxWidth: "none",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VscGithub size="30" />
        <Space h="sm" />
        <Text sx={{ fontSize: "2.2rem" }} weight={700}>
          Github Search
        </Text>
        <Space h="sm" />

        <Group direction="row" position="center">
          <TextInput
            onChange={(e) => setKeyword(e.target.value)}
            disabled={loading}
            icon={<BsAt />}
            radius="md"
            size="md"
            placeholder="Your github username"
          />
          <ActionIcon
            loading={loading}
            onClick={() => searchHandler()}
            variant="filled"
            radius="xl"
            color="green"
            size="lg"
          >
            <BsSearch />
          </ActionIcon>
        </Group>
      </Container>
    </Paper>
  );
};

export default Home;
