/**
 * App.tsx
 * Airwallex Payment Demo - React Typescript.  Created by Olivia Wei and Josie Ku.
 *
 * This file defines all the endpoints for the demos in this app.
 */

import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: React.FC = () => (
  <div className="App">
    <Router>
      <div>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" component={lazy(() => import('./components/home'))} />
            <Route path="/all" exact component={lazy(() => import('./components/home'))} />
            <Route path="/hpp" exact component={lazy(() => import('./components/hpp'))} />
            <Route path="/drop-in" exact component={lazy(() => import('./components/dropIn'))} />
            <Route path="/full-featured-card" exact component={lazy(() => import('./components/fullFeatureCard'))} />
            <Route path="/split-card" exact component={lazy(() => import('./components/splitCard'))} />
            <Route path="/wechat" exact component={lazy(() => import('./components/wechat'))} />
            <Route path="/card" exact component={lazy(() => import('./components/card'))} />
            <Route path="/redirect" exact component={lazy(() => import('./components/redirect'))} />
            <Route path="/checkout-success" exact component={lazy(() => import('./components/checkoutSuccess.tsx'))} />
            <Route path="/instructions" exact component={lazy(() => import('./components/instructions'))} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  </div>
);

export default App;
