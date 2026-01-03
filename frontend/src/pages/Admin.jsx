import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Trophy } from 'lucide-react';
import { getPrograms, createProgram, deleteProgram, updateProgram, getFixtures, createFixture, updateFixture, deleteFixture, getResults, createResult, updateResult, deleteResult } from '../services/api';

const Admin = () => {
  const [programs, setPrograms] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [view, setView] = useState('programs');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ day: '', date: '', sport: '', venue: '', category: 'Group', status: 'Upcoming' });
  const [fixtureData, setFixtureData] = useState({ sport: '', round: '', teamA: '', teamB: '', scoreA: '-', scoreB: '-', status: 'Upcoming' });
  const [results, setResults] = useState([]);
  const [resultData, setResultData] = useState({ studentName: '', programName: '', house: 'ASTRA', grade: 'A', points: 0, type: 'Individual' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [progRes, fixRes, resRes] = await Promise.all([getPrograms(), getFixtures(), getResults()]);
      setPrograms(progRes.data);
      setFixtures(fixRes.data);
      setResults(resRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const handleCreate = () => {
    setEditId(null);
    setIsEditing(true);
    setFormData({ day: '', date: '', sport: '', venue: '', category: 'Group', status: 'Upcoming' });
    setFixtureData({ sport: '', round: '', teamA: '', teamB: '', scoreA: '-', scoreB: '-', status: 'Upcoming' });
    setResultData({ studentName: '', programName: '', house: 'ASTRA', grade: 'A', points: 0, type: 'Individual' });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setIsEditing(true);
    if (view === 'programs') {
      setFormData({ day: item.day, date: item.date, sport: item.sport, venue: item.venue, category: item.category, status: item.status });
    } else if (view === 'fixtures') {
      setFixtureData({ sport: item.sport, round: item.round, teamA: item.teamA, teamB: item.teamB, scoreA: item.scoreA, scoreB: item.scoreB, status: item.status });
    } else {
      setResultData({ studentName: item.studentName, programName: item.programName, house: item.house, grade: item.grade, points: item.points, type: item.type });
    }
  };

  const handleSave = async () => {
    try {
      if (view === 'programs') {
        if (editId) {
          await updateProgram(editId, formData);
        } else {
          await createProgram(formData);
        }
      } else if (view === 'fixtures') {
        if (editId) {
          await updateFixture(editId, fixtureData);
        } else {
          await createFixture(fixtureData);
        }
      } else if (view === 'results') {
        if (editId) {
          await updateResult(editId, resultData);
        } else {
          await createResult(resultData);
        }
      }
      fetchData();
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      alert('Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      if (view === 'programs') {
        await deleteProgram(id);
      } else if (view === 'fixtures') {
        await deleteFixture(id);
      } else if (view === 'results') {
        await deleteResult(id);
      }
      fetchData();
    }
  };

  return (
    <div className="admin-page">
      <header className="page-header glass">
        <h1 className="navy">Admin <span className="red">Dashboard</span></h1>
        <div className="admin-nav">
          <button onClick={() => setView('programs')} className={`tab ${view === 'programs' ? 'active' : ''}`}>Programs</button>
          <button onClick={() => setView('fixtures')} className={`tab ${view === 'fixtures' ? 'active' : ''}`}>Fixtures</button>
          <button onClick={() => setView('results')} className={`tab ${view === 'results' ? 'active' : ''}`}>Results</button>
        </div>
        <button onClick={handleCreate} className="btn-primary"><Plus size={18} /> New {view === 'programs' ? 'Entry' : view === 'fixtures' ? 'Match' : 'Result'}</button>
      </header>

      <div className="admin-content">
        {view === 'programs' && (
          <section className="program-management glass">
            <h2>Program List</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Sport</th>
                    <th>Venue</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map(prog => (
                    <tr key={prog._id}>
                      <td><span className="ribbon-mini">{prog.day}</span></td>
                      <td className="date-cell">{prog.date}</td>
                      <td className="sport-cell">{prog.sport}</td>
                      <td>{prog.venue}</td>
                      <td>
                        <div className="actions">
                          <button className="icon-btn edit" onClick={() => handleEdit(prog)}><Edit2 size={16} /></button>
                          <button className="icon-btn delete" onClick={() => handleDelete(prog._id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {view === 'fixtures' && (
          <section className="fixture-management glass">
            <h2>Match Fixtures</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sport</th>
                    <th>Round</th>
                    <th>Match Up</th>
                    <th>Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fixtures.map(fix => (
                    <tr key={fix._id}>
                      <td className="navy-cell">{fix.sport}</td>
                      <td>{fix.round}</td>
                      <td>{fix.teamA} VS {fix.teamB}</td>
                      <td className="red-cell">{fix.scoreA} - {fix.scoreB}</td>
                      <td>
                        <div className="actions">
                          <button className="icon-btn edit" onClick={() => handleEdit(fix)}><Edit2 size={16} /></button>
                          <button className="icon-btn delete" onClick={() => handleDelete(fix._id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {view === 'results' && (
          <section className="results-management glass">
            <h2>Results Management</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Program</th>
                    <th>House</th>
                    <th>Grade</th>
                    <th>Points</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(res => (
                    <tr key={res._id}>
                      <td className="sport-cell">{res.studentName}</td>
                      <td>{res.programName}</td>
                      <td className="navy-cell">{res.house}</td>
                      <td><div className="ribbon-mini">{res.grade}</div></td>
                      <td className="red-cell">{res.points}</td>
                      <td>{res.type}</td>
                      <td>
                        <div className="actions">
                          <button className="icon-btn edit" onClick={() => handleEdit(res)}><Edit2 size={16} /></button>
                          <button className="icon-btn delete" onClick={() => handleDelete(res._id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {isEditing && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal glass">
              <h3 className="navy">{editId ? 'Edit' : 'Add New'} {view === 'programs' ? 'Program' : view === 'fixtures' ? 'Fixture' : view === 'points' ? 'Point' : 'Result'}</h3>

              {view === 'programs' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="prog-day">Day (e.g., DAY 01)</label>
                    <input id="prog-day" name="day" type="text" value={formData.day} onChange={e => setFormData({ ...formData, day: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prog-date">Date</label>
                    <input id="prog-date" name="date" type="text" placeholder="06 JAN 2026" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prog-sport">Sport(s)</label>
                    <input id="prog-sport" name="sport" type="text" placeholder="VOLLEYBALL" value={formData.sport} onChange={e => setFormData({ ...formData, sport: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prog-venue">Venue</label>
                    <input id="prog-venue" name="venue" type="text" placeholder="MAIN GROUND" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prog-status">Status</label>
                    <select id="prog-status" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              )}

              {view === 'fixtures' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fix-sport">Sport</label>
                    <input id="fix-sport" name="sport" type="text" placeholder="FOOTBALL" value={fixtureData.sport} onChange={e => setFixtureData({ ...fixtureData, sport: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-round">Round</label>
                    <input id="fix-round" name="round" type="text" placeholder="SEMI FINALS" value={fixtureData.round} onChange={e => setFixtureData({ ...fixtureData, round: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-teamA">Team A</label>
                    <input id="fix-teamA" name="teamA" type="text" placeholder="MECHANICAL" value={fixtureData.teamA} onChange={e => setFixtureData({ ...fixtureData, teamA: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-teamB">Team B</label>
                    <input id="fix-teamB" name="teamB" type="text" placeholder="CS" value={fixtureData.teamB} onChange={e => setFixtureData({ ...fixtureData, teamB: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-scoreA">Score A</label>
                    <input id="fix-scoreA" type="text" value={fixtureData.scoreA} onChange={e => setFixtureData({ ...fixtureData, scoreA: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-scoreB">Score B</label>
                    <input id="fix-scoreB" type="text" value={fixtureData.scoreB} onChange={e => setFixtureData({ ...fixtureData, scoreB: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-status">Status</label>
                    <select id="fix-status" value={fixtureData.status} onChange={e => setFixtureData({ ...fixtureData, status: e.target.value })}>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              )}

              {view === 'results' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="res-name">Student Name</label>
                    <input id="res-name" type="text" value={resultData.studentName} onChange={e => setResultData({ ...resultData, studentName: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-prog">Program Name</label>
                    <input id="res-prog" type="text" value={resultData.programName} onChange={e => setResultData({ ...resultData, programName: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-house">House</label>
                    <select id="res-house" value={resultData.house} onChange={e => setResultData({ ...resultData, house: e.target.value })}>
                      <option value="ASTRA">ASTRA</option>
                      <option value="EAKHA">EAKHA</option>
                      <option value="LOKHA">LOKHA</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-grade">Grade</label>
                    <select id="res-grade" value={resultData.grade} onChange={e => setResultData({ ...resultData, grade: e.target.value })}>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="Participated">Participated</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-points">Points</label>
                    <input id="res-points" type="number" value={resultData.points} onChange={e => setResultData({ ...resultData, points: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-type">Type</label>
                    <select id="res-type" value={resultData.type} onChange={e => setResultData({ ...resultData, type: e.target.value })}>
                      <option value="Individual">Individual</option>
                      <option value="Group">Group</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button onClick={() => setIsEditing(false)} className="btn-outline glass"><X size={18} /> Cancel</button>
                <button onClick={handleSave} className="btn-primary">
                  {editId ? 'Update' : 'Save'} {view === 'programs' ? 'Program' : view === 'fixtures' ? 'Fixture' : 'Result'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div >

      <style>{`
        .admin-page {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            margin-bottom: 2rem;
        }
        .admin-nav {
            display: flex;
            gap: 1rem;
        }
        .tab {
            background: none;
            border: none;
            padding: 8px 16px;
            font-weight: 700;
            cursor: pointer;
            color: #666;
            border-bottom: 3px solid transparent;
        }
        .tab.active {
            color: var(--poster-red);
            border-bottom-color: var(--poster-red);
        }
        .navy-cell { color: var(--poster-blue); font-weight: 700; }
        .red-cell { color: var(--poster-red); font-weight: 800; }
        
        .navy { color: var(--poster-blue); }
        .red { color: var(--poster-red); }
        
        .program-management {
            padding: 2rem;
            background: #fff;
        }
        .admin-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }
        .admin-table th {
            text-align: left;
            padding: 1rem;
            border-bottom: 2px solid #eee;
            color: #666;
            text-transform: uppercase;
            font-size: 0.8rem;
        }
        .admin-table td {
            padding: 1.5rem 1rem;
            border-bottom: 1px solid #eee;
        }
        .ribbon-mini {
            background: var(--poster-blue);
            color: white;
            padding: 4px 10px;
            font-weight: 700;
            border-radius: 3px;
            font-size: 0.8rem;
        }
        .date-cell { color: var(--poster-red); font-weight: 700; }
        .sport-cell { font-weight: 600; font-size: 1.1rem; }
        
        .actions { display: flex; gap: 0.5rem; }
        .icon-btn {
            background: #f5f5f5;
            border: none;
            padding: 10px;
            border-radius: 6px;
            cursor: pointer;
            transition: var(--transition);
        }
        .icon-btn:hover { background: #eee; }
        .icon-btn.delete { color: #ff4d4d; }
        .icon-btn.delete:hover { background: #ffebeb; }

        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex; justify-content: center; align-items: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
        }
        .modal {
            width: 600px;
            padding: 3rem;
            background: #fff;
        }
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin: 2rem 0;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
        }
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }
        .btn-outline {
            background: transparent;
            border: 1px solid #ddd;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
            .admin-page {
                padding: 0 0.5rem;
                margin: 1rem auto;
            }
            .page-header {
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
                text-align: center;
            }
            .admin-nav {
                width: 100%;
                overflow-x: auto;
                padding-bottom: 0.5rem;
                justify-content: flex-start;
            }
            .tab {
                padding: 8px 12px;
                font-size: 0.8rem;
                white-space: nowrap;
            }
            .admin-table th, .admin-table td {
                padding: 1rem 0.5rem;
                font-size: 0.85rem;
            }
            .modal {
                width: 95%;
                padding: 1.5rem;
                margin: 1rem;
            }
            .form-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            .modal-actions {
                flex-direction: column;
            }
            .modal-actions button {
                width: 100%;
            }
        }
      `}</style>
    </div >
  );
};

export default Admin;
