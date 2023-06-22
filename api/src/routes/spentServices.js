const { Spent, Type, Wallet, User } = require("../db");
const { TYPES } = require("../data");
const getSpents = async (req, res) => {
  try {
    const allSpents = await Spent.findAll({
      include: {
        model: Type,
        as: "type",
      },
    });

    res.status(200).json(allSpents);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};
const createSpent = async (req, res) => {
  try {
    const {
      spentName,
      typeId,
      amount,
      spentPlace,
      spentDescripcion,
      paymentProof,
      userId,
    } = req.body;

    if (!spentName || !typeId || !amount || !spentPlace || !spentDescripcion) {
      return res.status(400).send("Data mistakes!");
    }

    const getWalletId = await Wallet.findOne({
      where: {
        userId: userId,
      },
    });

    // console.log("getWalletId: ", getWalletId.walletId);
    const newSpent = await Spent.create({
      spentName: spentName,
      typeId: typeId,
      amount: amount,
      spentPlace: spentPlace,
      spentDescripcion: spentDescripcion,
      paymentProof: paymentProof,
      userId: userId,
      walletId: getWalletId.walletId,
    });

    res.status(200).send(newSpent);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};
const deleteSpent = async (req, res) => {
  try {
    const { id } = req.params;
    const spent = await Spent.findOne({
      where: {
        spentId: id,
      },
    });
    if (spent.length === 0) {
      res.status(400).send("Spent not found");
    } else {
      await spent.destroy({ where: { id: id } });

      return res.status(200).send("Spent deleted");
    }
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};
const getSpentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const spent = await Spent.findOne({
      where: {
        id: id,
      },
    });
    if (spent.length === 0) {
      res.status(400).send("Spent not found");
    } else {
      return res.status(200).send(spent);
    }
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};

const getAllTpyes = async (req, res) => {
  try {
    const allTypes = await Type.findAll({
      include: {
        model: Spent,
        as: "spent",
      },
    });

    res.status(200).json(allTypes);
  } catch (error) {
    console.log("ERROR:  ", error);
  }
};
const createTypes = async (req, res) => {
  try {
    const { typeName, typeColor } = req.body;

    if (!typeName || !typeColor) {
      return res.status(400).send("Data mistakes!");
    }
    const newType = await Type.create({
      typeName: typeName,
      typeColor: typeColor
    });

    res.status(200).send(newType);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(404).json(error);
  }
};

module.exports = {
  createSpent,
  getSpents,
  deleteSpent,
  getSpentsById,
  getAllTpyes,
  createTypes,
};
