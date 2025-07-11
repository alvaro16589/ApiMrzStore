import actionFilesController from '../controllers/file.controller.js';
import { Router } from "express";
import path from 'path';
import fs from 'fs';

// Ruta para recibir imagen
const router = Router();
router.post('/upload', actionFilesController.upload.single('imagen'), (req, res) => {
    res.json({ file: req.file });
});

// Ruta para descargar archivo
router.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Verifica si el archivo existe
    if (fs.existsSync(filePath)) {
        //res.download(filePath);//descarga
        res.sendFile(filePath);

    } else {
        res.status(404).json({ message: 'Archivo no encontrado' });
    }
});

router.delete('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ message: 'Imagen borrada correctamente' });
    } else {
        res.status(404).json({ message: 'Imagen no encontrada' });
    }
});

export default router
