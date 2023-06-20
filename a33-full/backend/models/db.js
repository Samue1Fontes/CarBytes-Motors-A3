const Sequelize = require('sequelize')

const conn = new Sequelize("heroku_360c430fc40c637", "b665ec3bcfe099", "a31c13c1", {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql'
})

conn.authenticate()
.then(function(){
    console.log("Conexão com o banco realizada com sucesso!")

}).catch(function(){
    console.log("Erro: Conecxão com banco de dados não realizada!");
});


// conn.authenticate()
//     .then(() => {
//         console.log("Conexão com o banco realizada com sucesso!");
//     })
//     .catch((error) => {
//         console.error("Erro na conexão com o banco de dados:", error);
//     });

module.exports = conn;