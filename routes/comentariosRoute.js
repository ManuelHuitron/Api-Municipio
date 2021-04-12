/*
Ruta:   api/comentario
*/
const { Router } = require('express');
//validator
const { check } = require('express-validator');
//importamos el middleware de validacion de campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, varlidarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');
const { actualizarComentario, borrarComentario, crearComentario, getComentario, getComentarioBySitioPaginado, getComentarioByTalentPaginado } = require('../controllers/comentarioController');
const router = Router();

//listar cualquier comentarios paginada
router.get('/', validarJWT, getComentario);
//listar cualquier comentarios paginada de Sitip
router.get('/paginado/sitio/:sitio', validarJWT, getComentarioBySitioPaginado);
//listar cualquier comentarios paginada de talent
router.get('/paginado/talent/:talent', validarJWT, getComentarioByTalentPaginado);

//crear comentario
router.post('/', [
        validarJWT,
        check('comentario', 'El comentario es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatorio').not().isEmpty(),
        check('usuario', 'El usuario es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    crearComentario
);
//actualizar comentarios
router.put('/:id', [
        validarJWT,
        check('comentario', 'El comentario es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatorio').not().isEmpty(),
        check('usuario', 'El usuario es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    actualizarComentario
);
//Eliminar comentario
router.delete('/:id',
    validarJWT, borrarComentario
);


module.exports = router;