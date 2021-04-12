/*
Ruta:   api/busqueda
*/
const { Router } = require('express');
//validator
const { check } = require('express-validator');
//importamos el middleware de validacion de campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const { getBusqueda, getBusquedaSitios, getBusquedaTalents, getBusquedaEvento, getBusquedaProducto, getBusquedaTaller, } = require('../controllers/busquedaController');
//const { getPaises, getPaiseByID, getPaisNombre, actualizarPaisGenerico, borrarPais, crearPais } = require('../controllers/paisController');
const router = Router();

//listar cualquier coincidencia paginada
router.get('/:busqueda', validarJWT, getBusqueda);
//listar cualquier coincidencia paginada de Sitios
router.get('/sitio/:busqueda', validarJWT, getBusquedaSitios);
//listar cualquier coincidencia paginada de Talents
router.get('/talent/:busqueda', validarJWT, getBusquedaTalents);
//listar cualquier coincidencia paginada de Evento
router.get('/evento/:busqueda', validarJWT, getBusquedaEvento);
//listar cualquier coincidencia paginada de Producto
router.get('/producto/:busqueda', validarJWT, getBusquedaProducto);
//listar cualquier coincidencia paginada de Taller
router.get('/taller/:busqueda', validarJWT, getBusquedaTaller);


module.exports = router;