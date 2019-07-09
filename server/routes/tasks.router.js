//requires
const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

//routes
router.delete('/:id', (req, res) => {
    //query database to delete targeted row from task-list
    pool.query(`DELETE FROM "task-list" WHERE "id" = ${req.params.id}`)
        .then((result) => {
            //send status
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error at server DELETE /tasks:', error);
            res.sendStatus(500);
        }) //end pool query
}) //end DELETE route

router.get('/', (req, res) => {
    //query database to get all rows from task-list
    pool.query(`SELECT * FROM "task-list" ORDER BY "id"`)
        .then((result) => {
            //send resulting table rows
            res.send(result.rows);
        }).catch((error) => {
            console.log('error at server GET /tasks:', error);
            res.sendStatus(500);
        }) //end pool query
}) //end GET route

router.post('/', (req, res) => {
    let task = req.body;
    let queryText = `INSERT INTO "task-list" ("task", "duedate", "priority", "complete")VALUES ($1, $2, $3, $4)`;
    //query database to insert new task into task-list
    pool.query(queryText, [task.task, task.duedate, task.priority, task.complete])
        .then((result) => {
            //send status
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error at server POST /tasks:', error);
            res.sendStatus(500);
        }) //end pool query
}) //end POST route

router.put('/:id', (req, res) => {
    //set query text based on current completion status (stretch goal)
    //query database to change task completion status
    pool.query(`UPDATE "task-list" SET "complete" = true WHERE "id" = ${req.params.id}`)
        .then((result) => {
            //send status
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error at server PUT /tasks:', error);
            res.sendStatus(500);
        }) //end ajax PUT
}) //end PUT route (complete)

router.put('/unmark/:id', (req, res) => {
    //query database to change task complete status
    pool.query(`UPDATE "task-list" SET "complete" = false WHERE "id" = ${req.params.id}`)
        .then((result) => {
            //send status
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error at server PUT /tasks:', error);
            res.sendStatus(500);
        }) //end ajax PUT
}) //end PUT route (incomplete)

module.exports = router;