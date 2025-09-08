// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Ajuste para navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Destacar seção ativa no índice
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.table-of-contents a');
    
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Chamar uma vez no carregamento
});

// Adicionar classe active ao CSS
const style = document.createElement('style');
style.textContent = `
    .table-of-contents a.active {
        color: var(--verde-salgia);
        border-left-color: var(--verde-salgia);
        background-color: rgba(107, 170, 117, 0.1);
    }
`;
document.head.appendChild(style);

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
    const animatedElements = document.querySelectorAll('.purpose-card, .right-card, .security-item, .contact-method, .protection-measure');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efeito de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.purpose-card, .right-card, .security-item, .contact-method, .protection-measure, .scenario');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Funcionalidade para links de e-mail
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Adicionar feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Funcionalidade para links externos
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Adicionar feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Botão de voltar ao topo
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão de voltar ao topo
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopButton);
    
    // CSS para o botão
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--verde-salgia);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: var(--shadow-medium);
            transition: all var(--transition-fast);
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: var(--verde-escuro);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(buttonStyle);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Funcionalidade do botão
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Melhorar acessibilidade do índice
document.addEventListener('DOMContentLoaded', function() {
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    tocLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
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

// Funcionalidade para impressão
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar estilos para impressão
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            .navbar,
            .table-of-contents,
            .back-to-top,
            .footer {
                display: none !important;
            }
            
            .main-content {
                padding: 0 !important;
            }
            
            .content-wrapper {
                grid-template-columns: 1fr !important;
                gap: 0 !important;
            }
            
            .content-section {
                break-inside: avoid;
                page-break-inside: avoid;
            }
            
            .highlight-box,
            .info-box,
            .warning-box {
                border: 1px solid #ccc !important;
                background: #f9f9f9 !important;
            }
            
            .purpose-grid,
            .rights-grid,
            .security-measures,
            .contact-methods {
                grid-template-columns: 1fr !important;
            }
            
            .purpose-card,
            .right-card,
            .security-item,
            .contact-method {
                border: 1px solid #ddd !important;
                margin-bottom: 1rem !important;
            }
        }
    `;
    document.head.appendChild(printStyle);
});

// Funcionalidade para copiar links de seções
document.addEventListener('DOMContentLoaded', function() {
    const sectionHeadings = document.querySelectorAll('.content-section h2');
    
    sectionHeadings.forEach(heading => {
        const sectionId = heading.closest('.content-section').id;
        if (sectionId) {
            // Adicionar ícone de link
            const linkIcon = document.createElement('a');
            linkIcon.href = '#' + sectionId;
            linkIcon.innerHTML = '<i class="fas fa-link"></i>';
            linkIcon.className = 'section-link';
            linkIcon.setAttribute('aria-label', 'Link para esta seção');
            linkIcon.style.cssText = `
                margin-left: 0.5rem;
                color: var(--verde-salgia);
                text-decoration: none;
                opacity: 0;
                transition: opacity var(--transition-fast);
            `;
            
            heading.appendChild(linkIcon);
            
            // Mostrar ícone no hover
            heading.addEventListener('mouseenter', function() {
                linkIcon.style.opacity = '1';
            });
            
            heading.addEventListener('mouseleave', function() {
                linkIcon.style.opacity = '0';
            });
        }
    });
});

// Funcionalidade para destacar texto
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar funcionalidade de busca simples
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar na política...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        padding: 0.8rem;
        border: 2px solid var(--bege-claro);
        border-radius: 25px;
        margin-bottom: 1rem;
        font-size: 1rem;
        transition: border-color var(--transition-fast);
    `;
    
    // Inserir campo de busca no início do conteúdo
    const contentSections = document.querySelector('.content-sections');
    if (contentSections) {
        contentSections.insertBefore(searchInput, contentSections.firstChild);
    }
    
    // Funcionalidade de busca
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                section.style.display = 'block';
                section.style.opacity = '1';
            } else {
                section.style.display = 'none';
                section.style.opacity = '0.3';
            }
        });
    });
    
    // Estilo para o campo de busca
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = 'var(--verde-salgia)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.borderColor = 'var(--bege-claro)';
    });
});

// Funcionalidade para estatísticas de leitura
document.addEventListener('DOMContentLoaded', function() {
    // Calcular tempo estimado de leitura
    const content = document.querySelector('.content-sections');
    if (content) {
        const text = content.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 palavras por minuto
        
        // Adicionar indicador de tempo de leitura
        const readingTimeIndicator = document.createElement('div');
        readingTimeIndicator.className = 'reading-time';
        readingTimeIndicator.innerHTML = `
            <i class="fas fa-clock"></i>
            <span>Tempo estimado de leitura: ${readingTime} min</span>
        `;
        readingTimeIndicator.style.cssText = `
            background: var(--bege-claro);
            padding: 0.8rem 1.2rem;
            border-radius: 25px;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: var(--verde-escuro);
            margin-bottom: 1rem;
        `;
        
        // Inserir indicador no início do conteúdo
        const contentSections = document.querySelector('.content-sections');
        if (contentSections) {
            contentSections.insertBefore(readingTimeIndicator, contentSections.firstChild);
        }
    }
});

// Funcionalidade para compartilhamento
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar botões de compartilhamento
    const shareButtons = document.createElement('div');
    shareButtons.className = 'share-buttons';
    shareButtons.innerHTML = `
        <button class="share-btn" data-platform="whatsapp" title="Compartilhar no WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </button>
        <button class="share-btn" data-platform="twitter" title="Compartilhar no Twitter">
            <i class="fab fa-twitter"></i>
        </button>
        <button class="share-btn" data-platform="linkedin" title="Compartilhar no LinkedIn">
            <i class="fab fa-linkedin"></i>
        </button>
        <button class="share-btn" data-platform="copy" title="Copiar link">
            <i class="fas fa-copy"></i>
        </button>
    `;
    
    shareButtons.style.cssText = `
        position: fixed;
        top: 50%;
        right: 2rem;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 1000;
    `;
    
    // CSS para botões de compartilhamento
    const shareStyle = document.createElement('style');
    shareStyle.textContent = `
        .share-btn {
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: var(--verde-salgia);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all var(--transition-fast);
            box-shadow: var(--shadow-light);
        }
        
        .share-btn:hover {
            background: var(--verde-escuro);
            transform: scale(1.1);
        }
        
        .share-btn[data-platform="whatsapp"]:hover {
            background: #25D366;
        }
        
        .share-btn[data-platform="twitter"]:hover {
            background: #1DA1F2;
        }
        
        .share-btn[data-platform="linkedin"]:hover {
            background: #0077B5;
        }
        
        .share-btn[data-platform="copy"]:hover {
            background: var(--cinza-medio);
        }
        
        @media (max-width: 768px) {
            .share-buttons {
                display: none;
            }
        }
    `;
    document.head.appendChild(shareStyle);
    
    document.body.appendChild(shareButtons);
    
    // Funcionalidade dos botões
    const shareButtonsElements = shareButtons.querySelectorAll('.share-btn');
    const currentUrl = window.location.href;
    const currentTitle = document.title;
    
    shareButtonsElements.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            let shareUrl = '';
            
            switch (platform) {
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/message/BIJUEGZ7FR6UO1?autoload=1&app_absent=0&text=${encodeURIComponent(currentTitle + ' - ' + currentUrl)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentTitle)}&url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(currentUrl).then(() => {
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-copy"></i>';
                        }, 2000);
                    });
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
});