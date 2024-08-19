var db=require("./Conec");

var categorias=db.sequelize.define("categorias", {
  Nome: {
    type:db.Sequelize.STRING,
    allowNull:false
  },
  Slug:{
    type:db.Sequelize.STRING,
    allowNull:false
  },
  Data:{
    type:db.Sequelize.DATE,
    allowNull:false,
    defaultValue:db.Sequelize.NOW()
  }
  
})

module.exports=categorias;
//categorias.sync({force:true});

