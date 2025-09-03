

    // A função principal que gerencia o botão de alternar o tema
    // A função principal que gerencia o botão de alternar o tema
function initializeThemeToggle() {
    const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
    const body = document.body;

    // Se o checkbox não existir, pare a função
    if (!themeToggleCheckbox) {
        console.error("Elementos de configuração de tema não encontrados.");
        return;
    }

    // 2. Adiciona o evento de 'change' ao checkbox para salvar imediatamente
    themeToggleCheckbox.addEventListener('change', () => {
        if (themeToggleCheckbox.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // 3. Adiciona o evento de 'click' ao botão Salvar para GRAVAR a preferência
    saveSettingsBtn.addEventListener('click', () => {
        if (themeToggleCheckbox.checked) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// A função toggleSidebar, se ainda estiver em um arquivo separado ou no topo
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    sidebar.classList.toggle('minimized');
    mainContent.classList.toggle('minimized');
}