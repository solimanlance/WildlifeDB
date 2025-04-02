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


// Updates names in the demotable.
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
        messageElement.textContent = "Error counting tuples!";
    }
}

async function groupByQueryFunctionality() {
    try {
        const response = await fetch('/group-by-query');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Data Received from Server:", data);  // Log the full response

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


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    document.getElementById("insertDemotable").addEventListener("submit", insertDemotable);
    document.getElementById("updataNameDemotable").addEventListener("submit", updateNameDemotable);
    document.getElementById("countDemotable").addEventListener("click", countDemotable);
    document.getElementById("groupByButton").addEventListener("click", groupByQueryFunctionality); 
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
}
