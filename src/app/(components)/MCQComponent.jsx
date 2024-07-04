// McqComponent.js
import React from 'react';
import McqComponent from '@/app/(components)/MCQComponent.module.css';

const MCQComponent = ({ question, options, onSelect }) => {
  return (
    <div>
      <p>{question}</p>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name="option"
            value={option}
            onChange={() => onSelect(option)}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default MCQComponent;