document.addEventListener('DOMContentLoaded', () => {
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            try {
                // Reset and show loading state
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                formStatus.style.display = 'block';
                formStatus.textContent = 'Sending message...';
                formStatus.className = '';
                
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = 'Thank you for reaching out! I will respond to your message soon.';
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    throw new Error(data.error || 'Network response was not ok');
                }
            } catch (error) {
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.className = 'error';
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
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