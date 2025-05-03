// src/pages/LeaderboardPage.jsx
import React, { useState, useEffect } from "react";
import styles from "./LeaderboardPage.module.css";
function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://192.168.29.228:5000/api/leaderboard"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLeaders(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(err.message || "Failed to load leaderboard.");
        setLeaders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.title}>Leaderboard</h2>
      <p className={styles.subtitle}>
        See who's leading the recycling efforts!
      </p>

      <div className={styles.listWrapper}>
        {isLoading && <p className={styles.loading}>Loading leaderboard...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {!isLoading && !error && leaders.length > 0 && (
          <>
            <div className={`${styles.leaderboardItem} ${styles.header}`}>
              <span className={styles.rank}>Rank</span>
              <span className={styles.name}>User</span>
              <span className={styles.score}>Score</span>
            </div>

            {leaders.map((leader, index) => (
              <div
                key={leader.firebaseUid || index}
                className={`${styles.leaderboardItem} ${
                  index === 0
                    ? styles.firstPlace
                    : index === 1
                    ? styles.secondPlace
                    : index === 2
                    ? styles.thirdPlace
                    : ""
                }`}
              >
                <span className={styles.rank}>{leader.rank || index + 1}</span>
                <span className={styles.name}>
                  {leader.username || "Anonymous"}
                </span>
                <span className={styles.score}>{leader.score || 0} pts</span>
              </div>
            ))}
          </>
        )}

        {!isLoading && !error && leaders.length === 0 && (
          <p className={styles.noData}>Leaderboard is empty.</p>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
