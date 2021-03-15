const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombreProducto: {
        type: String,
        required: true
    },
    imgPrincipal: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precioActual: {
        type: String,
        required: true
    },
    precioAnterior: {
        type: String
    },
    sitio: {
        type: Schema.Types.ObjectId,
        ref: 'Sitio',
    },
    talent: {
        type: Schema.Types.ObjectId,
        ref: 'Talent'
    },
    status: {
        type: Boolean,
        default: true
    }

});

ProductoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model('Producto', ProductoSchema);