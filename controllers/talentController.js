const { response } = require('express');
const Talent = require('../models/talentModel');

//Metodo de eliminar un Talent
const getTalent = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;

        const [talents, total] = await Promise.all([
            Talent
                .find({})
                .skip(desde)
                .limit(5),

            Talent.countDocuments()
        ]);



        res.json({
            ok: true,
            talents,
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
const getTalentByID = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const talentBD = await Talent.findById(uid)

        if (!talentBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El País no existe'
            });
        }

        res.json({
            ok: true,
            talent: talentBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const getTalentByNombre = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {
        data = await Talent.find({ nombreTalent: regex })

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

//Metodo para crear un Talent
const crearTalent = async (req, res = response) => {
    //lectura del body
    const { nombreTalent } = req.body;

    try {
        //verificando si existe un Talent registrado
        const existeTalent = await Talent.findOne({ nombreTalent });
        //validacion en caso que el Talent ya este registrado
        if (existeTalent) {
            return res.status(400).json({
                ok: false,
                msg: 'El Talent ya está registrado'
            });
        }

        const talentBD = new Talent(req.body);

        // Guardar usuario
        await talentBD.save();

        res.json({
            ok: true,
            talent: talentBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}
//Metodo de eliminar un Talent
const actualizarTalent = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const talentBD = await Talent.findById(uid);

        if (!talentBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Talent por ese id'
            });
        }

        // Actualizaciones
        const { nombreTalent, ...campos } = req.body;

        if (talentBD.nombreTalent !== nombreTalent) {

            const existeTalent = await Talent.findOne({ nombreTalent });
            if (existeTalent) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un Talent con ese nombre'
                });
            }
        }

        campos.nombreTalent = nombreTalent;
        const talentActualizado = await Talent.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            talent: talentActualizado
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
const actualizarLicenciaTalent = async (req, res = response) => {
    const uid = req.params.id;
    console.log(req.body);

    try {

        const talentBD = await Talent.findById(uid);

        if (!talentBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Talent por ese id'
            });
        }

        // Actualizaciones
        const { nombreTalent, ...campos } = req.body;

        if (talentBD.nombreTalent !== nombreTalent) {

            const existeTalent = await Talent.findOne({ nombreTalent });
            if (existeTalent) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un Talent con ese nombre'
                });
            }
        }

        campos.nombreTalent = nombreTalent;
        const talentActualizado = await Talent.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            talent: talentActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


//Metodo de eliminar un Talent
const borrarTalent = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const talentBD = await Talent.findById(uid);
        talentBD.status = false;

        if (!talentBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Talent por ese id'
            });
        }
        await Talent.findByIdAndUpdate(uid, talentBD, { new: true });

        res.json({
            ok: true,
            msg: 'Talent eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

//GEt Sitio by categoria
const getTalentByCategoria = async (req, res = response) => {

    const categoria = req.params.categoria;
    const desde = Number(req.query.desde) || 0;

    //const regex = new RegExp(busqueda, 'i');

    let data = [];
    let total = 0;

    try {
        this.data = await Talent
            .find({ categoria })
            .skip(desde)
            .limit(5);
        this.total = await Talent.find({ categoria }).countDocuments()

        //Metodo para validar la 
        //Metodo para validar la licencia
        res.json({
            ok: true,
            talents: this.data,
            total: this.total
        })
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'La categoria tiene que ser sitios'
        });
    }

}

module.exports = {
    actualizarTalent,
    actualizarLicenciaTalent,
    borrarTalent,
    crearTalent,
    getTalent,
    getTalentByID,
    getTalentByNombre,
    getTalentByCategoria
}