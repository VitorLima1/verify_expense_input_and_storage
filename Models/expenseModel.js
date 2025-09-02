// ----------------------------------------
// Modelo de Dados (Schema)
// ----------------------------------------
const mongoose = require('mongoose');

// Define o Schema do Gasto
const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Cria e exporta o Modelo
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense; // Exporta o modelo para ser usado em outros arquivos