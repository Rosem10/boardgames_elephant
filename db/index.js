const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});
console.log(process.env.PGDATABASE)
if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

const pool = new Pool({ connectionString: "postgres://mxrclprs:752f0WB2soOwCRvYUIUe7T9aqXRxu9Sr@mouse.db.elephantsql.com/mxrclprs" });

pool.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
}
)
module.exports = pool;



