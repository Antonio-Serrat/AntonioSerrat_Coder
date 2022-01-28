const Contenedor = require('./contenedor')
const express = require('express')
const app = express()

const cont = new Contenedor("productos");

app.get("/", (req, res) => {
    const allProd = "/productos"
    const randomProd = "/productoRandom"
    res.send(`<h2> Para ver todos los productos: ${allProd}.</h2>\n
            <h2> Para ver un producto random: ${randomProd}.</h2>`)
})

app.get("/productos", async (req, res) => {
    const productos = await cont.getAll()
    res.send(JSON.stringify(productos))
})

app.get("/productoRandom", async (req, res) => {
    const productos = await cont.getAll()
    const pr = productos[Math.floor(Math.random() * productos.length)]
    res.send(JSON.stringify(pr))
})



const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`escuchando puerto ${PORT}`)
})

server.on("error", (err) => {
    console.log(`error : ${err}`)
})
