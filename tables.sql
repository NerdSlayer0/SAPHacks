CREATE TABLE users (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(50),
  is_admin TINYINT(1),
  office_location VARCHAR(50),
  interests VARCHAR(50),
  PRIMARY KEY (ID)
);

CREATE TABLE events (
  event_ID int NOT NULL AUTO_INCREMENT,
  event_name VARCHAR(50) NOT NULL,
  meeting_location VARCHAR(50),
  meeting_amenity VARCHAR(50), 
  host_ID int,
  booking_day date,
  booking_time time,
  event_type VARCHAR(50),
  attendee_list VARCHAR(100), 
  PRIMARY KEY (word_ID),
  FOREIGN KEY (host_ID) REFERENCES users(ID),
  FOREIGN KEY (meeting_amenity) REFERENCES amenities(amenity_ID),
  FOREIGN KEY (attendee_list) REFERENCES users(ID)
);

CREATE TABLE amenities (
    amenity_ID int NOT NULL AUTO_INCREMENT,
    amenity_name VARCHAR(50) NOT NULL,
    booked BOOLEAN,
)

INSERT INTO users (user_name, first_name, last_name, password, is_admin, office_location) VALUES ('geb', 'Gabriel', 'Fairbairn', 'asdf', '1', 'Yaletown');
INSERT INTO users (user_name, first_name, last_name, password, is_admin, office_location) VALUES ('raphael', 'Secret', 'Weapon', 'asdf', '1', 'Yaletown');
INSERT INTO users (user_name, first_name, last_name, password, is_admin, office_location) VALUES ('lilnaz', 'Naz', 'Mohammadi', 'asdf', '1', 'Yaletown');
INSERT INTO users (user_name, first_name, last_name, password, is_admin, office_location) VALUES ('monkey', 'Test', 'Dummy', '0123', '0', 'Bogustown');

INSERT INTO events (event_name, meeting_location, meeting_amenity, host_ID, booking_day, booking_time, event_type) VALUES ('coffee', 'Starbucks - Yaletown', 'None', '1', '2022-02-10', '16:30', 'in-person');

INSERT INTO amenities (amenity_name, booked) VALUES ('Ping Pong Room', 0);