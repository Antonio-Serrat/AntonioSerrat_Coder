const Contenedor = require('./Contenedor')
const express = require('express')
const app = express()

const cont = new Contenedor("productos");

app.get("/productos", (req, res) => {
    res.send(`${cont.getAll()}`)
    
    res.end();
})





const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`escuchando puerto ${PORT}`)
})

server.on("error", (err) => {
    console.log(`error : ${err}`)
})