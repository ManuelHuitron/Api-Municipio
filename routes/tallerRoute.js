/*
Ruta:   api/taller
*/
const { Router } = require('express');
//validator
const { check } = require('express-validator');
//importamos el middleware de validacion de campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const { actualizarTaller, borrarTaller, crearTaller, getTaller, getTallerByID, getTallerByNombre, getTallerBySitio, getTallerBySitioPaginado, getTallerByTalentPaginado } = require('../controllers/tallerController');
//const { getPaises, getPaiseByID, getPaisNombre, actualizarPaisGenerico, borrarPais, crearPais } = require('../controllers/paisController');
const router = Router();
//listar todo paginado
router.get('/', validarJWT, getTaller);
//Get Pais by ID
router.get('/:id', validarJWT, getTallerByID);
//Get por nombre de Municioio
router.get('/buscar/:busqueda', validarJWT, getTallerByNombre);
//Get by Sitio
router.get('/sitio/:sitio', validarJWT, getTallerBySitio);

//Get by Sitio
router.get('/paginado/sitio/:sitio', validarJWT, getTallerBySitioPaginado);
//Get by talent
router.get('/paginado/talent/:talent', validarJWT, getTallerByTalentPaginado);

router.post('/', [
    validarJWT,
    check('nombreTaller', 'El nombre del taller es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('precio', 'El precioes obligatorio').not().isEmpty(),
    validarCampos,
],
    crearTaller
);
router.put('/:id', [
    validarJWT,
    check('nombreTaller', 'El nombre del taller es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
],
    actualizarTaller
);



router.delete('/:id',
    validarJWT, borrarTaller
);

module.exports = router;