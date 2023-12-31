const { Wallet, User, Spent, Type } = require("../db");
const axios = require("axios");
const { ANIMALES, OBJETOS, COMIDAS } = require("../aliasServices");
const { generateToken, validateToken } = require("../../config");

const setLogin = async (req, res) => {
  try {
    const { userName, userPw } = req.body;

    const userToCheck = await User.findOne({
      where: {
        userEmail: userName,
      },
    });

    const isPwCorrect = await userToCheck.validatePassword(userPw);

    if (isPwCorrect) {
      const payload = userToCheck;

      const token = generateToken(payload);
      res.cookie("token", token);

      res.send(payload);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log({ error });
  }
};

const secret = async (req, res) => {
  console.log(req.cookies);
  const { token } = req.cookies;
  const { user } = validateToken(token);

  // console.log(user);
  req.user = user;
  res.send(user);
};

function generarCBU() {
  let entidad = Math.floor(Math.random() * 1000); // Número aleatorio de 3 dígitos para la entidad bancaria
  let sucursal = Math.floor(Math.random() * 100); // Número aleatorio de 2 dígitos para la sucursal bancaria
  let digitoVerificador = Math.floor(Math.random() * 10); // Número aleatorio de 1 dígito para el dígito verificador
  let cuenta = ""; // Variable para ir concatenando los números de la cuenta bancaria
  for (let i = 0; i < 13; i++) {
    cuenta += Math.floor(Math.random() * 10); // Genera un número aleatorio de un solo dígito y lo agrega a la cuenta
  }
  return parseInt(
    entidad.toString().padStart(3, "0") +
      sucursal.toString().padStart(2, "0") +
      digitoVerificador +
      cuenta
  );
}

function generarALIAS() {
  const animales = [
    "Perro",
    "Gato",
    "Elefante",
    "Tigre",
    "León",
    "Cebra",
    "Jirafa",
    "Rinoceronte",
    "Canguro",
    "Panda",
    "Koala",
    "Ballena",
    "Delfín",
    "Orca",
    "Pingüino",
  ];
  const objetos = [
    "Teléfono",
    "Computadora",
    "Mesa",
    "Silla",
    "Refrigerador",
    "Horno",
    "Televisor",
    "Lámpara",
    "Libro",
    "Planta",
    "Reloj",
    "Cámara",
    "Ventilador",
    "Coche",
    "Bicicleta",
  ];
  const comidas = [
    "Pizza",
    "Hamburguesa",
    "Tacos",
    "Sushi",
    "Ensalada",
    "Pollo frito",
    "Lasagna",
    "Espagueti",
    "Ceviche",
    "Empanadas",
    "Churrasco",
    "Costillas",
    "Ramen",
    "Carne",
    "Curry",
  ];

  // Genera un número aleatorio entre 0 y 14
  const randAnimal = Math.floor(Math.random() * animales.length);
  const randObjeto = Math.floor(Math.random() * objetos.length);
  const randComida = Math.floor(Math.random() * comidas.length);

  // Retorna una cadena concatenada de las palabras aleatorias

  const alias =
    animales[randAnimal] +
    "." +
    objetos[randObjeto] +
    "." +
    comidas[randComida];

  return alias.toUpperCase();
}
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: {
        model: Wallet,
        as: "wallet",
        include: {
          model: Spent,
          as: "spent",
          include: {
            model: Type,
            as: "type",
          },
        },
      },
    });

    res.status(200).send(allUsers);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};
const createUser = async (req, res) => {
  try {
    const { userName, userEmail, userPw } = req.body;

    if (!userEmail || !userPw || !userName) {
      return res.status(400).send("Data mistakes!");
    }
    const searchUser = await User.findOne({
      where: {
        userEmail: userEmail,
      },
    });

    if (searchUser) {
      return res.status(400).send("This email already excist!");
    } else {
      const newUser = await User.create({
        userName: userName,
        userEmail: userEmail,
        userPw: userPw,
      });

      await Wallet.create({
        balance: 0,
        userId: newUser.userId,
      });

      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};
const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: {
        model: Wallet,
        as: "wallet",
        include: {
          model: Spent,
          as: "spent",
          include: {
            model: Type,
            as: "type",
            include: {
              model: Spent,
              as: "spent",
              where: {
                userId: id,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(400).send("User not found!");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};

const getTypesByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;

    const types = await Type.findAll({
      include: {
        model: Spent,
        as: "spent",
        where: {
          userId: idUser,
        },
      },
    });

    if (!types) {
      return res.status(400).send("Types not found!");
    }

    res.status(200).json(types);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};

const editUser = async (req, res) => {
  try {
    const { name, email, pw } = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).send("User not found!");
    }

    const editUser = await User.update(
      {
        name: name,
        email: email,
        pw: pw,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send("User edited!");
  } catch (error) {}
};
module.exports = {
  secret,
  getUsers,
  getUsersById,
  createUser,
  editUser,
  getTypesByUserId,
  setLogin,
};
