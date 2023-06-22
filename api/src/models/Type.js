const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Type", {
    typeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    typeName: {
      type: DataTypes.STRING,
    },
    typeColor: {
      type: DataTypes.STRING
    }
  });
};
