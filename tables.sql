CREATE TABLE users (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(50),
  office_location int,
  department VARCHAR(50),
  in_office BIT,
  work_count int,
  PRIMARY KEY (ID),
  FOREIGN KEY (office_location) REFERENCES all_locations(location_ID)
);

CREATE TABLE events (
  event_ID int NOT NULL AUTO_INCREMENT,
  event_location int,
  event_type VARCHAR(50),
  event_subject VARCHAR(50),
  PRIMARY KEY (event_ID),
  FOREIGN KEY (event_location) REFERENCES all_locations(location_ID),
);

CREATE TABLE event_attendance (
    event_ID int,
    user_ID int,
    PRIMARY KEY (event_ID, user_ID)
);

CREATE TABLE user_interests (
    user_ID int,
    interest_ID int,
    PRIMARY KEY (user_ID, interest_ID)
);

CREATE TABLE interests (
    interest_ID int NOT NULL AUTO_INCREMENT,
    user_ID int,
    interest_name VARCHAR(50),
    PRIMARY KEY (interest_ID),
    FOREIGN KEY (user_ID) REFERENCES users(ID)
);

CREATE TABLE all_locations (
    location_ID int NOT NULL AUTO_INCREMENT,
    location_name VARCHAR(50),
    location_country VARCHAR(50) NOT NULL,
    location_office VARCHAR(50) NOT NULL
);

CREATE TABLE chat_messages (
    message_ID int NOT NULL, AUTO_INCREMENT,
    invite_code int NOT NULL, AUTO_INCREMENT,
    sender VARCHAR(50),
    content text,
    FOREIGN KEY sender REFERENCES users(user_name)
);

INSERT INTO users (ID, user_name, first_name, last_name, password, office_location, department, work_count) VALUES ('0', 'geb', 'Gabriel', 'Fairbairn', 'asdf', 'Yaletown', 'IT', '0');
INSERT INTO users (user_name, first_name, last_name, password, office_location, department, work_count) VALUES ('raphael', 'Secret', 'Weapon', 'asdf', '1', 'Yaletown', 'IT', '0');
INSERT INTO users (user_name, first_name, last_name, password, office_location, department, work_count) VALUES ('lilnaz', 'Naz', 'Mohammadi', 'asdf', '1', 'Yaletown', 'IT', '0');
INSERT INTO users (user_name, first_name, last_name, password, office_location, department, work_count) VALUES ('monkey', 'Test', 'Dummy', '0123', '0', 'Bogustown', 'Unemployed', '0');

INSERT INTO all_locations (location_ID, location_name, location_country, location_office) VALUES ('1', 'Coffee Room', 'CAN', 'Vancouver Yaletown')
INSERT INTO all_locations (location_ID, location_name, location_country, location_office) VALUES ('2', 'Wordle', 'CAN', 'Online');
INSERT INTO all_locations (location_ID, location_name, location_country, location_office) VALUES ('3', 'littlebigsnake.com', 'CAN', 'Online');
INSERT INTO all_locations (location_ID, location_name, location_country, location_office) VALUES ('4', 'chess.com', 'CAN', 'Online');
INSERT INTO all_locations (location_ID, location_name, location_country, location_office) VALUES ('5', 'funtrivia.com', 'CAN', 'Online');

INSERT INTO events (event_location, event_type, event_subject) VALUES ('1', 'In-person', 'Coffee');
INSERT INTO events (event_location, event_type, event_subject) VALUES ('2', 'Online', 'Wordle');
INSERT INTO events (event_location, event_type, event_subject) VALUES ('3', 'Online', 'Little Big Snake');
INSERT INTO events (event_location, event_type, event_subject) VALUES ('4', 'Online', 'Chess');
INSERT INTO events (event_location, event_type, event_subject) VALUES ('5', 'Online', 'Trivia');

INSERT INTO interests (user_ID, interest_ID, interest_name) VALUES ('0', '0', 'Coffee')
