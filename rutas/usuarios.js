const express=require('express');
const ruta=express.Router();
const {Usuario}=require('../conexion');


ruta.get('/', (req,res)=>{
    res.render('home',{titulo:"Estas en home"});
})



//////////////MIDLE WARE///////////////
function auth(req,res,next){
    if(req.user){
        req.session.usuario='';
        next();
    }
    else{
        console.log(req.session.usuario);
        if(req.session.usuario){
            next();
        }
        else{
            res.redirect("/usuarios");
        }
    }
};
///////////////////////////////////////

// Ruta Login ///
ruta.post('/login',(req,res)=>{
    Usuario.findAll({
        where:{
            usuario:req.body.usuarioLogin,
            password:req.body.passwordLogin,
        }
    })
    .then((usu)=>{
        if(usu==""){
            res.redirect('/usuarios');
        }
        else{
            if(usu[0].tipo=="Admin"){
            req.session.usuario=usu[0].nombre;
            res.redirect('/usuarios/accesohome');
            }
            else if(usu[0].tipo="Usuario"){
                req.session.usuario=usu[0].nombre;
            res.redirect('/usuarios/accesoUsu');
            }
        }
    })
    .catch((err)=>{
        res.status(400).send("Error al verificar la cuenta");
    });
});

////////////////Destruir session
ruta.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/usuarios');
});

///////////////NUEVO USUARIOS///////////////

ruta.get('/nuevo',auth,(req,res)=>{
  
    res.render('nuevoUsuario');
});

ruta.post('/nuevo',(req,res)=>{
    const nuevoUsuario={
        nombre:req.body.nombre,
        usuario:req.body.usuario,
        password:req.body.password,
        status:req.body.status,
        tipo:req.body.tipo
    }
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    Usuario.create(nuevoUsuario)
    .then(()=>{
        res.redirect('/usuarios/mostrarUsu');
    })
    .catch((err)=>{
        console.log("Error al insertar el usuario "+err);
    });
    
});

///////////////////MOSTRAR USUARIOS//////////////////////
ruta.get('/mostrarUsu',auth,(req, res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    Usuario.findAll({where:{status:true}}) 
    .then((usu)=>{
        res.render('mostrarUsuarios',{usuarios:usu});
        
    })
    .catch((err)=>{
        res.status(400).send('Error al extraer la información de la BD '+err);
    })
});
///////////////////////////SELECCIONAR ID USUARIO//////////////////////////
ruta.get('/seleccionarId/:id',auth,(req,res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    Usuario.findAll({
        where:{
            id_usu:req.params.id
        }
    })
    .then((usu)=>{
        res.render('modificarUsuario',{usuario:usu});
    })
    .catch((err)=>{
        res.status(400).send("Error al recuperar el usuario "+err);
    });
});


////////////////////MODIFICAR USUARIOS///////////////////////////
ruta.post('/modificar',(req,res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    const datoscli={
        nombre:req.body.nombreModificar,
        usuario:req.body.usuarioModificar,
        password:req.body.passwordModificar,
        tipo:req.body.tipoModificar
    }
    Usuario.update(datoscli,{where:{id_usu:req.body.idModificar}})
    .then(()=>{
        res.redirect('/usuarios/mostrarUsu');
    })
    .catch((err)=>{
        res.status(400).send("Error al modificiar el usuario "+err);
    });
});

/////////////////// BORRADO LOGICO///////////////////////
ruta.get('/borradoLogico/:id',(req,res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    const datos={
        status:false
    }
    Usuario.update(datos,{where:{id_usu:req.params.id}})
    .then(()=>{
        res.redirect('/usuarios/mostrarUsu');
    })
    .catch(()=>{
        res.status(400).send("Error al borrar el registro");
    })
});

//////////////////BORRADO FISICO//////////////////
ruta.get('/borradoFisico/:id',(req,res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    Usuario.destroy({where:{id_usu:req.params.id}})
    .then(()=>{
        res.redirect('/usuarios/mostrarUsu');
    })
    .catch(()=>{
        res.status(400).send("Error al borrar el registro");
    });
});


///////////////////RUTA ACCESO CONTENIDO ADMINISTRADOS////////////////
ruta.get('/accesohome',auth,(req,res)=>{
    Usuario.findAll({"estado":true})
  
    .then((usu)=>{
    res.render('accesohome',{usu})
  })
  
    .catch(()=>{
    res.status(400).send("Error al encontrar pagina")
    });
  
  });
///////////////////////////////////////////////////////



 ////////////////////////RUTA ACCESO USUARIO//////////////////////
 ruta.get('/accesoUsu',auth,(req,res)=>{
    Usuario.findAll({"estado":true})
  
    .then((usu)=>{
    res.render('accesousu',{usu})
  })
  
    .catch(()=>{
    res.status(400).send("Error al encontrar pagina")
    });
  
  });
/////////////////////////////////////////////////////////////////////////////
module.exports=ruta;
