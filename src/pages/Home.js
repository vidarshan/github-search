import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsMoonStarsFill, BsAt, BsSearch, BsX } from "react-icons/bs";
import { VscGithub } from 'react-icons/vsc';
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from '@mantine/notifications';
import { searchUser } from "../actions/userActions";
import { Paper, ActionIcon, useMantineColorScheme, Container, Space, Button, Group, Text, TextInput, useMantineTheme } from '@mantine/core';


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotifications();


  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const [keyword, setKeyword] = useState();

  const searchResults = useSelector((state) => state.userSearch);

  const { loading, userSearch, error } = searchResults;

  const searchHandler = (event) => {
    dispatch(searchUser(keyword))


  };

  useEffect(() => {
    if (Object.keys(userSearch).length) {
      navigate(`/profile/${userSearch.login}`)
    }

  }, [userSearch])


  useEffect(() => {
    if (error) {
      notifications.showNotification({
        title: 'Oops!',
        message: 'No users found with the username you entered. Try Again!',
        icon: <BsX />,
        color: 'red',
        duration: 10000
      })
    }
  }, [error])

  return (
    <Paper>
      <Container sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', height: '5vh' }} fluid>
        <Text size='md' weight={500}>57 / 60 Requests</Text>
        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme" radius='md'
        >
          {dark ? (
            <BsMoonStarsFill />
          ) : (
            <BsMoonStarsFill />
          )}
        </ActionIcon>

      </Container>
      <Container sx={{ maxWidth: 'none', height: '95vh', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <VscGithub size='30' />
        <Space h="sm" />
        <Text sx={{ fontSize: "2.2rem" }} weight={700}>Github Search</Text>
        <Space h="sm" />

        <Group direction='row' position='center'>
          <TextInput
            onChange={(e) => setKeyword(e.target.value)}
            disabled={loading}
            icon={<BsAt />}
            radius='md'
            size='md'

            placeholder="Your github username"
          />
          <ActionIcon loading={loading} onClick={() => searchHandler()} variant='filled' radius='xl' color='green'
            size='lg'>
            <BsSearch />
          </ActionIcon>

        </Group>


      </Container>

    </Paper>
  );
};

export default Home;
