document.addEventListener('DOMContentLoaded', () => {
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                formStatus.style.display = 'block';
                
                if (response.ok) {
                    // Success message
                    formStatus.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                    formStatus.style.color = '#2ecc71';
                    contactForm.reset();
                } else {
                    // Error message
                    formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                    formStatus.style.color = '#e74c3c';
                }
            } catch (error) {
                // Network error message
                formStatus.style.display = 'block';
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.style.color = '#e74c3c';
            }
            
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    }

    // Initialize sections for fade-in
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-hidden');
    });

    // Smooth scrolling with dynamic highlighting
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('section-hidden');
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const currentHash = window.location.hash;
    
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation.split('/').pop() || href === currentHash) {
            link.classList.add('active');
        }
    });

    // Smooth scroll to hash on page load
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }

    // Add hover effect to interactive elements
    const addHoverEffect = (elements) => {
        elements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.transform = 'translateY(-2px)';
            });
            element.addEventListener('mouseleave', (e) => {
                element.style.transform = 'translateY(0)';
            });
        });
    };

    // Apply hover effects to interactive elements
    addHoverEffect(document.querySelectorAll('.skill'));
    addHoverEffect(document.querySelectorAll('.social-link'));
});