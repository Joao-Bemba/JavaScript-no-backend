var Sequelize=require("Sequelize");

var sequelize=new Sequelize(
  "postapp", "root", "", {
    host: "localhost",
    dialect: "mysql"
  })
  
sequelize.authenticate().then(()=>{
    console.log("tabela criada com sucesso")
  }).catch((erro)=>{
    console.log("erro ao criar tabela")
  })
  
// sequelize.sync({force: true})
 
 var postagens=sequelize.define(
   "Postagens", {
     Titulo:{
       type: Sequelize.STRING
     },
     Slug:{
       type: Sequelize.STRING
     },
     Descricao: {
       type: Sequelize.STRING
     },
     Conteudo:{
       type: Sequelize.TEXT
     },
     Categoria: {
       type: Sequelize.STRING
     }
   })
   
   module.exports=postagens
   
   
   