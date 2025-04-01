import React from 'react';

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
  const columns = tableSchemas[tableName];

  if (!columns) {
    return <div>No schema found for table: {tableName}</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{tableName}</h2>
      
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Placeholder for data rows; later replace with dynamic data */}
         
        </tbody>
      </table>
      <button style={{ marginTop: '1rem' }}>Add {tableName}</button>
    </div>
  );
};

export default TableView;
