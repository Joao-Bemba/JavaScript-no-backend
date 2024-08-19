var Sequelize=require("Sequelize");

var sequelize=new Sequelize(
  "postapp", "root", "", {
    host:"localhost",
    dialect:"mysql"
  })
  
  sequelize.authenticate().then(()=>{
    console.log("conectado com sucesso")
  }).catch((erro)=>{
    console.log("erro ao se conectar")
  })
  
  module.exports={
    Sequelize:Sequelize,
    sequelize:sequelize
  }