const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "task";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting task', error);
      res.sendStatus(500);
    });
  });

router.post('/',  (req, res) => {
  let newTask = req.body;
  console.log(`Adding Task`, newTask);

  let queryText = `INSERT INTO "tasks" ("task")
                   VALUES ($1);`;
  pool.query(queryText, [newTask.task])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new Task`, error);
      res.sendStatus(500);
    });
});

router.put('/:id', (req,res) => {
  console.log('id is', req.params.id);
    
  const sqlQuery = `
    INSERT INTO "tasks"
    VALUES = $1;
    `;
  const sqlParams = [
    req.params.task 
  ];
  pool.query(sqlQuery, sqlParams)
  .then((dbRes) =>{
      res.sendStatus(200);
  })
  .catch((err) =>{
    res.sendStatus(500);
  });
  
  })

router.delete('/:id', (req,res) => {
    let sqlQuery = 'DELETE FROM "tasks" WHERE id=$1;'
    let sqlParams = [req.params.id]
    pool.query(sqlQuery, sqlParams)
    .then((dbres) => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    })
  });


module.exports = router;