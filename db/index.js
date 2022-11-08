const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
      }
    : {};


const pool = new Pool(config);
// pool.connect(function(err) {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   } else { 
//     console.log('all goodo')
//   }
// });


module.exports = pool