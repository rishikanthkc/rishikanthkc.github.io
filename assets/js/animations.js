// Enhanced animation handling
document.documentElement.classList.add('js-enabled');

// Optimized View Transitions API implementation
if (document.startViewTransition) {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.startsWith(window.location.origin)) {
            e.preventDefault();
            
            // Add exit animation class
            document.documentElement.classList.add('navigating');
            
            document.startViewTransition(() => {
                document.documentElement.classList.remove('navigating');
                window.location.href = link.href;
            });
        }
    });
}

// Intersection Observer for scroll animations
// Enhanced Intersection Observer options
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: [0, 0.1, 0.2]
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add delay based on index for staggered animation
            const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('reveal-visible');
            
            // Remove delay after animation
            setTimeout(() => {
                entry.target.style.transitionDelay = '0ms';
            }, delay + 600);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});

// Add reveal animation to skills
document.querySelectorAll('.skill').forEach(skill => {
    skill.classList.add('reveal');
    observer.observe(skill);
});

// Handle hover effects for better performance
const skillsContainer = document.querySelector('.skills-grid');
if (skillsContainer && window.matchMedia('(hover: hover)').matches) {
    skillsContainer.addEventListener('mousemove', (e) => {
        const bounds = skillsContainer.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        document.querySelectorAll('.skill').forEach(skill => {
            const skillBounds = skill.getBoundingClientRect();
            const skillX = skillBounds.left - bounds.left + skillBounds.width / 2;
            const skillY = skillBounds.top - bounds.top + skillBounds.height / 2;
            
            const distanceX = mouseX - skillX;
            const distanceY = mouseY - skillY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const maxDistance = 200;
            
            if (distance < maxDistance) {
                const intensity = (maxDistance - distance) / maxDistance;
                skill.style.transform = `scale(${1 + intensity * 0.03})`;
            } else {
                skill.style.transform = '';
            }
        });
    });
    
    skillsContainer.addEventListener('mouseleave', () => {
        document.querySelectorAll('.skill').forEach(skill => {
            skill.style.transform = '';
        });
    });
}
