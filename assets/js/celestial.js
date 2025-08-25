class CelestialAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.planets = [];
        this.time = 0;
        
        // Make canvas fullscreen and responsive
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
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
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: 0.5 + Math.random() * 1.5,
                twinkleSpeed: 0.03 + Math.random() * 0.02,
                twinkleOffset: Math.random() * Math.PI * 2,
                moveSpeed: 0.4
            });
        }
    }
    
    initPlanets() {
        const numPlanets = Math.floor((this.width * this.height) / 50000);
        this.planets = [];
        
        for (let i = 0; i < numPlanets; i++) {
            this.planets.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: 2 + Math.random() * 3,
                moveSpeed: 0.2,
                glowSize: 3
            });
        }
    }
    
    drawStar(star) {
        const opacity = 0.3 + (Math.sin(this.time * star.twinkleSpeed + star.twinkleOffset) + 1) * 0.25;
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawPlanet(planet) {
        // Draw glow
        const gradient = this.ctx.createRadialGradient(
            planet.x, planet.y, 0,
            planet.x, planet.y, planet.size + planet.glowSize
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.beginPath();
        this.ctx.fillStyle = gradient;
        this.ctx.arc(planet.x, planet.y, planet.size + planet.glowSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw planet
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
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
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
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
    new CelestialAnimation();
});
