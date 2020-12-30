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
    <Router>
      <Switch>
        <Route path="/hpp">
          <Hpp />
        </Route>
        <Route path="/dropin">
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
    </Router>
  </div>
);

export default App;
