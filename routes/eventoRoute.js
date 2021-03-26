/*
Ruta:   api/sitio
*/
const { Router } = require('express');
//validator
const { check } = require('express-validator');
//importamos el middleware de validacion de campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const { actualizarEvento, borrarEvento, crearEvento, getEvento, getEventoByID, getPopulateByID, getEventoByNombre, getEventoBySitio, getEventoBySitioPaginado, getEventoByTalentPaginado } = require('../controllers/eventoController');
//const { getPaises, getPaiseByID, getPaisNombre, actualizarPaisGenerico, borrarPais, crearPais } = require('../controllers/paisController');
const router = Router();
//listar todo paginado

router.get('/', validarJWT, getEvento);
//Get Pais by ID
router.get('/:id', validarJWT, getEventoByID, getPopulateByID);
//Get por nombre de Municioio
router.get('/buscar/:busqueda', validarJWT, getEventoByNombre);
//Get por sitio
router.get('/sitio/:sitio', validarJWT, getEventoBySitio);

//Get por sitio Paginado
router.get('/paginado/sitio/:sitio', validarJWT, getEventoBySitioPaginado);

//Get por Talent Paginado
router.get('/paginado/talent/:talent', validarJWT, getEventoByTalentPaginado);

router.post('/', [
    validarJWT,
    check('nombreEvento', 'El nombre del evento es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('horario', 'El horario es obligatorio').not().isEmpty(),
    validarCampos,
],
    crearEvento
);
router.put('/:id', [
    validarJWT,
    check('nombreEvento', 'El nombre del evento es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('horario', 'El horario es obligatorio').not().isEmpty(),
    validarCampos,
],
    actualizarEvento
);



router.delete('/:id',
    validarJWT, borrarEvento
);

module.exports = router;