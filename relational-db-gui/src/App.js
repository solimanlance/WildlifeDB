import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import TablePage from './TablePage';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<div>Select a table from the sidebar.</div>} />
            <Route path="/:tableName" element={<TablePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
