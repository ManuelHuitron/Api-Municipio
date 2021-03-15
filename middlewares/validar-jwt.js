const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');


const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

const varlidarADMIN_ROLE = async(req, res, next) => {

    const token = req.header('x-token');

    const _uid = req.uid;


    try {
        //Solicitar info al Api-User info de Este usuario

        const urlApiUser = process.env.URL_SERVIDOR_USER;

        const usuarioDB = await fetch(`${urlApiUser}/api/usuarios/usuariobyid/${_uid}`, {
                method: 'GEt',
                headers: { 'Content-Type': 'application/json', 'x-token': token }
            })
            .then(res => res.json()) // expecting a json response
            .then(json => { return json.usuario })
            .catch(err => { console.error(err); return json.ok });




        //const usuarioDB = await Usuario.findOne({ 'uid': _uid, 'status': true });            
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const varlidarADMIN_ROLE_o_MismoUsuario = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {

            next();

        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

//Validar propiedad
const varlidarADMIN_ROLE_o_Propietario = async(req, res, next) => {}

module.exports = {
    validarJWT,
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
}