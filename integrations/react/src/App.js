/**
 * App.js
 * Airwallex Payment Demo - React.  Created by Roy Yang and Josie Ku.
 *
 * This file defines all the endpoints for the examples in this app.
 */

import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Airwallex Payment Demo - React</h1>
      <Router className="router-container">
        <div className="container">
          <nav>
            <h2>All Demos</h2>
            <Link to="/card">
              <button>Card</button>
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
          </nav>
          <div className="payment-frame">
            <Suspense fallback={<div />}>
              <Switch>
                <Route
                  path="/card"
                  component={lazy(() => import('./components/Card'))}
                />
                <Route
                  path="/hpp"
                  component={lazy(() => import('./components/Hpp'))}
                />
                <Route
                  path="/drop-in"
                  component={lazy(() => import('./components/DropIn'))}
                />
                <Route
                  path="/full-featured-card"
                  component={lazy(() =>
                    import('./components/FullFeaturedCard'),
                  )}
                />
                <Route
                  path="/split-card"
                  component={lazy(() => import('./components/SplitCard'))}
                />
                <Route
                  path="/wechat"
                  component={lazy(() => import('./components/Wechat'))}
                />
                <Route
                  exact
                  path="/"
                  component={lazy(() => import('./components/Card'))}
                />
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
