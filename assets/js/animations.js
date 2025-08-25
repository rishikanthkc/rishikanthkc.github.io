// Check if the browser supports View Transitions API
if (document.startViewTransition) {
    // Handle navigation with view transitions
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.href) {
            e.preventDefault();
            
            document.startViewTransition(() => {
                window.location.href = e.target.href;
            });
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
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
