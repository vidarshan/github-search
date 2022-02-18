import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useState } from "react";
import './styles/styles.scss'

function App() {

  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider>
        <Router>
          <Route path="/" component={Home} exact />
          <Route path="/search/:word" component={Results} />
          <Route path="/profile/:name" component={Profile} />
          <Footer />
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
