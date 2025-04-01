import React from 'react';

const TableView = ({ tableName }) => {
  // This is a placeholder where you could fetch and display data from an API.
  // For now, we simply display the table name and an "Add" button.
  return (
    <div style={{ padding: '1rem' }}>
      <h2>{tableName}</h2>
      <button style={{ marginBottom: '1rem' }}>Add Data</button>
      <div>
        {/* Here you would render the actual data table */}

      </div>
    </div>
  );
};

export default TableView;
