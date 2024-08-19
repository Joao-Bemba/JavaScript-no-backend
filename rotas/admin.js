
var express=require("express");

var categorias=require("../modules/Table")

var rotas=express.Router();

var postagens=require("./post")

rotas.get("/", (req, res)=>{ res.render("admin/index")
})

rotas.get("/categorias", (req, res)=>{
  categorias.findAll().then((categ)=>{
    res.render("admin/categorias", {categ:categ})
  })
})

rotas.post("/add/nova", (req, res)=>{
  
  var Elem={nome:req.body.cate, slug: req.body.slug}
  
  var erros=[];
  
  if(!Elem.nome || Elem.nome===undefined || Elem.nome==null){
    erros.push({texto:"Nome invalido"})
  }
  if(!Elem.slug || Elem.nome===undefined || Elem.slug==null){
    erros.push({texto:"Slug invalido"})
  }
  
  if(Elem.slug.length<8 || Elem.nome.length<8){
    erros.push({texto: "Os campos devem ter no minino 8 caracteres"})
  }
  
  if(erros.length>0){
    res.render("admin/form", {erros: erros})
  }else{
    categorias.create({
    Nome: Elem.nome,
    Slug:Elem.slug
  }).then(()=>{
    req.flash('suc_msg', 'Categoria adicionada com sucesso')
    res.redirect("/blog/categorias")
  }).catch((erro)=>{
    req.flash('error_msg', 'erro ao criar categoria')
    res.redirect("/blog/")
  })
  }
})

rotas.get("/categorias/add", (req, res)=>{
  res.render("admin/form")
})

rotas.get("/categorias/add/edit/:id", (req, res)=>{
  categorias.findOne({where: {id: req.params.id}}).then((categorias)=>{
    res.render("admin/Ed", {categorias:categorias})
  })
})

rotas.post("/editar/:id", (req, res)=>{
  var novoNome=req.body.cate
  var novoSlug=req.body.slug
  var id=req.params.id
  categorias.update({
    Nome: novoNome,
    Slug: novoSlug
  },
  {
    where:{
      id: id
    }
  }).then(()=>{
    novoNome=""
    novoSlug=""
    req.flash('suc_msg', 'Categoria Editada Com Sucesso')
    res.redirect("/blog/categorias")
  }).catch((erro)=>{
    req.flash('error_msg', 'erro ao editar Categoria')
 
    res.redirect("/blog/categorias")
  })
})



rotas.get("/delete/:id", (req, res)=>{
  categorias.destroy({where:{id: req.params.id}}).then(()=>{
    req.flash('suc_msg','Categoria eliminada')
    res.redirect("/blog/Categorias")
  }).catch((erro)=>{
    req.flash('error_msg', 'erro ao eliminar')
    res.redirect('/blog')
  })
})

rotas.get("/postagens", (req, res)=>{
  
  postagens.findAll().then((postagens)=>{
    res.render("admin/postagens", {postagens: postagens})
  })
})

rotas.get("/CriarPost", (req, res)=>{
  categorias.findAll().then((categorias)=>{
    res.render("admin/formPost", {categorias: categorias})
  })
})

rotas.post("/criar/post", (req, res)=>{
  
  var Titulo=req.body.Titulo
  var Slug=req.body.Slug
  
  var Desc=req.body.Desc
  
  var Conteu=req.body.Conteu
  
  var Cate=req.body.Cat
  postagens.create({
    Titulo: Titulo,
    Slug: Slug,
    Descricao: Desc,
    Conteudo: Conteu,
    Categoria: Cate
  }).then(()=>{
    req.flash('suc_msg', 'Postagem criada com sucesso')
    res.redirect('/blog/postagens')
  }).catch((erro)=>{
    res.send("erro ao criar postagem")
  })
  
})

rotas.get('/editarPost/:id', (req, res)=>{
  postagens.findOne({where: {id: req.params.id}}).then((postagens)=>{
    res.render("admin/PostEd", {postagens: postagens})
  }).catch((er)=>{
    req.flash('error_msg', 'Não existe nenhuma postagem')
    res.redirect('/blog/postagens')
  })
  
})


rotas.post("/editarPo/:id", (req, res)=>{
  var novoTitulo=req.body.Titulo
  var novoSlug=req.body.Slug
  var Desc=req.body.Desc
  
  var Conteu=req.body.Conteu
  
  var Categ=req.body.Cat
  
  var id=req.params.id
  
  postagens.update({
    Titulo:novoTitulo,
    Slug:novoTitulo,
    Descricao: Desc,
    Conteudo:Conteu,
    Categoria: Categ
  }, {
    where:{
      id: id
    }
  }).then(()=>{
    req.flash('suc_msg', 'Editado com sucesso')
    res.redirect("/blog/postagens")
  }).catch((erro)=>{
    req.flash('error_msg', 'erro ao editar')
    res.redirect('/blog')
  })
  
})

rotas.get('/EliPost/:id', (req, res)=>{
  postagens.destroy({where:{
    id:req.params.id
  }}).then(()=>{
    req.flash('suc_msg', 'eliminada como sucesso')
    res.redirect("/blog/postagens")
  }).catch((erro)=>{
    req.flash('error_msg', 'erro ao eliminar')
    res.redirect("/blog")
  })
})

module.exports=rotas;