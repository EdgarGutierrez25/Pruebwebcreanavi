const express=require('express');
const path=require('path');
const session=require('express-session');
const usuarios=require('./rutas/usuarios');
const productos=require('./rutas/productos');
const ventas = require('./rutas/ventas');


const app=express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'ETC ETC',
    resave:true,
    saveUninitialized:true
}));


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/usuarios',usuarios);
app.use('/productos',productos);
app.use('/ventas',ventas);
//app.use(express.static(__dirname + '/'));

//app.use('/usuarios',usuarios);
//app.use('/clientes',clientes);

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('Servidor en el puerto'+port);
});






