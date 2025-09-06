document.addEventListener('DOMContentLoaded', () => {
    // Verifica se a página de configurações está presente no HTML antes de inicializar a lógica
    const settingsPage = document.getElementById('settings-page');
    if (settingsPage) {
        initializeThemeToggle();
    }
    
    // Funções para alternar entre as páginas
    function showPage(pageId) {
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        const pageToShow = document.getElementById(pageId + '-page');
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
        }
    }

    // A função principal que gerencia o botão de alternar o tema
    function initializeThemeToggle() {
        const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        const body = document.body;
    
        if (!themeToggleCheckbox || !saveSettingsBtn) {
            console.error("Elementos de configuração de tema não encontrados.");
            return;
        }
    
        // 1. Carrega o tema salvo do localStorage ao carregar a página
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleCheckbox.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeToggleCheckbox.checked = false;
        }
    
        // 2. Adiciona o evento de 'change' ao checkbox para APLICAR IMEDIATAMENTE o tema
        themeToggleCheckbox.addEventListener('change', () => {
            if (themeToggleCheckbox.checked) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        });
    
        // 3. Adiciona o evento de 'click' ao botão Salvar para GRAVAR a preferência
        saveSettingsBtn.addEventListener('click', () => {
            if (themeToggleCheckbox.checked) {
                localStorage.setItem('theme', 'dark');
                alert('Configurações salvas! Modo noturno ativado.');
            } else {
                localStorage.setItem('theme', 'light');
                alert('Configurações salvas! Modo claro ativado.');
            }
        });
    }
});

// A função toggleSidebar, que pode ser usada em qualquer lugar do HTML
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    sidebar.classList.toggle('minimized');
    mainContent.classList.toggle('minimized');
}