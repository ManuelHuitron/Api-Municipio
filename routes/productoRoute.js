/*
Ruta:   api/sitio
*/
const { Router } = require('express');
//validator
const { check } = require('express-validator');
//importamos el middleware de validacion de campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const { actualizarProducto, borrarProducto, crearProducto, getProducto, getProductoByID, getProductoByNombre, getProductoBySitio, getProductoBySitioPAginado, getProductoByTalentPaginado } = require('../controllers/productoController');
//const { getPaises, getPaiseByID, getPaisNombre, actualizarPaisGenerico, borrarPais, crearPais } = require('../controllers/paisController');
const router = Router();
//listar todo paginado
router.get('/', validarJWT, getProducto);
//Get Pais by ID
router.get('/:id', validarJWT, getProductoByID);
//Get por nombre de Municioio
router.get('/buscar/:busqueda', validarJWT, getProductoByNombre);
//Get por sitio
router.get('/sitio/:sitio', validarJWT, getProductoBySitio);

//Get por sitio paginado
router.get('/paginado/sitio/:sitio', validarJWT, getProductoBySitioPAginado);

//Get por Talen
router.get('/paginado/talent/:talen', validarJWT, getProductoByTalentPaginado);

router.post('/', [
    validarJWT,
    check('nombreProducto', 'El nombre del evento es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('precioActual', 'El precioActual es obligatorio').not().isEmpty(),
    validarCampos,
],
    crearProducto
);
router.put('/:id', [
    validarJWT,
    check('nombreProducto', 'El nombre del evento es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('precioActual', 'El precioActual es obligatorio').not().isEmpty(),
    validarCampos,
],
    actualizarProducto
);



router.delete('/:id',
    validarJWT, borrarProducto
);

module.exports = router;