const { response } = require('express');
const Producto = require('../models/productosModel');
const Talent = require('../models/talentModel');
const Sitio = require('../models/sitioModel');

//get by sitio paginado
const getProductoBySitioPAginado = async (req, res = response) => {
    const sitio = req.params.sitio;
    const desde = Number(req.query.desde) || 0;

    try {
        const [productos, total] = await Promise.all([
            Producto
                .find({ sitio })
                .skip(desde)
                .limit(4),

            Producto.find({ sitio }).countDocuments()
        ]);

        res.json({
            ok: true,

            productos,
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
const getProductoByTalentPaginado = async (req, res = response) => {
    const talent = req.params.talent;
    const desde = Number(req.query.desde) || 0;

    try {
        const [productos, total] = await Promise.all([
            Producto
                .find({ talent })
                .skip(desde)
                .limit(4),
            Producto.find({ talent }).countDocuments()
        ]);
        res.json({
            ok: true,
            productos,
            total

        });

    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios'
        });
    }
}

//Metodo de eliminar un Producto
const getProducto = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;

        const [productos, total] = await Promise.all([
            Producto
                .find({})
                .skip(desde)
                .limit(5),

            Producto.countDocuments()
        ]);



        res.json({
            ok: true,
            productos,
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

const getProductoByID = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const productoBD = await Producto.findById(uid);

        if (!productoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El País no existe'
            });
        }

        res.json({
            ok: true,
            producto: productoBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const getProductoByNombre = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {
        data = await Producto.find({ nombreProducto: regex })
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

//get by sitio
const getProductoBySitio = async (req, res = response) => {
    const sitio = req.params.sitio;

    let data = [];

    try {
        data = await Producto.find({ sitio })
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

//Metodo para crear un Producto
const crearProducto = async (req, res = response) => {
    //lectura del body
    const { nombreProducto, sitio, talent } = req.body;

    try {

        if (sitio === undefined && talent !== undefined) {

            //verificando si existe un Producto registrado
            const existeProducto = await Producto.findOne({ nombreProducto, talent });
            //validacion en caso que el Producto ya este registrado
            if (existeProducto) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El Producto ya está registrado'
                });
            }




        } else if (sitio !== undefined && talent === undefined) {

            //verificando si existe un Producto registrado

            const existeProducto = await Producto.findOne({ nombreProducto, sitio });


            //validacion en caso que el Producto ya este registrado
            if (existeProducto) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El Producto ya está registrado'
                });
            }



        } else {
            return res.status(400).json({
                ok: false,
                msg: 'El Producto no pertenece a un Sitio o un Talent'
            });
        }


        const productoBD = new Producto(req.body);

        // Guardar usuario
        await productoBD.save();

        res.json({
            ok: true,
            producto: productoBD
        });




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

//Metodo de eliminar un Producto
const actualizarProducto = async (req, res = response) => {
    const uid = req.params.id;
    const { sitio, talent } = req.body;

    try {
        //evaluar que exista un producto con ese id
        const productoBD = await Producto.findById(uid);

        if (!productoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Producto por ese id'
            });
        }


        // Actualizaciones
        const { nombreProducto, Sitio, Talent, ...campos } = req.body;

        if (productoBD.nombreProducto !== nombreProducto) {

            if (sitio === undefined && talent !== undefined) {
                const existeProducto = await Producto.findOne({ nombreProducto, Talent });
                if (existeProducto) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un Producto con ese nombre'
                    });
                }
            } else if (sitio !== undefined && talent === undefined) {
                const existeProducto = await Producto.findOne({ nombreProducto, Sitio });
                if (existeProducto) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un Producto con ese nombre'
                    });
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'El producto no pertenece a un Sitio o Talent'
                });
            }

        }

        campos.nombreProducto = nombreProducto;
        const productoActualizado = await Producto.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

//Metodo de eliminar un Producto
const borrarProducto = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const productoBD = await Producto.findById(uid);
        productoBD.status = false;

        if (!productoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Producto por ese id'
            });
        }
        await Producto.findByIdAndUpdate(uid, productoBD, { new: true });

        res.json({
            ok: true,
            msg: 'Producto eliminado'
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
    actualizarProducto,
    borrarProducto,
    crearProducto,
    getProducto,
    getProductoByID,
    getProductoByNombre,
    getProductoBySitio,
    getProductoBySitioPAginado,
    getProductoByTalentPaginado
}