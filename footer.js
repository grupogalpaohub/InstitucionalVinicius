/**
 * Footer Object - Vinícius Moraes
 * Footer comum para todas as páginas do site
 */

const Footer = {
    // HTML do footer
    html: `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">
                            <div class="logo-icon">
                                <i class="fas fa-leaf"></i>
                            </div>
                            <div class="logo-text">
                                <h3>Vinícius Moraes</h3>
                                <span>Emagrecimento Saudável</span>
                            </div>
                        </div>
                        <p class="footer-description">
                            Nutricionista especialista em emagrecimento saudável que traduz nutrição 
                            em linguagem simples para pessoas reais.
                        </p>
                    </div>

                    <div class="footer-section">
                        <h4>Navegação</h4>
                        <ul class="footer-links">
                            <li><a href="inicio.html">Início</a></li>
                            <li><a href="produtos.html">Produtos</a></li>
                            <li><a href="contato.html">Contato</a></li>
                            <li><a href="blog.html">Blog</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h4>Produtos</h4>
                        <ul class="footer-links">
                            <li><a href="produtos.html#sessao-clareza">Sessão de Clareza</a></li>
                            <li><a href="produtos.html#jornada-estrategica">Jornada Estratégica</a></li>
                            <li><a href="produtos.html#jornada-premium">Jornada Premium</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h4>Contato</h4>
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>+55 24 99939-8229</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>contato@viniciusmoraes.com.br</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Rio de Janeiro, RJ</span>
                            </div>
                            <div class="social-links-inline">
                                <a href="https://www.instagram.com/nutri.vinimoraes/" target="_blank" rel="noopener" class="social-link-inline">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <a href="https://youtube.com/viniciusmoraes" target="_blank" rel="noopener" class="social-link-inline">
                                    <i class="fab fa-youtube"></i>
                                </a>
                                <a href="https://api.whatsapp.com/message/BIJUEGZ7FR6UO1?autoload=1&app_absent=0" target="_blank" rel="noopener" class="social-link-inline">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <p>&copy; 2025 Vinícius Moraes | Emagrecimento Saudável. Todos os direitos reservados.</p>
                        <div class="footer-legal">
                            <a href="termos-de-uso.html">Termos de Uso</a>
                            <span>|</span>
                            <a href="politica-privacidade.html">Política de Privacidade</a>
                        </div>
                    </div>
                    <p class="footer-disclaimer">
                        Este site oferece conteúdo educativo e não substitui acompanhamento médico individualizado.
                    </p>
                </div>
            </div>
        </footer>
    `,

    // Inicializar o footer
    init: function() {
        // Adicionar funcionalidades específicas do footer se necessário
        this.setupSocialLinks();
    },

    // Inserir footer em um container
    insertInto: function(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.html;
            this.init();
        }
    },

    // Configurar links sociais
    setupSocialLinks: function() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Adicionar tracking ou outras funcionalidades se necessário
                console.log('Social link clicked:', link.href);
            });
        });
    }
};