// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simular carregamento
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);
});

// Inicializar AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Navegação mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Contador animado
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
        }, 20);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Calculadora de IMC
document.addEventListener('DOMContentLoaded', function() {
    const imcForm = document.getElementById('imcForm');
    const resultCard = document.getElementById('resultCard');
    
    imcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const altura = parseFloat(document.getElementById('altura').value) / 100;
        const peso = parseFloat(document.getElementById('peso').value);
        const idade = parseInt(document.getElementById('idade').value);
        const atividade = parseFloat(document.getElementById('atividade').value);
        
        if (!altura || !peso || !idade) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Calcular IMC
        const imc = peso / (altura * altura);
        
        // Classificar IMC
        let categoria = '';
        if (imc < 18.5) categoria = 'Abaixo do peso';
        else if (imc < 25) categoria = 'Peso normal';
        else if (imc < 30) categoria = 'Sobrepeso';
        else if (imc < 35) categoria = 'Obesidade grau I';
        else if (imc < 40) categoria = 'Obesidade grau II';
        else categoria = 'Obesidade grau III';
        
        // Calcular peso ideal (IMC 22)
        const pesoIdeal = Math.round(22 * altura * altura);
        
        // Calcular calorias diárias (Fórmula de Harris-Benedict)
        let tmb;
        if (document.querySelector('input[name="sexo"]:checked')?.value === 'masculino') {
            tmb = 88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * idade);
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * altura * 100) - (4.330 * idade);
        }
        
        const caloriasDiarias = Math.round(tmb * atividade);
        
        // Calcular tempo estimado para atingir peso ideal
        const diferencaPeso = Math.abs(peso - pesoIdeal);
        const tempoEstimado = Math.ceil(diferencaPeso / 0.5); // 0.5kg por mês
        
        // Exibir resultados
        document.getElementById('imcValue').textContent = imc.toFixed(1);
        document.getElementById('imcCategory').textContent = categoria;
        document.getElementById('pesoIdeal').textContent = pesoIdeal + ' kg';
        document.getElementById('caloriasDiarias').textContent = caloriasDiarias + ' kcal';
        document.getElementById('tempoEstimado').textContent = tempoEstimado + ' meses';
        
        resultCard.style.display = 'block';
        resultCard.scrollIntoView({ behavior: 'smooth' });
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os itens
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Abrir o item clicado se não estiver ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Chat Bot
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    
    const responses = {
        'imc': 'O IMC é calculado dividindo o peso pela altura ao quadrado. É uma medida útil, mas não considera composição corporal.',
        'dieta': 'Não recomendo dietas restritivas. O ideal é um plano alimentar equilibrado e sustentável.',
        'exercicio': 'Exercícios são importantes, mas a alimentação representa 70% do sucesso no emagrecimento.',
        'agua': 'Recomendo 35ml de água por kg de peso corporal. Para uma pessoa de 70kg, seriam 2,45L por dia.',
        'proteina': 'A proteína ajuda na saciedade e preserva massa muscular. Consuma 1,6-2,2g por kg de peso corporal.',
        'carboidrato': 'Carboidratos são importantes! Escolha os complexos e consuma na quantidade adequada.',
        'gordura': 'Gorduras boas são essenciais! Azeite, castanhas e abacate são excelentes opções.',
        'consulta': 'Posso te ajudar com uma consulta personalizada. Clique no botão "Consulta Gratuita" acima.',
        'preco': 'Ofereço consultas individuais e programas em grupo. Entre em contato para conhecer os valores.',
        'tempo': 'Os primeiros resultados aparecem em 2-4 semanas, mas o importante é a consistência a longo prazo.'
    };
    
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });
    
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
    
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        return 'Desculpe, não entendi sua pergunta. Posso te ajudar com dúvidas sobre IMC, alimentação, exercícios ou consultas.';
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, true);
        chatInput.value = '';
        
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response);
        }, 1000);
    }
    
    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Partículas no hero
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--verde-salgia);
            border-radius: 50%;
            opacity: 0.6;
            animation: float 20s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 25000);
    }
    
    setInterval(createParticle, 2000);
});

// Scroll indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});

// Efeitos de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.metodologia-card, .transformacao-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Lazy loading para imagens
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Efeito de parallax
document.addEventListener('DOMContentLoaded', function() {
    const heroGradient = document.querySelector('.hero-gradient');
    const ctaPattern = document.querySelector('.cta-pattern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (heroGradient) {
            heroGradient.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.05}deg)`;
        }
        
        if (ctaPattern) {
            ctaPattern.style.transform = `translateY(${rate * 0.5}px) rotate(${scrolled * -0.03}deg)`;
        }
    });
});

// Funcionalidade para botões de CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                return;
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Simulação de consulta gratuita
function agendarConsulta() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            margin: 1rem;
        ">
            <h3 style="color: var(--verde-escuro); margin-bottom: 1rem;">Consulta Gratuita</h3>
            <p style="margin-bottom: 2rem; color: var(--cinza-grafite);">
                Agende sua consulta gratuita de 30 minutos e descubra como posso te ajudar a alcançar seus objetivos.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                    background: var(--verde-salgia);
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                ">Fechar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Adicionar event listeners para CTAs
document.addEventListener('DOMContentLoaded', function() {
    const consultaButtons = document.querySelectorAll('a[href="#consulta"]');
    
    consultaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            agendarConsulta();
        });
    });
});

// Adicionar classe para animações quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});