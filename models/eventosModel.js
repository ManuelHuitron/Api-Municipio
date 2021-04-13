const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    nombreEvento: {
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
    horario: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String
    },
    sitio: {
        type: Schema.Types.ObjectId,
        ref: 'Sitio'
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

EventoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model('Evento', EventoSchema);