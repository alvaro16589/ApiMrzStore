import multer from 'multer';



// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        // Renombrar el archivo para evitar duplicados
        const filename = file.originalname;
        cb(null, filename);
    }
});
const upload = multer({ storage });

const actionFilesController = {
    upload,
};


export default actionFilesController;


