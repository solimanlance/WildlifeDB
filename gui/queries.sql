-- #1 : INSERT 

INSERT INTO ANIMAL (AnimalID, HabitatID, Species, ResearchTeamID) VALUES (:animal_id, :habitat_id, :species_name, :research_team_id)

-- #2 : UPDATE 

UPDATE ANIMAL SET Species = :newName, ResearchTeamID = :newID WHERE Species = :oldName AND ResearchTeamID = :oldID
-- We know that upon updating, 

-- #3 : DELETE 
DELETE FROM ANIMAL WHERE AnimalID = :animal_id


-- #4: SELECTION 
SELECT AnimalID 
FROM Animal 
WHERE Species = :species OR HabitatID = :habitatID 


-- #5 : PROJECTIONG 
SELECT :input 
FROM Plants 

-- #6 : JOIN 
SELECT c.CaretakerID, c.Specialization 
FROM Caretaker c, Animal a
WHERE c.AnimalID = a.AnimalID AND a.ResearchTeamID = :ResearchTeamID


-- #7 : AGGREGATION WITH GROUP BY 
SELECT OrganizationID,MIN(PopulationCount) AS mixn_population 
FROM LivesIn 
GROUP BY OrganizationID
-- This query will display the minimum population of any animals that are living in each OrganizationID present in the relation. 

-- #8 : AGGREGATION WITH HAVING 
SELECT SponsorID
FROM Funds 
GROUP BY SponsorID
HAVING SUM(Contributions) > 2000

--This query will display the IDs of sponsors who have contributed over $1000. 

-- #9 : NESTED AGGREGATION WITH GROUP BY 

SELECT SponsorID 
FROM Funds F
GROUP BY SponsorID 
HAVING AVG(Contributions) >= ALL (
    SELECT AVG(F1.Contributions)  
    FROM Funds F1 
    GROUP BY F1.SponsorID)

--This query will display the IDs of sponsors with the highest average contributions amongst the sponsors. 

-- #10 : DIVISION 
SELECT R.ResearchTeamID 
        FROM ResearchTeams R
        WHERE NOT EXISTS 
            (SELECT F.SponsorID
            FROM Funds F 
            WHERE NOT EXISTS  
                (SELECT F2.SponsorID
                FROM Funds F2
                WHERE F2.ResearchTeamID = R.ResearchTeamID
                AND F2.SponsorID = F.SponsorID))


--The query will display the IDs of research teams who are sponsored by every sponsor listed. 

