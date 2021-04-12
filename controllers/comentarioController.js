const { response } = require('express');
const Comentario = require('../models/comentarioModel');

//Metodo listar comentarios a futuro ver como listarlo
const getComentario = async(req, res = response) => {
        try {
            const desde = Number(req.query.desde) || 0;

            const [comentarios, total] = await Promise.all([
                Comentario
                .find({})
                .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')
                .populate('talent', 'nombreTalent _id nombreContacto1 telContacto1 correoContacto1')
                .skip(desde)
                .limit(5),

                Comentario.countDocuments()
            ]);



            res.json({
                ok: true,
                comentarios,
                total
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
    }
    //Get by sitio paginado
const getComentarioBySitioPaginado = async(req, res = response) => {
    const sitio = req.params.sitio;
    const desde = Number(req.query.desde) || 0;

    try {
        data = await Comentario.find({ sitio })
        const [comentarios, total] = await Promise.all([
            Comentario
            .find({ sitio })
            .skip(desde)
            .limit(4),
            //Agregar el populate de sitio

            Comentario.find({ sitio }).countDocuments()
        ]);

        res.json({
            ok: true,
            comentarios,
            total
        });
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios'
        });
    }
}

//Get by Talent paginado
const getComentarioByTalentPaginado = async(req, res = response) => {
    const talent = req.params.talent;
    const desde = Number(req.query.desde) || 0;
    try {
        const [comentarios, total] = await Promise.all([
            Comentario
            .find({ talent })
            .skip(desde)
            .limit(4),
            //Agregar el populate de Talent
            Comentario.find({ talent }).countDocuments()
        ]);
        res.json({
            ok: true,
            comentarios,
            total
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios'
        });
    }
}

//Metodo para crear un Comentario
const crearComentario = async(req, res = response) => {
        //lectura del body
        const { comentario, sitio, talent } = req.body;

        try {
            if (sitio === undefined && talent !== undefined) {
                //verificando si existe un Comentario registrado
                const existeComentario = await Comentario.findOne({ comentario, talent });
                //validacion en caso que el Comentario ya este registrado
                if (existeComentario) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El Comentario ya está registrado'
                    });
                }
            } else if (sitio !== undefined && talent === undefined) {
                //verificando si existe un Comentario registrado
                const existeComentario = await Comentario.findOne({ comentario, sitio });
                //validacion en caso que el Comentario ya este registrado
                if (existeComentario) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El Comentario ya está registrado'
                    });
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'El Comentario no pertenece a un Sitio o un Talent'
                });
            }

            const comentarioBD = new Comentario(req.body);
            // Guardar usuario
            await comentarioBD.save();

            res.json({
                ok: true,
                comentario: comentarioBD
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });
        }
    }
    //Metodo de eliminar un Comentario
const actualizarComentario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const comentarioBD = await Comentario.findById(uid);
        if (!comentarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Comentario por ese id'
            });
        }
        // Actualizaciones
        const { comentario, sitio, talent, ...campos } = req.body;
        if (comentarioBD.comentario !== comentario) {
            if (sitio === undefined && talent !== undefined) {
                const existeComentario = await Comentario.findOne({ comentario, talent });
                if (existeComentario) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un Comentario con ese nombre'
                    });
                }
            } else if (sitio !== undefined && talent === undefined) {
                const existeComentario = await Comentario.findOne({ comentario, sitio });
                if (existeComentario) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un Comentario con ese nombre'
                    });
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'El comentario no pertenece a un Sitio o Talent'
                });
            }
        }
        campos.comentario = comentario;
        const comentarioActualizado = await Comentario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            comentario: comentarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


//Metodo de eliminar un Comentario
const borrarComentario = async(req, res = response) => {
    const uid = req.params.id;

    try {

        const comentarioBD = await Comentario.findById(uid);
        comentarioBD.status = false;

        if (!comentarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Comentario por ese id'
            });
        }
        await Comentario.findByIdAndUpdate(uid, comentarioBD, { new: true });

        res.json({
            ok: true,
            msg: 'Comentario eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    actualizarComentario,
    borrarComentario,
    crearComentario,
    getComentario,
    getComentarioBySitioPaginado,
    getComentarioByTalentPaginado
}