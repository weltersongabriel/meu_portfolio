// Theme Toggle Functionality

// Cria o botão de toggle do tema
function createThemeToggle() {
  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.setAttribute('aria-label', 'Alternar tema');
  button.innerHTML = '🌙'; // Ícone inicial (lua para tema escuro)
  document.body.appendChild(button);
  return button;
}

// Função para trocar imagens baseado no tema
function updateImages(theme) {
  const images = document.querySelectorAll('[data-light-src][data-dark-src]');
  
  images.forEach(img => {
    if (theme === 'dark') {
      img.src = img.getAttribute('data-dark-src');
    } else {
      img.src = img.getAttribute('data-light-src');
    }
  });
}

// Função para aplicar o tema
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateImages(theme);
  
  // Atualiza o ícone do botão
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
  
  // Salva a preferência no localStorage
  localStorage.setItem('theme', theme);
}

// Função para alternar o tema
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Inicialização
function initTheme() {
  // Verifica se há preferência salva
  const savedTheme = localStorage.getItem('theme');
  
  // Se não houver preferência salva, verifica a preferência do sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Aplica o tema inicial
  applyTheme(initialTheme);
  
  // Cria e adiciona o botão
  const toggleButton = createThemeToggle();
  toggleButton.addEventListener('click', toggleTheme);
  
  // Escuta mudanças na preferência do sistema (opcional)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// Inicia quando o DOM estiver carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
