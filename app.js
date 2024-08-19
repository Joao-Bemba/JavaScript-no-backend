var express=require("express");

var app=express();

var postagens=require('./rotas/post')

var categorias=require('./modules/Table')

var handlebars=require("express-handlebars");

var Sequelize=require("Sequelize");

var porta= process.env.PORT || 3000;

var session=require("express-session");

var flash=require("connect-flash");



var admin=require("./rotas/admin")

var Usua=require("./rotas/usu")

//configs handle and body-parser
app.engine("handlebars", handlebars.engine({defaultLayout: 'main',runtimeOptions:{
  allowProtoPropertiesByDefault:true,
  allowProtoMethodsByDefault:true
}
  
}))

app.set("view engine", "handlebars");

app.use(express.urlencoded({extend:false}))
app.use(express.json())

app.use(session({
  secret: "Alumi{{{nio",
  resave: true,
  saveUninitialized: true
}))

app.use(flash());

app.use((req, res, next)=>{
  res.locals.suc_msg=req.flash('suc_msg');
  res.locals.error_msg=req.flash('error_msg')
  next()
})

//rotas

app.use("/blog",admin);

app.use("/Usuarios", Usua);


app.get("/", (req, res)=>{
  postagens.findAll().then((postagens)=>{
    res.render("admin/home", {postagens: postagens})
  }).catch((erro)=>{
    res.redirect('/404')
  })
})

app.get("/404", (req, res)=>{
  res.send("Erro 404!")
})

app.get('/categorias', (req, res)=>{
  res.render("categorias/index")
})

//outros
app.listen(porta, ()=>{
  console.log(`Servidor rodando na porta ${porta}`)
})