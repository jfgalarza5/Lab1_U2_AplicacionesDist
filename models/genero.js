const { mongoose } = require('./database');
const { Schema } = mongoose;

const GeneroSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String }
}, { collection: 'genero' });

module.exports = mongoose.model('Genero', GeneroSchema);