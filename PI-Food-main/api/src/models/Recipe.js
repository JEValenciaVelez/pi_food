const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo(tabla)

  sequelize.define('recipe', {
    id:{//columna
      primaryKey: true,
      type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
    },
    name: { //columna
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {//columna
      type: DataTypes.STRING, 
      allowNull: true       
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: true
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    steps:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
