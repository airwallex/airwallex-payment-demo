/**
 * App.tsx
 * Airwallex Payment Demo - React Typescript.  Created by Olivia Wei and Josie Ku.
 *
 * This file defines all the endpoints for the demos in this app.
 */

import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => (
  <div className="App">
    <Router>
      <div>
        <Suspense fallback={<div />}>
          <Routes>
            <Route path="/" Component={lazy(() => import('./components/home'))} />
            <Route path="/all" Component={lazy(() => import('./components/home'))} />
            <Route path="/hpp" Component={lazy(() => import('./components/hpp'))} />
            <Route path="/drop-in" Component={lazy(() => import('./components/dropIn'))} />
            <Route path="/split-card" Component={lazy(() => import('./components/splitCard'))} />
            <Route path="/card" Component={lazy(() => import('./components/card'))} />
            <Route path="/checkout-success" Component={lazy(() => import('./components/checkoutSuccess.tsx'))} />
            <Route path="/instructions" Component={lazy(() => import('./components/instructions'))} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  </div>
);

export default App;
