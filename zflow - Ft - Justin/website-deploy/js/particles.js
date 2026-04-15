/**
 * Particle Background System
 * Creates an interactive particle network that responds to mouse movement
 */

(function() {
    'use strict';

    // Canvas setup
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // State
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationId;

    // Configuration
    const config = {
        particleCount: 80,
        particleSize: { min: 1, max: 2 },
        particleSpeed: { min: -0.5, max: 0.5 },
        particleOpacity: { min: 0.2, max: 0.5 },
        connectionDistance: 120,
        mouseAttractionDistance: 150,
        mouseAttractionStrength: 0.002,
        colors: {
            particle: 'rgba(33, 150, 243, ',
            connection: 'rgba(33, 150, 243, '
        }
    };

    /**
     * Particle class
     */
    class Particle {
        constructor() {
            this.reset();
            // Start at random position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
            this.speedX = Math.random() * (config.particleSpeed.max - config.particleSpeed.min) + config.particleSpeed.min;
            this.speedY = Math.random() * (config.particleSpeed.max - config.particleSpeed.min) + config.particleSpeed.min;
            this.opacity = Math.random() * (config.particleOpacity.max - config.particleOpacity.min) + config.particleOpacity.min;
        }

        update() {
            // Move particle
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse attraction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < config.mouseAttractionDistance) {
                this.x += dx * config.mouseAttractionStrength;
                this.y += dy * config.mouseAttractionStrength;
            }

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = config.colors.particle + this.opacity + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    /**
     * Initialize particles
     */
    function initParticles() {
        particles = [];
        const particleCount = Math.min(
            Math.floor((canvas.width * canvas.height) / 15000), 
            config.particleCount
        );
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    /**
     * Connect nearby particles with lines
     */
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    const opacity = 0.15 * (1 - distance / config.connectionDistance);
                    ctx.strokeStyle = config.colors.connection + opacity + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    /**
     * Animation loop
     */
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        connectParticles();

        // Continue animation
        animationId = requestAnimationFrame(animate);
    }

    /**
     * Resize canvas to fill window
     */
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    /**
     * Track mouse position
     */
    function trackMouse(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    /**
     * Track touch position for mobile
     */
    function trackTouch(e) {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }

    /**
     * Initialize the particle system
     */
    function init() {
        resizeCanvas();
        animate();

        // Event listeners
        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('mousemove', trackMouse);
        document.addEventListener('touchmove', trackTouch);
        document.addEventListener('touchstart', trackTouch);
    }

    /**
     * Cleanup function
     */
    function cleanup() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', resizeCanvas);
        document.removeEventListener('mousemove', trackMouse);
        document.removeEventListener('touchmove', trackTouch);
        document.removeEventListener('touchstart', trackTouch);
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose cleanup for potential use
    window.particleSystemCleanup = cleanup;

})();