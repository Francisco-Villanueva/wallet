const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Spent", {
    spentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    spentName: {
      type: DataTypes.STRING,
    },
    typeId: {
      type: DataTypes.UUID,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    spentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    spentPlace: {
      type: DataTypes.STRING,
    },
    spentDescripcion: {
      type: DataTypes.STRING,
    },
    paymentProof: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
    },
    walletId: {
      type: DataTypes.UUID,
    },
  });
};
