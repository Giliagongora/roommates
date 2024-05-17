const axios = require("axios");
const fs = require("fs");
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require("uuid");
const roommates = require("../roommates.json");

const agregar = async (req, res) => {
  try {
    const { data } = await axios.get("https://randomuser.me/api");
    const userRandom = data.results[0];

    let id = uuidv4().slice(0, 6);
    const roommate = {
      id: id,
      nombre: userRandom.name.first,
      email: userRandom.email,
      debe: "",
      recibe: "",
      total: "",
    };

    // leer roommates.json, extrayendo su propiedad roommates que es un array
    const { roommates } = JSON.parse(fs.readFileSync("roommates.json", "utf8"));
    // console.log('roommates',roommates[0]);

    // agregamos un nuevo objeto al array roommates en memoria con datos procesaados de la Api
    let ingreso = roommates.push(roommate);

    // el array roommates debe ser pasado como objeto para conservar su estructura original
    fs.writeFileSync("roommates.json", JSON.stringify({ roommates }));

    console.log(`Roommate ${userRandom.name.first} creado con éxito`);
    return roommates;
    res.status(200).json(resultado);
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
};

const mostrarRoommates = async (req, res) => {
  try {
    const roommates = JSON.parse(fs.readFileSync("roommates.json", "utf8"));
    return roommates;
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
};

const gastos = async (req, res) => {
  try {
    const gastos = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
    return gastos;
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
};


const gasto = async (roommate, descripcion, monto) => {
  try {
    console.log("roommate", roommate);
    console.log("descripcion", descripcion);
    console.log("monto", monto);
    let id = uuidv4().slice(0, 6);
    let gasto = {
      id: id,
      roommate: roommate,
      descripcion: descripcion,
      monto: monto,
    };
    console.log("gasto.roommate : ",gasto.roommate)
    console.log("gasto.descripcion : ",gasto.descripcion)
    console.log("gasto.monto : ",gasto.monto)

    const { gastos } = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
    let ingreso = gastos.push(gasto);
    console.log('ingreso : ', ingreso);

    fs.writeFileSync("gastos.json", JSON.stringify({ gastos }));

    console.log(`Gastos creado con éxito`);
    return gastos;
  } catch (error) {
    console.error("Error al agregar gasto:", error);
  }
};

const gastoEditar = async (req, res) => {
  try {
    const { gastos }  = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
    console.log(gastos);
    id = gastos[id];
    console.log('id : ',id);

    let gasto = {
      id:id,
      roommate: roommate,
      descripcion: descripcion,
      monto: monto,
    };
    console.log("gasto.roommate : ",gasto.roommate)
    console.log("gasto.descripcion : ",gasto.descripcion)
    console.log("gasto.monto : ",gasto.monto)

    gasto = gastos.findIndex(gasto => gasto.id === gasto.id);
    console.log('gastoUsuario : ', gastoUsuario);
    if (indiceGasto !== -1) {
      console.log(`El gasto con ID '${idBuscar}' se encuentra en el índice ${indiceGasto}`);
    } else {
      console.log(`No se encontró ningún gasto con ID '${idBuscar}'`);
    }
    
    gasto = gastoUsuario;

    let ingreso = gastos.push(gasto);
    console.log('ingreso : ', ingreso);

    fs.writeFileSync("gastos.json", JSON.stringify({ gastos }));

    console.log(`Gastos editados con éxito`);
    return gastos;

  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
};
// gastoEditar("ced75a","Adam","Articulos de limpieza","6666");



module.exports = {
  agregar,
  mostrarRoommates,
  gasto,
  gastos,
  gastoEditar,
};
