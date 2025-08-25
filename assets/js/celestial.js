class CelestialAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.planets = [];
        this.time = 0;
        this.hoveredPlanet = null;
        this.mousePos = { x: 0, y: 0 };
        
        // Make canvas fullscreen and responsive
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'auto';
        this.canvas.style.zIndex = '-1';
        
        document.body.prepend(this.canvas);
        this.resize();
        
        // Initialize stars and planets
        this.initStars();
        this.initPlanets();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * window.devicePixelRatio;
        this.canvas.height = this.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    initStars() {
        const numStars = Math.floor((this.width * this.height) / 10000);
        this.stars = [];
        
        for (let i = 0; i < numStars; i++) {
            const size = 0.5 + Math.random() * 1.5;
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: size,
                twinkleSpeed: 0.01 + Math.random() * 0.1,
                twinkleOffset: Math.random() * Math.PI * 2,
                moveSpeed: 3 / size // Inverse proportion to size for parallax
            });
        }
    }
    
    initPlanets() {
        const numPlanets = Math.floor((this.width * this.height) / 50000);
        this.planets = [];
        
        for (let i = 0; i < numPlanets; i++) {
            const size = 2 + Math.random() * 3;
            this.planets.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: size,
                moveSpeed: 3 / size, // Inverse proportion to size for parallax
                glowSize: 3,
                scale: 1,
                targetScale: 1
            });
        }
        
        // Add mouse move listener for planet hover
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePos = {
                x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
                y: (e.clientY - rect.top) * (this.canvas.height / rect.height)
            };
        });
    }
    
    drawStar(star) {
        const opacity = 0.3 + (Math.sin(this.time * star.twinkleSpeed + star.twinkleOffset) + 1) * 0.25;
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawPlanet(planet) {
        // Check if planet is being hovered
        const dx = this.mousePos.x - planet.x;
        const dy = this.mousePos.y - planet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isHovered = distance < planet.size * planet.scale;
        
        // Update scale with smooth transition
        planet.targetScale = isHovered ? 1.2 : 1;
        planet.scale += (planet.targetScale - planet.scale) * 0.1;
        
        const scaledSize = planet.size * planet.scale;
        const scaledGlowSize = planet.glowSize * planet.scale;
        
        // Draw glow
        const gradient = this.ctx.createRadialGradient(
            planet.x, planet.y, 0,
            planet.x, planet.y, scaledSize + scaledGlowSize
        );
        gradient.addColorStop(0, isHovered ? 'rgba(0, 0, 0, 0.5)' : 'rgba(30, 30, 30, 0.4)');
        gradient.addColorStop(1, 'rgba(30, 30, 30, 0)');
        
        this.ctx.beginPath();
        this.ctx.fillStyle = gradient;
        this.ctx.arc(planet.x, planet.y, scaledSize + scaledGlowSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw planet
        this.ctx.beginPath();
        this.ctx.fillStyle = isHovered ? 'rgba(0, 0, 0, 0.9)' : 'rgba(30, 30, 30, 0.8)';
        this.ctx.arc(planet.x, planet.y, scaledSize, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    updatePositions() {
        // Update stars
        this.stars.forEach(star => {
            star.x += star.moveSpeed;
            if (star.x > this.width) {
                star.x = 0;
                star.y = Math.random() * this.height;
            }
        });
        
        // Update planets
        this.planets.forEach(planet => {
            planet.x += planet.moveSpeed;
            if (planet.x > this.width) {
                planet.x = 0;
                planet.y = Math.random() * this.height;
            }
        });
    }
    
    drawRadialGradient() {
        const gradient = this.ctx.createRadialGradient(
            this.width / 2, this.height / 2, 0,
            this.width / 2, this.height / 2, Math.max(this.width, this.height)
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(240, 240, 240, 0.8)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw background gradient
        this.drawRadialGradient();
        
        this.time += 0.016; // Approximately 60fps
        this.updatePositions();
        
        // Draw stars
        this.stars.forEach(star => this.drawStar(star));
        
        // Draw planets
        this.planets.forEach(planet => this.drawPlanet(planet));
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing celestial animation...');
    try {
        const animation = new CelestialAnimation();
        console.log('Celestial animation initialized successfully');
    } catch (error) {
        console.error('Error initializing celestial animation:', error);
    }
});
