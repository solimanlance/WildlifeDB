import React, { useState } from 'react';

const tableSchemas = {
  "Sponsors": ["SponsorID", "Name"],
  "Sponsor": ["SponsorID", "OrganizationID", "Contributions"],
  "Funds": ["SponsorID", "ResearchTeamID", "Contributions"],
  "Publications": ["ResearchTeamID", "PublicationID", "PublicationDate"],
  "LivesIn": ["AnimalID", "PopulationCount", "OrganizationID"],
  "Animal": ["AnimalID", "HabitatID", "Species", "ResearchTeamID"],
  "SpeciesInfo": ["Species", "Lifespan", "DietType"],
  "ResearchTeams": ["ResearchTeamID", "ContactInfo"],
  "ResearchTeams_Contact": ["ContactInfo", "Specialization"],
  "Caretaker": ["CaretakerID", "Name", "OrganizationID", "Specialization", "AnimalID"],
  "Plants": ["PlantID", "HabitatID", "Species"],
  "PlantSpeciesInfo": ["Species", "Description"],
  "NaturalHabitat": ["HabitatID", "Description", "AvgTemp", "AvgRainfall"],
  "Zoo": ["OrganizationID", "Location", "Name", "VisitorCapacity"],
  "Aquarium": ["OrganizationID", "Location", "Name", "VisitorCapacity"],
  "WildlifeReserves": ["OrganizationID", "Location", "Name", "Size"],
  "ConservationOrganization": ["OrganizationID"]
};

const TableView = ({ tableName }) => {
  const columns = tableSchemas[tableName] || [];
  const [rows, setRows] = useState([]);
  
  const initialNewRow = columns.reduce((acc, col) => {
    acc[col] = "";
    return acc;
  }, {});
  const [newRow, setNewRow] = useState(initialNewRow);
  
  if (columns.length === 0) {
    return <div>No schema found for table: {tableName}</div>;
  }

  const handleInputChange = (col, value) => {
    setNewRow({ ...newRow, [col]: value });
  };

  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow(initialNewRow);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{tableName}</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        {columns.map((col, index) => (
          <input
            key={index}
            placeholder={col}
            value={newRow[col]}
            onChange={(e) => handleInputChange(col, e.target.value)}
            style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
          />
        ))}
        <button onClick={handleAddRow}>Add {tableName}</button>
      </div>
      
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
              <td>
                <button style={{ marginRight: '1rem' }}>Update</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;