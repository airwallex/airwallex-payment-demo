/**
 * App.tsx
 * Airwallex Payment Demo - React Typescript.  Created by Olivia Wei and Josie Ku.
 *
 * This file defines all the endpoints for the demos in this app.
 */

import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App: React.FC = () => (
  <div className="App">
    <Router>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>Airwallex Payment Demo - React Typescript</h1>
      </Link>
      <div className="container">
        <nav>
          <h2>All Demos</h2>
          <Link to="/card">
            <button>Card element</button>
          </Link>
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
          <Link to="/redirect">
            <button>Redirect element</button>
          </Link>
        </nav>
        <div className="payment-frame">
          <Suspense fallback={<div />}>
            <Switch>
              <Route path="/hpp" component={lazy(() => import('./components/hpp'))} />
              <Route path="/drop-in" component={lazy(() => import('./components/dropIn'))} />
              <Route path="/full-featured-card" component={lazy(() => import('./components/fullFeatureCard'))} />
              <Route path="/split-card" component={lazy(() => import('./components/splitCard'))} />
              <Route path="/wechat" component={lazy(() => import('./components/wechat'))} />
              <Route path="/card" component={lazy(() => import('./components/card'))} />
              <Route path="/redirect" component={lazy(() => import('./components/redirect'))} />
              <Route exact path="/" component={lazy(() => import('./components/instructions'))} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  </div>
);

export default App;
