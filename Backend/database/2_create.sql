-- SIIA TULEB PÄRAST VERTABELO SQL EXPORT LINES (ENNE SEDA EI TASU PUUTUDA)
-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-05-16 13:24:41.97

-- tables
-- Table: keyword
CREATE TABLE keyword (
                        id serial  NOT NULL,
                        location_id int  NOT NULL,
                        keyword varchar(255)  NOT NULL,
                        CONSTRAINT keyword_pk PRIMARY KEY (id)
);

-- Table: county
CREATE TABLE county (
                        id serial NOT NULL,
                        name varchar(50) NOT NULL,
                        longfield numeric(9,6) NOT NULL,
                        latfield numeric(9,6) NOT NULL,
                        zoomlevel integer NOT NULL,
                        CONSTRAINT county_pk PRIMARY KEY (id)
);

-- Table: game
CREATE TABLE game (
                      id serial  NOT NULL,
                      location_id int  NOT NULL,
                      user_id int  NOT NULL,
                      start_time timestamp  NULL,
                      end_time timestamp  NULL,
                      status char(2)  NOT NULL,
                      complete_date date  NULL,
                      hints_used int NOT NULL,
                      points int  NOT NULL,
                      CONSTRAINT game_pk PRIMARY KEY (id)
);

-- Table: game_hint
CREATE TABLE game_hint (
                           id serial  NOT NULL,
                           game_id int  NOT NULL,
                           hint_id int  NOT NULL,
                           CONSTRAINT game_hint_pk PRIMARY KEY (id)
);

-- Table: hint
CREATE TABLE hint (
                      id serial  NOT NULL,
                      location_id int  NOT NULL,
                      hint varchar(1000)  NOT NULL,
                      CONSTRAINT hint_pk PRIMARY KEY (id)
);

-- Table: location
CREATE TABLE location (
                          id serial  NOT NULL,
                          user_id int  NOT NULL,
                          county_id int  NOT NULL,
                          name varchar(255)  NOT NULL,
                          longfield decimal(18,15)  NULL,
                          latfield decimal(18,15)  NULL,
                          zoomlevel Int NOT NULL ,
                          status char(1)  NOT NULL,
                          teaser varchar(1500)  NOT NULL,
                          extended_info varchar(4500)  NOT NULL,
                          question varchar(1000)  NOT NULL,
                          answer varchar(1000)  NOT NULL,
                          date_added date  NOT NULL,
                          CONSTRAINT location_pk PRIMARY KEY (id)
);

-- Table: location_image
CREATE TABLE location_image (
                                id serial  NOT NULL,
                                location_id int  NOT NULL,
                                image_data bytea  NOT NULL,
                                sequence int  NOT NULL,
                                CONSTRAINT location_image_pk PRIMARY KEY (id)
);

-- Table: reply
CREATE TABLE reply (
                       id serial  NOT NULL,
                       user_id int  NOT NULL,
                       review_id int  NOT NULL,
                       comment varchar(255)  NOT NULL,
                       date_added date  NOT NULL,
                       CONSTRAINT reply_pk PRIMARY KEY (id)
);

-- Table: review
CREATE TABLE review (
                        id serial  NOT NULL,
                        user_id int  NOT NULL,
                        location_id int  NOT NULL,
                        rating int  NOT NULL,
                        comment varchar(255)  NOT NULL,
                        date_added date  NOT NULL,
                        CONSTRAINT review_pk PRIMARY KEY (id)
);

-- Table: role
CREATE TABLE role (
                      id serial  NOT NULL,
                      name varchar(255)  NOT NULL,
                      CONSTRAINT role_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
                        id serial  NOT NULL,
                        role_id int  NOT NULL,
                        username varchar(20)  NOT NULL,
                        password varchar(20)  NOT NULL,
                        email varchar(255)  NOT NULL,
                        status char(1)  NOT NULL,
                        CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: location_image_location (table: location_image)
ALTER TABLE location_image ADD CONSTRAINT location_image_location
    FOREIGN KEY (location_id)
        REFERENCES location (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: keyword_location (table: keyword)
ALTER TABLE keyword ADD CONSTRAINT keyword_location
    FOREIGN KEY (location_id)
        REFERENCES location (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: game_hint_game (table: game_hint)
ALTER TABLE game_hint ADD CONSTRAINT game_hint_game
    FOREIGN KEY (game_id)
        REFERENCES game (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: game_hint_hint (table: game_hint)
ALTER TABLE game_hint ADD CONSTRAINT game_hint_hint
    FOREIGN KEY (hint_id)
        REFERENCES hint (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: hint_location (table: hint)
ALTER TABLE hint ADD CONSTRAINT hint_location
    FOREIGN KEY (location_id)
        REFERENCES location (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: game_location (table: game)
ALTER TABLE game ADD CONSTRAINT game_location
    FOREIGN KEY (location_id)
        REFERENCES location (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: game_user (table: game)
ALTER TABLE game ADD CONSTRAINT game_user
    FOREIGN KEY (user_id)
        REFERENCES "user" (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: location_county (table: location)
ALTER TABLE location ADD CONSTRAINT location_county
    FOREIGN KEY (county_id)
        REFERENCES county (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: location_user (table: location)
ALTER TABLE location ADD CONSTRAINT location_user
    FOREIGN KEY (user_id)
        REFERENCES "user" (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: reply_review (table: reply)
ALTER TABLE reply ADD CONSTRAINT reply_review
    FOREIGN KEY (review_id)
        REFERENCES review (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: reply_user (table: reply)
ALTER TABLE reply ADD CONSTRAINT reply_user
    FOREIGN KEY (user_id)
        REFERENCES "user" (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: review_location (table: review)
ALTER TABLE review ADD CONSTRAINT review_location
    FOREIGN KEY (location_id)
        REFERENCES location (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: review_user (table: review)
ALTER TABLE review ADD CONSTRAINT review_user
    FOREIGN KEY (user_id)
        REFERENCES "user" (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: user_role (table: user)
ALTER TABLE "user" ADD CONSTRAINT user_role
    FOREIGN KEY (role_id)
        REFERENCES role (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- End of file.

