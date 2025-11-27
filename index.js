const express = require("express");
const app = express();
const PORT = 3000;
const { connect } = require("./models/database");
const autor = require("./routes/autor")
const genero = require("./routes/genero")
const libro = require("./routes/libro")

app.use(express.json());
app.use('/autor', autor);
app.use('/genero', genero);
app.use('/libro', libro);

app.get("/", async (req, res)=>{
    res.json({"mensaje": "Bienvenido a la API con Express y MongoDB"})
})

const start = async ()=>{
    try {
        await connect();
        app.listen(PORT, ()=>{
            console.log(`Escuchando desde el puerto: ${PORT}`);
        })
    }catch(error){
        console.error(`No se pudo conectar a la base de datos: ${error}`);
    }
}

start()