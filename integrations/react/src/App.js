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
      <Router className="router-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Airwallex Payment Demo - React</h1>
        </Link>
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
            <Link to="/redirect">
              <button>Redirect element</button>
            </Link>
            <Link to="/qrcode">
              <button>Qrcode element</button>
            </Link>
            <Link to="/split-card-recurring">
              <button>Split Card element - Recurring</button>
            </Link>
            <Link to="/recurring-cit">
              <button>Recurring CIT</button>
            </Link>
            <Link to="/api-checkout">
              <button>API Checkout</button>
            </Link>
          </nav>
          <div className="payment-frame">
            <Suspense fallback={<div />}>
              <Switch>
                <Route path="/card" component={lazy(() => import('./components/Card'))} />
                <Route path="/hpp" component={lazy(() => import('./components/Hpp'))} />
                <Route path="/drop-in" component={lazy(() => import('./components/DropIn'))} />
                <Route path="/full-featured-card" component={lazy(() => import('./components/FullFeaturedCard'))} />
                <Route path="/split-card" component={lazy(() => import('./components/SplitCard'))} />
                <Route path="/wechat" component={lazy(() => import('./components/Wechat'))} />
                <Route path="/redirect" component={lazy(() => import('./components/Redirect'))} />
                <Route path="/qrcode" component={lazy(() => import('./components/Qrcode'))} />
                <Route path="/split-card-recurring" component={lazy(() => import('./components/SplitCardRecurring'))} />
                <Route path="/recurring-cit" component={lazy(() => import('./components/RecurringCIT'))} />
                <Route path="/api-checkout" component={lazy(() => import('./components/APICheckout'))} />
                <Route exact path="/" component={lazy(() => import('./components/Instructions'))} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
