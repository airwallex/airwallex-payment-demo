import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App: React.FC = () => (
  <div className="App">
    <h1>Airwallex Payment Demo - React Typescript</h1>
    <Router>
      <div className="container">
        <nav>
          <h2>All Demos</h2>
          <Link to="/hpp">
            <button>Hosted payment page (HPP)</button>
          </Link>
          <Link to="/drop-in">
            <button>DropIn</button>
          </Link>
          <Link to="/full-featured-card">
            <button>Full Featured Card</button>
          </Link>
          <Link to="/split-card">
            <button>Split Card element</button>
          </Link>
          <Link to="/wechat">
            <button>Wechat element</button>
          </Link>
          <Link to="/card">
            <button>Card element</button>
          </Link>
          <Link to="/redirect">
            <button>Redirect element checkout (i.e Alipay)</button>
          </Link>
        </nav>
        <div className="payment-frame">
          <Suspense fallback={<div />}>
            <Switch>
              <Route
                path="/hpp"
                component={lazy(() => import('./components/hpp'))}
              />
              <Route
                path="/drop-in"
                component={lazy(() => import('./components/dropIn'))}
              />
              <Route
                path="/full-featured-card"
                component={lazy(() => import('./components/fullFeatureCard'))}
              />
              <Route
                path="/split-card"
                component={lazy(() => import('./components/splitCard'))}
              />
              <Route
                path="/wechat"
                component={lazy(() => import('./components/wechat'))}
              />
              <Route
                path="/card"
                component={lazy(() => import('./components/card'))}
              />
              <Route
                path="/redirect"
                component={lazy(() => import('./components/redirect'))}
              />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  </div>
);

export default App;
