const { Schema, model } = require('mongoose');

const TallerSchema = Schema({

    nombreTaller: {
        type: String,
        required: true
    },
    imgPrincipal: [{
        type: String,
        required: true
    }],
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String
    },
    talent: {
        type: Schema.Types.ObjectId,
        ref: 'Talent'
    },
    sitio: {
        type: Schema.Types.ObjectId,
        ref: 'Sitio'
    },
    status: {
        type: Boolean,
        default: true
    }

});

TallerSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model('Taller', TallerSchema);