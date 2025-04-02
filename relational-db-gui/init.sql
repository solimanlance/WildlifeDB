DROP TABLE SponsorInfo; 
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


-- just added
CREATE TABLE ConservationOrganization (
    OrganizationID int PRIMARY KEY
);
CREATE TABLE SponsorInfo (
    SponsorID int PRIMARY KEY,
    Name VARCHAR(50)
);

CREATE TABLE ResearchTeams_Contact (
    ContactInfo VARCHAR(30) PRIMARY KEY,
    Specialization VARCHAR(50)
);

CREATE TABLE ResearchTeams (
    ResearchTeamID int PRIMARY KEY,
    ContactInfo VARCHAR(30),
    FOREIGN KEY (ContactInfo) references ResearchTeams_Contact
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

CREATE TABLE Plants (
    PlantID int PRIMARY KEY,
    HabitatID int NOT NULL,
    Species VARCHAR(30),
    FOREIGN KEY (HabitatID) references NaturalHabitat,
    FOREIGN KEY (Species) REFERENCES PlantSpeciesInfo
);

CREATE TABLE SpeciesInfo (
    Species VARCHAR(30) PRIMARY KEY,
    Lifespan FLOAT,
    DietType VARCHAR(50)
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

CREATE TABLE LivesIn (
    AnimalID int,
    PopulationCount int,
    OrganizationID int,
    PRIMARY KEY (AnimalID, OrganizationID),
    FOREIGN KEY (AnimalID) references Animal,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
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
    AreaSize FLOAT,
    FOREIGN KEY (OrganizationID) references ConservationOrganization
);

-- ConservationOrganization(OrganizationID):
INSERT INTO ConservationOrganization(OrganizationID) VALUES (101);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (102);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (103);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (104);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (105);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (106);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (107);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (108);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (109);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (110);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (111);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (112);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (113);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (114);
INSERT INTO ConservationOrganization(OrganizationID) VALUES (115);

-- SponsorInfo (SponsorID, Name):
INSERT INTO SponsorInfo(SponsorID, Name) VALUES (1, 'Parks Canada');
INSERT INTO SponsorInfo(SponsorID, Name) VALUES (2, 'WWF');
INSERT INTO SponsorInfo(SponsorID, Name) VALUES (3, 'Outdoor Fund');
INSERT INTO SponsorInfo(SponsorID, Name) VALUES (4, 'Green Earth Fund');
INSERT INTO SponsorInfo(SponsorID, Name) VALUES (5, 'Eco Canada');

-- Sponsor (SponsorID, OrganizationID, Contributions):
INSERT INTO Sponsor (SponsorID, OrganizationID, Contributions) VALUES (1, 101, 3500.00);
INSERT INTO Sponsor (SponsorID, OrganizationID, Contributions) VALUES (2, 102, 50000.00);
INSERT INTO Sponsor (SponsorID, OrganizationID, Contributions) VALUES (3, 103, 2500.50);
INSERT INTO Sponsor (SponsorID, OrganizationID, Contributions) VALUES (4, 103, 3000.00);
INSERT INTO Sponsor (SponsorID, OrganizationID, Contributions) VALUES (5, 101, 15000.75);

-- ResearchTeams_Contact(ContactInfo, Specialization):
INSERT INTO ResearchTeams_Contact(ContactInfo, Specialization) VALUES ('647-234-5675', 'Urban expansion and extinct animals');
INSERT INTO ResearchTeams_Contact(ContactInfo, Specialization) VALUES ('123-345-2432', 'Mammal Reproduction');
INSERT INTO ResearchTeams_Contact(ContactInfo, Specialization) VALUES ('789-290-2044', 'Effects of Oil Rigs on Marine Life');
INSERT INTO ResearchTeams_Contact(ContactInfo, Specialization) VALUES ('raymondsky8@gmail.com', 'Preservation of Rhinos');
INSERT INTO ResearchTeams_Contact(ContactInfo, Specialization) VALUES ('rli@yahoo.com', 'Evolution of Aligators');

-- ResearchTeams(ResearchTeamID, ContactInfo):
INSERT INTO ResearchTeams(ResearchTeamID, ContactInfo) VALUES (201, '647-234-5675');
INSERT INTO ResearchTeams(ResearchTeamID, ContactInfo) VALUES (202, '123-345-2432');
INSERT INTO ResearchTeams(ResearchTeamID, ContactInfo) VALUES (203, '789-290-2044');
INSERT INTO ResearchTeams(ResearchTeamID, ContactInfo) VALUES (204, 'raymondsky8@gmail.com');
INSERT INTO ResearchTeams(ResearchTeamID, ContactInfo) VALUES (205, 'rli@yahoo.com');

-- Funds (SponsorID, ResearchTeamID, Contributions):
INSERT INTO Funds (SponsorID, ResearchTeamID, Contributions) VALUES (1, 201, 1000.00);
INSERT INTO Funds (SponsorID, ResearchTeamID, Contributions) VALUES (1, 202, 5000.25);
INSERT INTO Funds (SponsorID, ResearchTeamID, Contributions) VALUES (2, 203, 2500.00);
INSERT INTO Funds (SponsorID, ResearchTeamID, Contributions) VALUES (3, 201, 1500.00);
INSERT INTO Funds (SponsorID, ResearchTeamID, Contributions) VALUES (4, 204, 4000.00);

-- Publications (ResearchTeamID, PublicationID, PublicationDate):
INSERT INTO Publications (ResearchTeamID, PublicationID, PublicationDate) VALUES (201, 301, TO_DATE('2015-06-24', 'YYYY-MM-DD'));
INSERT INTO Publications (ResearchTeamID, PublicationID, PublicationDate) VALUES (202, 302, TO_DATE('2020-05-02', 'YYYY-MM-DD'));
INSERT INTO Publications (ResearchTeamID, PublicationID, PublicationDate) VALUES (203, 303, TO_DATE('2022-04-06', 'YYYY-MM-DD'));
INSERT INTO Publications (ResearchTeamID, PublicationID, PublicationDate) VALUES (204, 304, TO_DATE('2023-06-10', 'YYYY-MM-DD'));
INSERT INTO Publications (ResearchTeamID, PublicationID, PublicationDate) VALUES (205, 305, TO_DATE('2024-10-11', 'YYYY-MM-DD'));

-- SpeciesInfo (Species, Lifespan, DietType):
INSERT INTO SpeciesInfo (Species, Lifespan, DietType) VALUES ('Brown Bear', 34, 'Omnivore');
INSERT INTO SpeciesInfo (Species, Lifespan, DietType) VALUES ('Polar Bear', 34, 'Carnivore');
INSERT INTO SpeciesInfo (Species, Lifespan, DietType) VALUES ('Black Bear', 34, 'Herbivore');
INSERT INTO SpeciesInfo (Species, Lifespan, DietType) VALUES ('Tuna Fish', 5, 'Herbivore');
INSERT INTO SpeciesInfo (Species, Lifespan, DietType) VALUES ('Giraffe', 20, 'Herbivore');

-- NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall):
INSERT INTO NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall) VALUES (501, 'Swamp', 23, 2200);
INSERT INTO NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall) VALUES (502, 'Saharah Desert', 40, 20);
INSERT INTO NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall) VALUES (503, 'Arctic', -5, 20);
INSERT INTO NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall) VALUES (504, 'Canadian Forest', 15, 220);
INSERT INTO NaturalHabitat(HabitatID, Description, AvgTemp, AvgRainfall) VALUES (505, 'Mountains', 5, 70);

-- Animal(AnimalID, Species, ResearchTeamID, HabitatID):
INSERT INTO Animal(AnimalID, Species, ResearchTeamID, HabitatID) VALUES (1000, 'Brown Bear', 201, 501);
INSERT INTO Animal(AnimalID, Species, ResearchTeamID, HabitatID) VALUES (1001, 'Polar Bear', 202, 502);
INSERT INTO Animal(AnimalID, Species, ResearchTeamID, HabitatID) VALUES (1002, 'Black Bear', 203, 503);
INSERT INTO Animal(AnimalID, Species, ResearchTeamID, HabitatID) VALUES (1003, 'Tuna Fish', 204, 504);
INSERT INTO Animal(AnimalID, Species, ResearchTeamID, HabitatID) VALUES (1004, 'Giraffe', 205, 505);

-- LivesIn(OrganizationID, AnimalID, PopulationCount):
INSERT INTO LivesIn(OrganizationID, AnimalID, PopulationCount) VALUES (101, 1000, 3);
INSERT INTO LivesIn(OrganizationID, AnimalID, PopulationCount) VALUES (101, 1001, 2);
INSERT INTO LivesIn(OrganizationID, AnimalID, PopulationCount) VALUES (102, 1002, 4);
INSERT INTO LivesIn(OrganizationID, AnimalID, PopulationCount) VALUES (103, 1003, 10);
INSERT INTO LivesIn(OrganizationID, AnimalID, PopulationCount) VALUES (103, 1004, 4);

-- Caretaker (CaretakerID, Name, OrganizationID, Specialization, AnimalID):
INSERT INTO Caretaker (CaretakerID, Name, OrganizationID, Specialization, AnimalID) VALUES (300, 'Bob', 101, 'Monkeys', 1001);
INSERT INTO Caretaker (CaretakerID, Name, OrganizationID, Specialization, AnimalID) VALUES (301, 'John', 101, 'Penguins', 1002);
INSERT INTO Caretaker (CaretakerID, Name, OrganizationID, Specialization, AnimalID) VALUES (302, 'Raymond', 102, 'Frogs', 1003);
INSERT INTO Caretaker (CaretakerID, Name, OrganizationID, Specialization, AnimalID) VALUES (303, 'Kat', 103, 'Snakes', 1004);
INSERT INTO Caretaker (CaretakerID, Name, OrganizationID, Specialization, AnimalID) VALUES (304, 'Tyrone', 103, 'Hippos', 1000);

-- PlantSpeciesInfo(Species, Description):
INSERT INTO PlantSpeciesInfo(Species, Description) VALUES ('Lavender', 'purple n stuff');
INSERT INTO PlantSpeciesInfo(Species, Description) VALUES ('Daisy', 'White n stuff');
INSERT INTO PlantSpeciesInfo(Species, Description) VALUES ('Maple Tree', 'Funny shaped leaves');
INSERT INTO PlantSpeciesInfo(Species, Description) VALUES ('Mangrove Tree', 'Trees in Swamp');
INSERT INTO PlantSpeciesInfo(Species, Description) VALUES ('Pine Tree', 'Spiky Leaves');

-- Plants (PlantID, HabitatID, Species):
INSERT INTO Plants (PlantID, HabitatID, Species) VALUES (600, 501, 'Lavender');
INSERT INTO Plants (PlantID, HabitatID, Species) VALUES (601, 502, 'Maple Tree');
INSERT INTO Plants (PlantID, HabitatID, Species) VALUES (602, 503, 'Daisy');
INSERT INTO Plants (PlantID, HabitatID, Species) VALUES (603, 504, 'Mangrove Tree');
INSERT INTO Plants (PlantID, HabitatID, Species) VALUES (604, 505, 'Pine Tree');

-- Zoo(OrganizationID, Location, Name, VisitorCapacity):
INSERT INTO Zoo(OrganizationID, Location, Name, VisitorCapacity) VALUES (101, 'Toronto', 'Toronto Zoo', 1000);
INSERT INTO Zoo(OrganizationID, Location, Name, VisitorCapacity) VALUES (102, 'Vancouver', 'Vancouver Zoo', 800);
INSERT INTO Zoo(OrganizationID, Location, Name, VisitorCapacity) VALUES (103, 'ChangChun', 'ChangChun Zoo', 2345);
INSERT INTO Zoo(OrganizationID, Location, Name, VisitorCapacity) VALUES (104, 'Munich', 'Munich Zoo', 600);
INSERT INTO Zoo(OrganizationID, Location, Name, VisitorCapacity) VALUES (105, 'Shanghai', 'Shanghai Zoo', 400);

-- Aquarium (OrganizationID, Location, Name, VisitorCapacity):
INSERT INTO Aquarium (OrganizationID, Location, Name, VisitorCapacity) VALUES (106, 'Toronto', 'Ripleys Aquarium', 1000);
INSERT INTO Aquarium (OrganizationID, Location, Name, VisitorCapacity) VALUES (107, 'Vancouver', 'Vancouver Aquarium', 800);
INSERT INTO Aquarium (OrganizationID, Location, Name, VisitorCapacity) VALUES (108, 'ChangChun', 'ChangChun Aquarium', 2345);
INSERT INTO Aquarium (OrganizationID, Location, Name, VisitorCapacity) VALUES (109, 'Munich', 'Munich Aquarium', 600);
INSERT INTO Aquarium (OrganizationID, Location, Name, VisitorCapacity) VALUES (110, 'Shanghai', 'Shanghai Aquarium', 400);

-- WildlifeReserves(OrganizationID, Location, Name, AreaSize):
INSERT INTO WildlifeReserves (OrganizationID, Location, Name, AreaSize) VALUES (111, 'Ontario', 'Algonquin Park', 1000.246);
INSERT INTO WildlifeReserves (OrganizationID, Location, Name, AreaSize) VALUES (112, 'Vancouver', 'Musqueam Forest', 850.5);
INSERT INTO WildlifeReserves (OrganizationID, Location, Name, AreaSize) VALUES (113, 'ChangChun', 'ChangChun Wildlife Reserve', 4000.345);
INSERT INTO WildlifeReserves (OrganizationID, Location, Name, AreaSize) VALUES (114, 'Munich', 'German National Park', 2499.80);
INSERT INTO WildlifeReserves (OrganizationID, Location, Name, AreaSize) VALUES (115, 'Shanghai', 'Shanghai Panda Reserve', 439.245);