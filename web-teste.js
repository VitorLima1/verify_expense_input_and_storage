let expenses = []; // Array para armazenar os gastos

function loadExpenses() {
    const storedExpenses = localStorage.getItem('myExpensesApp');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
    }
    renderExpenses();
    updateTotal();
}

function saveExpenses() {
    localStorage.setItem('myExpensesApp', JSON.stringify(expenses));
}

function addExpense() {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Por favor, insira uma descrição válida e um valor positivo.');
        return;
    }

    expenses.push({
        id: Date.now(),
        description: description,
        amount: amount
    });

    descriptionInput.value = '';
    amountInput.value = '';

    saveExpenses();
    renderExpenses();
    updateTotal();
}

function removeExpense(idToRemove) {
    expenses = expenses.filter(expense => expense.id !== idToRemove);

    saveExpenses();
    renderExpenses();
    updateTotal();
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
                        <button onclick="removeExpense(${expense.id})">Remover</button>
                    `;
        expenseListDiv.appendChild(expenseItem);
    });
}

function updateTotal() {
    const totalAmountSpan = document.getElementById('totalAmount');
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountSpan.textContent = total.toFixed(2);
}

// Função para alternar o painel lateral
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    sidebar.classList.toggle('minimized');
    mainContent.classList.toggle('minimized');
}

// NOVO: Função para alternar entre as páginas
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId + '-page').classList.remove('hidden');
}

// NOVO: A página de Análise de Gastos será a padrão ao carregar
window.onload = function () {
    loadExpenses();
};
