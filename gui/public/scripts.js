/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */
// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');
    const response = await fetch('/check-db-connection', {
        method: "GET"
    });
    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';
    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}
// Fetches data from the demotable and displays it.
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('demotable');
    const tableBody = tableElement.querySelector('tbody');
    const response = await fetch('/demotable', {
        method: 'GET'
    });
    const responseData = await response.json();
    const demotableContent = responseData.data;
    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }
    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


async function deleteAnimal(event) {
    event.preventDefault();  // This stops the form from submitting normally

    const animalId = parseInt(document.getElementById('deleteAnimalId').value);
    
    console.log("Attempting to delete animal with ID:", animalId);  // Add this for debugging

    const response = await fetch('/delete-animal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ animal_id: animalId })
    });

    console.log("Fetch request sent to /delete-animal");

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteAnimalMsg');

    if (responseData.success) {
        messageElement.textContent = `Animal with ID ${animalId} deleted successfully.`;
        fetchTableData(); // Refresh table data
    } else {
        messageElement.textContent = `Error deleting animal with ID ${animalId}.`;
    }
}

async function joinQueryFunctionality(event) {
    event.preventDefault();

    const researchTeamID = parseInt(document.getElementById('inputResearchTeamID').value);

    try {
        const res = await fetch('/join-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({researchTeamID})
        });
        
        const data = await res.json();

        const resultDiv = document.getElementById('joinResultMsg');

        if (data.success && data.data.length > 0) {
            let tableHTML = `<table border="1">
                <thead>
                    <tr>
                        <th>Caretaker ID</th>
                        <th>Specialization</th>
                    </tr>
                </thead>
                <tbody>`;
            data.data.forEach(row => {
                tableHTML += `<tr>
                    <td>${row.CARETAKERID || row[0]}</td>
                    <td>${row.SPECIALIZATION || row[1]}</td>
                </tr>`;
            });
            tableHTML += `</tbody></table>`;
            resultDiv.innerHTML = tableHTML;
        } else {
            resultDiv.textContent = 'No data found for the given Research Team ID.';
        }
    } catch (error) {
        console.error("Error executing join query:", error);
        document.getElementById('joinResultMsg').textContent = `Error: ${error.message}`;
    }
}

// Updates names in the demotable.
async function updateNameAnimaltable(event) {
    event.preventDefault();

    const oldNameValue = document.getElementById('updateOldSpeciesName').value;
    const newNameValue = document.getElementById('updateNewSpeciesName').value;
    const oldIDValue = parseInt(document.getElementById('updateOldTeamID').value);
    const newIDValue = parseInt(document.getElementById('updateNewTeamID').value);

    if (!oldNameValue || !oldIDValue) {
        alert("Old Species Name and Old Research Team ID are required.");
        return;
    }

    const response = await fetch('/update-name-animaltable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue,
            oldID: oldIDValue,
            newID: newIDValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating table!";
    }
}
// This function resets or initializes the demotable.
async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();
    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "demotable initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

// inserts names in the demotable.
async function insertDemotable(event) {
    event.preventDefault();

    const animalId = parseInt(document.getElementById('insertId').value);
    const habitatId = parseInt(document.getElementById('insertHabitat').value);
    const researchTeamId = parseInt(document.getElementById('insertTeam').value);

    const speciesName = document.getElementById('insertSpecies').value;


    const response = await fetch('/insert-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            animal_id: animalId,
            habitat_id: habitatId,
            species_name: speciesName,
            research_team_id: researchTeamId
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Animal inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting animal!";
    }
}

async function selectAnimalTable(event) {
    event.preventDefault();
    console.log("SELECT ANIMAL RUNNING");
    const habitatId = parseInt(document.getElementById('selectHabitat').value);
    console.log("Habitat ID:", habitatId);
    const species = document.getElementById('selectSpecies').value;
    console.log("Species:", species);
    const andOr = document.getElementById('andor').value;
    console.log("And/Or:", andOr);


    try {
        console.log("DOING TRY NOW");
        const response = await fetch('/select-animal', {
    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                habitat_id: habitatId,
                species: species,
                and_or: andOr
            })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }


        const responseData = await response.json();
        console.log('Response Data:', responseData);

        const messageElement = document.getElementById('selectResultMsg');

        if (responseData.success && responseData.data.length > 0) {
            console.log('SUCCESS');
            console.log('Data received successfully, creating table...');
            
            let tableHTML = `
                <table border="1">
                    <thead>
                        <tr>
                            <th>Animal ID</th>
                            <th>Species</th>
                            <th>Habitat ID</th>
                            <th>Research Team ID</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

    // Ensure the correct property names match the response
    responseData.data.forEach(row => {
        const animalId = row.ANIMALID || '';
        const species = row.SPECIES || '';
        const habitatId = row.HABITATID || '';
        const researchTeamId = row.RESEARCHTEAMID || '';

        console.log(`Parsed Data - Animal ID: ${animalId}, Species: ${species}, Habitat ID: ${habitatId}, Research Team ID: ${researchTeamId}`);

        tableHTML += `
            <tr>
                <td>${animalId}</td>
                <td>${species}</td>
                <td>${habitatId}</td>
                <td>${researchTeamId}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';

    messageElement.innerHTML = tableHTML;
    } else {
        messageElement.textContent = 'Error: No data found or the query failed.';
    }

    } catch (error) {
        console.error('Error fetching the data: or the ', error);
        document.getElementById('selectResultMsg').textContent = `Error: no data found or the query failed`;
    }
}


// Updates names in the demotable.
async function updateNameDemotable(event) {
    event.preventDefault();
    const oldNameValue = document.getElementById('updateOldName').value;
    const newNameValue = document.getElementById('updateNewName').value;
    const response = await fetch('/update-name-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue
        })
    });
    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');
    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}
// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function countDemotable() {
    const response = await fetch("/count-demotable", {
        method: 'GET'
    });
    const responseData = await response.json();
    const messageElement = document.getElementById('countResultMsg');
    if (responseData.success) {
        const tupleCount = responseData.count;
        messageElement.textContent = `The number of tuples in demotable: ${tupleCount}`;
    } else {
        alert("Error in count demotable!");
    }
}

async function projectionFunctionality(event) {
    event.preventDefault();

    const selectedField = document.getElementById("selectedField").value.trim();
    const projectionResultDiv = document.getElementById("projectionResult");

    try {
        const response = await fetch("/projection-query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ selectedField }),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok.`);
        }

        const data = await response.json();
        console.log("Data Received from Server:", data);

        if (data.success && data.data.length > 0) {
            let tableHTML = `<table border="1"><thead><tr><th>${selectedField}</th></tr></thead><tbody>`;

            data.data.forEach(row => {
                tableHTML += `<tr><td>${row[0]}</td></tr>`; 
            });

            tableHTML += `</tbody></table>`;
            projectionResultDiv.innerHTML = tableHTML;
        } else {
            projectionResultDiv.textContent = `Error: ${data.message || "No data found."}`;
        }
    } catch (error) {
        console.error("Error fetching the data:", error);
        projectionResultDiv.textContent = `Error fetching the data from the server: ${error.message}`;
    }
}

async function groupByQueryFunctionality() {
    try {
        const response = await fetch('/group-by-query');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log("Data Received from Server:", data);  // Log the full response

        const resultDiv = document.getElementById('groupByResult');

        if (data.success) {
            // Create a table element
            let tableHTML = '<table border="1"><thead><tr><th>Organization ID</th><th>Minimum Population</th></tr></thead><tbody>';

            // Loop through the data and create rows for each entry
            data.groupData.forEach(row => {
                const [organizationID, minPopulation] = row;
                tableHTML += `<tr><td>${organizationID}</td><td>${minPopulation}</td></tr>`;
            });

            // Close the table tag
            tableHTML += '</tbody></table>';

            resultDiv.innerHTML = tableHTML;
        } else {
            resultDiv.textContent = 'Error: No data found or the query failed.';
        }
    } catch (error) {
        console.error('Error fetching the data:', error);
        document.getElementById('groupByResult').textContent = 'Error fetching the data from the server.';
    }
}

async function havingFunctionality() {
    try {
        const response = await fetch('/having-query');

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data Received from Server:", data);

        const resultDiv = document.getElementById('havingResult');

        if (data.success && data.groupData.length > 0) {
            let tableHTML = '<table border="1"><thead><tr><th>Sponsor ID</th></thead><tbody>';
            data.groupData.forEach(row => {
                const [SponsorID] = row;
                tableHTML += `<tr><td>${SponsorID}</td></tr>`;
            });
            tableHTML += '</tbody></table>';
            resultDiv.innerHTML = tableHTML;
        } else {
            resultDiv.textContent = `Error: ${data.message || "No data found."}`;
        }
    } catch (error) {
        console.error('Error fetching the data:', error);
        document.getElementById('havingResult').textContent = `Error fetching the data from the server: ${error.message}`;
    }
}

async function nestedFunctionality() {
    try {
        const response = await fetch('/nested-query');

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data Received from Server:", data);

        const resultDiv = document.getElementById('nestedResult');

        if (data.success && data.groupData.length > 0) {
            let tableHTML = '<table border="1"><thead><tr><th>Sponsor ID</th></thead><tbody>';
            data.groupData.forEach(row => {
                const [SponsorID] = row;
                tableHTML += `<tr><td>${SponsorID}</td></tr>`;
            });
            tableHTML += '</tbody></table>';
            resultDiv.innerHTML = tableHTML;
        } else {
            resultDiv.textContent = `Error: ${data.message || "No data found."}`;
        }
    } catch (error) {
        console.error('Error fetching the data:', error);
        document.getElementById('nestedResult').textContent = `Error fetching the data from the server: ${error.message}`;
    }
}

async function divisionFunctionality() {
    try {
        const response = await fetch('/division-query');

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data Received from Server:", data);

        const resultDiv = document.getElementById('divisionResult');

        if (data.success && data.groupData.length > 0) {
            let tableHTML = '<table border="1"><thead><tr><th>Research Team ID</th></thead><tbody>';
            data.groupData.forEach(row => {
                const [ResearchTeamID] = row;
                tableHTML += `<tr><td>${ResearchTeamID}</td></tr>`;
            });
            tableHTML += '</tbody></table>';
            resultDiv.innerHTML = tableHTML;
        } else {
            resultDiv.textContent = `Error: ${data.message || "No data found."}`;
        }
    } catch (error) {
        console.error('Error fetching the data:', error);
        document.getElementById('divisionResult').textContent = `Error fetching the data from the server: ${error.message}`;
    }
}


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    document.getElementById("insertDemotable").addEventListener("submit", insertDemotable);
    document.getElementById("updateNameAnimaltable").addEventListener("submit", updateNameAnimaltable);
    document.getElementById('selectAnimalTable').addEventListener('submit', selectAnimalTable);
    document.getElementById("countDemotable").addEventListener("click", countDemotable);
    document.getElementById("deleteAnimalForm").addEventListener("submit", deleteAnimal);
    document.getElementById("projection").addEventListener("submit", projectionFunctionality);
    document.getElementById("groupByButton").addEventListener("click", groupByQueryFunctionality); 
    document.getElementById("havingButton").addEventListener("click", havingFunctionality); 
    document.getElementById("nestedButton").addEventListener("click", nestedFunctionality); 
    document.getElementById("divisionButton").addEventListener("click", divisionFunctionality); 
    document.getElementById("joinQueryForm").addEventListener("submit", joinQueryFunctionality);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
}