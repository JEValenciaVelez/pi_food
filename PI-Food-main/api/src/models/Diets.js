
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('diet', {
    ID:{
      primaryKey: true,
       type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    Nombre: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  });
};