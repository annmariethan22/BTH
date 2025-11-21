// FABULOUS Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Add some sparkle!
        if(navMenu.classList.contains('active')) {
            createSparkles(10);
        }
    });
}

// Create sparkle effects
function createSparkles(count) {
    for(let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        sparkle.style.zIndex = '9999';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = `sparkleFloat ${Math.random() * 2 + 1}s forwards`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
}

// Add sparkle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100px) rotate(180deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        createSparkles(5);
    });
});

// FABULOUS Form Submission
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create celebration effect
        createSparkles(20);
        
        // Rainbow alert
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, var(--rainbow-1), var(--rainbow-2), var(--rainbow-3), var(--rainbow-4), var(--rainbow-5), var(--rainbow-6));
            padding: 30px 50px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            font-size: 1.5rem;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 107, 201, 0.8);
            z-index: 10000;
            border: 5px solid white;
        `;
        alertDiv.innerHTML = '🌈 YAS QUEEN! Thank you for your message! We\'ll get back to you soon! 💖✨';
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
            contactForm.reset();
        }, 3000);
    });
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add rainbow cursor effect
document.addEventListener('mousemove', (e) => {
    if(Math.random() < 0.1) { // 10% chance to create sparkle
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.fontSize = '15px';
        sparkle.style.zIndex = '9999';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = `sparkleFloat 1s forwards`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Add click celebration
document.addEventListener('click', (e) => {
    if(e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && e.target.type !== 'submit') {
       