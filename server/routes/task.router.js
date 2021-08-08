const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');


router.get('/', (req, res) => {
    let sqlQuery = `SELECT * FROM "tasks" 
        ORDER BY "task";`;
   
        pool.query(sqlQuery)
    .then((dbRes) => {
      // Sends back the results in an object
      console.log(dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch(err =>{
      console.log('error getting task', err);
      res.sendStatus(500);
    });
  });

router.post('/', (req, res) => {  //Should this be ID

    let sqlQuery = `INSERT INTO "tasks" 
                    ("task", "is_complete")
                    VALUES ($1, $2);`;
   
    let sqlParams = [
        req.body.task,
        req.body.is_complete
    ]
    console.log('sqlQuery', sqlQuery);
    pool.query(sqlQuery, sqlParams).then(dbRes => {

        res.sendStatus(201);
    }).catch(error => {
      console.log(`Error adding new Task`, error);
      res.sendStatus(500);
    });
});
//PUT into DB
router.put('/:id', (req,res) => {
  console.log('id is', req.params.id);

  //Having a very difficult time getting this to change the False in
  //DB to True. 
  let sqlQuery = `     
SET "is_complete" = true
WHERE "is_complete" = $1;`;
  let sqlParams = [req.body.id]
  pool.query(sqlQuery, sqlParams)
  .then(dbRes =>{
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
    .then(dbres => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    })
  });


module.exports = router;