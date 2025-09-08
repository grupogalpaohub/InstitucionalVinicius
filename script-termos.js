// Terms of Use Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Back to top functionality
    initBackToTop();
    
    // Print functionality
    initPrintFunction();
    
    // Share functionality
    initShareButtons();
    
    // Table of contents highlighting
    initTOCHighlighting();
    
    // Search functionality
    initSearchFunction();
    
    // Accessibility improvements
    initAccessibility();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        backToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initially hide the button
        backToTopBtn.style.display = 'none';
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transition = 'opacity 0.3s ease';
    }
}

// Print functionality
function initPrintFunction() {
    const printBtn = document.getElementById('printBtn');
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // Create a new window for printing
            const printWindow = window.open('', '_blank');
            const content = document.querySelector('.content-main').innerHTML;
            const title = document.title;
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        h1, h2, h3, h4 {
                            color: #264E36;
                        }
                        h2 {
                            border-bottom: 2px solid #6BAA75;
                            padding-bottom: 10px;
                            margin-top: 30px;
                        }
                        .highlight-box, .warning-box, .medical-disclaimer, .copyright-notice, .contact-note, .update-info {
                            background: #f8f9fa;
                            border-left: 4px solid #6BAA75;
                            padding: 15px;
                            margin: 20px 0;
                        }
                        .definitions-grid, .services-list, .contact-methods {
                            display: block;
                        }
                        .definition-item, .service-item, .contact-method {
                            background: #f8f9fa;
                            padding: 15px;
                            margin: 10px 0;
                            border-radius: 5px;
                        }
                        .responsibility-list {
                            list-style: none;
                            padding: 0;
                        }
                        .responsibility-list li {
                            padding: 5px 0;
                        }
                        @media print {
                            body { font-size: 12px; }
                            h1 { font-size: 18px; }
                            h2 { font-size: 16px; }
                            h3 { font-size: 14px; }
                        }
                    </style>
                </head>
                <body>
                    <h1>Termos de Uso - Vinícius Moraes | Emagrecimento Saudável</h1>
                    <p><strong>Última atualização:</strong> 8 de setembro de 2025</p>
                    ${content}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            printWindow.focus();
            
            // Wait for content to load, then print
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        });
    }
}

// Share functionality
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const currentUrl = window.location.href;
    const currentTitle = document.title;
    
    shareButtons.forEach(btn => {
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
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                    break;
            }
            
            if (shareUrl) {
                // Simulate opening share dialog
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                `;
                
                const modalContent = document.createElement('div');
                modalContent.style.cssText = `
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    text-align: center;
                    max-width: 400px;
                    margin: 20px;
                `;
                
                modalContent.innerHTML = `
                    <h3 style="color: #264E36; margin-bottom: 20px;">Compartilhar Termos de Uso</h3>
                    <p style="margin-bottom: 20px;">Redirecionando para ${platform.charAt(0).toUpperCase() + platform.slice(1)}...</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button onclick="window.open('${shareUrl}', '_blank'); this.parentElement.parentElement.parentElement.remove();" 
                                style="background: #6BAA75; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                            Abrir ${platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </button>
                        <button onclick="this.parentElement.parentElement.parentElement.remove();" 
                                style="background: #ccc; color: #333; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                            Cancelar
                        </button>
                    </div>
                `;
                
                modal.appendChild(modalContent);
                document.body.appendChild(modal);
                
                // Auto-close after 3 seconds
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.remove();
                    }
                }, 3000);
            }
        });
    });
}

// Table of contents highlighting
function initTOCHighlighting() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.content-section');
    
    // Function to update active TOC link
    function updateActiveTOCLink() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current link
                if (tocLinks[index]) {
                    tocLinks[index].classList.add('active');
                }
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveTOCLink);
    
    // Update on page load
    updateActiveTOCLink();
}

// Search functionality
function initSearchFunction() {
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
        background: white;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        display: none;
    `;
    
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="Buscar nos termos..." 
               style="width: 200px; padding: 8px; border: 1px solid #ddd; border-radius: 5px; margin-right: 5px;">
        <button id="searchBtn" style="background: #6BAA75; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-search"></i>
        </button>
        <button id="closeSearch" style="background: #ccc; color: #333; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; margin-left: 5px;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(searchContainer);
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    
    // Show search on Ctrl+F
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchContainer.style.display = 'block';
            searchInput.focus();
        }
    });
    
    // Hide search
    closeSearch.addEventListener('click', function() {
        searchContainer.style.display = 'none';
        searchInput.value = '';
        clearSearchResults();
    });
    
    // Search functionality
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            clearSearchResults();
            return;
        }
        
        const sections = document.querySelectorAll('.content-section');
        let foundResults = false;
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const title = section.querySelector('h2').textContent.toLowerCase();
            
            if (text.includes(query) || title.includes(query)) {
                section.style.backgroundColor = '#fff3cd';
                section.style.border = '2px solid #ffc107';
                foundResults = true;
            } else {
                section.style.backgroundColor = '';
                section.style.border = '';
            }
        });
        
        if (!foundResults) {
            showSearchMessage('Nenhum resultado encontrado para: "' + query + '"');
        } else {
            showSearchMessage('Resultados encontrados para: "' + query + '"');
        }
    }
    
    function clearSearchResults() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.backgroundColor = '';
            section.style.border = '';
        });
        hideSearchMessage();
    }
    
    function showSearchMessage(message) {
        let messageEl = document.getElementById('searchMessage');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'searchMessage';
            messageEl.style.cssText = `
                position: fixed;
                top: 140px;
                right: 20px;
                background: #6BAA75;
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                z-index: 1001;
                font-size: 14px;
            `;
            document.body.appendChild(messageEl);
        }
        messageEl.textContent = message;
        
        setTimeout(() => {
            if (messageEl) {
                messageEl.remove();
            }
        }, 3000);
    }
    
    function hideSearchMessage() {
        const messageEl = document.getElementById('searchMessage');
        if (messageEl) {
            messageEl.remove();
        }
    }
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear search when input is empty
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            clearSearchResults();
        }
    });
}

// Accessibility improvements
function initAccessibility() {
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #6BAA75;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 0 0 4px 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('.main');
    if (main) {
        main.id = 'main';
        main.setAttribute('role', 'main');
    }
    
    // Add navigation landmarks
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navegação principal');
    }
    
    // Add heading hierarchy
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.setAttribute('aria-labelledby', `section-${index + 1}`);
        const heading = section.querySelector('h2');
        if (heading) {
            heading.id = `section-${index + 1}`;
        }
    });
    
    // Add live region for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(liveRegion);
    
    // Announce search results
    window.announceSearchResults = function(message) {
        liveRegion.textContent = message;
    };
}

// Utility function to format date
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('pt-BR', options);
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Export functions for global access
window.TermsPage = {
    performSearch: function(query) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = query;
            const searchBtn = document.getElementById('searchBtn');
            if (searchBtn) {
                searchBtn.click();
            }
        }
    },
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    printTerms: function() {
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.click();
        }
    }
};