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
    Imagen: {//columna
      type: DataTypes.BLOB, //tipo de dato para imagen
      allowNull: false       // siempre debe ir una imagen, la columna no puede venir nula
    },
    ResumenDelPlato:{
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PasoApaso:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
