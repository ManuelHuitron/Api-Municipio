const { Schema, model } = require('mongoose');

const TalentSchema = Schema({

    nombreTalent: {
        type: String,
        required: true
    },
    imgPrincipal: [{
        type: String,
        required: true
    }],
    statuslicencia:{
        type: Boolean,
        default: true
    },
    descripcion: {
        type: String
    },
    video: {
        type: String
    },
    nombreContacto1: {
        type: String
    },
    telContacto1: {
        type: String
    },
    correoContacto1: {
        type: String
    },
    nombreContacto2: {
        type: String
    },
    telContacto2: {
        type: String
    },
    correoContacto2: {
        type: String
    },
    ubicacion: {
        type: String
    },
    licencia: {
        type: Date,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    municipio: {
        type: Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }

});

TalentSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Talent', TalentSchema);