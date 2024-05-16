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

const gasto = async (req, res) => {
  // console.log('roommates, descripcion, monto : ',roommates, descripcion, monto);
  try {
    // return gastosJSON;
    let id = uuidv4().slice(0, 6);
    const gastos = { 
      id: id, 
      roommates: '', 
      descripcion: '',
       monto: '',
     };

     JSON.parse(fs.readFileSync("gastos.json", "utf8"));

    let ingreso = gastos.push(gastos);
    // Escribir el archivo JSON con la agregacion realizada

    fs.writeFileSync("gastos.json", JSON.stringify({gastos}));

    console.log(`Nuevo gasto de ${roommates} creado con éxito`);
  } catch (error) {
    console.log("error", error, error.message);
    // res.send(  error.message );
    // return res.status(500).send({ message: "Error interno del servidor: " + error.message });
  }
};
gasto();

// const gastoNuevo = async (req, res) => {
//   try {
//     // Generar un ID único para el nuevo gasto
//     const id = uuidv4().slice(0, 6);
    
//     // Crear el objeto del nuevo gasto con los datos recibidos en la solicitud
//     const nuevogasto = { 
//       id: id, 
//       roommates: req.body.roommates && '', 
//       descripcion: req.body.descripcion && '', // Asegúrate de tener un valor por defecto si la descripción no está definida en la solicitud
//       monto: req.body.monto && '', // Asegúrate de tener un valor por defecto si el monto no está definido en la solicitud
//     };

//     // Leer el archivo JSON de gastos y almacenarlo en la variable gastos
//     let gastos = JSON.parse(fs.readFileSync("gastos.json", "utf8"));

//     // Agregar el nuevo gasto al array de gastos
//     gastos.push(nuevogasto);

//     // Escribir todo el array de gastos en el archivo JSON
//     fs.writeFileSync("gastos.json", JSON.stringify(gastos), "utf8");

//     console.log(`Nuevo gasto de ${nuevogasto.roommates} creado con éxito`);

//     // Enviar una respuesta al cliente indicando que el gasto se creó correctamente
//     res.status(200).send({ message: `Nuevo gasto de ${nuevogasto} creado con éxito`, gasto: nuevogasto });
//   } catch (error) {
//     console.log("Error al crear el gasto:", error);
//     res.status(500).send({ error: "Error interno del servidor al crear el gasto" });
//   }
// };
// gastoNuevo("Juan", "Sal mineral", 50)



module.exports = {
  agregar,
  mostrarRoommates,
  gasto,
  gastos,
};
