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
  // Always compute columns; default to an empty array if not found.
  const columns = tableSchemas[tableName] || [];
  
  // Always call hooks, even if columns is empty.
  const [rows, setRows] = useState([]);
  
  // Prepare an initial newRow object using the columns
  const initialNewRow = columns.reduce((acc, col) => {
    acc[col] = "";
    return acc;
  }, {});
  const [newRow, setNewRow] = useState(initialNewRow);
  
  // Now, conditionally render if no schema exists.
  if (columns.length === 0) {
    return <div>No schema found for table: {tableName}</div>;
  }

  // Handle input changes.
  const handleInputChange = (col, value) => {
    setNewRow({ ...newRow, [col]: value });
  };

  // When Add button is clicked, add the new row to rows.
  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow(initialNewRow);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{tableName}</h2>
      
      {/* Render input fields for each column */}
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
      
      {/* Render the table */}
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
