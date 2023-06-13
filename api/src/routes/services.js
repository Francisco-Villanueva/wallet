const { Wallet, User } = require("../db");
const axios = require("axios");
const { ANIMALES, OBJETOS, COMIDAS } = require("../aliasServices");

const test = (req, res) => {
  res.send("hola");
};


function generarCBU() {
  let entidad = Math.floor(Math.random() * 1000); // Número aleatorio de 3 dígitos para la entidad bancaria
  let sucursal = Math.floor(Math.random() * 100); // Número aleatorio de 2 dígitos para la sucursal bancaria
  let digitoVerificador = Math.floor(Math.random() * 10); // Número aleatorio de 1 dígito para el dígito verificador
  let cuenta = ""; // Variable para ir concatenando los números de la cuenta bancaria
  for (let i = 0; i < 13; i++) {
    cuenta += Math.floor(Math.random() * 10); // Genera un número aleatorio de un solo dígito y lo agrega a la cuenta
  }
  return (
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
    const allUsers = await User.findAll(userId, { include: Wallet });

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

    const newUser = await User.create({
      userName: userName,
      userEmail: userEmail,
      userPw: userPw,
      cvu: generarCBU(),
      alias: generarALIAS(),
    });

    const newWallet = await Wallet.create({
      balance: 0,
      userId: newUser.id,
    })
    res.status(200).json(newUser, newWallet);
  } catch (error) {
    console.log("ERROR:  ", error);
    res.status(400).send(error);
  }
};
const getUsersById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk((userId, { include: Wallet }));

    if (!user) {
      return res.status(400).send("User not found!");
    }

    res.status(200).json(user);
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
  test,
  getUsers,
  getUsersById,
  createUser,
  editUser,
};
