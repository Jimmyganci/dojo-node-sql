const connection = require("../db-config");

const db = connection.promise();
const findMany = ({
  filters: { title, max_duration, color, sort, min, max },
}) => {
  let sql = "select * from movies";
  let sqlValues = [];

  if (title) {
    sql += " WHERE title = ?";
    sqlValues.push(title);
  }

  if (max_duration) {
    sql += " WHERE duration <= ?";
    sqlValues.push(max_duration);
  }
  if (color) {
    if (max_duration) sql += " AND color=?";
    else sql += " WHERE color = ?";
    sqlValues.push(color);
  }
  if (sort) {
    sql += ` ORDER BY year ${sort}`;
  }

  if ((min, max)) {
    sql += " LIMIT ?,?";
    sqlValues.push(Number(min), Number(max));
  }
  return db.query(sql, sqlValues).then(([res]) => res);
};

const findOne = (id) => {
  let sql = "select * from movies where id = ?";
  return db.query(sql, [id]).then(([res]) => res);
};

const createMovie = ({ title, director, year, color, duration }) => {
  let sql =
    "insert into movies (title, director, year, color, duration) VALUES (?,?,?,?,?)";
  return db
    .query(sql, [title, director, year, color, duration])
    .then((result) => {
      const id = result.insertId;
      return { id, title, director, year, color, duration };
    });
};

const deleteMovie = (id) => {
  let sql = "DELETE FROM movies WHERE id = ?";
  return db.query(sql, [id]).then((result) => result);
};

module.exports = { findMany, findOne, createMovie, deleteMovie };
