import React from 'react';
import successIcon from './svgs/demoSuccess.svg';

const Index: React.FC = () => {
  return (
    <div>
      <img src={successIcon} alt="success-icon" />
      <h1 style={{ borderStyle: 'none' }}>Thanks for your order!</h1>
    </div>
  );
};

export default Index;
