// Enhanced mobile menu functionality
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.querySelector('.mobile-sidebar-overlay');

menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    const spans = this.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        if (this.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking overlay
mobileOverlay.addEventListener('click', function() {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    this.classList.remove('active');
    
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            mobileOverlay.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
});

// Enhanced smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const extraPadding = 20; // Additional space above target
            const targetPosition = targetElement.offsetTop - navbarHeight - extraPadding;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                menuToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    
    // At absolute top (0px) - fully transparent with thin line
    if (currentScroll === 0) {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('hidden');
        return;
    }
    
    // Any scroll > 0px - solid background
    if (currentScroll > 0) {
        navbar.classList.add('scrolled');
    }
    
    // Hide navbar when scrolling down, show when scrolling up
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll) {
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up:not(.animated)');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85;

    elements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerPoint) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            el.classList.add('animated');
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});

window.addEventListener('scroll', animateOnScroll);

// Helper function for scrollToSection
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight - 20;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}