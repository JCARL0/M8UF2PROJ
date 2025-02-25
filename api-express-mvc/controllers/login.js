require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Clave secreta (guárdala en .env)
const SECRET_KEY = process.env.JWT_SECRET || 'admin';



const generateToken = async (req, res) => {
    try {
        if (req.body.username !== "admin") {
            return res.json({ error: 'Usuario no encontrado' });
        }

        if (req.body.password !== "admin") {
            return res.json({ error: 'Contraseña incorrecta' });
        }

        const payload = { username: req.body.username };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        
        return res.json({ token: token });
    } catch (err) {
        console.error('Error en autenticación:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    generateToken: generateToken
}