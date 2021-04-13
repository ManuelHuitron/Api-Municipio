const { Schema, model } = require('mongoose');

const MunicipioSchema = Schema({

    nombreMunicipio: {
        type: String,
        required: true
    },
    imgPrincipal: [{
        type: String,
        required: true
    }],
    historia: {
        type: String,
    },
    imgHistoria: [{
        type: String
    }],
    videoHistoria: {
        type: String
    },
    tradiciones: {
        type: String
    },
    imgTradiciones: [{
        type: String
    }],
    videoTradiciones: {
        type: String
    },
    cultura: {
        type: String,
    },
    imgCultura: [{
        type: String
    }],
    videoCultura: {
        type: String
    },
    clima: {
        type: String,
    },
    ubicacion: {
        type: String
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'Estado',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }

});

MunicipioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model('Municipio', MunicipioSchema);