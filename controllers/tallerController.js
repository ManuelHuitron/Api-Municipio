const { response } = require('express');
const Taller = require('../models/tallerModel');

//Metodo de eliminar un Taller
const getTaller = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;

        const [talleres, total] = await Promise.all([
            Taller
                .find({})
                .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')
                .populate('talent', 'nombreTalent _id nombreContacto1 telContacto1 correoContacto1')
                .skip(desde)
                .limit(5),

            Taller.countDocuments()
        ]);



        res.json({
            ok: true,
            talleres,
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

//getby talent paginado
const getTallerByTalentPaginado = async (req, res = response) => {
    const talent = req.params.talent;
    const desde = Number(req.query.desde) || 0;

    try {
        const [talleres, total] = await Promise.all([
            Taller
                .find({ talent })
                .populate('talent', 'nombreTalent _id nombreContacto1 telContacto1 correoContacto1')
                .skip(desde)
                .limit(4),


            Taller.find({ talent }).countDocuments()

        ]);

        res.json({
            ok: true,
            talleres,
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


//getby sitio paginado
const getTallerBySitioPaginado = async (req, res = response) => {
    const sitio = req.params.sitio;
    const desde = Number(req.query.desde) || 0;

    try {
        const [talleres, total] = await Promise.all([
            Taller
                .find({ sitio })
                .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')
                .skip(desde)
                .limit(4),

            Taller.find({ sitio }).countDocuments()
        ]);

        res.json({
            ok: true,

            talleres,
            total
        });
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios'
        });
    }

}

const getTallerByID = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const tallerBD = await Taller.findById(uid)
            .populate('sitio', 'nombreSitio _id nombreContacto1 telContacto1 correoContacto1')
            .populate('talent', 'nombreTalent _id nombreContacto1 telContacto1 correoContacto1')

        if (!tallerBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El País no existe'
            });
        }

        res.json({
            ok: true,
            taller: tallerBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const getTallerByNombre = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {
        data = await Taller.find({ nombreTaller: regex })
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
//getby sitio
const getTallerBySitio = async (req, res = response) => {
    const sitio = req.params.sitio;

    let data = [];

    try {
        data = await Taller.find({ sitio })
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

//Metodo para crear un Taller
const crearTaller = async (req, res = response) => {
    //lectura del body
    const { nombreTaller, sitio, talent } = req.body;


    try {

        if (sitio === undefined && talent !== undefined) {


            //verificando si existe un Evento registrado

            const existeTaller = await Taller.findOne({ nombreTaller, talent });
            //validacion en caso que el Taller ya este registrado
            if (existeTaller) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El Taller ya está registrado'
                });
            }





        } else if (sitio !== undefined && talent === undefined) {



            //verificando si existe un Evento registrado                
            const existeTaller = await Taller.findOne({ nombreTaller, sitio });
            //validacion en caso que el Taller ya este registrado
            if (existeTaller) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El Taller ya está registrado'
                });
            }


        } else {
            return res.status(400).json({
                ok: false,
                msg: 'El Evento no pertenece a un Sitio o un Talent'
            });
        }

        const tallerBD = new Taller(req.body);

        // Guardar usuario
        await tallerBD.save();

        res.json({
            ok: true,
            taller: tallerBD
        });




        //verificando si existe un Taller registrado

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

//Metodo de eliminar un Taller
const actualizarTaller = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const tallerBD = await Taller.findById(uid);

        if (!tallerBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Taller por ese id'
            });
        }

        // Actualizaciones
        const { nombreTaller, Sitio, Talent, ...campos } = req.body;

        if (tallerBD.nombreTaller !== nombreTaller) {


            if (sitio === undefined && talent !== undefined) {
                const existeTaller = await Taller.findOne({ nombreTaller, Talent });
                if (existeTaller) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un Taller con ese nombre'
                    });
                }
            } else if (sitio !== undefined && talent === undefined) {
                const existeTaller = await Taller.findOne({ nombreTaller, Sitio });
                if (existeTaller) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un Taller con ese nombre'
                    });
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'El producto no pertenece a un Sitio o Talent'
                });
            }


        }

        campos.nombreTaller = nombreTaller;
        const tallerActualizado = await Taller.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            taller: tallerActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

//Metodo de eliminar un Taller
const borrarTaller = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const tallerBD = await Taller.findById(uid);
        tallerBD.status = false;

        if (!tallerBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Taller por ese id'
            });
        }
        await Taller.findByIdAndUpdate(uid, tallerBD, { new: true });

        res.json({
            ok: true,
            msg: 'Taller eliminado'
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
    actualizarTaller,
    borrarTaller,
    crearTaller,
    getTaller,
    getTallerByID,
    getTallerByNombre,
    getTallerBySitio,
    getTallerBySitioPaginado,
    getTallerByTalentPaginado
}