import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Results from './pages/Results';


function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/' component={Home} exact />
        <Route path='/search/:word' component={Results} />
      </div>
    </Router>
  );
}

export default App;
