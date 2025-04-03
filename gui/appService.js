const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM ANIMAL'); // changed this to "FROM ANIMAL"
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function joinCaretakerByResearchTeam(researchTeamID) {
    return await withOracleDB(async (connection) => {
        const query = `
            SELECT c.CaretakerID, c.Specialization 
            FROM Caretaker c, Animal a
            WHERE c.AnimalID = a.AnimalID AND a.ResearchTeamID = :researchTeamID
        `;
        const result = await connection.execute(query, { researchTeamID }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log("Join Query Result:", result.rows);
        return result.rows;
    }).catch((err) => {
        console.error("Error in joinCaretakerByResearchTeam:", err);
        return false;
    });
}



async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE ANIMAL`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE Animal (
                AnimalID int PRIMARY KEY,
                HabitatID int NOT NULL,
                Species VARCHAR(30),
                ResearchTeamID int,
                FOREIGN KEY (HabitatID) references NaturalHabitat,
                FOREIGN KEY (ResearchTeamID) references ResearchTeams
            );
        `);
        return true;
    }).catch(() => {
        return false;
    });
}

const { spawn } = require('child_process');
// Function to execute SQL*Plus and run the SQL script
async function initializeTable() {
    return new Promise((resolve, reject) => {
        // Build the connection string
        const sqlplusCommand = `${envVariables.ORACLE_USER}/${envVariables.ORACLE_PASS}@${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`;
        
        console.log('Initializing database tables...');
        
        // Spawn SQLPlus process
        const process = spawn('sqlplus', [sqlplusCommand], {
            stdio: ['pipe', 'inherit', 'inherit']
        });
        
        // Send commands to SQLPlus stdin
        process.stdin.write(`@./init.sql\nexit\n`);
        process.stdin.end();
        
        // Handle process completion
        process.on('close', (code) => {
            if (code === 0) {
                console.log('Database initialization completed successfully.');
                resolve(true);
            } else {
                console.error(`Database initialization failed with exit code ${code}.`);
                reject(false);
            }
        });
        
        // Handle process errors
        process.on('error', (err) => {
            console.error(`Failed to start SQLPlus: ${err.message}`);
            reject(err);
        });
    });
}

// Call the function on startup
initializeTable()
    .then(() => {
        console.log('Application ready to use.');
        // Continue with application startup...
    })
    .catch((err) => {
        console.error('Database initialization failed, application cannot start.');
        process.exit(1); // Exit the application if database init fails
    });

    async function insertDemotable(animal_id, habitat_id, species_name, research_team_id) {
        console.log("INSERTING:", { animal_id, habitat_id, species_name, research_team_id });
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(
                `INSERT INTO ANIMAL (AnimalID, HabitatID, Species, ResearchTeamID)
                 VALUES (:animal_id, :habitat_id, :species_name, :research_team_id)`,
                [animal_id, habitat_id, species_name, research_team_id],
                { autoCommit: true }
            );
    
            return result.rowsAffected && result.rowsAffected > 0;
        }).catch(() => {
            return false;
        });
    }
    

async function updateNameAnimaltable(oldName, newName, oldID, newID) {
    console.log("UPDATING:", { oldName, newName, oldID, newID });

    const oldIDInt = parseInt(oldID);
    const newIDInt = parseInt(newID);

    if (isNaN(oldIDInt) || isNaN(newIDInt)) {
        console.error("Error: oldID or newID is not a valid integer.");
        return false;
    }

    console.log("Converted IDs:", { oldIDInt, newIDInt });

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE ANIMAL SET Species = :newName, ResearchTeamID = :newID WHERE Species = :oldName AND ResearchTeamID = :oldID`,
            { 
                newName: newName,
                newID: newIDInt,
                oldName: oldName, 
                oldID: oldIDInt 
            },
            { autoCommit: true }
        );
        
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        console.log("FALSE");
        return false;
    });
}

async function deleteAnimal(animal_id) {
    console.log(animal_id);
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM ANIMAL WHERE AnimalID = :animal_id`,
            [animal_id],
            { autoCommit: true }
        );
      
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error("Delete Error:", err);
        return false;
    });
}



async function projectionPlants(selectedField) {


    console.log("field to project", { selectedField });

    const allowedFields = ["PlantID", "HabitatID", "Species"]; 

    if (!allowedFields.includes(selectedField)) {
        console.error("Invalid field selected");
        return false;
    }

    const query = `SELECT ${selectedField} FROM Plants`; 

    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(query, {}, { autoCommit: true });

            return result.rows; 
        } catch (error) {
            console.error("Database error:", error);
            return false;
        }
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT COUNT(*) FROM ANIMAL');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

async function selectAnimal(habitat_id, species, and_or) {
    console.log("SELECTING from database:", { habitat_id, species, and_or });

    return await withOracleDB(async (connection) => {
        let query = `SELECT * FROM ANIMAL WHERE HabitatID = :habitat_id`;
        let params = { habitat_id };

        if (species !== null) {
            if (and_or === 'and') {
                query += ' AND Species = :species';
            } else if (and_or === 'or') {
                query += ' OR Species = :species';
            }
            params.species = species;
        }

        console.log("Executing query:", query);
        console.log("With parameters:", params);

        try {
            const result = await connection.execute(query, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            console.log("Database query result:", result.rows);
            return result.rows;
        } catch (dbError) {
            console.error("Database query error:", dbError);
            return false;
        }
    }).catch(dbError => {
        console.error("Error with OracleDB connection:", dbError);
        return false;
    });
}


async function getGroupedPopulation() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT OrganizationID,MIN(PopulationCount) AS mixn_population 
            FROM LivesIn 
            GROUP BY OrganizationID
        `);

        const rows = result.rows.map(row => row[0]);  // Extract first column (min_population)
        // console.log("DB Query Result:", result.rows);  // Add this to log the data

        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function havingOver2000() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT SponsorID
            FROM Funds 
            GROUP BY SponsorID
            HAVING SUM(Contributions) > 2000 
        `);

        const rows = result.rows.map(row => row[0]);  // Extract first column (min_population)
        console.log("DB Query Result:", result.rows);  // Add this to log the data

        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function highestAverageContribution() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT SponsorID 
            FROM Funds F
            GROUP BY SponsorID 
            HAVING AVG(Contributions) >= ALL (
                SELECT AVG(F1.Contributions)  
                FROM Funds F1 
                GROUP BY F1.SponsorID)`
        );

        const rows = result.rows.map(row => row[0]);  // Extract first column (min_population)
        console.log("DB Query Result:", result.rows);  // Add this to log the data

        return result.rows;
    }).catch(() => {
        return [];
    });
}


async function sponsoredByAll() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT R.ResearchTeamID 
            FROM ResearchTeams R
            WHERE NOT EXISTS 
                (SELECT F.SponsorID
                FROM Funds F 
                WHERE NOT EXISTS  
                    (SELECT F2.SponsorID
                    FROM Funds F2
                    WHERE F2.ResearchTeamID = R.ResearchTeamID
                    AND F2.SponsorID = F.SponsorID))`
        );

        const rows = result.rows.map(row => row[0]);  // Extract first column (min_population)
        console.log("DB Query Result:", result.rows);  // Add this to log the data

        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiateDemotable, 
    insertDemotable, 
    projectionPlants, 
    updateNameAnimaltable, 
    selectAnimal,
    countDemotable, 
    deleteAnimal,
    havingOver2000, 
    highestAverageContribution,
    sponsoredByAll,
    getGroupedPopulation,
    joinCaretakerByResearchTeam
};