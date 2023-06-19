const Sequelize=require('sequelize');

module.exports=(conexion)=>{
    const UsuariosSchema=conexion.define('usuario',{
        id_usu:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:Sequelize.STRING
        },
        usuario:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        },
        status:{
            type:Sequelize.BOOLEAN
        },
        tipo:{
            type:Sequelize.STRING
        }
        
    });
    return UsuariosSchema;
}

