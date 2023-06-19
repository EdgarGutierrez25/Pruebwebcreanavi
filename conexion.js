const Sequelize=require('sequelize');
const UsuarioModelo=require('./modelos/usuario');
const ProductoModelo=require('./modelos/producto');
const VentaModelo=require('./modelos/venta');
//                            nombreBaDD / usuarioBaDD / passwprd / objeto
const conexion=new Sequelize('creanavi','root','', {
    host:'Localhost',
    dialect:'mysql'
});
const Usuario=UsuarioModelo(conexion);
const Producto=ProductoModelo(conexion);
const Venta=VentaModelo(conexion);

conexion.sync({force:false})
.then(()=>{
    console.log("Conectado a MariaDB");
})
.catch((err)=>{
    console.log("Fallo al conectar a MariaDB "+err);
});

module.exports={
    Usuario,
    Producto,
    Venta
}



