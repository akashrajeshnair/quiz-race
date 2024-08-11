"use client"
import React, { useEffect, useState } from 'react';
import styles from './leaderboard.module.css'; 
import { useRouter } from 'next/router';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  let flag = 1;
  
  useEffect(() => {
    fetch('/api/leaderboard')
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard data:', error);
        router.push('/');
      });
  }, []);

  if(flag === 0) {
    return <div className={styles.scoreboardContainer}>Error...</div>
  }

  if (players.length === 0) {
    return <div className={styles.scoreboardContainer}>Loading...</div>;
  }


  return (
    <div className={styles.scoreboardContainer}>
      <div className={styles.scoreboard}>
        <h2>Leaderboard</h2>
        <div className={styles.summary}>
          <p>Top Player: {players[0].name}</p>
        </div>
        <div className={styles.playerTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Player</th>
                <th>Points</th>
                <th>Correct/Incorrect</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.points}</td>
                  <td>
                    {player.correct}/{player.incorrect}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
