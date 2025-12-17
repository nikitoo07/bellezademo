// ===================================
// SMOOTH SCROLL BEHAVIOR
// ===================================
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

// ===================================
// NAVBAR INTERACTION
// ===================================
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');



// Navbar Scroll Effect & Active Link Highlight
window.addEventListener('scroll', () => {
    // Navbar Background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active Link Highlight
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.product-card, .feature-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===================================
// PRODUCT CARD INTERACTIONS
// ===================================
document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;

        // Create WhatsApp message
        const message = `Hola! Me interesa el producto: ${productName} (${productPrice})`;
        const whatsappUrl = `https://wa.me/56912345678?text=${encodeURIComponent(message)}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Visual feedback
        this.textContent = '¡Enviado!';
        this.style.background = 'linear-gradient(135deg, #25D366 0%, #20ba5a 100%)';

        setTimeout(() => {
            this.textContent = 'Consultar';
            this.style.background = '';
        }, 2000);
    });
});

// ===================================
// PARALLAX EFFECT ON HERO
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// PRODUCT CARD HOVER EFFECTS
// ===================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// TESTIMONIAL ROTATION EFFECT
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function highlightTestimonial() {
    testimonialCards.forEach((card, index) => {
        if (index === currentTestimonial) {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 32px rgba(255, 107, 157, 0.2)';
        } else {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '';
        }
    });

    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Highlight testimonials every 3 seconds
setInterval(highlightTestimonial, 3000);

// ===================================
// FEATURE CARDS STAGGER ANIMATION
// ===================================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // You can use this to create a progress bar if needed
    // For now, we'll use it to enhance the scroll-to-top button
    if (scrollToTopBtn.classList.contains('visible')) {
        const rotation = (scrollPercent / 100) * 360;
        scrollToTopBtn.style.transform = `translateY(${scrollPercent > 50 ? '-3px' : '0'}) rotate(${rotation}deg)`;
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c✨ Belleza Premium ✨', 'color: #ff6b9d; font-size: 24px; font-weight: bold; font-family: "Playfair Display", serif;');
console.log('%cGracias por visitar nuestra página 💖', 'color: #ffc2d1; font-size: 14px; font-family: "Poppins", sans-serif;');
