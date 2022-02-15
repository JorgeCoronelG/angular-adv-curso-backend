const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {
    // Leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe el token.'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }

    next();
};

const validarAdminRole = async (req, res, next) => {
    try {
        const usuarioDB = await Usuario.findById(req.uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el registro.'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esa acción.'
            });
        }
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
};

const validarAdminRoleOMismoUsuario = async (req, res, next) => {
    const uid = req.uid;
    const idUserRequest = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el registro.'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE' && uid !== idUserRequest) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esa acción.'
            });
        }
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
};

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleOMismoUsuario
};