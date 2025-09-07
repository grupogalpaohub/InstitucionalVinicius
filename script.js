// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para âncoras
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animação de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.area-card, .produto-card, .depoimento-card, .conteudo-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Funcionalidade para botões de CTA (simulação)
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for um link interno, não fazer nada (deixar o smooth scroll funcionar)
            if (href && href.startsWith('#')) {
                return;
            }
            
            // Para links externos ou ações, adicionar feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Adicionar classe para animações quando a página carrega
    document.body.classList.add('loaded');
});

// Função para simular download do e-book
function downloadEbook() {
    // Simulação de download
    const link = document.createElement('a');
    link.href = '#'; // Substituir por link real do e-book
    link.download = 'ebook-nutricao-simples.pdf';
    link.click();
    
    // Feedback visual
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Download iniciado!';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

// Função para simular agendamento de consulta
function agendarConsulta() {
    // Simulação de abertura de modal ou redirecionamento
    alert('Redirecionando para o sistema de agendamento...');
    
    // Aqui você pode integrar com um sistema real de agendamento
    // window.open('https://sistema-de-agendamento.com', '_blank');
}

// Adicionar event listeners para os CTAs principais
document.addEventListener('DOMContentLoaded', function() {
    const ebookButtons = document.querySelectorAll('a[href="#ebook"]');
    const consultaButtons = document.querySelectorAll('a[href="#consulta"]');
    
    ebookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            downloadEbook();
        });
    });
    
    consultaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            agendarConsulta();
        });
    });
});