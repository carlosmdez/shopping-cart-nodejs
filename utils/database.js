const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-shopping-cart',
  password: 'onepiece17'
})

module.exports = pool.promise()