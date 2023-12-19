const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro');

//Todos los libros
router.get("/", async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
});

//Libro por id
router.get("/:id", async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
});

// Ruta para crear un nuevo Libro
router.post('/', async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el Libro" });
    }
});

// Ruta para actualizar un Libro existente
router.put("/:id", async (req, res) => {
    try {
        const LibroActualizado = await Libro.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
            });
        res.json(LibroActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el Libro" });
    }
});

// Ruta para eliminar un Libro
router.delete('/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Libro' });
    }
});

module.exports = router;