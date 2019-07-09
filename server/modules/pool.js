//require pg
const pg = require('pg');

// set up pool
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
});

//message when connecting to database
pool.on('connect', () => {
    console.log(`Postgres connected`);
});

//message when error connecting to database
pool.on('error', (error) => {
    console.log(`Error with postgres pool`, error)
});

//export
module.exports = pool;