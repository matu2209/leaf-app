const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { log } = require('console');
const cors = require('cors');
const { addSyntheticLeadingComment } = require('typescript');

const app = express();
const PORT = process.env.PORT || 3001;
const usuariosFilePath = path.join(__dirname, 'usuarios.json');
const cardsFilePath = path.join(__dirname, 'tarjetas.json');
const foroFilePath = path.join(__dirname, 'foro.json');
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

// Función para leer el foro desde el archivo
const leerForo = () => {
    const data = fs.readFileSync(foroFilePath);
    return JSON.parse(data);
};

// Función para guardar usuarios en el archivo
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
};

// Función para guardar foro en el archivo
const guardarForo = (posteos) => {
    fs.writeFileSync(foroFilePath, JSON.stringify(posteos, null, 2));
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

// Ruta para obtener un usuario por username (GET)
app.get('/usuarios/username/:username', (req, res) => {
    const { username } = req.params;
    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.username === username);

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
        admin: req.body.admin,
        birthDate: req.body.birthDate,
        isActivated: req.body.isActivated,
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
    if(usuario.isActivated === false){
        return res.status(403).send('Inactive user');
    }

    // Generar el token
    const token = jwt.sign({ id: usuario.id, nombre: "Miau Miaaaaaaaau", username: usuario.username}, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token, usuario});
});

// Middleware para proteger rutas
const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Toma solo el token sin el prefijo 'Bearer'
    
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

app.get('/view/:id', (req, res) => {
    const { id } = req.params;
    const usuarios = leerUsuarios();
    const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(id));
    
    if (usuarioIndex === -1) {
        return res.status(404).send('Usuario no encontrado');
    }
    if (usuarios[usuarioIndex].isActivated){
        usuarios[usuarioIndex].isActivated = false;
        guardarUsuarios(usuarios);
        res.status(200).json({ message: 'User deactivated', user: usuarios[usuarioIndex] });
    } else {
        usuarios[usuarioIndex].isActivated = true;
        guardarUsuarios(usuarios);
        res.status(200).json({ message: 'User activated', user: usuarios[usuarioIndex] });
    }
})


app.get('/foro', autenticarToken, (req, res) => {
    const posteos = leerForo();

    if (posteos.length === 0) {
        return res.status(404).send('no existen publicaciones');
    }

    res.status(200).json(posteos);
})

app.post('/foro', autenticarToken, (req, res) => {
    const posteos = leerForo();
    var post = {
        id: posteos.length ? posteos[posteos.length - 1].id + 1 : 1,
        username: req.body.username,
        category: req.body.category,
        post: req.body.post,
        comments: [],
        date: req.body.date
    }
    posteos.push(post);
    guardarForo(posteos);
    res.status(201).json(post);
})

app.post('/foro/comment', autenticarToken, (req, res) => {
    const posteos = leerForo();
    const postId = req.body.postId;
    // const post = posteos.find(post => post.id === postId);
    const postIndex = posteos.findIndex(post => post.id === postId);
    const post = posteos[postIndex];

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const newCommentId = post.comments.length ? `${postId}-${parseInt(post.comments[post.comments.length - 1].id.split('-')[1]) + 1}` : `${postId}-1`;

    var comment = {
        id: newCommentId,
        username: req.body.username,
        comment: req.body.comment,
        date: req.body.date
    }

    post.comments.push(comment);
    posteos[postIndex] = post;
    guardarForo(posteos);
    res.status(201).json(post);
})


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});