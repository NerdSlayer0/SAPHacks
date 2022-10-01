CREATE TABLE users (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(50),
  office_location VARCHAR(50),
  department VARCHAR(50),
  work_count int,
  PRIMARY KEY (ID)
  FOREIGN KEY office_location REFERENCES all_locations(location_ID)
);

CREATE TABLE events (
  event_ID int NOT NULL AUTO_INCREMENT,
  meeting_location VARCHAR(50),
  event_type VARCHAR(50),
  attendee_list VARCHAR(100),
  PRIMARY KEY (event_ID),
  FOREIGN KEY (meeting_location) REFERENCES all_locations(location_ID),
  FOREIGN KEY (attendee_list) REFERENCES users(ID)
);

CREATE TABLE user_interests (
    user_ID int,
    interest_ID int,
    PRIMARY KEY (user_ID, interest_ID)
);

CREATE TABLE interests (
    interest_ID int,
    user_ID int,
    PRIMARY KEY (interest_ID),
    FOREIGN_KEY (user_ID) REFERENCES user(ID)
);

CREATE TABLE all_locations (
    location_ID int NOT NULL AUTO_INCREMENT,
    location_name VARCHAR(50) NOT NULL,
);

CREATE TABLE chat_messages (
    message_ID int NOT NULL, AUTO_INCREMENT,
    invite_code int NOT NULL, AUTO_INCREMENT,
    sender VARCHAR(50),
    FOREIGN KEY sender REFERENCES user(user_name)
);

INSERT INTO users (user_name, first_name, last_name, password, is_admin, office_location) VALUES ('geb', 'Gabriel', 'Fairbairn', 'asdf', '1', 'Yaletown');
INSERT INTO users (user_name, first_name, last_name, password, is_admin, office_location) VALUES ('raphael', 'Secret', 'Weapon', 'asdf', '1', 'Yaletown');
INSERT INTO users (user_name, first_name, last_name, password, is_admin, office_location) VALUES ('lilnaz', 'Naz', 'Mohammadi', 'asdf', '1', 'Yaletown');
INSERT INTO users (user_name, first_name, last_name, password, is_admin, office_location) VALUES ('monkey', 'Test', 'Dummy', '0123', '0', 'Bogustown');

INSERT INTO events (event_name, meeting_location, meeting_amenity, host_ID, booking_day, booking_time, event_type) VALUES ('coffee', 'Starbucks - Yaletown', 'None', '1', '2022-02-10', '16:30', 'in-person');

INSERT INTO amenities (amenity_name) VALUES ('Ping Pong Room');