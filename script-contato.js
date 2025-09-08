// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form functionality
    initFormValidation();
    initFormSubmission();
    initFAQAccordion();
    initWhatsAppFormatting();
    initAccessibility();
    initSmoothScrolling();
});

// Form validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    // WhatsApp formatting
    const whatsappInput = document.getElementById('whatsapp');
    whatsappInput.addEventListener('input', function() {
        formatWhatsApp(this);
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Digite um e-mail válido';
        }
    }
    
    // WhatsApp validation
    if (fieldName === 'whatsapp' && value) {
        const whatsappRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!whatsappRegex.test(value)) {
            isValid = false;
            errorMessage = 'Digite um WhatsApp válido (ex: (11) 99999-9999)';
        }
    }
    
    // Name validation
    if (fieldName === 'nome' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    // Text validation
    if (fieldName === 'texto' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    // Checkbox validation
    if (fieldName === 'aceite' && !field.checked) {
        isValid = false;
        errorMessage = 'Você deve aceitar os termos para continuar';
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

// Show error message
function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Clear error message
function clearError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Format WhatsApp input
function formatWhatsApp(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 2) {
        input.value = value;
    } else if (value.length <= 6) {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 10) {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length <= 11) {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
}

// Form submission
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnLoading = document.getElementById('btnLoading');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, select, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Send data to WhatsApp (simulation)
            sendToWhatsApp();
            
        }, 2000);
    });
}

// Send data to WhatsApp
function sendToWhatsApp() {
    const formData = new FormData(document.getElementById('contactForm'));
    const nome = formData.get('nome');
    const whatsapp = formData.get('whatsapp');
    const email = formData.get('email');
    const meta = formData.get('meta');
    const texto = formData.get('texto');
    
    // Format meta for display
    const metaOptions = {
        'nutricao-pessoas-saudaveis': 'Nutrição para pessoas saudáveis',
        'nutricao-sedentarios': 'Nutrição para Sedentários',
        'nutricao-diabeticos': 'Nutrição para Diabéticos',
        'nutricao-atletas': 'Nutrição para Atletas',
        'nutricao-fins-esteticos': 'Nutrição para fins estéticos',
        'nutricao-familia': 'Nutrição para a Família'
    };
    
    const metaText = metaOptions[meta] || meta;
    
    // Create WhatsApp message
    const message = `*Nova mensagem de contato do site*

*Nome:* ${nome}
*WhatsApp:* ${whatsapp}
*E-mail:* ${email}
*Meta:* ${metaText}

*Mensagem:*
${texto}

---
Enviado via formulário do site institucionalvinicius.pages.dev`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/message/BIJUEGZ7FR6UO1?autoload=1&app_absent=0&text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000);
}

// Reset form function (called from success message)
function resetForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Clear all errors
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                    otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isActive) {
                answer.classList.remove('active');
                question.querySelector('i').style.transform = 'rotate(0deg)';
            } else {
                answer.classList.add('active');
                question.querySelector('i').style.transform = 'rotate(180deg)';
            }
        });
        
        // Keyboard navigation
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// WhatsApp formatting initialization
function initWhatsAppFormatting() {
    const whatsappInput = document.getElementById('whatsapp');
    
    if (whatsappInput) {
        // Add placeholder text
        whatsappInput.placeholder = '(11) 99999-9999';
        
        // Add input event listener for formatting
        whatsappInput.addEventListener('input', function() {
            formatWhatsApp(this);
        });
        
        // Add paste event listener
        whatsappInput.addEventListener('paste', function(e) {
            setTimeout(() => {
                formatWhatsApp(this);
            }, 10);
        });
    }
}

// Accessibility improvements
function initAccessibility() {
    // Add ARIA labels and roles
    const form = document.getElementById('contactForm');
    if (form) {
        form.setAttribute('role', 'form');
        form.setAttribute('aria-label', 'Formulário de contato');
    }
    
    // Add ARIA attributes to form fields
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('.form-label');
        
        if (input && label) {
            const labelText = label.textContent.trim();
            input.setAttribute('aria-label', labelText);
            
            // Connect error message
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                const errorId = input.name + '-error';
                errorElement.id = errorId;
                input.setAttribute('aria-describedby', errorId);
            }
        }
    });
    
    // Add ARIA attributes to FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        const questionId = `faq-question-${index}`;
        const answerId = `faq-answer-${index}`;
        
        question.id = questionId;
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        question.setAttribute('tabindex', '0');
        
        answer.id = answerId;
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', questionId);
    });
    
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#contato';
    skipLink.textContent = 'Pular para o formulário de contato';
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
}

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

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#6BAA75'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Export functions for global access
window.ContactPage = {
    resetForm: resetForm,
    validateField: validateField,
    showNotification: showNotification
};