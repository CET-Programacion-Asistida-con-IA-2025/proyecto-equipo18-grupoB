// Archivo principal de JavaScript para Planeta Verde
// ================================================

// Configuración y variables globales
const CONFIG = {
    animationDuration: 600,
    scrollOffset: 100,
    parallaxSpeed: 0.5,
    counterSpeed: 2000
};

// Utilidades
const Utils = {
    // Selector de elementos con manejo de errores
    $(selector) {
        const elements = document.querySelectorAll(selector);
        return elements.length === 1 ? elements[0] : elements;
    },

    // Debounce para optimizar eventos de scroll
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para eventos de scroll más suaves
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Verificar si un elemento está visible en el viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animación de números
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * this.easeOutQuart(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end;
            }
        };
        requestAnimationFrame(update);
    },

    // Función de easing
    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
};

// Gestión de la navegación
const Navigation = {
    init() {
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupMobileMenu();