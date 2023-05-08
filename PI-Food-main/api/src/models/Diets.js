
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo(tabla)

  sequelize.define('diet', {
    ID:{//columna
      primaryKey: true,
       type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    Nombre: { //columna
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  });
};