class SimpleScrollSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.isScrolling = false;
        this.scrollDelay = 1000; // Wait 1 second between scrolls
        
        this.init();
    }
    
    init() {
        // Show first slide
        this.showSlide(0);
        
        // Add scroll event
        this.addScrollEvent();
        
        // Add dot click events
        this.addDotEvents();
        
        // Add intersection observer for automatic activation
        this.addIntersectionObserver();
    }
    
    addScrollEvent() {
        window.addEventListener('wheel', (e) => {
            if (this.isScrolling) return;
            
            if (e.deltaY > 0) {
                // Scrolling down
                this.nextSlide();
            } else {
                // Scrolling up
                this.previousSlide();
            }
        }, { passive: true });
        
        // Touch events for mobile
        let touchStartY = 0;
        
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        window.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && !this.isScrolling) {
                    this.nextSlide();
                } else if (diff < 0 && !this.isScrolling) {
                    this.previousSlide();
                }
            }
        }, { passive: true });
    }
    
    addIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slideIndex = Array.from(this.slides).indexOf(entry.target);
                    if (slideIndex !== -1 && slideIndex !== this.currentSlide) {
                        this.showSlide(slideIndex);
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-25% 0px -25% 0px' // Trigger when 50% of slide is visible
        });
        
        this.slides.forEach(slide => observer.observe(slide));
    }
    
    addDotEvents() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
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
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        // Scroll to the slide
        this.slides[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active states
        this.showSlide(index);
        
        // Reset scrolling lock after delay
        setTimeout(() => {
            this.isScrolling = false;
        }, this.scrollDelay);
    }
    
    showSlide(index) {
        // Update slides
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        this.currentSlide = index;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SimpleScrollSlider();
    
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

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});