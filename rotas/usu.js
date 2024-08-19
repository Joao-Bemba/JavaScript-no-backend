var express=require('express');

var Rotas=express.Router();

var bcryptjs=require('bcryptjs')

var Usuarios=require("../modules/Us")

Rotas.get("/Registro", (req, res)=>{
  res.render("Usuarios/Reg")
})

Rotas.post("/Cada", (req, res)=>{
  var nome=req.body.nome
  var senha=req.body.senha
  var email=req.body.email
  
  var erros=[]
  
  
  
  if(!nome || nome===undefined || nome===null){
     erros.push({texto: 'Campo nome vazio'})
  }
  

if(!senha || senha===undefined || senha===null){
     erros.push({texto: 'Campo senha vazio'})
  }
  
if(!email || email===undefined || email===null){
     erros.push({texto: 'Campo Email vazio'})
  }
  
  if(senha.length<8){
    erros.push({texto:'A senha de ver ter no minimo 8 caracteres'})
  }
  
  if(erros.length>0){
    res.render("Usuarios/Reg", {erros: erros})
  }else{
    Usuarios.findOne({where:{email: req.body.email}}).then((users)=>{
      if(users){
        req.flash("error_msg", 'Usuario já Existe')
        res.redirect("/Usuarios/Registro")
      }else{
        Usuarios.create({
          name:nome,
          email:email,
          senha:senha
        }).then(()=>{
          res.redirect('/')
        }).catch((erro)=>{
          res.send('/')
        })
      }
    })
  }
})


Rotas.get("/Login", (req, res)=>{
  res.render("Usuarios/login")
})

Rotas.post("/Log", (req, res)=>{
  res.send("hola")
})

module.exports=Rotas;