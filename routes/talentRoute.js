/*
Ruta:   api/Talent
*/
const { Router } = require('express');
//validator
const { check } = require('express-validator');
//importamos el middleware de validacion de campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const { actualizarLicenciaTalent, getTalentByCategoria, actualizarTalent, borrarTalent, crearTalent, getTalent, getTalentByID, getTalentByNombre } = require('../controllers/talentController');
//const { getPaises, getPaiseByID, getPaisNombre, actualizarPaisGenerico, borrarPais, crearPais } = require('../controllers/paisController');
const router = Router();
//listar todo paginado
router.get('/', validarJWT, getTalent);
//Get Pais by ID
router.get('/:id', validarJWT, getTalentByID);
//Get por nombre de Municioio
router.get('/buscar/:busqueda', validarJWT, getTalentByNombre);
//Get Talent by categoria
router.get('/talentcat/:categoria', validarJWT, getTalentByCategoria);

router.post('/', [
    validarJWT,
    check('nombreTalent', 'El nombre del talent es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
],
    crearTalent
);
router.put('/:id', [
    validarJWT,
    check('nombreTalent', 'El nombre del talent es obligatorio').not().isEmpty(),
    check('imgPrincipal', 'La imagen Principal es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
],
    actualizarTalent
);

//Metodo para activar licencia
router.put('/licencia/:id', [
    validarJWT,
    check('licencia', 'La fecha de licencia es obligatorio').isDate(),
    validarCampos,
],
    actualizarLicenciaTalent
);

router.delete('/:id',
    validarJWT,
    borrarTalent
);

module.exports = router;