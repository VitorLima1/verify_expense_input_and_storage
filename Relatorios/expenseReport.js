// Função para alternar entre as páginas
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId + '-page').classList.remove('hidden');

    if (pageId === 'reports') {
        generateReport();
    }
}

window.onload = function () {
    showPage('expenses');
    loadExpenses();
};

// Função para gerar o relatório dos últimos 30 dias
function generateReport() {
    const reportContent = document.getElementById('report-content');
    reportContent.innerHTML = '';

    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const storedExpenses = localStorage.getItem('myExpensesApp');
    const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

    const recentExpenses = expenses.filter(expense => {
        if (!expense.id) {
            return false;
        }
        const expenseDate = new Date(expense.id);
        return expenseDate >= thirtyDaysAgo;
    });

    const expensesByDate = new Map();
    recentExpenses.forEach(expense => {
        const date = new Date(expense.id).toLocaleDateString('pt-BR');
        if (!expensesByDate.has(date)) {
            expensesByDate.set(date, []);
        }
        expensesByDate.get(date).push(expense);
    });

    if (expensesByDate.size === 0) {
        reportContent.innerHTML = '<p>Nenhum gasto registrado nos últimos 30 dias.</p>';
        return;
    }

    expensesByDate.forEach((dailyExpenses, date) => {
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('report-day');

        const totalDay = dailyExpenses.reduce((sum, item) => sum + item.amount, 0);

        const dayTitle = document.createElement('h3');
        dayTitle.textContent = `Gastos em ${date}`;

        const listContainer = document.createElement('div');
        dailyExpenses.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('report-day-item');
            itemElement.innerHTML = `
                <span>${item.description}</span>
                <span>R$ ${item.amount.toFixed(2)}</span>
            `;
            listContainer.appendChild(itemElement);
        });

        const totalElement = document.createElement('div');
        totalElement.classList.add('report-day-total');
        totalElement.textContent = `Total do dia: R$ ${totalDay.toFixed(2)}`;

        dayContainer.appendChild(dayTitle);
        dayContainer.appendChild(listContainer);
        dayContainer.appendChild(totalElement);
        reportContent.appendChild(dayContainer);
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    sidebar.classList.toggle('minimized');
    mainContent.classList.toggle('minimized');
}

let expenses = [];

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