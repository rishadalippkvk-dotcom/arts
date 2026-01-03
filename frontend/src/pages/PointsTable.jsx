import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getResults } from '../services/api';
import { HOUSE_MAPPING, HOUSE_COLORS, HOUSE_BG_COLORS } from '../utils/houseMapping';

const PointsTable = () => {
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultsRes = await getResults();
        setResultsData(resultsRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate House Statistics based on RESULTS
  const houseStats = useMemo(() => {
    const stats = {
      ASTRA: { name: 'ASTRA', individual: 0, group: 0, total: 0, color: HOUSE_COLORS.ASTRA, bg: HOUSE_BG_COLORS.ASTRA },
      EAKHA: { name: 'EAKHA', individual: 0, group: 0, total: 0, color: HOUSE_COLORS.EAKHA, bg: HOUSE_BG_COLORS.EAKHA },
      LOKHA: { name: 'LOKHA', individual: 0, group: 0, total: 0, color: HOUSE_COLORS.LOKHA, bg: HOUSE_BG_COLORS.LOKHA }
    };

    resultsData.forEach(res => {
      const houseName = res.house; // Assuming house is stored as ASTRA, EAKHA, LOKHA directly
      if (stats[houseName]) {
        if (res.type === 'Individual') {
          stats[houseName].individual += res.points;
        } else {
          stats[houseName].group += res.points;
        }
        stats[houseName].total += res.points;
      }
    });

    return Object.values(stats).sort((a, b) => b.total - a.total);
  }, [resultsData]);

  return (
    <div className="points-page">
      <header className="page-header">
        <h1>Official <span className="accent">Scoreboard</span></h1>
        <p className="last-updated">Real-time Event Updates</p>
      </header>

      {loading ? (
        <div className="loading">Loading Scoreboard...</div>
      ) : (
        <>
          {/* Main Scoreboard */}
          <div className="scoreboard-card glass">
            <div className="scoreboard-header">
              <span>Group Name</span>
              <span>Individual Points</span>
              <span>Group Points</span>
              <span>Total Points</span>
            </div>
            {houseStats.map((house, index) => (
              <motion.div
                key={house.name}
                className="scoreboard-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ backgroundColor: house.bg, borderLeft: `4px solid ${house.color}` }}
              >
                <div className="house-info">
                  <span className="house-name" style={{ color: house.color }}>{house.name}</span>
                  {index === 0 && <span className="leader-badge">Leader</span>}
                </div>
                <div className="score-cell" data-label="Individual">{house.individual}</div>
                <div className="score-cell" data-label="Group">{house.group}</div>
                <div className="score-cell total" data-label="Total" style={{ color: house.color }}>{house.total}</div>
              </motion.div>
            ))}
          </div>

          {/* Participants Table */}
          <div className="participants-section glass">
            <h2 className="section-title">All Participants & Results</h2>
            <div className="table-responsive">
              <table className="participants-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Program</th>
                    <th>Group</th>
                    <th>Grade</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsData.map((res, index) => (
                    <motion.tr
                      key={res._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="name-cell">{res.studentName}</td>
                      <td>{res.programName}</td>
                      <td style={{ fontWeight: 'bold', color: HOUSE_COLORS[res.house] }}>{res.house}</td>
                      <td><span className="grade-badge">{res.grade}</span></td>
                      <td className="score-val">{res.points}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )
      }

      <style>{`
        .points-page {
          max-width: 1000px;
          margin: 0 auto;
          padding-bottom: 4rem;
        }
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .page-header h1 {
          font-size: 2.5rem;
          color: var(--text-primary);
        }
        .last-updated {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        
        /* Scoreboard Styles */
        .scoreboard-card {
          padding: 2rem;
          border-radius: 20px;
          margin-bottom: 4rem;
          background: #fff; /* Fallback */
        }
        .scoreboard-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 1rem 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #666;
          border-bottom: 1px solid #eee;
          margin-bottom: 1rem;
        }
        .scoreboard-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 1.5rem;
          align-items: center;
          margin-bottom: 1rem;
          border-radius: 12px;
          transition: transform 0.2s;
        }
        .scoreboard-row:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .house-name {
          font-weight: 800;
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }
        .leader-badge {
          background: #FFD700;
          color: #000;
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .score-cell {
          font-weight: 600;
          font-size: 1.1rem;
          color: #444;
        }
        .score-cell.total {
          font-weight: 800;
          font-size: 1.4rem;
        }

        /* Participants Table */
        .participants-section {
          padding: 2rem;
        }
        .section-title {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }
        .participants-table {
          width: 100%;
          border-collapse: collapse;
        }
        .participants-table th {
          text-align: left;
          padding: 1rem;
          border-bottom: 2px solid #eee;
          text-transform: uppercase;
          font-size: 0.8rem;
          color: #666;
        }
        .participants-table td {
          padding: 1.2rem 1rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .name-cell {
          font-weight: 600;
        }
        .grade-badge {
          background: #eee;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .score-val {
          font-weight: 700;
        }
        
        @media (max-width: 768px) {
          .scoreboard-header {
            display: none;
          }
          .scoreboard-row {
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
            padding: 1rem;
          }
          .house-info { 
            grid-column: span 2; 
            border-bottom: 1px solid rgba(0,0,0,0.05);
            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .score-cell {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 0.9rem;
          }
          .score-cell::before {
            content: attr(data-label);
            font-size: 0.7rem;
            text-transform: uppercase;
            color: #888;
            margin-bottom: 0.2rem;
          }
          .score-cell.total {
            font-size: 1.2rem;
          }
          .participants-section {
            padding: 1rem;
          }
          .section-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div >
  );
};

export default PointsTable;
