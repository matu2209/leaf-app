const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { log } = require('console');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const usuariosFilePath = path.join(__dirname, 'usuarios.json');
const cardsFilePath = path.join(__dirname, 'tarjetas.json');
const SECRET_KEY = 'mi_clave_secreta'; // Cambia esto por una clave más segura

// Middleware
app.use(cors());
app.use(express.json());

// Función para leer usuarios desde el archivo
const leerUsuarios = () => {
    const data = fs.readFileSync(usuariosFilePath);
    return JSON.parse(data);
};

const readCards = () => {
    const data = fs.readFileSync(cardsFilePath);
    return JSON.parse(data);
};

// Función para guardar usuarios en el archivo
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
};

const guardarTarjetas = () => {
    const data = fs.readFileSync(cardsFilePath);
    return JSON.parse(data);
};
// Ruta para obtener todos los usuarios (GET)
app.get('/usuarios', (req, res) => {
    const usuarios = leerUsuarios();
    res.status(200).json(usuarios);
});

// Ruta para obtener un usuario por ID (GET)
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.id === parseInt(id));

    if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
    }

    res.status(200).json(usuario);
});

// Ruta para crear un nuevo usuario (POST)
/* app.post('/usuarios', (req, res) => {
    const { nombre, email, contraseña } = req.body;
    const usuarios = leerUsuarios();
    
    const nuevoUsuario = {
        id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
        nombre,
        email,
        contraseña,
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    res.status(201).json(nuevoUsuario);
}); */

app.post('/usuarios', (req, res) => {
    const users = leerUsuarios();
    var user = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        username: req.body.username,
        password: req.body.password,
        member: req.body.member,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        country: req.body.country,
        favorites: [],
        creditCard: []
    }

    users.push(user);
    guardarUsuarios(users);
    res.status(201).json(user);
})

// Ruta para actualizar un usuario por ID (PUT)
// app.put('/usuarios/:id', (req, res) => {
//     const { id } = req.params;
//     const { nombre, email, contraseña } = req.body;
//     const usuarios = leerUsuarios();
//     const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(id));

//     if (usuarioIndex === -1) {
//         return res.status(404).send('Usuario no encontrado');
//     }

//     usuarios[usuarioIndex] = { id: parseInt(id), nombre, email, contraseña };
//     guardarUsuarios(usuarios);

//     res.status(200).json(usuarios[usuarioIndex]);
// });

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    const usuarios = leerUsuarios();
    const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(id));

    if (usuarioIndex === -1) {
        return res.status(404).send('Usuario no encontrado');
    }

    usuarios[usuarioIndex] = { 
        id: parseInt(id), 
        ...usuarios[usuarioIndex],  // Mantiene los valores actuales
        ...updatedUser              // Sobreescribe con los nuevos valores
    };
    guardarUsuarios(usuarios);
    res.status(200).json(usuarios[usuarioIndex]);
});

// Ruta para eliminar un usuario por ID (DELETE)
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuarios = leerUsuarios();
    const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(id));

    if (usuarioIndex === -1) {
        return res.status(404).send('Usuario no encontrado');
    }

    usuarios.splice(usuarioIndex, 1);
    guardarUsuarios(usuarios);

    res.status(204).send();
});

// Ruta para iniciar sesión (POST)
app.post('/login', (req, res) => {

    const { username, password } = req.body;
    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.username === username && u.password === password);
    
    if (!usuario) {
        return res.status(401).send('Credenciales incorrectas');
    }

    // Generar el token
    const token = jwt.sign({ id: usuario.id, nombre: "Miau Miaaaaaaaau", username: usuario.username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token, usuario});
});

// Middleware para proteger rutas
const autenticarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Prohibido
        }
        req.user = user;
        next();
    });
};

// Ruta protegida de ejemplo
app.get('/perfil', autenticarToken, (req, res) => {
    res.status(200).json({ message: 'Perfil de usuario', user: req.user });
});

app.get('/tarjetas', autenticarToken, (req, res) => {
    //const { id } = req.params;
    const usuarios = leerUsuarios();
    const i = usuarios.findIndex(usuario => usuario.id === req.user.id);

    if (usuarios[i].creditCard.length === 0) {
        return res.status(404).send('Usuario no posee tarjetas asociadas');
    }

    res.status(200).json(usuarios[i].creditCard);
})

app.post('/tarjetas', autenticarToken, (req, res) => {
    const usuarios = leerUsuarios();
    const i = usuarios.findIndex(usuario => usuario.id === req.user.id);
    var card = {
        name: req.body.name,
        number: req.body.number,
        date: req.body.date, 
        cvv: req.body.cvv,
        address: req.body.address,
        country: req.body.country
    }
    
    usuarios[i].creditCard.push(card);
    guardarUsuarios(usuarios);
    res.status(201).json(card);
});

app.delete('/tarjetas', autenticarToken, (req, res) => {
    //const { id } = req.params;
    const usuarios = leerUsuarios();
    const i = usuarios.findIndex(usuario => usuario.id === req.user.id);

    usuarios[i].creditCard = usuarios[i].creditCard.filter(card => card.number !== req.body.number);

    guardarUsuarios(usuarios);

    res.status(200).json(usuarios[i].creditCard);
})
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});