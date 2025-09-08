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

// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Carrossel de depoimentos
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.depoimento-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let autoPlayInterval;
    
    function showSlide(index) {
        // Remove active de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona active ao slide e dot atual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Pausar auto-play no hover
    const carousel = document.querySelector('.depoimentos-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Iniciar auto-play
    startAutoPlay();
});

// Funcionalidade de vídeos
document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-button');
    const videoCards = document.querySelectorAll('.video-card');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simular abertura de vídeo
            const videoCard = this.closest('.video-card');
            const videoTitle = videoCard.querySelector('h3').textContent;
            
            // Criar modal de vídeo
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 2rem;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 20px;
                    text-align: center;
                    max-width: 600px;
                    width: 100%;
                ">
                    <h3 style="color: var(--verde-escuro); margin-bottom: 1rem;">${videoTitle}</h3>
                    <div style="
                        width: 100%;
                        height: 300px;
                        background: var(--bege-claro);
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 1.5rem;
                        color: var(--verde-salgia);
                        font-size: 1.2rem;
                    ">
                        <i class="fas fa-play-circle" style="font-size: 3rem;"></i>
                    </div>
                    <p style="margin-bottom: 2rem; color: var(--cinza-grafite);">
                        Vídeo será reproduzido aqui. Em uma implementação real, você integraria com YouTube, Vimeo ou seu próprio player.
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: var(--verde-salgia);
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Fechar</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Fechar modal ao clicar fora
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    
    // Efeito hover nos cards de vídeo
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const playButton = this.querySelector('.play-button');
            playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const playButton = this.querySelector('.play-button');
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
});

// Animação de entrada para elementos
document.addEventListener('DOMContentLoaded', function() {
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
    const animatedElements = document.querySelectorAll('.area-card, .produto-card, .conteudo-card, .video-card, .bullet-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efeito parallax suave no hero
document.addEventListener('DOMContentLoaded', function() {
    const heroPattern = document.querySelector('.hero-pattern');
    const ctaPattern = document.querySelector('.cta-pattern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.05}deg)`;
        }
        
        if (ctaPattern) {
            ctaPattern.style.transform = `translateY(${rate * 0.5}px) rotate(${scrolled * -0.03}deg)`;
        }
    });
});

// Contador animado para estatísticas
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    
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
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Efeito de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.area-card, .produto-card, .conteudo-card, .video-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Funcionalidade para botões de CTA
document.addEventListener('DOMContentLoaded', function() {
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
});

// Função para simular download do e-book
function downloadEbook() {
    // Simulação de download
    const link = document.createElement('a');
    link.href = '#'; // Substituir por link real do e-book
    link.download = 'nutricao-sem-complicacao.pdf';
    link.click();
    
    // Feedback visual
    const button = event.target.closest('.btn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Download iniciado!';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
    }, 3000);
}

// Função para simular agendamento de consulta
function agendarConsulta() {
    // Simulação de abertura de modal ou redirecionamento
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
            max-width: 400px;
            margin: 1rem;
        ">
            <h3 style="color: var(--verde-escuro); margin-bottom: 1rem;">Agendamento de Consulta</h3>
            <p style="margin-bottom: 2rem; color: var(--cinza-grafite);">
                Redirecionando para o sistema de agendamento...
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--verde-salgia);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
            ">Fechar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
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

// Efeito de digitação no hero (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar efeito após um pequeno delay
        setTimeout(typeWriter, 500);
    }
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

// Adicionar classe para animações quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    
    // Adicionar efeito de entrada para a página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Efeito de scroll suave para navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// Adicionar efeito de hover nos ícones
document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.card-icon, .produto-icon, .conteudo-icon, .bullet-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Efeito de parallax para seções
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.sobre, .areas, .produtos, .conteudos, .videos');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.transform = 'translateY(50px)';
        section.style.opacity = '0';
        section.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Funcionalidade para badge de vídeo no hero
document.addEventListener('DOMContentLoaded', function() {
    const videoBadge = document.querySelector('.image-badge');
    
    if (videoBadge) {
        videoBadge.addEventListener('click', function() {
            // Scroll para seção de vídeos
            const videosSection = document.querySelector('#videos');
            if (videosSection) {
                videosSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Adicionar efeito de hover nos botões de carrossel
document.addEventListener('DOMContentLoaded', function() {
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    
    carouselBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Funcionalidade para links de redes sociais
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.querySelector('i').className;
            let url = '#';
            
            if (platform.includes('instagram')) {
                url = 'https://www.instagram.com/nutri.vinimoraes/';
            } else if (platform.includes('youtube')) {
                url = 'https://youtube.com/viniciusmoraes';
            } else if (platform.includes('whatsapp')) {
                url = 'https://api.whatsapp.com/message/BIJUEGZ7FR6UO1?autoload=1&app_absent=0';
            }
            
            // Simular abertura de link
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
                    max-width: 400px;
                    margin: 1rem;
                ">
                    <h3 style="color: var(--verde-escuro); margin-bottom: 1rem;">Redirecionando...</h3>
                    <p style="margin-bottom: 2rem; color: var(--cinza-grafite);">
                        Você será redirecionado para nossa página no ${platform.includes('instagram') ? 'Instagram' : platform.includes('youtube') ? 'YouTube' : 'WhatsApp'}.
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: var(--verde-salgia);
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Fechar</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Em uma implementação real, você abriria o link
            // window.open(url, '_blank');
        });
    });
});