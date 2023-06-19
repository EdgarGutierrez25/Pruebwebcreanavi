const express=require('express');
const ruta=express.Router();
const {Producto}=require('../conexion');
////////////////////////////////////////////////////////////////////////


//////////////////////NUEVO PRODUCTO/////////////////////////////
ruta.get('/nuevoProducto',auth,(req,res)=>{
   
    res.render('nuevoProducto');
});

ruta.post('/nuevoPro',(req,res)=>{
    const nuevoProducto={
        descripcion:req.body.descripcion,
        precio:req.body.precio,
        foto:req.body.foto,
        stock:req.body.stock,
        status:req.body.status,
    }
    Producto.create(nuevoProducto)
    .then(()=>{
        res.redirect('/productos/mostrarProduc');
    })
    .catch((err)=>{
        console.log("Error al insertar el Producto "+err);
    });
    
});
/////////////////////////////////////////////////////////

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

///////////////////MOSTRAR PRODUCTOS//////////////////////
ruta.get('/mostrarProduc',auth,(req, res)=>{
   
    Producto.findAll({where:{status:true}})
    .then((pro)=>{
    res.render('mostrarProductos',{productos:pro})
  })
    .catch((err)=>{
        res.status(400).send('Error al extraer la información de la BD '+err);
    })
});



///////////////////////////SELECCIONAR ID PRODUCTO//////////////////////////
ruta.get('/seleccionarId/:id_pro',auth,(req,res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    Producto.findAll({
        where:{
            id_pro:req.params.id_pro
        }
    })
    .then((pro)=>{
        res.render('modificarProducto',{producto:pro});
    })
    .catch((err)=>{
        res.status(400).send("Error al recuperar el producto "+err);
    });
});


////////////////////MODIFICAR PRODUCTO///////////////////////////
ruta.post('/modificarProduc',(req,res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    const datospro={
        descripcion:req.body.descripcionModificar,
        precio:req.body.precioModificar,
        foto:req.body.fotoModificar,
        stock:req.body.stockModificar,
    }
    Producto.update(datospro,{where:{id_pro:req.body.idModificar}})
    .then(()=>{
        res.redirect('/productos/mostrarProduc');
    })
    .catch((err)=>{
        res.status(400).send("Error al modificiar el producto "+err);
    });
});



/////////////////// BORRADO LOGICO///////////////////////
ruta.get('/borradoLogico/:id',(req,res)=>{
    const datospro={
        status:false
    }
    Producto.update(datospro,{where:{id_pro:req.params.id}})
    .then(()=>{
        res.redirect('/productos/mostrarProduc');
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
    Producto.destroy({where:{id_pro:req.params.id}})
    .then(()=>{
        res.redirect('/productos/mostrarProduc');
    })
    .catch(()=>{
        res.status(400).send("Error al borrar el registro");
    });
});

module.exports=ruta;

