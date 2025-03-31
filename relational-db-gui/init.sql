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
    Name VARCHAR
)

CREATE TABLE Sponsor (
    SponsorID int,
    OrganizationID int,
    Contributions float,
    PRIMARY KEY (SponsorID, OrganizationID),
    FOREIGN KEY (SponsorID) REFERENCES Sponsors,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
)
CREATE TABLE Funds (
    SponsorID int,
    ResearchTeamID int,
    Contributions float,
    PRIMARY KEY (SponsorID, ResearchTeamID),
    FOREIGN KEY (SponsorID) REFERENCES Sponsors,
    FOREIGN KEY (ResearchTeamID) references ResearchTeams
)
CREATE TABLE Publications (
    ResearchTeamID int,
    PublicationID int,
    PublicationDate Date,
    PRIMARY KEY(ResearchTeamID, PublicationID),
    FOREIGN KEY (PublicationID) references ResearchTeams
)
CREATE TABLE LivesIn (
    AnimalID int,
    PopulationCount int,
    OrganizationID int,
    PRIMARY KEY (AnimalID, OrganizationID),
    FOREIGN KEY (AnimalID) references Animal,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
)
CREATE TABLE Animal (
    AnimalID int PRIMARY KEY,
    HabitatID int NOT NULL,
    Species VARCHAR,
    ResearchTeamID int,
    FOREIGN KEY (HabitatID) references NaturalHabitat,
    FOREIGN KEY (ResearchTeamID) references ResearchTeam,
    FOREIGN KEY (Species) REFERENCES SpeciesInfo
)
CREATE TABLE SpeciesInfo (
    Species VARCHAR PRIMARY KEY,
    Lifespan FLOAT,
    DietType VARCHAR
)

CREATE TABLE ResearchTeams (
    ResearchTeamID int PRIMARY KEY,
    ContactInfo VARCHAR,
    FOREIGN KEY (ContactInfo) references ResearchTeams_Contact
)
CREATE TABLE ResearchTeams_Contact (
    ContactInfo VARCHAR PRIMARY KEY,
    Specialization VARCHAR
)
CREATE TABLE Caretaker (
    CaretakerID int PRIMARY KEY,
    Name VARCHAR,
    OrganizationID int NOT NULL,
    Speicalization VARCHAR,
    AnimalID int NOT NULL,
    FOREIGN KEY (AnimalID) references Animal,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
)
CREATE TABLE Plants (
    PlantID int PRIMARY KEY,
    HabitatID int NOT NULL,
    Species VARCHAR,
    FOREIGN KEY (HabitatID) references NaturalHabitat,
    FOREIGN KEY (Species) REFERENCES PlantSpeciesInfo
)

CREATE TABLE PlantSpeciesInfo (
    Species VARCHAR PRIMARY KEY,
    Description TEXT
)

CREATE TABLE NaturalHabitat (
    HabitatID int PRIMARY KEY,
    Description TEXT,
    AvgTemp FLOAT,
    AvgRainfall FLOAT
)

CREATE TABLE Zoo (
    OrganizationID int PRIMARY KEY,
    Location VARCHAR,
    Name VARCHAR,
    VisitorCapacity int,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
)

CREATE TABLE Aquarium(
    OrganizationID int PRIMARY KEY,
    Location VARCHAR,
    Name VARCHAR,
    VisitorCapacity int,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
)

CREATE TABLE WildlifeReserves(
    OrganizationID int PRIMARY KEY,
    Location VARCHAR,
    Name VARCHAR,
    Size FLOAT,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
)

-- Sponsors (SponsorID, Name):
INSERT INTO Sponsors(SponsorID, Name) VALUES 
(1, ‘Parks Canada’), 
(2, ‘WWF’), 
(3,'Outdoor Fund'), 
(4, 'Green Earth Fund'), 
(5, 'Eco Canada');

--Sponsor (SponsorID, OrganizationID, Contributions):
INSERT INTO Sponsor (SponsorID, OrganizationID, Contributions) VALUES 
(1, 101, 3500.00), 
(2, 102, 50000.00), 
(3, 103, 2500.50),
(1, 103, 3000.00), 
(3, 101, 15000.75);

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

--ResearchTeams_Contact(ContactInfo, Specializaion):
INSERT INTO ResearchTeams_Contact(ContactInfo, Specializaion) VALUES 
(“647-234-5675”, “Urban expansion and extinct animals”), 
(“123-345-2432”, “Mammal Reproduction”), 
(“789-290-2044”, “Effects of Oil Rigs on Marine Life”) ,
(“raymondsky8@gmail.com”, “Preservation of Rhinos”), 
(“rli@yahoo.com”, “Evolution ofAligators”);

--ResearchTeams(ResearchTeamID, ContactInfo):
INSERT INTO ResearchTeams(ResearchTeamID, ContactInfo) VALUES 
(201, “647-234-5675”), 
(202, “123-345-2432”), 
(203, “789-290-2044”), 
(204, “raymondsky8@gmail.com”),
(205, “rli@yahoo.com”);

--SpeciesInfo (Species, Lifespan, DietType):
INSERT INTO SpeciesInfo (Species, Lifespan, DietType) VALUES 
(“Brown Bear”, 34,“Omnivore”), 
(“Polar Bear”, 34, “Carnivore”), 
(“Black Bear”, 34, “Herbivore”), 
(“Tuna Fish”, 5, “Herbivore”), 
(“Giraffe”, 20, “Herbivore”);

--Animal(AnimalID, Species, ResearchTeamID, HabitatID):
INSERT INTO Animal(AnimalID, Species, ResearchTeamID, HabitatID)
VALUES 
(1000, “Brown Bear”, 201, 101), 
(1001, “Polar Bear”, 202, 102), 
(1002, “Black Bear”, 203, 103), 
(1003, “Tuna Fish”, 204, 104), 
(1004, “Giraffe”, 205, 105);

--LivesIn(OrganizationID, AnimalID, PopulationCount):
INSERT INTO LivesIn(OrganizationID, AnimalID, PopulationCount) VALUES 
(1, 1000, 3), 
(1, 1001, 2), 
(2, 1002, 4), 
(3, 1003, 10), 
(3, 1004, 4);

--Caretaker (CaretakerID, Name, OrganizationID, Specialization):
INSERT INTO Caretaker (CaretakerID, Name, OrganizationID, Specialization) VALUES 
(300, “Bob”, 1, “Monkeys”), 
(301, “John”, 1, “Penguins”), 
(302, “Raymond”, 2, “Frogs”), 
(303, “Kat”, 3, “Snakes”), 
(304, “Tyrone”, 3, “Hippos”);

--Plants (PlantID, HabiratID, Species):
INSERT INTO Plants (PlantID, HabiratID, Species) VALUES 
(400, 500, “Lavendar”), 
(401, 501, “Maple Tree”), 
(402, 502, “Daisy”), 
(403, 503, “Mangrove Tree”), 
(404, 504, “Pine Tree”);

--PlantSpeciesInfo(Species, Description):
INSERT INTO PlantSpeciesInfo(Species, Description) VALUES 
(“Lavender”, “purple n stuff”), 
(“Daisy”, “White n stuff”), 
(“Maple Tree”, “Funny shaped leaves”), 
(“Mangrove Tree”, “Trees in Swamp”), 
(“Pine Tree”, “Spiky Leaves”);

--NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall):
INSERT INTO NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall) VALUES 
(101, “Swamp”, 23, 2200), 
(102, “Saharah Desert”, 40, 20), 
(103, “Arctic”, -5, 20), 
(104, “Canadian Forest”, 15, 220), 
(105, “Mountains”, 5, 70);

--Zoo(OrganizationID, Location, Name, VisitorCapacity):
INSERT INTO Zoo(OrganizationID, Location, Name, VisitorCapacity) VALUES 
(1, “Toronto”, “Toronto Zoo”, 1000), 
(2, “Vancouver”, “Vancouver Zoo”, 800), 
(3, “ChangChun”, “ChangChun Zoo”, 2345), 
(4, “Munich”, “Munich Zoo”, 600), 
(5, “Shanghai”, “Shanghai Zoo”, 400);

--Aquarium (OrganizationID, Location, Name, VisitorCapacity):
INSERT INTO Aquarium (OrganizationID, Location, Name, VisitorCapacity) VALUES 
(6, “Toronto”, “Ripley’s Aquarium”, 1000), 
(7, “Vancouver”, “Vancouver Aquarium”, 800), 
(8, “ChangChun”, “ChangChun Aquarium”, 2345), 
(9, “Munich”, “Munich Aquarium”, 600),
(10, “Shanghai”, “Shanghai Aquarium”, 400);

--WildlifeReserves(OrganizationID, Location, Name, Size):
INSERT INTO WildlifeReserves (OrganizationID, Location, Name, Size) VALUES 
(11, “Ontario”, “Algonquin Park”, 1000.246), 
(12, “Vancouver”, “Musqueam Forest”, 850.5),
(13, “ChangChun”, “ChangChun Wildlife Reserve”, 4000.345), 
(14, “Munich”, “German National Park”, 2499.80), 
(15, “Shanghai”, “Shanghai Panda Reserve”, 439.245);