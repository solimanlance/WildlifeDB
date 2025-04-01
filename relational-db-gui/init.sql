DROP TABLE Sponsors; 
DROP TABLE Sponsor; 
DROP TABLE Funds; 
DROP TABLE Publications; 
DROP TABLE LivesIn; 
DROP TABLE Animal; 
DROP TABLE SpeciesInfo;
DROP TABLE ResearchTeams; 
DROP TABLE ResearchTeams_Contact;
DROP TABLE Caretaker; 
DROP TABLE Plants; 
DROP TABLE PlantSpeciesInfo;
DROP TABLE NaturalHabitat;
DROP TABLE Zoo;
DROP TABLE Aquarium;
DROP TABLE WildlifeReserves;


CREATE TABLE Sponsors (
    SponsorID int PRIMARY KEY,
    Name VARCHAR(50)
);

CREATE TABLE Sponsor (
    SponsorID int,
    OrganizationID int,
    Contributions float,
    PRIMARY KEY (SponsorID, OrganizationID),
    FOREIGN KEY (OrganizationID) references ConservationOrganization
);
CREATE TABLE Funds (
    SponsorID int,
    ResearchTeamID int,
    Contributions float,
    PRIMARY KEY (SponsorID, ResearchTeamID),
    FOREIGN KEY (ResearchTeamID) references ResearchTeams
);
CREATE TABLE Publications (
    ResearchTeamID int,
    PublicationID int,
    PublicationDate Date,
    PRIMARY KEY(ResearchTeamID, PublicationID),
    FOREIGN KEY (ResearchTeamID) references ResearchTeams
);
CREATE TABLE LivesIn (
    AnimalID int,
    PopulationCount int,
    OrganizationID int,
    PRIMARY KEY (AnimalID, OrganizationID),
    FOREIGN KEY (AnimalID) references Animal,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
);
CREATE TABLE Animal (
    AnimalID int PRIMARY KEY,
    HabitatID int NOT NULL,
    Species VARCHAR(30),
    ResearchTeamID int,
    FOREIGN KEY (HabitatID) references NaturalHabitat,
    FOREIGN KEY (ResearchTeamID) references ResearchTeams,
    FOREIGN KEY (Species) REFERENCES SpeciesInfo
);
CREATE TABLE SpeciesInfo (
    Species VARCHAR(30) PRIMARY KEY,
    Lifespan FLOAT,
    DietType VARCHAR(50)
);

CREATE TABLE ResearchTeams (
    ResearchTeamID int PRIMARY KEY,
    ContactInfo VARCHAR(30),
    FOREIGN KEY (ContactInfo) references ResearchTeams_Contact
);
CREATE TABLE ResearchTeams_Contact (
    ContactInfo VARCHAR(30) PRIMARY KEY,
    Specialization VARCHAR(30)
);
CREATE TABLE Caretaker (
    CaretakerID int PRIMARY KEY,
    Name VARCHAR(50),
    OrganizationID int NOT NULL,
    Specialization VARCHAR(30),
    AnimalID int NOT NULL,
    FOREIGN KEY (AnimalID) references Animal,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
);
CREATE TABLE Plants (
    PlantID int PRIMARY KEY,
    HabitatID int NOT NULL,
    Species VARCHAR(30),
    FOREIGN KEY (HabitatID) references NaturalHabitat,
    FOREIGN KEY (Species) REFERENCES PlantSpeciesInfo
);

CREATE TABLE PlantSpeciesInfo (
    Species VARCHAR(30) PRIMARY KEY,
    Description VARCHAR(500)
);

CREATE TABLE NaturalHabitat (
    HabitatID int PRIMARY KEY,
    Description VARCHAR(500),
    AvgTemp FLOAT,
    AvgRainfall FLOAT
);

CREATE TABLE Zoo (
    OrganizationID int PRIMARY KEY,
    Location VARCHAR(30),
    Name VARCHAR(50),
    VisitorCapacity int,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
);

CREATE TABLE Aquarium(
    OrganizationID int PRIMARY KEY,
    Location VARCHAR(30),
    Name VARCHAR(50),
    VisitorCapacity int,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
);

CREATE TABLE WildlifeReserves(
    OrganizationID int PRIMARY KEY,
    Location VARCHAR(30),
    Name VARCHAR(50),
    Size FLOAT,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
);

-- just added
CREATE TABLE ConservationOrganization (
    OrganizationID int PRIMARY KEY
);

-- ConservationOrganization(OrganizationID):
INSERT INTO ConservationOrganization(OrganizationID) VALUES (101),(102),(103),(104),(105),(106),
(107),(108),(109),(110),(111),(112),(113),(114),(115);

-- Sponsors (SponsorID, Name):
INSERT INTO Sponsors(SponsorID, Name) VALUES 
(1, 'Parks Canada'), 
(2, 'WWF'), 
(3,'Outdoor Fund'), 
(4, 'Green Earth Fund'), 
(5, 'Eco Canada');

--Sponsor (SponsorID, OrganizationID, Contributions):
INSERT INTO Sponsor (SponsorID, OrganizationID, Contributions) VALUES 
(1, 101, 3500.00), 
(2, 102, 50000.00), 
(3, 103, 2500.50),
(4, 103, 3000.00), 
(5, 101, 15000.75);

--ResearchTeams_Contact(ContactInfo, Specializaion):
INSERT INTO ResearchTeams_Contact(ContactInfo, Specialization) VALUES 
('647-234-5675', 'Urban expansion and extinct animals'), 
('123-345-2432', 'Mammal Reproduction'), 
('789-290-2044', 'Effects of Oil Rigs on Marine Life') ,
('raymondsky8@gmail.com', 'Preservation of Rhinos'), 
('rli@yahoo.com', 'Evolution ofAligators');

--ResearchTeams(ResearchTeamID, ContactInfo):
INSERT INTO ResearchTeams(ResearchTeamID, ContactInfo) VALUES 
(201, '647-234-5675'), 
(202, '123-345-2432'), 
(203, '789-290-2044'), 
(204, 'raymondsky8@gmail.com'),
(205, 'rli@yahoo.com');

--Funds (SponsorID, ResearchTeamID, Contributions):
INSERT INTO Funds (SponsorID, ResearchTeamID, Contributions) VALUES 
(1, 201, 1000.00), 
(1, 202, 5000.25), 
(2, 203, 2500.00), 
(3, 201, 1500.00), 
(4, 204, 4000.00);

--Publications (ResearchTeamID, PublicationID, PublicationDate):
INSERT INTO Publications (ResearchTeamID, PublicationID, PublicationDate) VALUES
(201, 301, '2015-06-24'), 
(202, 302, '2020-05-02'), 
(203, 303, '2022-04-06'), 
(204, 304, '2023-06-10'), 
(205, 305, '2024-10-11');



--SpeciesInfo (Species, Lifespan, DietType):
INSERT INTO SpeciesInfo (Species, Lifespan, DietType) VALUES 
('Brown Bear', 34,'Omnivore'), 
('Polar Bear', 34, 'Carnivore'), 
('Black Bear', 34, 'Herbivore'), 
('Tuna Fish', 5, 'Herbivore'), 
('Giraffe', 20, 'Herbivore');

--NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall):
INSERT INTO NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall) VALUES 
(501, 'Swamp', 23, 2200), 
(502, 'Saharah Desert', 40, 20), 
(503, 'Arctic', -5, 20), 
(504, 'Canadian Forest', 15, 220), 
(505, 'Mountains', 5, 70);

--Animal(AnimalID, Species, ResearchTeamID, HabitatID):
INSERT INTO Animal(AnimalID, Species, ResearchTeamID, HabitatID)
VALUES 
(1000, 'Brown Bear', 201, 501), 
(1001, 'Polar Bear', 202, 502), 
(1002, 'Black Bear', 203, 503), 
(1003, 'Tuna Fish', 204, 504), 
(1004, 'Giraffe', 205, 505);

--LivesIn(OrganizationID, AnimalID, PopulationCount):
INSERT INTO LivesIn(OrganizationID, AnimalID, PopulationCount) VALUES 
(101, 1000, 3), 
(101, 1001, 2), 
(102, 1002, 4), 
(103, 1003, 10), 
(103, 1004, 4);

--Caretaker (CaretakerID, Name, OrganizationID, Specialization):
INSERT INTO Caretaker (CaretakerID, Name, OrganizationID, Specialization, AnimalID) VALUES 
(300, 'Bob', 101, 'Monkeys', 1001), 
(301, 'John', 101, 'Penguins', 1002), 
(302, 'Raymond', 102, 'Frogs', 1003), 
(303, 'Kat', 103, 'Snakes', 1004), 
(304, 'Tyrone', 103, 'Hippos', 1000);

--PlantSpeciesInfo(Species, Description):
INSERT INTO PlantSpeciesInfo(Species, Description) VALUES 
('Lavender', 'purple n stuff'), 
('Daisy', 'White n stuff'), 
('Maple Tree', 'Funny shaped leaves'), 
('Mangrove Tree', 'Trees in Swamp'), 
('Pine Tree', 'Spiky Leaves');

--Plants (PlantID, HabiratID, Species):
INSERT INTO Plants (PlantID, HabitatID, Species) VALUES 
(600, 501, 'Lavender'), 
(601, 502, 'Maple Tree'), 
(602, 503, 'Daisy'), 
(603, 504, 'Mangrove Tree'), 
(604, 505, 'Pine Tree');


--Zoo(OrganizationID, Location, Name, VisitorCapacity):
INSERT INTO Zoo(OrganizationID, Location, Name, VisitorCapacity) VALUES 
(101, 'Toronto', 'Toronto Zoo', 1000), 
(102, 'Vancouver', 'Vancouver Zoo', 800), 
(103, 'ChangChun', 'ChangChun Zoo', 2345), 
(104, 'Munich', 'Munich Zoo', 600), 
(105, 'Shanghai', 'Shanghai Zoo', 400);

--Aquarium (OrganizationID, Location, Name, VisitorCapacity):
INSERT INTO Aquarium (OrganizationID, Location, Name, VisitorCapacity) VALUES 
(106, 'Toronto', 'Ripleys Aquarium', 1000), 
(107, 'Vancouver', 'Vancouver Aquarium', 800), 
(108, 'ChangChun', 'ChangChun Aquarium', 2345), 
(109, 'Munich', 'Munich Aquarium', 600),
(110, 'Shanghai', 'Shanghai Aquarium', 400);

--WildlifeReserves(OrganizationID, Location, Name, Size):
INSERT INTO WildlifeReserves (OrganizationID, Location, Name, Size) VALUES 
(111, 'Ontario', 'Algonquin Park', 1000.246), 
(112, 'Vancouver', 'Musqueam Forest', 850.5),
(113, 'ChangChun', 'ChangChun Wildlife Reserve', 4000.345), 
(114, 'Munich', 'German National Park', 2499.80), 
(115, 'Shanghai', 'Shanghai Panda Reserve', 439.245);