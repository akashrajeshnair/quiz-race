import React from 'react';
import styles from './leaderboard.module.css'; 

const Leaderboard = () => {
 
  const players = [
    { name: 'Player A', points: 120 },
    { name: 'Player B', points: 90 },
    { name: 'Player C', points: 110 },
    { name: 'Player D', points: 80 },
    { name: 'Player E', points: 100 },
  ];

 
  const sortedPlayers = players.sort((a, b) => b.points - a.points);


  const maxPoints = sortedPlayers[0].points;

  return (
    <div className={styles.scoreboardContainer}>
      <div className={styles.scoreboard}>
        <h2>Leaderboard</h2>
        <div className={styles.summary}>
          <p>Top Player: {sortedPlayers[0].name}</p>
        </div>
        <div className={styles.playerTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Player</th>
                <th>Points</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <tr key={index} className={index === 0 ? 'top-player' : ''}>
                  <td>{player.name}</td>
                  <td>{player.points}</td>
                  <td>
                    <div className={styles.progressBar} style={{ width: `${(player.points / maxPoints) * 100}%` }}></div>
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