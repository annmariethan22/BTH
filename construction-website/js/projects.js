// Scroll-based animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        hero: document.getElementById('hero'),
        foundations: document.getElementById('foundations'),
        details: document.getElementById('details')
    };

    const elements = {
        completeBuilding: document.getElementById('completeBuilding'),
        blueprint: document.getElementById('blueprint'),
        designText: document.getElementById('designText'),
        foundationText: document.getElementById('foundationText'),
        detailText: document.getElementById('detailText'),
        mainBalcony: document.getElementById('mainBalcony'),
        detailBalcony: document.getElementById('detailBalcony')
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                switch(sectionId) {
                    case 'hero':
                        animateHeroSection();
                        break;
                    case 'foundations':
                        animateFoundationsSection();
                        break;
                    case 'details':
                        animateDetailsSection();
                        break;
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    Object.values(sections).forEach(section => {
        if (section) observer.observe(section);
    });

    function animateHeroSection() {
        // Phase 1: Building deconstruction
        setTimeout(() => {
            elements.completeBuilding.classList.add('building-deconstruct');
        }, 500);

        // Phase 2: Blueprint reveal
        setTimeout(() => {
            elements.blueprint.classList.remove('hidden');
            elements.blueprint.classList.add('blueprint-reveal');
        }, 1500);

        // Phase 3: Design text reveal
        setTimeout(() => {
            elements.designText.classList.remove('hidden');
            elements.designText.classList.add('visible');
            
            // Animate underline
            setTimeout(() => {
                const underline = elements.designText.querySelector('.text-underline');
                underline.classList.add('underline-complete');
            }, 500);
        }, 2500);
    }

    function animateFoundationsSection() {
        // Animate foundation text
        setTimeout(() => {
            elements.foundationText.classList.remove('hidden');
            elements.foundationText.classList.add('visible');
            
            // Animate underline
            setTimeout(() => {
                const underline = elements.foundationText.querySelector('.text-underline');
                underline.classList.add('underline-complete');
            }, 500);
        }, 1000);
    }

    function animateDetailsSection() {
        // Highlight balcony in main building first
        setTimeout(() => {
            elements.mainBalcony.classList.add('balcony-highlight');
        }, 500);

        // Then show detail text
        setTimeout(() => {
            elements.detailText.classList.remove('hidden');
            elements.detailText.classList.add('visible');
            
            // Animate underline
            setTimeout(() => {
                const underline = elements.detailText.querySelector('.text-underline');
                underline.classList.add('underline-complete');
            }, 500);
        }, 1500);

        // Animate balcony bracket growth
        setTimeout(() => {
            const bracket = elements.detailBalcony.querySelector('.balcony-bracket');
            // Animation is handled by CSS
        }, 2000);
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if(targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Additional scroll effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for building elements
    const building = document.querySelector('.complete-building');
    if(building) {
        building.style.transform = `translate(-50%, calc(-50% + ${rate * 0.3}px))`;
    }
});