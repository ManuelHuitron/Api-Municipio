/*
Ruta:   api/municipio
*/
const { Router } = require('express');
//validator
const { check } = require('express-validator');
//importamos el middleware de validacion de campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT,  varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const { actualizarMunicipio, borrarMunicipio, crearMunicipio, getMunicipiosT, getMunicipioByEstado, getMunicipio, getMunicipioByID, getMunicipioByNombre } = require('../controllers/municipioController');
//const { getPaises, getPaiseByID, getPaisNombre, actualizarPaisGenerico, borrarPais, crearPais } = require('../controllers/paisController');
const router = Router();
//listar todo paginado
router.get('/', validarJWT,  getMunicipio);
//Get Pais by ID
router.get('/:id', validarJWT,  getMunicipioByID);
//Get por nombre de Municioio
router.get('/buscar/:busqueda', validarJWT,  getMunicipioByNombre);
//listar todos
router.get('/listar/todos', validarJWT,  getMunicipiosT);
//listar por estado
router.get('/byestado/:id', validarJWT,  getMunicipioByEstado);

router.post('/', [
        validarJWT, 
        check('nombreMunicipio', 'El nombre del Municipio es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearMunicipio
);
router.put('/:id', [
        validarJWT,
        check('nombreMunicipio', 'El nombre del Municipio es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarMunicipio
);
router.delete('/:id',
    validarJWT,
    borrarMunicipio
);

module.exports = router;