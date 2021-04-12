const { Schema, model } = require('mongoose');

const ComentarioSchema = Schema({

    comentario: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
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

ComentarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model('Comentario', ComentarioSchema);