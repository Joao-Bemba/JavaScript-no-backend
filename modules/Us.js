var Sequelize=require("Sequelize");

var sequelize=new Sequelize(
  "postapp", "root", "", {
    host: "localhost",
    dialect: "mysql"
  })
  
sequelize.authenticate().then(()=>{
    console.log('Concectado com sucesso')
  }).catch((erro)=>{
    console.log('Erro ao conectar')
  })
  
  
var usuarios=sequelize.define("Usuarios", {
  name:{
    type:Sequelize.STRING
  },
  email:{
    type:Sequelize.STRING
  },
  senha:{
    type:Sequelize.STRING
  },
  admin:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }
})

usuarios.sync({force:true})

module.exports=usuarios