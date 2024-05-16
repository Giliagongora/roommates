const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;
app.use(express.json());
const fs = require("fs");
const roommates = require("./roommates.json");
// const gasto = require("./gastos.json");

const {
  agregar,
  mostrarRoommates,
  gasto,
  gastos,
} = require("./consultas/consultas");

app.post("/roommate", async (req, res) => {
  try {
    const data = await agregar();
    res.send(data);
    res.render();
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/roommates", async (req, res) => {
  try {
    const roommates = await mostrarRoommates();
    res.send(roommates);
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/gasto", async (req, res) => {
  // const { id } = req.params;
  // const { roommate, descripcion, monto } = req.body;
  const { roommate, descripcion, monto } = req.body;
  try {
    // const gasto = await gastoNuevo();
    // console.log(gasto)
    const respuesta = await gasto(roommate, descripcion, monto);
    // Se llama a la funcion para actualizar las cuentas
    // await putCuentas();
    // console.log("Gasto ingresado correctamente");
    return res.status(201).send(respuesta);
    return (respuesta)
    res.send(200).json(respuesta);
    res.render();
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/gastos", async (req, res) => {
  try {
    const data = await gastos();

    // res.send({mensaje: 'Todo ok'});
    res.send(data);
  } catch (error) {
    console.log("error", error, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Servidor listening on ${PORT}`);
});
