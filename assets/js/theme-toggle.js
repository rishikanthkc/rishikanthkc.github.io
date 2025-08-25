// Dark Mode Theme Toggle
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme);
        
        // Create and add toggle button
        this.createToggleButton();
        
        // Listen for system theme changes
        this.listenForSystemTheme();
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle button state
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.setAttribute('data-theme', theme);
        }
        
        // Update celestial animations if they exist
        this.updateCelestialTheme(theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    createToggleButton() {
        // Create toggle button
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('data-theme', this.theme);
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.setAttribute('title', 'Toggle dark mode');
        
        // Create sun icon for light mode
        const sunIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        sunIcon.setAttribute('viewBox', '0 0 24 24');
        sunIcon.innerHTML = `
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        `;
        
        // Create moon icon for dark mode
        const moonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        moonIcon.setAttribute('viewBox', '0 0 24 24');
        moonIcon.innerHTML = `
            <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
        `;
        
        // Add appropriate icon based on current theme
        if (this.theme === 'dark') {
            toggle.appendChild(moonIcon);
        } else {
            toggle.appendChild(sunIcon);
        }
        
        // Add click event
        toggle.addEventListener('click', () => {
            this.toggleTheme();
            this.updateToggleIcon();
        });
        
        // Add to page
        document.body.appendChild(toggle);
    }

    updateToggleIcon() {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;
        
        // Clear existing icon
        toggle.innerHTML = '';
        
        // Add new icon
        if (this.theme === 'dark') {
            const moonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            moonIcon.setAttribute('viewBox', '0 0 24 24');
            moonIcon.innerHTML = `
                <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
            `;
            toggle.appendChild(moonIcon);
        } else {
            const sunIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            sunIcon.setAttribute('viewBox', '0 0 24 24');
            sunIcon.innerHTML = `
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            `;
            toggle.appendChild(sunIcon);
        }
    }

    updateCelestialTheme(theme) {
        // Update celestial animations if they exist
        const celestialCanvas = document.querySelector('.celestial-canvas');
        if (celestialCanvas) {
            if (theme === 'dark') {
                celestialCanvas.style.filter = 'brightness(0.8) contrast(1.2)';
            } else {
                celestialCanvas.style.filter = 'none';
            }
        }
    }

    listenForSystemTheme() {
        // Check if user prefers dark mode
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
                this.updateToggleIcon();
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        
        // Set initial theme based on system preference if no manual choice
        if (!localStorage.getItem('theme')) {
            this.setTheme(mediaQuery.matches ? 'dark' : 'light');
            this.updateToggleIcon();
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

// Export for potential external use
window.ThemeManager = ThemeManager;
