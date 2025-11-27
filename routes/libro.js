const express = require("express");
const router = express.Router();
const Libro = require("../models/libro")
const Autor = require("../models/autor")
const Genero = require("../models/genero")

//GET para obetenr todos los libros
router.get("/", async (req, res)=>{
    try{
        const libros = await Libro.find().populate('id_autor', 'nombre nacionalidad').populate('id_genero', 'nombre descripcion');
        res.json(libros);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//GET para obtener un libro por id
router.get("/:id", async (req, res)=>{
    try{
        const { id } = req.params;
        const libro = await Libro.findById(id).populate('id_autor', 'nombre nacionalidad').populate('id_genero', 'nombre descripcion');
        if (!libro) return res.status(404).json({"mensaje": "No se encontro"});
        res.json(libro);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

// GET para obtener los libros de un autor especifico
router.get("/autor/:id_autor", async (req, res)=>{
    try{
        const { id_autor } = req.params;
        const libros = await Libro.find({ id_autor }).populate('id_genero', 'nombre descripcion');
        if(!libros.length) return res.status(404).json({"mensaje":"No se pudo obtener"})
        res.json(libros)
    }catch(error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
});

// GET para obtener los libros de un genero especifico
router.get("/genero/:id_genero", async (req, res)=>{
    try{
        const { id_genero } = req.params;
        const libros = await Libro.find({ id_genero }).populate('id_autor', 'nombre nacionalidad');
        if(!libros.length) return res.status(404).json({"mensaje":"No se pudo obtener"})
        res.json(libros)
    }catch(error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
});

//POST para crear un nuevo libro
router.post("/", async (req, res)=>{
    try{
        const { titulo, editorial, id_autor, id_genero } = req.body;

        const autor = await Autor.findById(id_autor);
        if(!autor) return res.status(404).json({ "mensaje": "No existe la clave foranea id_autor" });

        const genero = await Genero.findById(id_genero);
        if(!genero) return res.status(404).json({ "mensaje": "No existe la clave foranea id_genero" });

        const libro = await Libro.create({titulo, editorial, id_autor, id_genero});
        res.status(201).json(libro);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//PUT para actualizar un libro por id
router.put("/:id", async (req, res)=>{
    try{
        const { id } = req.params
        const { titulo, editorial, id_autor, id_genero } = req.body;

        const libroExist = await Libro.findById(id);
        if(!libroExist) return res.status(404).json({ "mensaje": "No existe el libro" });

        const autor = await Autor.findById(id_autor);
        if(!autor) return res.status(404).json({ "mensaje": "No existe la clave foranea id_autor" });

        const genero = await Genero.findById(id_genero);
        if(!genero) return res.status(404).json({ "mensaje": "No existe la clave foranea id_genero" });

        const libro = await Libro.findByIdAndUpdate(id, { titulo, editorial, id_autor, id_genero }, { new: true });
        res.json(libro);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//DELETE para eliminar un libro por id
router.delete("/:id", async (req, res)=>{
    try{
        const { id } = req.params;
        const libro = await Libro.findByIdAndDelete(id);
        if (!libro) return res.status(404).json({"mensaje": "No se encontro"});
        res.json({"mensaje": `El libro con el id ${id} fue eliminado.`});
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

module.exports = router;