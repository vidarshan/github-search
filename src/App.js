import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import { MantineProvider, ColorSchemeProvider, ColorScheme, Paper } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from "react";
import { useHotkeys, useLocalStorageValue } from '@mantine/hooks';
import './styles/styles.scss'

function App() {

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
        <Paper>
          <NotificationsProvider position='top-center'>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/:word" element={<Results />} />
                <Route path="/profile/:name" element={<Profile />} />
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
