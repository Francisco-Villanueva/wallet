require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PW, DB_DATABASE, DB_HOST } = process.env;

const fs = require("fs");
const path = require("path");

//  Passing a connection URI
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PW}@${DB_HOST}/${DB_DATABASE}`
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const { Wallet, User, Spent, Type } = sequelize.models;
// ...

// Relaciones entre modelos
User.hasOne(Wallet, { foreignKey: "userId", as: "wallet" }); // Un usuario tiene una billetera
Wallet.belongsTo(User, { foreignKey: "userId", as: "user" }); // Una billetera pertenece a un usuario

User.hasMany(Spent, { foreignKey: "userId", as: "spent" }); // Un usuario tiene muchos gastos
Spent.belongsTo(User, { foreignKey: "userId", as: "user" }); // Un gasto pertenece a un usuario

Spent.belongsTo(Wallet, { foreignKey: "walletId", as: "wallet" }); // Un gasto pertenece a una billetera
Wallet.hasMany(Spent, { foreignKey: "walletId", as: "spent" }); // Una billetera tiene muchos gastos

Spent.belongsTo(Type, { foreignKey: "typeId", as: "type" }); // Un gasto pertenece a un tipo de gasto
Type.hasMany(Spent, { foreignKey: "typeId", as: "spent" }); // Un tipo de gasto tiene muchos gastos

// ...

module.exports = {
  ...sequelize.models,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
