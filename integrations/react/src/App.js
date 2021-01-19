import './App.css';
import DropIn from './components/DropIn';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import FullFeaturedCard from './components/FullFeaturedCard';
import Hpp from './components/Hpp';
import SplitCard from './components/SplitCard';
import Wechat from './components/Wechat';

function App() {
  return (
    <div className="App">
      <h1>Airwallex payment demo - React</h1>
      <Router>
        <div className="loading-container">
          <Switch>
            <Route path="/hpp">
              <Hpp />
            </Route>
            <Route path="/drop-in">
              <DropIn />
            </Route>
            <Route path="/full-featured-card">
              <FullFeaturedCard />
            </Route>
            <Route path="/split-card">
              <SplitCard />
            </Route>
            <Route path="/wechat">
              <Wechat />
            </Route>
          </Switch>
        </div>
        <h2 style={{ marginTop: 100 }}>All Demos</h2>
        <nav>
          <button onMouseDown={() => window.location.href = '/hpp'}>Hosted payment page (HPP)</button>
          <br />
          <button onMouseDown={() => window.location.href = '/drop-in'}>DropIn</button>
          <br />
          <button onMouseDown={() => window.location.href = '/full-featured-card'}>Full Featured Card</button>
          <br />
          <button onMouseDown={() => window.location.href = '/split-card'}>Split Card element</button>
          <br />
          <button onMouseDown={() => window.location.href = '/wechat'}>Wechat element</button>
          <br />
        </nav>
      </Router>
    </div>
  );
}

export default App;
