const { response } = require('express');
const Evento = require('../models/eventosModel');

//Metodo de eliminar un Evento
const getEvento = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;

        const [eventos, total] = await Promise.all([
            Evento
                .find({})
                .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')
                .populate('talent', 'nombreTalent _id nombreContacto1 telContacto1 correoContacto1')
                .skip(desde)
                .limit(5),

            Evento.countDocuments()
        ]);



        res.json({
            ok: true,
            eventos,
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

const getEventoByID = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const eventoBD = await Evento.findById(uid)
            .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')
            .populate('talent', 'nombreTalent _id nombreContacto1 telContacto1 correoContacto1')
        if (!eventoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El País no existe'
            });
        }

        res.json({
            ok: true,
            evento: eventoBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



const getEventoByNombre = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {
        data = await Evento.find({ nombreEvento: regex })
            .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')
            .populate('talent', 'nombreTalent _id nombreContacto1 telContacto1 correoContacto1')
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios'
        });
    }


    res.json({
        ok: true,
        resultados: data
    })
}


//Get by sitio
const getEventoBySitio = async (req, res = response) => {
    const sitio = req.params.sitio;
    let data = [];

    try {
        data = await Evento.find({ sitio })
            .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios'
        });
    }


    res.json({
        ok: true,
        resultados: data
    })
}




//Get by sitio paginado
const getEventoBySitioPaginado = async (req, res = response) => {
    const sitio = req.params.sitio;
    const desde = Number(req.query.desde) || 0;


    try {
        data = await Evento.find({ sitio })

        const [eventos, total] = await Promise.all([
            Evento
                .find({ sitio })
                .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')
                .skip(desde)
                .limit(4),

            Evento.find({ sitio }).countDocuments()
        ]);

        res.json({
            ok: true,
            eventos,
            total
        });
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser evento'
        });
    }
}

//Get by Talent paginado
const getEventoByTalentPaginado = async (req, res = response) => {
    const talent = req.params.talent;
    const desde = Number(req.query.desde) || 0;

    try {
        const [eventos, total] = await Promise.all([
            Evento
                .find({ talent })
                .populate('talent', 'nombreTalent _id nombreContacto1 telContacto1 correoContacto1')
                .skip(desde)
                .limit(4),

            Evento.find({ talent }).countDocuments()

        ]);

        res.json({
            ok: true,
            eventos,
            total
        });
        res.json({
            ok: true,
            eventos,
            total
        });
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser evento'
        });
    }
}

//Metodo para crear un Evento
const crearEvento = async (req, res = response) => {
    //lectura del body
    const { nombreEvento, sitio, talent } = req.body;

    try {

        if (sitio === undefined && talent !== undefined) {


            //verificando si existe un Evento registrado
            const existeEvento = await Evento.findOne({ nombreEvento, talent });
            //validacion en caso que el Evento ya este registrado
            if (existeEvento) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El Evento ya está registrado'
                });
            }




        } else if (sitio !== undefined && talent === undefined) {



            //verificando si existe un Evento registrado
            const existeEvento = await Evento.findOne({ nombreEvento, sitio });
            //validacion en caso que el Evento ya este registrado
            if (existeEvento) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El Evento ya está registrado'
                });
            }




        } else {
            return res.status(400).json({
                ok: false,
                msg: 'El Evento no pertenece a un Sitio o un Talent'
            });
        }



        const eventoBD = new Evento(req.body);

        // Guardar usuario
        await eventoBD.save();

        res.json({
            ok: true,
            evento: eventoBD
        });




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}
//Metodo de eliminar un Evento
const actualizarEvento = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const eventoBD = await Evento.findById(uid);

        if (!eventoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Evento por ese id'
            });
        }

        // Actualizaciones
        const { nombreEvento, Sitio, Talent, ...campos } = req.body;

        if (eventoBD.nombreEvento !== nombreEvento) {

            if (sitio === undefined && talent !== undefined) {
                const existeEvento = await Evento.findOne({ nombreEvento, Talent });
                if (existeEvento) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un Evento con ese nombre'
                    });
                }
            } else if (sitio !== undefined && talent === undefined) {
                const existeEvento = await Evento.findOne({ nombreEvento, Sitio });
                if (existeEvento) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un Evento con ese nombre'
                    });
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'El producto no pertenece a un Sitio o Talent'
                });
            }



        }

        campos.nombreEvento = nombreEvento;
        const eventoActualizado = await Evento.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

//Metodo de eliminar un Evento
const borrarEvento = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const eventoBD = await Evento.findById(uid);
        eventoBD.status = false;

        if (!eventoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Evento por ese id'
            });
        }
        await Evento.findByIdAndUpdate(uid, eventoBD, { new: true });

        res.json({
            ok: true,
            msg: 'Evento eliminado'
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
    actualizarEvento,
    borrarEvento,
    crearEvento,
    getEvento,
    getEventoByID,
    getEventoByNombre,
    getEventoBySitio,
    getEventoBySitioPaginado,
    getEventoByTalentPaginado,
}