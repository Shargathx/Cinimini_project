-- ÄRGE ISE MUUDATUSI SIIN TEHKE
-- ÄRGE ISE MUUDATUSI SIIN TEHKE
-- ÄRGE ISE MUUDATUSI SIIN TEHKE
-- ÄRGE ISE MUUDATUSI SIIN TEHKE
-- Created by Redgate Data Modeler (https://datamodeler.redgate-platform.com)
-- Last modification date: 2026-02-18 10:51:07.512

-- tables
-- Table: category
CREATE TABLE category (
                          id bigserial  NOT NULL,
                          name varchar(100)  NOT NULL,
                          description varchar(100)  NOT NULL,
                          is_active boolean  NOT NULL,
                          CONSTRAINT category_pk PRIMARY KEY (id)
);

-- Table: discussion_point
CREATE TABLE discussion_point (
                                  id bigserial  NOT NULL,
                                  game_step_id bigint  NOT NULL,
                                  discussion_text text  NOT NULL,
                                  is_active boolean  NOT NULL,
                                  discussion_order int  NOT NULL,
                                  CONSTRAINT discussion_point_uq UNIQUE (game_step_id, discussion_order) NOT DEFERRABLE  INITIALLY IMMEDIATE,
                                  CONSTRAINT discussion_point_pk PRIMARY KEY (id)
);

-- Table: game
CREATE TABLE game (
                      id bigserial  NOT NULL,
                      name varchar(50)  NOT NULL,
                      category_id bigint  NOT NULL,
                      description varchar(150)  NOT NULL,
                      is_active boolean  NOT NULL,
                      CONSTRAINT game_pk PRIMARY KEY (id)
);

-- Table: game_step
CREATE TABLE game_step (
                           id bigserial  NOT NULL,
                           game_id bigint  NOT NULL,
                           step_order int  NOT NULL,
                           CONSTRAINT game_step_uq UNIQUE (game_id, step_order) NOT DEFERRABLE  INITIALLY IMMEDIATE,
                           CONSTRAINT game_step_pk PRIMARY KEY (id)
);

-- Table: media
CREATE TABLE media (
                       id bigserial  NOT NULL,
                       game_step_id bigint  NOT NULL,
                       media_type varchar(50)  NOT NULL,
                       file_url varchar(200)  NOT NULL,
                       CONSTRAINT media_pk PRIMARY KEY (id)
);

-- Table: question
CREATE TABLE question (
                          id bigserial  NOT NULL,
                          game_step_id bigint  NOT NULL,
                          question_text text  NOT NULL,
                          is_active boolean  NOT NULL,
                          question_order int  NOT NULL,
                          CONSTRAINT question_order_uq UNIQUE (game_step_id, question_order) NOT DEFERRABLE  INITIALLY IMMEDIATE,
                          CONSTRAINT question_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: discussion_point_game_step (table: discussion_point)
ALTER TABLE discussion_point ADD CONSTRAINT discussion_point_game_step
    FOREIGN KEY (game_step_id)
        REFERENCES game_step (id)
        ON DELETE  CASCADE
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: game_category (table: game)
ALTER TABLE game ADD CONSTRAINT game_category
    FOREIGN KEY (category_id)
        REFERENCES category (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: game_step_game (table: game_step)
ALTER TABLE game_step ADD CONSTRAINT game_step_game
    FOREIGN KEY (game_id)
        REFERENCES game (id)
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: media_game_step (table: media)
ALTER TABLE media ADD CONSTRAINT media_game_step
    FOREIGN KEY (game_step_id)
        REFERENCES game_step (id)
        ON DELETE  CASCADE
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: question_game_step (table: question)
ALTER TABLE question ADD CONSTRAINT question_game_step
    FOREIGN KEY (game_step_id)
        REFERENCES game_step (id)
        ON DELETE  CASCADE
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- End of file.

