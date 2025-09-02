// Importa as bibliotecas que você instalou
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
// Cria uma instância do Express
const app = express();
const PORT = 3000;

// Configura o Express para usar JSON
app.use(express.json());
app.use(cors()); // Habilita o CORS para todas as rotas

// ----------------------------------------
// Conexão com o Banco de Dados MongoDB
// ----------------------------------------
mongoose.connect('mongodb://localhost:27017/expense_storage')
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.error('Erro de conexão com o MongoDB:', err));

// Importa o modelo de dados de outro arquivo
const Expense = require('./Models/expenseModel.js');
const expenseRoutes = require('./Routes/expenseRoutes.js');
// ----------------------------------------
// Inicia o Servidor
// ----------------------------------------
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// ----------------------------------------
// Rotas da sua API
// ----------------------------------------
app.use('/api', expenseRoutes); // O prefixo '/api' foi adicionado aqui para acessar as rotas 

app.get('/', (req, res) => {
    res.send('Servidor está rodando!');
});