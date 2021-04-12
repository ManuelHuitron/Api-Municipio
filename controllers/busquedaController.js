const { response } = require('express');
const { countDocuments } = require('../models/eventosModel');
const Evento = require('../models/eventosModel');
const Producto = require('../models/productosModel');
const Sitio = require('../models/sitioModel');
const Talent = require('../models/talentModel');
const Taller = require('../models/tallerModel');

const getBusqueda = async(req, res = response) => {

        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i');
        const desde = Number(req.query.desde) || 0;
        try {

            const [eventos, productos, sitios, talents, talleres, totaleventos, totalproductos, totalsitios, totaltalents, totaltalleres] = await Promise.all([
                Evento.find({ nombreEvento: regex }).skip(desde).limit(4),
                Producto.find({ nombreProducto: regex }).skip(desde).limit(4),
                Sitio.find({ nombreSitio: regex }).skip(desde).limit(4),
                Talent.find({ nombreTalent: regex }).skip(desde).limit(4),
                Taller.find({ nombreTaller: regex }).skip(desde).limit(4),

                //Evento.countDocuments()
                Evento.find({ nombreEvento: regex }).countDocuments(),
                Producto.find({ nombreProducto: regex }).countDocuments(),
                Sitio.find({ nombreSitio: regex }).countDocuments(),
                Talent.find({ nombreTalent: regex }).countDocuments(),
                Taller.find({ nombreTaller: regex }).countDocuments()

            ]);



            res.json({
                ok: true,
                eventos,
                productos,
                sitios,
                talents,
                talleres,
                totaleventos,
                totalproductos,
                totalsitios,
                totaltalents,
                totaltalleres
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
    }
    //sitio
const getBusquedaSitios = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const desde = Number(req.query.desde) || 0;
    try {

        const [sitios, totalsitios] = await Promise.all([
            Sitio.find({ nombreSitio: regex }).skip(desde).limit(4),
            Sitio.find({ nombreSitio: regex }).countDocuments()

        ]);



        res.json({
            ok: true,
            sitios,
            totalsitios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const getBusquedaTalents = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const desde = Number(req.query.desde) || 0;
    try {

        const [talents, totaltalents] = await Promise.all([
            Talent.find({ nombreTalent: regex }).skip(desde).limit(4),
            Talent.find({ nombreTalent: regex }).countDocuments()
        ]);



        res.json({
            ok: true,
            talents,
            totaltalents
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const getBusquedaEvento = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const desde = Number(req.query.desde) || 0;
    try {

        const [eventos, totaleventos] = await Promise.all([
            Evento.find({ nombreEvento: regex }).skip(desde).limit(4),
            Evento.find({ nombreEvento: regex }).countDocuments()

        ]);

        res.json({
            ok: true,
            eventos,
            totaleventos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const getBusquedaProducto = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const desde = Number(req.query.desde) || 0;
    try {

        const [productos, totalproductos, ] = await Promise.all([
            Producto.find({ nombreProducto: regex }).skip(desde).limit(4),
            Producto.find({ nombreProducto: regex }).countDocuments(),
        ]);



        res.json({
            ok: true,

            productos,
            totalproductos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const getBusquedaTaller = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const desde = Number(req.query.desde) || 0;
    try {

        const [talleres, totaltalleres] = await Promise.all([
            Taller.find({ nombreTaller: regex }).skip(desde).limit(4),
            Taller.find({ nombreTaller: regex }).countDocuments()

        ]);


        res.json({
            ok: true,
            talleres,
            totaltalleres
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getBusqueda,
    getBusquedaSitios,
    getBusquedaTalents,
    getBusquedaEvento,
    getBusquedaProducto,
    getBusquedaTaller,
}