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
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact path="/" component={lazy(() => import('./pages/home'))} />
          <Route exact path="/hpp-flow" component={lazy(() => import('./pages/hppFlow'))} />
        </Switch>
      </Suspense>
    </Router>
  </div>
);

export default App;
