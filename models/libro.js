const { mongoose } = require('./database');
const { Schema } = mongoose;

const LibroSchema = new Schema({
    titulo: { type: String, required: true },
    editorial: { type: String },
    id_autor: { type: Schema.Types.ObjectId, ref: 'Autor', required: true },
    id_genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true }
}, { collection: 'libro' });

module.exports = mongoose.model('Libro', LibroSchema);