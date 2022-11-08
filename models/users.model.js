const db = require("../db/server");

const fetchUsers = () => {
  const queryStr = `SELECT * FROM users`;
  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};

module.exports = { fetchUsers };
