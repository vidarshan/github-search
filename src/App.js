import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import { MantineProvider, ColorSchemeProvider, ColorScheme, Paper, Container, ActionIcon, Text } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BsMoonStarsFill, BsAt, BsSearch, BsX } from "react-icons/bs";
import { useHotkeys, useLocalStorageValue } from '@mantine/hooks';
import './styles/styles.scss'
import { searchUser, getRate } from "./actions/userActions";
import Spinner from "./components/Spinner";

function App() {

  const rateLimit = useSelector((state) => state.limit);

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  const dark = colorScheme === "dark";
  const dispatch = useDispatch();
  const { loading: rateLimitLoading, error: rateLimitError, limit } = rateLimit;
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  useEffect(() => {
    dispatch(getRate());
  }, [dispatch])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
        <Paper sx={{ borderRadius: '0px' }}>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "5vh",
            }}
            fluid
          >
            {rateLimitLoading ? <Spinner /> : limit && Object.keys(limit) ? <Text size="xs" weight={700}>
              {Object.keys(limit).includes('rate') && limit.rate.remaining} / {Object.keys(limit).includes('rate') && limit.rate.limit} Requests
            </Text> : <></>}


            <ActionIcon
              variant="filled"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              radius="xl"
              size='md'
            >
              {dark ? <BsMoonStarsFill /> : <BsMoonStarsFill />}
            </ActionIcon>
          </Container>
          <NotificationsProvider position='top-center'>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/:word" element={<Results />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route path="*" element={<NotFound title='Not found' />} />
              </Routes>
            </BrowserRouter>
          </NotificationsProvider>
          <Footer />
        </Paper>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
