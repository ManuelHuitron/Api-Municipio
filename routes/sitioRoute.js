/*
Ruta:   api/sitio
*/
const { Router } = require('express');
//validator
const { check } = require('express-validator');
//importamos el middleware de validacion de campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const { actualizarLicenciaSitio, getSitioByCategoria, actualizarSitio, borrarSitio, crearSitio, getSitioByUser, getSitio, getSitioByID, getSitioByNombre } = require('../controllers/sitioController');
//const { getPaises, getPaiseByID, getPaisNombre, actualizarPaisGenerico, borrarPais, crearPais } = require('../controllers/paisController');
const router = Router();
//listar todo paginado
router.get('/', validarJWT, getSitio);
//Get Pais by ID
router.get('/:id', validarJWT, getSitioByID);
//Get por nombre de Municioio
router.get('/buscar/:busqueda', validarJWT, getSitioByNombre);
//Get por Usuario sitio
router.get('/sitios/:usuario', validarJWT, getSitioByUser);
//Get sitio by categoria
router.get('/sitioscat/:categoria', validarJWT, getSitioByCategoria);

router.post('/', [
    validarJWT,
    check('nombreSitio', 'El nombre del nombreSitio es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('municipio', 'El municipio es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    validarCampos,
],
    crearSitio
);
router.put('/:id', [
    validarJWT,
    check('nombreSitio', 'El nombre del nombreSitio es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('municipio', 'El municipio es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    validarCampos,
],
    actualizarSitio
);

//Metodo para activar licencia
router.put('/licencia/:id', [
    validarJWT,
    check('licencia', 'La fecha de licencia es obligatorio').isDate(),
    validarCampos,
],
    actualizarLicenciaSitio
);

router.delete('/:id',
    validarJWT,
    borrarSitio
);

module.exports = router;