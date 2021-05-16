const dotenv = require('dotenv');

dotenv.config();

const mysql2 = require('mysql2'),
  db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  });

function query (sql, values) {
  return new Promise((resolve, reject) => {
    db.execute(sql, values, (error, result, fields) => {
      if (error) {
        console.error(error);
  
        return reject(error);
      }
  
      return resolve(result);
    });
  });
}

module.exports =  query;
