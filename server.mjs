import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;
const urlBase = 'https://trefle.io/api';  // URL base de la API de Trefle
const token = 'TOKEN';  // Token para acceder a la API

app.use(cors({ origin: 'http://localhost:4200' }));  // Permite solicitudes desde Angular
app.use(express.json());

// Ruta para obtener el token de la API de Trefle
app.post('/get-token', async (req, res) => {
    try {
        const response = await fetch(`${urlBase}/auth/claim`, {
            method: 'post',
            body: JSON.stringify({ origin: 'http://localhost:4200', token }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        res.json(data);  // Devuelve el token al frontend
    } catch (error) {
        console.error('Error obteniendo token:', error);
        res.status(500).send('Error obteniendo token');
    }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
