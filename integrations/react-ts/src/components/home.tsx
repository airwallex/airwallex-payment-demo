import React from 'react';
import { Link } from 'react-router-dom';
import Instructions from './instructions';

const Index: React.FC = () => {
  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>Airwallex Payment Demo - React Typescript</h1>
      </Link>
      <div className="container">
        <nav>
          <h2>All Demos</h2>
          <Link to="/card">
            <button>Card Element</button>
          </Link>
          <Link to="/hpp">
            <button>Hosted payment page (HPP)</button>
          </Link>
          <Link to="/drop-in">
            <button>DropIn Element</button>
          </Link>
          <Link to="/split-card">
            <button>Split Card Element</button>
          </Link>
          <Link to="/kr-split-card">
            <button>KR Local Card Split Element</button>
          </Link>
        </nav>
        <Instructions />
      </div>
    </div>
  );
};

export default Index;
