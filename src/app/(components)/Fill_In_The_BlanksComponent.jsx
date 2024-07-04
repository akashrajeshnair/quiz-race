// BlankComponent.js
import React from 'react';
import BlankComponent from '../(components)/Fill_In_The_BlanksComponent';


const bComponent = ({ question, answer, onChange }) => {
  return (
    <div>
      <p>{question}</p>
      <input type="text" value={answer} onChange={onChange} />
    </div>
  );
};

export default bComponent;