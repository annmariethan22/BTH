class PowerPointSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.isAnimating = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        // Show first slide
        this.showSlide(0);
        
        // Add scroll event
        this.addScrollEvent();
        
        // Add dot click events
        this.addDotEvents();
        
        // Add keyboard navigation
        this.addKeyboardEvents();
    }
    
    addScrollEvent() {
        let touchStartY = 0;
        
        // Mouse wheel
        window.addEventListener('wheel', (e) => {
            if (this.isAnimating) return;
            
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }, 50);
        }, { passive: true });
        
        // Touch events for mobile
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        window.addEventListener('touchend', (e) => {
            if (this.isAnimating) return;
            
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        }, { passive: true });
    }
    
    addDotEvents() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }
    
    addKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;
            
            switch(e.key) {
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.slides.length - 1);
                    break;
            }
        });
    }
    
    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        
        // Hide current slide
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Show new slide
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // Reset animation lock
        setTimeout(() => {
            this.isAnimating = false;
        }, 1200);
        
        // Update URL hash
        this.updateURL();
    }
    
    updateURL() {
        const slideId = this.slides[this.currentSlide].id;
        history.replaceState(null, null, `#${slideId}`);
    }
    
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        this.currentSlide = index;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PowerPointSlider();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// Parallax effect for background images
document.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelectorAll('.slide-background').forEach(background => {
        background.style.transform = `scale(1.1) translateY(${rate * 0.1}px)`;
    });
});