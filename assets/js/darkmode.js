// Verificar preferência do usuário ou usar um valor padrão
const darkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Aplicar classe ao corpo
document.body.classList.toggle('dark-mode', darkModeOn);

// Adicionar listener para alternar entre os modos
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Exemplo: Adicionar um botão de alternância
function createButton() {
    const darkModeToggleBtn = document.createElement('button');
    darkModeToggleBtn.textContent = 'Alternar modo Claro / Escuro';
    darkModeToggleBtn.addEventListener('click', toggleDarkMode);
    
    document.body.appendChild(darkModeToggleBtn);

}

createButton()