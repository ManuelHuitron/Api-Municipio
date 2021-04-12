const { response } = require('express');
const Sitio = require('../models/sitioModel');

//Metodo de eliminar un sitio
const getSitio = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;

        const [sitios, total] = await Promise.all([
            Sitio
                .find({})
                .skip(desde)
                .limit(5),

            Sitio.countDocuments()
        ]);



        res.json({
            ok: true,
            sitios,
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
const getSitioByID = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const sitioBD = await Sitio.findById(uid);

        if (!sitioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El País no existe'
            });
        }
        //console.log(sitioBD.servicios);
        res.json({
            ok: true,
            sitio: sitioBD,
            servicios: sitioBD.servicios,
            horarioOpen: sitioBD.horarioOpen,
            horarioClose: sitioBD.horarioClose
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const getSitioByNombre = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {
        data = await Sitio.find({ nombreSitio: regex })
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

const getSitioByUser = async (req, res = response) => {

    const usuario = req.params.usuario;

    //const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {
        data = await Sitio.find({ usuario })
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

//Metodo para crear un Sitio
const crearSitio = async (req, res = response) => {
    //lectura del body
    const { nombreSitio } = req.body;

    try {
        //verificando si existe un Sitio registrado
        const existeSitio = await Sitio.findOne({ nombreSitio });
        //validacion en caso que el Sitio ya este registrado
        if (existeSitio) {
            return res.status(400).json({
                ok: false,
                msg: 'El Sitio ya está registrado'
            });
        }

        const sitioBD = new Sitio(req.body);

        // Guardar usuario
        await sitioBD.save();

        res.json({
            ok: true,
            sitio: sitioBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}
//Metodo de eliminar un sitio
const actualizarSitio = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const sitioBD = await Sitio.findById(uid);

        if (!sitioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Sitio por ese id'
            });
        }

        // Actualizaciones
        const { nombreSitio, ...campos } = req.body;

        if (sitioBD.nombreSitio !== nombreSitio) {

            const existeSitio = await Sitio.findOne({ nombreSitio });
            if (existeSitio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un Sitio con ese nombre'
                });
            }
        }

        campos.nombreSitio = nombreSitio;
        const sitioActualizado = await Sitio.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            sitio: sitioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

/**
 * METODO PARA ACTIVAR LA LICENCIA
 * @param {*} req 
 * @param {*} res 
 */
const actualizarLicenciaSitio = async (req, res = response) => {
    const uid = req.params.id;
    console.log(req.body);

    try {

        const sitioBD = await Sitio.findById(uid);

        if (!sitioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Sitio por ese id'
            });
        }

        // Actualizaciones
        const { nombreSitio, ...campos } = req.body;

        if (sitioBD.nombreSitio !== nombreSitio) {

            const existeSitio = await Sitio.findOne({ nombreSitio });
            if (existeSitio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un Sitio con ese nombre'
                });
            }
        }

        campos.nombreSitio = nombreSitio;
        const sitioActualizado = await Sitio.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            sitio: sitioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


//Metodo de eliminar un sitio
const borrarSitio = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const sitioBD = await Sitio.findById(uid);
        sitioBD.status = false;

        if (!sitioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Sitio por ese id'
            });
        }
        await Sitio.findByIdAndUpdate(uid, sitioBD, { new: true });

        res.json({
            ok: true,
            msg: 'Sitio eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}


//para la app
//GEt Sitio by categoria
const getSitioByCategoria = async (req, res = response) => {

    const categoria = req.params.categoria;
    const desde = Number(req.query.desde) || 0;

    const fecha = new Date();

    let data = [];
    let dtoValidos = [];
    let total = 0;
    let vuelta = 0;

    try {
        this.total = await Sitio.find({ categoria }).countDocuments();
        this.data = await Sitio
            .find({ categoria })
            .skip(desde)
            .limit(5)
        //Crear un metodo para que valide que la fecha de lla licencia es valida
        /*
                                for (let i = 0; i < data.length; i++) {
                            const element = data[i];
                            //Validamos que sea de fecha menor
                            if (element.licencia >= fecha) {
                                dtoValidos.push(element);
                            }
                        }
*             */
        res.json({
            ok: true,
            sitios: this.data,
            total: this.total
        });
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'La categoria tiene que ser de un sitios'
        });
    }
}

module.exports = {
    actualizarSitio,
    actualizarLicenciaSitio,
    borrarSitio,
    crearSitio,
    getSitio,
    getSitioByID,
    getSitioByNombre,
    getSitioByUser,
    getSitioByCategoria
}