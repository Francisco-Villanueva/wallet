const expres = require("express");
const router = expres.Router();

const {
  test,
  getUsers,
  createUser,
  getUsersById,
  editUser,
  getTypesByUserId
} = require("./services");

router.get("/test", test);
router.get("/users", getUsers);
router.get("/users/:id", getUsersById);
router.put("/users/:id", editUser);
router.get("/types/:idUser", getTypesByUserId);
router.post("/users", createUser);

const {
  createSpent,
  getSpents,
  deleteSpent,
  getSpentsById,
  getAllTpyes,
  createTypes,
} = require("./spentServices");

router.post("/spent", createSpent);
router.get("/spent", getSpents);
router.get("/spent/:spentId", getSpentsById);
router.delete("/spent/:spentId", deleteSpent);
router.get("/types", getAllTpyes);
router.post("/types", createTypes);

const { getWallets, getWalletByUserId } = require("./walletServices");

router.get("/wallet", getWallets);
router.get("/wallet/:userId", getWalletByUserId);

module.exports = router;
