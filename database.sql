CREATE TABLE "task-list" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(200) NOT NULL,
    "duedate" DATE,
    "priority" INTEGER NOT NULL,
    "complete" BOOLEAN NOT NULL
);

INSERT INTO "task-list" ("task", "duedate", "priority", "complete")
VALUES ('wash the dishes', '2019/04/29', 1, false);

INSERT INTO "task-list" ("task", "duedate", "priority", "complete")
VALUES ('make the bed', '2019/04/30', 3, false);

INSERT INTO "task-list" ("task", "duedate", "priority", "complete")
VALUES ('vacuum the area rug', '2019/05/01', 2, false);