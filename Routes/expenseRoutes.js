const express = require('express');
const router = express.Router();
const Expense = require('../Models/expenseModel.js'); // Note o caminho para importar o modelo

// Rota para criar um novo gasto (POST)
router.post('/expenses', async (req, res) => {
    try {
        const { description, amount } = req.body;
        const newExpense = new Expense({ description, amount });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para buscar todos os gastos (GET)
router.get('/expenses', async (req, res) => {
    try {
        const query = {};
        console.log('A requisição para /expenses foi recebida!'); 
        // Se a requisição tiver o parâmetro 'search',
        // nós preparamos o filtro para buscar no banco de dados.
        if (req.query.search) {
            query.description = { $regex: new RegExp(req.query.search, 'i') };
        }

        // Se req.query.search for undefined, 'query' será {} e o find()
        // retornará TUDO. Caso contrário, ele retorna apenas o que
        // corresponde à busca.
        const expenses = await Expense.find(query);
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para deletar um gasto (DELETE)
router.delete('/expenses/:id', async (req, res) => {
    try {
        const result = await Expense.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Gasto não encontrado.' });
        }

        res.json({ message: 'Gasto removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para editar um gasto (PATCH)
router.patch('/expenses/:id', async (req, res) => {
    try {
        const { description, amount } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { description, amount },
            { new: true } // Retorna o documento atualizado
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Gasto não encontrado.' });
        }

        res.json(updatedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;