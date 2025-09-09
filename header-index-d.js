/**
 * Header-Index-D Object
 * Contém o HTML e funcionalidades do header da versão D do site
 */

const HeaderIndexD = {
    // HTML do header
    html: `
        <!-- Navigation -->
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
                    <a href="#inicio" class="nav-link">Home</a>
                    <a href="produtos.html" class="nav-link">Produtos</a>
                    <a href="contato.html" class="nav-link">Contato</a>
                </div>
                <div class="nav-cta">
                    <a href="#consulta" class="btn btn-primary">
                        <i class="fas fa-calendar-alt"></i>
                        Consulta Gratuita
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

    // Configurações do header
    config: {
        navbarId: 'navbar',
        navMenuId: 'nav-menu',
        navToggleId: 'nav-toggle',
        scrollThreshold: 50,
        activeClass: 'active',
        mobileBreakpoint: 768
    },

    // Métodos de inicialização
    init: function() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    },

    // Efeito de scroll no navbar
    setupScrollEffect: function() {
        const navbar = document.getElementById(this.config.navbarId);
        
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > this.config.scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    },

    // Menu mobile
    setupMobileMenu: function() {
        const navToggle = document.getElementById(this.config.navToggleId);
        const navMenu = document.getElementById(this.config.navMenuId);
        
        if (!navToggle || !navMenu) return;

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
                    const offsetTop = targetElement.offsetTop - 80; // Compensar altura do header fixo
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Método para inserir o header em um elemento
    insertInto: function(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.html;
            this.init();
        }
    },

    // Método para atualizar links do header
    updateLinks: function(links) {
        const navMenu = document.getElementById(this.config.navMenuId);
        if (!navMenu) return;

        // Limpar links existentes
        const existingLinks = navMenu.querySelectorAll('.nav-link');
        existingLinks.forEach(link => link.remove());

        // Adicionar novos links
        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.className = 'nav-link';
            linkElement.textContent = link.text;
            
            if (link.icon) {
                linkElement.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
            }
            
            navMenu.appendChild(linkElement);
        });

        // Reconfigurar scroll suave
        this.setupSmoothScrolling();
    },

    // Método para atualizar CTA do header
    updateCTA: function(cta) {
        const navCta = document.querySelector('.nav-cta');
        if (!navCta) return;

        navCta.innerHTML = `
            <a href="${cta.href}" class="btn btn-primary">
                <i class="${cta.icon}"></i>
                ${cta.text}
            </a>
        `;
    },

    // Método para atualizar logo
    updateLogo: function(logo) {
        const logoText = document.querySelector('.logo-text');
        if (!logoText) return;

        logoText.innerHTML = `
            <h3>${logo.title}</h3>
            <span>${logo.subtitle}</span>
        `;
    },

    // Método para obter estado do menu mobile
    isMobileMenuOpen: function() {
        const navToggle = document.getElementById(this.config.navToggleId);
        return navToggle ? navToggle.classList.contains(this.config.activeClass) : false;
    },

    // Método para fechar menu mobile
    closeMobileMenu: function() {
        const navToggle = document.getElementById(this.config.navToggleId);
        const navMenu = document.getElementById(this.config.navMenuId);
        
        if (navToggle && navMenu) {
            navToggle.classList.remove(this.config.activeClass);
            navMenu.classList.remove(this.config.activeClass);
            document.body.classList.remove('menu-open');
        }
    },

    // Método para verificar se está em mobile
    isMobile: function() {
        return window.innerWidth <= this.config.mobileBreakpoint;
    },

    // Método para obter altura do navbar
    getHeight: function() {
        const navbar = document.getElementById(this.config.navbarId);
        return navbar ? navbar.offsetHeight : 0;
    }
};

// Auto-inicialização se o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        HeaderIndexD.init();
    });
} else {
    HeaderIndexD.init();
}

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderIndexD;
}