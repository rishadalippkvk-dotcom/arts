import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getResults } from '../services/api';
import { HOUSE_COLORS, HOUSE_BG_COLORS } from '../utils/houseMapping';

const Home = () => {
  const navigate = useNavigate();
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getResults();
        setResultsData(res.data);
      } catch (err) {
        console.error('Failed to fetch results:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // Calculate House Statistics
  const houseStats = useMemo(() => {
    const stats = {
      ASTRA: { name: 'ASTRA', total: 0, color: HOUSE_COLORS.ASTRA, bg: HOUSE_BG_COLORS.ASTRA },
      EAKHA: { name: 'EAKHA', total: 0, color: HOUSE_COLORS.EAKHA, bg: HOUSE_BG_COLORS.EAKHA },
      LOKHA: { name: 'LOKHA', total: 0, color: HOUSE_COLORS.LOKHA, bg: HOUSE_BG_COLORS.LOKHA }
    };

    resultsData.forEach(res => {
      if (stats[res.house]) {
        stats[res.house].total += res.points;
      }
    });

    return Object.values(stats).sort((a, b) => b.total - a.total);
  }, [resultsData]);

  const maxScore = Math.max(...houseStats.map(h => h.total), 1);

  return (
    <div className="home">
      <section className="hero">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sub-header"
        >
          EVORIC Student's Union 2025–26
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="main-title"
        >
          <span className="red">ANNUAL</span><br />
          SPORTS & GAMES<br />
          <span className="navy">MEET 2025-26</span>
        </motion.h1>

        <div className="cta-group">
          <button className="btn-primary" onClick={() => navigate('/schedule')}>View Schedule</button>
          <button className="btn-outline" onClick={() => navigate('/schedule')}>Tournament Rules</button>
        </div>
      </section>

      {/* House Status Bar */}
      {!loading && (
        <motion.section
          className="house-status-bar glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="status-title">Live House Standings</h2>
          <div className="houses-grid">
            {houseStats.map((house, index) => (
              <motion.div
                key={house.name}
                className="house-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                style={{ borderTop: `4px solid ${house.color}` }}
              >
                <div className="house-header">
                  <span className="house-name" style={{ color: house.color }}>
                    {house.name}
                  </span>
                  {index === 0 && house.total > 0 && (
                    <span className="rank-badge first">1st</span>
                  )}
                  {index === 1 && <span className="rank-badge">2nd</span>}
                  {index === 2 && <span className="rank-badge">3rd</span>}
                </div>
                <div className="house-score" style={{ color: house.color }}>
                  {house.total}
                </div>
                <div className="progress-bar-container">
                  <motion.div
                    className="progress-bar"
                    style={{ backgroundColor: house.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(house.total / maxScore) * 100}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                </div>
                <div className="house-label">Total Points</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      <section className="college-footer glass">
        <div className="logos">
          <div className="logo-item">
            <span className="logo-text">EVORIC</span>
          </div>
          <div className="divider"></div>
          <div className="logo-item">
            <span className="logo-text">DUXFORD</span>
            <small>COLLEGE FOR ADVANCED STUDIES</small>
          </div>
        </div>
        <div className="contact">
          <p>Duxford College for Advanced Studies</p>
          <p>+91 4931 214 400 | +91 92 35 400 800</p>
        </div>
      </section>

      <style>{`
        .home {
            padding-bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
            min-height: 80vh;
        }
        .hero {
            text-align: center;
            padding: 6rem 0 3rem 0;
            max-width: 900px;
        }
        .sub-header {
            font-weight: 700;
            color: #333;
            letter-spacing: 1px;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        .main-title {
            font-size: 5rem;
            line-height: 1;
            margin-bottom: 3rem;
        }
        .red { color: var(--poster-red); }
        .navy { color: var(--poster-blue); }
        
        .cta-group {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
        }
        .btn-outline {
            background: transparent;
            padding: 12px 28px;
            border: 2px solid var(--poster-blue);
            color: var(--poster-blue);
            border-radius: 4px;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition);
        }
        .btn-outline:hover {
            background: var(--poster-blue);
            color: white;
        }

        /* House Status Bar */
        .house-status-bar {
            width: 90%;
            max-width: 1000px;
            padding: 2.5rem;
            margin: 3rem 0;
            border-radius: 16px;
        }
        .status-title {
            text-align: center;
            font-size: 1.8rem;
            margin-bottom: 2rem;
            color: #333;
            font-weight: 800;
        }
        .houses-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
        .house-card {
            background: #fff;
            padding: 2rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .house-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .house-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        .house-name {
            font-size: 1.3rem;
            font-weight: 800;
            letter-spacing: 0.5px;
        }
        .rank-badge {
            background: #e0e0e0;
            color: #666;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
        }
        .rank-badge.first {
            background: #FFD700;
            color: #000;
        }
        .house-score {
            font-size: 3rem;
            font-weight: 900;
            margin: 0.5rem 0;
            line-height: 1;
        }
        .progress-bar-container {
            width: 100%;
            height: 8px;
            background: #f0f0f0;
            border-radius: 4px;
            overflow: hidden;
            margin: 1rem 0;
        }
        .progress-bar {
            height: 100%;
            border-radius: 4px;
            transition: width 0.8s ease-out;
        }
        .house-label {
            font-size: 0.85rem;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
        }

        .college-footer {
            margin-top: auto;
            width: 100%;
            padding: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fdfdfd;
        }
        .logos {
            display: flex;
            align-items: center;
            gap: 2rem;
        }
        .logo-text {
            font-family: var(--font-display);
            font-weight: 800;
            font-size: 1.5rem;
            display: block;
        }
        .logo-item small {
            display: block;
            font-size: 0.7rem;
            color: #666;
        }
        .divider {
            width: 1px;
            height: 40px;
            background: #ddd;
        }
        .contact {
            text-align: right;
            font-size: 0.9rem;
            color: #666;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .main-title { font-size: 3rem; }
            .houses-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            .house-status-bar {
                width: 95%;
                padding: 1.5rem;
            }
            .college-footer { 
                flex-direction: column; 
                gap: 2rem; 
                text-align: center; 
            }
            .contact { text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default Home;
