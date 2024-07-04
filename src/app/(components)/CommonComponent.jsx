import React from 'react';
import styles from '../(components)/CommonComponent.module.css';


const CommonComponent = ({ question, children }) => {
  return (
    <div>
      <p>{question}</p>
      {children}
    </div>
  );
};

export default CommonComponent;