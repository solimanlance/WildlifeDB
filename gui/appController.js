const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs..
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-demotable", async (req, res) => {
    const { animal_id, habitat_id, species_name, research_team_id } = req.body;
    const insertResult = await appService.insertDemotable(animal_id, habitat_id, species_name, research_team_id);
    
    if (insertResult.success) {
        res.json({ success: true });
    } else {
        res.status(500).json({ 
            success: false, 
            errorMessage: insertResult.errorMessage || "Error inserting animal!" 
        });
    }
});




router.post("/delete-animal", async (req, res) => {
    const { animal_id } = req.body;
    const deleteResult = await appService.deleteAnimal(animal_id);
    if (deleteResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});


router.post("/delete-animal", async (req, res) => {
    const { animal_id } = req.body;
    const deleteResult = await appService.deleteAnimal(animal_id);
    if (deleteResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/join-query', async (req, res) => {
    const { researchTeamID } = req.body;
    console.log("Received join-query request for ResearchTeamID:", researchTeamID);

    try {
        const result = await appService.joinCaretakerByResearchTeam(researchTeamID);
        if (result && result.length > 0) {
            res.json({ success: true, data: result });
        } else {
            res.json({ success: false, message: 'No data found for the given Research Team ID.' });
        }
    } catch (err) {
        console.error("Error in join-query route:", err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




router.post("/update-name-animaltable", async (req, res) => {
    const { oldName, newName, oldID, newID } = req.body;
    const updateResult = await appService.updateNameAnimaltable(oldName, newName, oldID, newID);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/projection-query", async (req, res) => {
    try {
        const { selectedField } = req.body;
        const projectionResult = await appService.projectionPlants(selectedField);

        if (projectionResult) {
            res.json({ success: true, data: projectionResult });
        } else {
            res.status(500).json({ success: false, message: "Projection failed" });
        }
    } catch (error) {
        console.error("Error in projection-query:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

router.post("/select-animal", async (req, res) => {
    const { habitat_id, species, and_or } = req.body;
    console.log("Request received:", { habitat_id, species, and_or });

    try {
        const selectResult = await appService.selectAnimal(habitat_id, species, and_or);
        
        if (selectResult && selectResult.length > 0) {
            res.json({ success: true, data: selectResult });
        } else {
            console.error("No data found for the query");
            res.status(404).json({ success: false, message: "No data found" });
        }
    } catch (error) {
        console.error("Error in select-animal route:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



router.get('/group-by-query', async (req, res) => { 
    try {
        const groupData = await appService.getGroupedPopulation();

        console.log("Grouped Data from appService:", groupData);

        if (groupData.length > 0) {
            res.json({ success: true, groupData });
        } else {
            res.json({ success: false, message: "No grouped population data found" });
        }
    } catch (error) {
        console.error('Error in /group-by-query route:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/having-query', async (req, res) => { 
    try {
        const groupData = await appService.havingOver2000();

        console.log("Grouped Data from appService:", groupData);

        if (groupData.length > 0) {
            res.json({ success: true, groupData });
        } else {
            res.json({ success: false, message: "No grouped population data found" });
        }
    } catch (error) {
        console.log("there is an error here -> router.get")
        console.error('Error in /having-query route:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/nested-query', async (req, res) => { 
    try {
        const groupData = await appService.highestAverageContribution();

        console.log("Grouped Data from appService:", groupData);

        if (groupData.length > 0) {
            res.json({ success: true, groupData });
        } else {
            res.json({ success: false, message: "No grouped population data found" });
        }
    } catch (error) {
        console.log("there is an error here -> router.get")
        console.error('Error in /division-query route:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/division-query', async (req, res) => { 
    try {
        const groupData = await appService.sponsoredByAll();

        console.log("Grouped Data from appService:", groupData);

        if (groupData.length > 0) {
            res.json({ success: true, groupData });
        } else {
            res.json({ success: false, message: "No grouped population data found" });
        }
    } catch (error) {
        console.log("there is an error here -> router.get")
        console.error('Error in /division-query route:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;