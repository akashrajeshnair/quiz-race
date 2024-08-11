import React, { useEffect, useState } from 'react';
import styles from '@/app/(components)/Quiz/MCQMediaComponent.module.css';

const MCQComponent = ({ question, options, mediaLinks, onSelect }) => {
  const links = mediaLinks.split(',');

  return (
    <div className={styles.mcqComponent}>
      <p>{question}</p>
      {options.map((option, index) => (
        <div key={index} className={styles.option}>
          <input
            type="radio"
            name="option"
            value={option}
            onChange={() => onSelect(option)}
          />
          <label>{option}</label>
          {links[index] && (
            <div className={styles.media}>
                <img src={links[index]} alt={`Option ${index + 1}`} className={styles.image} />             
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MCQComponent;

