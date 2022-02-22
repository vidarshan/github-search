import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsAt, BsSearch, BsX } from "react-icons/bs";
import { VscGithub } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import { getRate } from "../actions/userActions";
import {
  Paper,
  ActionIcon,
  Container,
  Space,
  Group,
  Text,
  TextInput
} from "@mantine/core";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotifications();


  const [keyword, setKeyword] = useState();

  const rateLimit = useSelector((state) => state.limit);


  const { loading: rateLimitLoading, error: rateLimitError } = rateLimit;

  const searchHandler = () => {
    navigate(`/profile/${keyword}`);
  };


  useEffect(() => {
    if (rateLimitError) {
      notifications.showNotification({
        title: "Oops!",
        message: "Rate Limit Exceeded, try later.",
        icon: <BsX />,
        color: "red",
        duration: 10000,
      });
    }
    //eslint-disable-next-line
  }, [rateLimitError]);

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
            disabled={rateLimitLoading}
            icon={<BsAt />}
            radius="md"
            size="md"
            placeholder="Your github username"
          />
          <ActionIcon
            loading={rateLimitLoading}
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
