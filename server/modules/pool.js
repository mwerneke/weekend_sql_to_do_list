const pg = require('pg');

// Create a connection "pool" to our postgres DB
const pool = new pg.Pool({
    database: 'weekend_toDo',           // REQUIRED name of the database 

    // Optional params
    host: 'localhost',
    port: 5432
});

module.exports = pool;