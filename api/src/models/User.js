const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("User", {
    userID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userNAme: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    userPw: {
      type: DataTypes.STRING,
    },
    userCvu: {
      type: DataTypes.BIGINT,
    },
    userAlias: {
      type: DataTypes.STRING,
    },
  });
};
