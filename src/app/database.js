const mysql = require('mysql2')

const config = require('./config');

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE
})

connections.promise().getConnection().then((res) => {
  console.log("数据库连接成功");
}).catch((err) => {
  console.trace("数据库连接失败")
});

module.exports = connections.promise()