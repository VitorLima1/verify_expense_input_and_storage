// Aguarda o HTML ser completamente carregado antes de executar o código JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // Funções para alternar entre as páginas
    function showPage(pageId) {
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        document.getElementById(pageId + '-page').classList.remove('hidden');

        if (pageId === 'reports') {
            fetchExpensesAndRender();
        }
    }

    // Funções para o Banco de Dados (MongoDB)
    async function fetchExpensesAndRender(searchTerm = '') {
        try {
            let url = 'http://localhost:3000/api/expenses';
            if (searchTerm) {
                url += `?search=${encodeURIComponent(searchTerm)}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao carregar os gastos');
            }
            const expensesFromDB = await response.json();
            
            console.log('Dados recebidos do servidor:', expensesFromDB);

            renderExpenses(expensesFromDB);
        } catch (error) {
            console.error('Erro ao carregar gastos:', error);
        }
    }

    // Função de renderização ÚNICA e CORRIGIDA
    function renderExpenses(expensesToRender) {
        const reportContent = document.getElementById('report-content');
        reportContent.innerHTML = '';

        if (!expensesToRender || expensesToRender.length === 0) {
            reportContent.innerHTML = '<p>Nenhum gasto encontrado.</p>';
            return;
        }

        expensesToRender.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');

            const description = document.createElement('p');
            description.textContent = `Descrição: ${expense.description}`;

            const value = document.createElement('p');
            let formattedValue;
            
            if (typeof expense.value === 'number') {
                formattedValue = expense.value.toFixed(2);
            } else if (typeof expense.amount === 'number') {
                formattedValue = expense.amount.toFixed(2);
            } else {
                formattedValue = '0.00';
            }

            value.textContent = `Valor: R$ ${formattedValue}`;

            expenseItem.appendChild(description);
            expenseItem.appendChild(value);
            reportContent.appendChild(expenseItem);
        });
    }

    // Evento de clique do botão de busca
    document.getElementById('searchButton').addEventListener('click', () => {
        const searchTerm = document.getElementById('searchInput').value;
        fetchExpensesAndRender(searchTerm);
    });

    // Chamada inicial para carregar a página de relatórios
    showPage('reports');

    // ... dentro de document.addEventListener('DOMContentLoaded', () => {


});

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        sidebar.classList.toggle('minimized');
        mainContent.classList.toggle('minimized');
    }
