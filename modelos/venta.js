const Sequelize=require('sequelize');

module.exports=(conexion)=>{
    const VentasSchema=conexion.define('ventas',{
        id_vent:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:Sequelize.STRING
        },
        apellidos:{
            type:Sequelize.STRING
        },
        direccion:{
            type:Sequelize.STRING
        },
        poblacion:{
            type:Sequelize.STRING
        },
        estado:{
            type:Sequelize.STRING
        },
        numero_tel:{
            type:Sequelize.STRING
        },
        foto:{
            type:Sequelize.BLOB
        },
        status:{
            type:Sequelize.BOOLEAN
        },
        ubicacion:{
            type:Sequelize.STRING
        },



        producto:{
            type:Sequelize.STRING
        },
        vendedor:{
            type:Sequelize.STRING
        },
        cobrador:{
            type:Sequelize.STRING
        },
        enganche:{
            type:Sequelize.DOUBLE
        },
        plazo:{
            type:Sequelize.STRING
        },
        monto_sem:{
            type:Sequelize.DOUBLE
        },
        abonado:{
            type:Sequelize.DOUBLE
        },
        saldo:{
            type:Sequelize.DOUBLE
        },
        vencido:{
            type:Sequelize.DOUBLE
        },
        saldo_inicial:{
            type:Sequelize.DOUBLE
        },
       
        fecha:{
            type:Sequelize.DATE
        }
        
    });
    return VentasSchema;
}

