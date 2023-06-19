const Sequelize=require('sequelize');

module.exports=(conexion)=>{
    const ProductosSchema=conexion.define('producto',{
        id_pro:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        descripcion:{
            type:Sequelize.STRING
        },
        precio:{
            type:Sequelize.DOUBLE
        },
        foto:{
            type:Sequelize.STRING,
            required:false
        },
        stock:{
            type:Sequelize.INTEGER
        },
        status:{
            type:Sequelize.BOOLEAN
        }
    });
    return ProductosSchema;
}
