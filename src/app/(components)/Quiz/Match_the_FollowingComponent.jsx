import React from 'react';
import styles from '../Quiz/Match_the_FollowingComponent.module.css';

const MatchComponent = ({ question, questions, options, onSelect, answers }) => {
  return (
    <div className={styles.matchComponent}>
      <p>{question}</p>
      <div className={styles.matchComponent}>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question}</p>
            <select 
              value={answers[index] || ''} 
              onChange={(e) => onSelect(index, e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              {options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {answers[index] && <p>Selected Answer: {answers[index]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchComponent;
