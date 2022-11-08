const pg = require('pg');

var conString = "postgres://uswxctwx:EfppvI1HJmQq8GFxdtRmbYvogl3glesv@surus.db.elephantsql.com/uswxctwx" //Can be found in the Details page
var pool = new pg.Pool({connectionString: conString});
pool.connect(function(err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  } else { 
    console.log('all goodo')
  }
});


module.exports = pool