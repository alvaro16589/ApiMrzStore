import { dotEnvValues } from "./config.js";

import app from "./app.js";


app.listen( dotEnvValues.PORT);  
console.log('Servidor corriendo en el puerto : ', dotEnvValues.PORT)