const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('recipe', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
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
