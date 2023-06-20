// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // substitua pelo seu banco de dados (por exemplo, 'postgres', 'sqlite', etc.)
  host: 'us-cdbr-east-06.cleardb.net', // substitua pelo host do seu banco de dados
  port: process.env.PORT || 3306, // substitua pela porta do seu banco de dados
  username: 'b665ec3bcfe099', // substitua pelo nome de usuário do seu banco de dados
  password: 'a31c13c1', // substitua pela senha do seu banco de dados
  database: 'heroku_360c430fc40c637' // substitua pelo nome do seu banco de dados
});

module.exports = sequelize;
