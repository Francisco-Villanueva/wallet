// Arreglo de animales
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

// Arreglo de objetos físicos tangibles
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

// Arreglo de comidas
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
  "Costillas BBQ",
  "Ramen",
  "Pad Thai",
  "Curry",
];

const ANIMALES = animales.map((animal) => {
  animal.toUpperCase();
});
const OBJETOS = objetos.map((objeto) => {
  objeto.toUpperCase();
});
const COMIDAS = comidas.map((comida) => {
  comida.toUpperCase();
});
module.exports = {
  ANIMALES,
  OBJETOS,
  COMIDAS,
};
