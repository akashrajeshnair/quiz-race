// MatchComponent.js
import React from 'react';
import MatchComponent from '../(components)/Match_the FollowingComponent';


const matchComponent = ({ questions, options, onSelect }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          <select onChange={(e) => onSelect(index, e.target.value)}>
            {options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default matchComponent;