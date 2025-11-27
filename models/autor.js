const { mongoose } = require('./database');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    nombre: { type: String, required: true },
    nacionalidad: { type: String }
}, { collection: 'autor' });

module.exports = mongoose.model('Autor', AutorSchema);