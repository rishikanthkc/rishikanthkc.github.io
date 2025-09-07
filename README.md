# README.md

# Personal Portfolio Website

Welcome to my personal portfolio website! This project showcases my skills, experiences, and projects I've worked on. 

## Overview

This portfolio is designed to provide visitors with an insight into my professional background, the projects I've completed, and how to get in touch with me. 

## Project Structure

```
portfolio-website
├── src
│   ├── assets
│   │   ├── css
│   │   │   └── styles.css
│   │   └── js
│   │       └── main.js
│   ├── index.html
│   ├── about.html
│   ├── projects.html
│   └── contact.html
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```
   cd portfolio-website
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Build for production (minify CSS and JS):
   ```
   npm run build
   ```

5. Start development server:
   ```
   npm start
   ```
   Or for development with auto-build:
   ```
   npm run dev
   ```

6. Open `index.html` in your web browser to view the portfolio.

## Technologies Used

- HTML5
- CSS3 (with CSS Variables, Flexbox, Grid, and modern features)
- Vanilla JavaScript (ES6+)
- Canvas API for animations

## Performance Optimizations

This portfolio includes several performance optimizations:

- **Minified Assets**: CSS and JavaScript are minified for production
- **Bundled JavaScript**: All JS files are combined into a single bundle to reduce HTTP requests
- **Optimized Font Loading**: Fonts are loaded asynchronously with fallbacks
- **Resource Hints**: Preload and prefetch directives for critical resources
- **Efficient Animations**: Canvas animations use requestAnimationFrame and are optimized for 60fps
- **Mobile-First Design**: Responsive design with touch-friendly interactions
- **Accessibility**: Includes prefers-reduced-motion support and proper ARIA attributes

## Build Process

The build process includes:
- CSS minification using clean-css
- JavaScript bundling and minification using Terser
- Automatic optimization of assets for production deployment

## Contact

Feel free to reach out via the contact form on the website or connect with me on social media!