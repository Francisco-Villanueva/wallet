const { Spent, Type, Wallet } = require("../db");
const { TYPES } = require("../data");
const getSpents = async (req, res) => {
  try {
    const allSpents = await Spent.findAll({where:{userId}, include: [Type, Wallet]});

    res.status(200).json(allSpents);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};
const getAllTpyes = async () => {
  try {
    const allTypes = await Type.findAll();
    
    res.status(200).json(allTypes);
  } catch (error) {
    console.log("ERROR:  ", error);
  }
};
const createSpent = async (req, res) => {
  try {
    const { name, type, amount, place, descripcion, paymentProof } = req.body;

    if (!name || !type || !amount || !place || !descripcion) {
      return res.status(400).send("Data mistakes!");
    }
    const newSpent = await Spent.create({
      name: name,
      type: type,
      amount: amount,
      place: place,
      descripcion: descripcion,
      paymentProof: paymentProof,
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
        id: id,
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
const setMountByType = async (tipos) => {
  try {
    const allSpents = await Spent.findAll();
    // console.log("ALL SPENTS: ", allSpents[0]["dataValues"].amount);
    tipos.forEach((element) => {
      element.mount = 0;
    });
    for (var i = 0; i < tipos.length; i++) {
      for (var j = 0; j < allSpents.length; j++) {
        if (allSpents[j]["dataValues"].type === tipos[i].name) {
          tipos[i].mount += allSpents[j]["dataValues"].amount;
        }
      }
    }

    return tipos;
  } catch (error) {
    console.log("ERROR:  ", error);
  }
};

const getSpentsByTypes = async (req, res) => {
  try {
    const resp = await setMountByType(TYPES);
    res.status(200).json(resp);
  } catch (error) {
    console.log("ERROR:  ", error);
  }
};
module.exports = {
  createSpent,
  getSpents,
  deleteSpent,
  getSpentsById,
  getSpentsByTypes,
  getAllTpyes
};
