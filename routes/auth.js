/*
Ruta: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('email', 'El correo electrónico es obligatorio.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', [
    validarJWT
], renewToken);

router.post('/google', [
    check('token', 'El token de google es obligatorio.').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;