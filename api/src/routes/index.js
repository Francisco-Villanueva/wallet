const expres = require("express");
const router = expres.Router();

const {
  test,
  getUsers,
  createUser,
  getUsersById,
  editUser,
  getTypesByUserId,
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
  deleteType,
} = require("./spentServices");

router.post("/spent", createSpent);
router.get("/spent", getSpents);
router.get("/spent/:id", getSpentsById);
router.delete("/spent/:id", deleteSpent);
router.get("/types", getAllTpyes);
router.post("/types", createTypes);
router.delete("/types/:id", deleteType);

const {
  getWallets,
  getWalletByUserId,
  setWalletBalance,
} = require("./walletServices");

router.get("/wallet", getWallets);
router.get("/wallet/:userId", getWalletByUserId);
router.put("/wallet/:userId", setWalletBalance);

module.exports = router;
