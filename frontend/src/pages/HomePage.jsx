// src/pages/HomePage.jsx
import React from 'react';
import styles from './HomePage.module.css'; // Import CSS Module
import { FaRecycle, FaTrash, FaTrophy, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomePage() {

  const features = [
    {
      title: 'Scan Waste',
      description: 'Use AI to identify and sort your waste items',
      link: '/scan',
      icon: <FaRecycle className={styles.icon} />
    },
    {
      title: 'Disposal Guide',
      description: 'Learn how to properly dispose of different types of waste',
      link: '/guide',
      icon: <FaTrash className={styles.icon} />
    },
    {
      title: 'Leaderboard',
      description: 'Compete with others and track your recycling achievements',
      link: '/leaderboard',
      icon: <FaTrophy className={styles.icon} />
    },
    {
      title: 'Profile',
      description: 'View your recycling history and achievements',
      link: '/profile',
      icon: <FaUser className={styles.icon} />
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.header}>
          <FaRecycle className={styles.headerIcon} />
          <h1 className={styles.title}>Waste wise</h1>
        </div>
        <p className={styles.subtitle}>Your smart companion for sustainable waste management</p>
      </div>
      
      <div className={styles.features}>
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className={styles.cardLink}>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;