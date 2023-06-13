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
    spentId: {
      type: DataTypes.UUID,
    },
    typeName: {
      type: DataTypes.STRING,
    },
  });
};
