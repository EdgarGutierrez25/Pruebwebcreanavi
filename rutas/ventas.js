const express=require('express');
const ruta=express.Router();
const {Venta}=require('../conexion');


//////////////////////NUEVA VENTA/////////////////////////////
ruta.get('/nuevaVenta',auth,(req,res)=>{
   
    res.render('nuevaVenta');
});

ruta.post('/nuevaVenta',(req,res)=>{
    const nuevaVenta={
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        direccion:req.body.direccion,
        poblacion:req.body.poblacion,
        estado:req.body.estado,
        numero_tel:req.body.numero_tel,
        foto:req.body.foto,
        ubicacion:req.body.ubicacion,
       
        producto:req.body.producto,
        vendedor:req.body.vendedor,
        cobrador:req.body.cobrador,
        enganche:req.body.enganche,
        plazo:req.body.plazo,
        monto_sem:req.body.monto_sem,
        abonado:req.body.abonado,
        saldo:req.body.saldo,
        vencido:req.body.vencido,
        saldo_inicial:req.body.saldo_inicial,
        fecha:req.body.fecha,
        status:req.body.status
        
    }
    Venta.create(nuevaVenta)
    .then(()=>{
        res.redirect('/ventas/mostrarVenta');
    })
    .catch((err)=>{
        console.log("Error al insertar la venta "+err);
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

///////////////////MOSTRAR VENTAS//////////////////////
ruta.get('/mostrarVenta',auth,(req, res)=>{
   
    Venta.findAll({where:{status:true}})
    .then((vent)=>{
    res.render('mostrarVentas',{ventas:vent})
  })
    .catch((err)=>{
        res.status(400).send('Error al extraer la información de la BD '+err);
    })
});



///////////////////////////SELECCIONAR ID CLIENTE//////////////////////////
ruta.get('/seleccionarId/:id_vent',auth,(req,res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    Venta.findAll({
        where:{
            id_vent:req.params.id_vent
        }
    })
    .then((vent)=>{
        res.render('modificarVenta',{venta:vent});
    })
    .catch((err)=>{
        res.status(400).send("Error al recuperar la venta "+err);
    });
});


////////////////////MODIFICAR VENTAS///////////////////////////
ruta.post('/modificarVent',(req,res)=>{
    if(!req.session.usuario){
        res.redirect('/usuarios');
    }
    const datos_vent={
        plazo:req.body.plazoModificar,
        monto_sem:req.body.monto_semModificar,
        abonado:req.body.abonadoModificar,
        saldo:req.body.saldoModificar,
        vencido:req.body.vencidoModificar,
        saldo_inicial:req.body.saldo_inicialModificar,
        fecha:req.body.fechaModificar,
    }
    Venta.update(datos_vent,{where:{id_vent:req.body.idModificar}})
    .then(()=>{
        res.redirect('/ventas/mostrarVenta');
    })
    .catch((err)=>{
        res.status(400).send("Error al modificiar la venta "+err);
    });
});



/////////////////// BORRADO LOGICO///////////////////////
ruta.get('/borradoLogico/:id',(req,res)=>{
    const datos={
        status:false
    }
    Venta.update(datos,{where:{id_vent:req.params.id}})
    .then(()=>{
        res.redirect('/ventas/mostrarVenta');
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
    Venta.destroy({where:{id_vent:req.params.id}})
    .then(()=>{
        res.redirect('/ventas/mostrarVenta');
    })
    .catch(()=>{
        res.status(400).send("Error al borrar el registro");
    });
});



///////////////EJEMPLO TABLASS////////////
ruta.get('/tabla',(req,res)=>{
   
    res.render('exampleTable');
});











///////////////////////////CONTRATOS//////////////////////
ruta.get('/contratos',(req,res)=>{
   
    res.render('contratos');
});


module.exports=ruta;

