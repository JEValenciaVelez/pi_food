
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo(tabla)

  sequelize.define('diet', {
    ID:{//columna
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: { //columna
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  });
};