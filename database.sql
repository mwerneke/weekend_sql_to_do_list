CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE
);



SELECT * FROM "tasks";

UPDATE "tasks"
SET "is_complete" = true
WHERE "is_complete" = false;