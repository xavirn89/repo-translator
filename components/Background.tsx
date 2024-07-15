// components/Background.tsx

import React from 'react';
import '@/public/styles/background.css';

const Background: React.FC = () => {
  return (
    <div className="background">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i}></span>
      ))}
    </div>
  );
};

export default Background;
