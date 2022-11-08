const db = require("../db");

const fetchCategories = () => {
  const queryStr = `SELECT * FROM categories`;
  return db.query(queryStr).then((categories) => {
    return categories.rows;
  });
};

module.exports = { fetchCategories };
