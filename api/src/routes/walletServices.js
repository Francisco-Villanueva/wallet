const { Wallet, Spent } = require("../db");
const { TYPES } = require("../data");

const getWallets = async (req, res) => {
  try {
    const allWallets = await Wallet.findAll({
      include: {
        model: Spent,
        as: "spent",
      },
    });

    res.status(200).json(allWallets);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};

const getWalletByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findAll({ where: { userId: userId } });

    res.status(200).json(wallet);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};

const setWalletBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ where: { userId: userId } });
    const newBalance = wallet.balance + amount;
    // const newBalance = amount;

    await Wallet.update({ balance: newBalance }, { where: { userId: userId } });

    res.status(200).json("wallet updated");
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  getWallets,
  getWalletByUserId,
  setWalletBalance,
};
