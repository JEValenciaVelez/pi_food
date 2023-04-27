const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo(tabla)

  sequelize.define('recipe', {
    ID:{//columna
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: { //columna
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {//columna
      type: DataTypes.STRING, 
      allowNull: true       
    },
    ResumenPlato:{
      type: DataTypes.STRING,
      allowNull: true
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PasoApaso:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
