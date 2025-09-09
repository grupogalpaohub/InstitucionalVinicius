/**
 * Header Object - Vinícius Moraes
 * Header comum para todas as páginas do site
 */

const Header = {
    // HTML do header
    html: `
        <nav class="navbar" id="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <div class="logo-icon">
                        <i class="fas fa-leaf"></i>
                    </div>
                    <div class="logo-text">
                        <h3>Vinícius Moraes</h3>
                        <span>Emagrecimento Saudável</span>
                    </div>
                </div>
                <div class="nav-menu" id="nav-menu">
                    <a href="index.html" class="nav-link">Início</a>
                    <a href="sobre.html" class="nav-link">Sobre</a>
                    <a href="produtos.html" class="nav-link">Produtos</a>
                    <a href="contato.html" class="nav-link">Contato</a>
                    <a href="blog.html" class="nav-link">Blog</a>
                </div>
                <div class="nav-cta">
                    <a href="contato.html#consulta" class="btn btn-primary">
                        <i class="fas fa-calendar-alt"></i>
                        Consulta Grátuita
                    </a>
                </div>
                <div class="nav-toggle" id="nav-toggle">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
    `,

    // Configurações
    config: {
        navbarId: 'navbar',
        navMenuId: 'nav-menu',
        navToggleId: 'nav-toggle',
        scrollThreshold: 50,
        activeClass: 'active',
        scrolledClass: 'scrolled',
        mobileBreakpoint: 768
    },

    // Inicializar o header
    init: function() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    },

    // Inserir header em um container
    insertInto: function(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.html;
            this.init();
        }
    },

    // Efeito de scroll no navbar
    setupScrollEffect: function() {
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById(this.config.navbarId);
            if (navbar) {
                if (window.scrollY > this.config.scrollThreshold) {
                    navbar.classList.add(this.config.scrolledClass);
                } else {
                    navbar.classList.remove(this.config.scrolledClass);
                }
            }
        });
    },

    // Menu mobile
    setupMobileMenu: function() {
        const navToggle = document.getElementById(this.config.navToggleId);
        const navMenu = document.getElementById(this.config.navMenuId);

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle(this.config.activeClass);
                navMenu.classList.toggle(this.config.activeClass);
                document.body.classList.toggle('menu-open');
            });

            // Fechar menu ao clicar em um link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove(this.config.activeClass);
                    navMenu.classList.remove(this.config.activeClass);
                    document.body.classList.remove('menu-open');
                });
            });

            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove(this.config.activeClass);
                    navMenu.classList.remove(this.config.activeClass);
                    document.body.classList.remove('menu-open');
                }
            });
        }
    },

    // Scroll suave para âncoras
    setupSmoothScrolling: function() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Atualizar link ativo baseado na página atual
    setActiveLink: function(currentPage) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            // Considerar index.html e raiz como página inicial
            if (linkHref === 'index.html' && (currentPage === 'index.html' || currentPage === '' || currentPage === '/')) {
                link.classList.add('active');
            } else if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    }
};