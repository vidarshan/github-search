import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Home} exact />
        <Route path="/search/:word" component={Results} />
        <Route path="/profile/:name" component={Profile} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
