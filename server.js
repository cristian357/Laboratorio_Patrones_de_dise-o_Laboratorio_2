// 1. Importamos la herramienta Express
const express = require('express');

// 2. Creamos nuestra aplicación
const app = express();

// 3. Le decimos a la app que entienda los datos en formato JSON
app.use(express.json());

// ==============================================================
// Base de datos simulada + Patrón Factory Method
// ==============================================================

let baseDeDatos = []; // Base de datos sencilla en memoria

class FabricaDePersonas {
    // Método estático: se puede usar sin crear una instancia con 'new'
    static crear(datosRecibidos) {
        // Construimos y retornamos el objeto persona limpio
        return {
            id: Date.now().toString(), // ID único basado en la fecha actual
            nombre: (datosRecibidos.nombre || '').trim(), // Quitamos espacios a los lados
            apellido: (datosRecibidos.apellido || '').trim(), // Quitamos espacios a los lados
            telefono: datosRecibidos.telefono || "Sin teléfono" // Valor por defecto si no envían teléfono
        };
    }
}

// Ruta POST para crear y guardar
app.post('/personas', (req, res) => {
    // Usamos la fábrica para limpiar y crear el objeto de forma centralizada
    const personaLista = FabricaDePersonas.crear(req.body);

    baseDeDatos.push(personaLista);
    res.status(201).json(personaLista);
});

// Ruta GET para consultar
app.get('/personas', (req, res) => {
    res.json(baseDeDatos);
});

// 5. Encendemos el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor encendido. Entra a http://localhost:${PORT}/personas`);
});