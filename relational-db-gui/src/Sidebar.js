import React from 'react';
import { NavLink } from 'react-router-dom';

const tables = [
  "Sponsors",
  "Sponsor",
  "Funds",
  "Publications",
  "LivesIn",
  "Animal",
  "SpeciesInfo",
  "ResearchTeams",
  "ResearchTeams_Contact",
  "Caretaker",
  "Plants",
  "PlantSpeciesInfo",
  "NaturalHabitat",
  "Zoo",
  "Aquarium",
  "WildlifeReserves"
];

const Sidebar = () => {
  return (
    <div style={{ width: '220px', background: '#f0f0f0', padding: '1rem' }}>
      <h3>SQL Tables</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tables.map((table) => (
          <li key={table} style={{ margin: '0.5rem 0' }}>
            <NavLink 
              to={`/${table}`} 
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? 'blue' : 'black',
                fontWeight: isActive ? 'bold' : 'normal'
              })}
            >
              {table}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
