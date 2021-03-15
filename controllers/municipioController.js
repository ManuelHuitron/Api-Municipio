const { response } = require('express');
const Municipio = require('../models/municipioModel');

//Metodo de eliminar un municpio
const getMunicipio = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;

        const [municipios, total] = await Promise.all([
            Municipio
                .find({})
                .skip(desde)
                .limit(5),

            Municipio.countDocuments()
        ]);



        res.json({
            ok: true,
            municipios,
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
const getMunicipioByID = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const municipioBD = await Municipio.findById(uid);

        if (!municipioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El País no existe'
            });
        }

        res.json({
            ok: true,
            municpio: municipioBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const getMunicipioByNombre = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {
        data = await Municipio.find({ nombreMunicipio: regex })
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
//listar todos los municipios
const getMunicipiosT = async (req, res = response) => {
    const municipios = await
        Municipio
            .find({}, 'nombreMunicipio _id')


    res.json({
        ok: true,
        municipios
    });

}

//Metodo para crear un Municipio
const crearMunicipio = async (req, res = response) => {
    //lectura del body
    const { nombreMunicipio } = req.body;

    try {
        //verificando si existe un Municipio registrado
        const existeMunicipio = await Municipio.findOne({ nombreMunicipio });
        //validacion en caso que el Municipio ya este registrado
        if (existeMunicipio) {
            return res.status(400).json({
                ok: false,
                msg: 'El Municipio ya está registrado'
            });
        }

        const municipioBD = new Municipio(req.body);

        // Guardar usuario
        await municipioBD.save();

        res.json({
            ok: true,
            municipio: municipioBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}
//Metodo de eliminar un municpio
const actualizarMunicipio = async (req, res = response) => {
    const uid = req.params.id;
    console.log(req.body);
    try {

        const municipioBd = await Municipio.findById(uid);

        if (!municipioBd) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Municipio por ese id'
            });
        }

        // Actualizaciones    ??? Y SI SOLO QUIERO ACTUALIZAR OTRO CAMPO?.
        const { nombreMunicipio, estado, ...campos } = req.body;

        if (municipioBd.nombreMunicipio !== nombreMunicipio) {

            const existeMunicipio = await Municipio.findOne({ nombreMunicipio, estado });
            if (existeMunicipio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un Municipio con ese nombre'
                });
            }
        }

        campos.nombreMunicipio = nombreMunicipio;
        campos.estado = estado;
        console.log(campos);
        const municipioActualizado = await Municipio.findByIdAndUpdate(uid, campos, { new: true });
        console.log(municipioActualizado);

        res.json({
            ok: true,
            municipio: municipioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

//Metodo de eliminar un municpio
const borrarMunicipio = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const municipioBD = await Municipio.findById(uid);
        municipioBD.status = false;

        if (!municipioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Municipio por ese id'
            });
        }
        await Municipio.findByIdAndUpdate(uid, municipioBD, { new: true });

        res.json({
            ok: true,
            msg: 'Municipio eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getMunicipioByEstado = async (req, res = response) => {

    const estado = req.params.id;
    const municipios = await
        Municipio
            .find({ estado })


    res.json({
        ok: true,
        municipios
    });

}


module.exports = {
    actualizarMunicipio,
    borrarMunicipio,
    crearMunicipio,
    getMunicipio,
    getMunicipioByEstado,
    getMunicipioByID,
    getMunicipioByNombre,
    getMunicipiosT
}