import mongoose from "mongoose"; // Importación del paquete mongoose para interactuar con MongoDB
import dotenv from "dotenv"; // Importación del paquete dotenv para cargar variables de entorno desde un archivo .env

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const connectionString = "mongodb+srv://admin:admin@cluster0.jjgbu2m.mongodb.net/"; // Cadena de conexión a la base de datos MongoDB

export const db = mongoose.connect(connectionString) // Conexión a la base de datos utilizando la cadena de conexión
    .then(
        () => console.log("Connected to MongoDB") // Si la conexión es exitosa, se imprime un mensaje de conexión exitosa
    )
    .catch(
        (err) => console.log(err) // Si hay algún error en la conexión, se imprime el error
    );
