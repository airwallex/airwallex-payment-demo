import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hpp from './components/hpp';
import DropIn from './components/dropIn';
import FullFeatureCard from './components/fullFeatureCard';
import SplitCard from './components/splitCard';
import Wechat from './components/wechat';
import Card from './components/card';
import Redirect from './components/redirect';

const App: React.FC = () => (
  <div className="App">
    <h1>Airwallex payment demo - React Typescript</h1>
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
            <FullFeatureCard />
          </Route>
          <Route path="/split-card">
            <SplitCard />
          </Route>
          <Route path="/wechat">
            <Wechat />
          </Route>
          <Route path="/card">
            <Card />
          </Route>
          <Route path="/redirect">
            <Redirect />
          </Route>
        </Switch>
      </div>
      <h2 style={{ marginTop: 100 }}>All Demos</h2>
      <nav>
        <button onMouseDown={() => (window.location.href = '/hpp')}>
          Hosted payment page (HPP)
        </button>
        <br />
        <button onMouseDown={() => (window.location.href = '/drop-in')}>
          DropIn
        </button>
        <br />
        <button
          onMouseDown={() => (window.location.href = '/full-featured-card')}
        >
          Full Featured Card
        </button>
        <br />
        <button onMouseDown={() => (window.location.href = '/split-card')}>
          Split Card element
        </button>
        <br />
        <button onMouseDown={() => (window.location.href = '/wechat')}>
          Wechat element
        </button>
        <br />
        <button onMouseDown={() => (window.location.href = '/card')}>
          Card input element
        </button>
        <br />
        <button onMouseDown={() => (window.location.href = '/redirect')}>
          Redirect element checkout (i.e Alipay)
        </button>
      </nav>
    </Router>
  </div>
);

export default App;
