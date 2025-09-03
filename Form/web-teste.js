let expenses = [];
let editingId = null; // Variável para rastrear o ID do gasto que está sendo editado

async function fetchExpensesAndRender() {
    try {
        const response = await fetch('http://localhost:3000/api/expenses');
        if (!response.ok) {
            throw new Error('Erro ao buscar os gastos.');
        }
        expenses = await response.json();
        renderExpenses();
        updateTotal();
    } catch (error) {
        console.error('Erro ao carregar gastos:', error);
    }
}

function renderExpenses() {
    const expenseListDiv = document.getElementById('expenseList');
    expenseListDiv.innerHTML = '<h2>Meus Gastos</h2>';

    if (expenses.length === 0) {
        const noExpenses = document.createElement('p');
        noExpenses.textContent = 'Nenhum gasto registrado ainda.';
        expenseListDiv.appendChild(noExpenses);
        return;
    }

    expenses.forEach((expense) => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');

        expenseItem.innerHTML = `
            <span>${expense.description}</span>
            <span>R$ ${expense.amount.toFixed(2)}</span>
            <button onclick="removeExpense('${expense._id}')">Remover</button>
            <button onclick="editExpense('${expense._id}', '${expense.description}', ${expense.amount})">Editar</button>
        `;
        expenseListDiv.appendChild(expenseItem);
    });
}

function updateTotal() {
    const totalAmountSpan = document.getElementById('totalAmount');
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountSpan.textContent = total.toFixed(2);
}

//
function saveExpenses() {
    localStorage.setItem('myExpensesApp', JSON.stringify(expenses));
}
//

// Funão para adicionar um novo gasto ou atualizar um existente
async function addOrUpdateExpense() {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Por favor, preencha a descrição e o valor corretamente.');
        return;
    }

    const expenseData = {
        description: description,
        amount: amount,
    };

    try {
        if (editingId) {
            // Se estiver no modo de edição, envia uma requisição PATCH
            await fetch(`http://localhost:3000/api/expenses/${editingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData)
            });
            editingId = null; // Sai do modo de edição
            document.querySelector('button').textContent = 'Adicionar Gasto'; // Reseta o botão
        } else {
            // Se não, envia uma requisição POST
            await fetch('http://localhost:3000/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData)
            });
        }
        
        // Limpa os campos e recarrega a lista
        descriptionInput.value = '';
        amountInput.value = '';
        await fetchExpensesAndRender();

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro. Verifique se o servidor está rodando.');
    }
}

async function removeExpense(id) {
    if (!confirm('Tem certeza que deseja remover este gasto?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao remover o gasto.');
        }

        console.log('Gasto removido com sucesso!');
        await fetchExpensesAndRender();

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao remover o gasto.');
    }
}

function editExpense(id, description, amount) {
    editingId = id;
    document.getElementById('description').value = description;
    document.getElementById('amount').value = amount;
    document.querySelector('button').textContent = 'Salvar Alterações';
}

// Fun��o para alternar o painel lateral
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    sidebar.classList.toggle('minimized');
    mainContent.classList.toggle('minimized');
}

// NOVO: Fun��o para alternar entre as p�ginas
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId + '-page').classList.remove('hidden');
}


// Inicia a aplicação carregando os gastos do backend
fetchExpensesAndRender();
