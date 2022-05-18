const db = require("../db/connection");

const fetchReviewById = (id) => {
  const queryStr = `SELECT reviews.*, COUNT(comments.*)::INT AS comment_count 
  FROM reviews 
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  WHERE reviews.review_id = $1
  GROUP BY reviews.review_id
  `;
  return db.query(queryStr, [id]).then((reviewArr) => {
    const review = reviewArr.rows[0];
    if (!review) {
      return Promise.reject({
        status: 404,
        msg: "No review exists with that ID.",
      });
    }
    return review;
  });
};

const updateReviewById = (id, newVote) => {
  if (typeof newVote != "number") {
    return Promise.reject({
      status: 400,
      msg: "Invalid data type.",
    });
  }
  const queryVals = [id, newVote];

  const updateVoteQueryStr = `
      UPDATE reviews
      SET
      votes = votes + $2
      WHERE review_id = $1
      RETURNING *;
      `;

  return db.query(updateVoteQueryStr, queryVals).then((updatedReviewObj) => {
    const updatedReview = updatedReviewObj.rows[0];

    if (!updatedReview) {
      return Promise.reject({
        status: 404,
        msg: "No review exists with that ID.",
      });
    }
    return updatedReview;
  });
};

const fetchReviews = () => {
  const queryStr = `SELECT reviews.*, COUNT(comments.*)::INT AS comment_count 
    FROM reviews 
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY created_at DESC
    `;
  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};

module.exports = { fetchReviewById, updateReviewById, fetchReviews };
