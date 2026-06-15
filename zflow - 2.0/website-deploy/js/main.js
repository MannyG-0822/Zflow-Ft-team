/**
 * Main JavaScript for Zoflow Tech Website
 * Handles scroll animations, navigation, parallax effects, and interactions
 */

(function() {
    'use strict';

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + '%';
    }

    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    function handleNavScroll() {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // ============================================
    // PARALLAX MOUSE TRACKING
    // ============================================
    function handleParallax(e) {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable sections
        const animatableSections = document.querySelectorAll(
            '.case-studies, .monday-section, .contact-section'
        );

        animatableSections.forEach(section => {
            observer.observe(section);
        });

        // Setup scroll-driven parallax for workflow steps
        setupWorkflowParallax();
    }

    // ============================================
    // WORKFLOW PARALLAX SCROLL ANIMATION
    // ============================================
    function setupWorkflowParallax() {
        const workflowSteps = document.querySelectorAll('.workflow-step');
        const workflowContainer = document.querySelector('.workflow-container');
        const isMobile = window.innerWidth <= 968;

        // Create SVG connector container
        if (!isMobile && workflowContainer) {
            createConnectorSVG(workflowContainer, workflowSteps);
        }

        function updateParallax() {
            const windowHeight = window.innerHeight;
            const isMobileNow = window.innerWidth <= 968;

            workflowSteps.forEach((step, index) => {
                const rect = step.getBoundingClientRect();
                const isOdd = index % 2 === 0; // 0-indexed, so 0,2,4 are odd steps (1,3,5)

                // Calculate how far into the viewport the element is
                const viewportProgress = (windowHeight - rect.top) / (windowHeight * 0.8);
                const progress = Math.max(0, Math.min(1, viewportProgress));

                if (isMobileNow) {
                    // Mobile: simple slide up
                    const yOffset = 80 * (1 - progress);
                    if (progress > 0) {
                        step.classList.add('parallax-active');
                        step.style.opacity = Math.min(1, progress * 1.5);
                        step.style.transform = `translateY(${yOffset}px)`;
                        if (progress > 0.5) {
                            step.classList.add('visible', 'settled');
                        }
                    }
                } else {
                    // Desktop: slide from edges to position
                    const startOffset = window.innerWidth * 0.6; // Start from edge
                    const currentOffset = startOffset * (1 - easeOutCubic(progress));
                    const xOffset = isOdd ? -currentOffset : currentOffset;

                    if (progress > 0) {
                        step.classList.add('parallax-active');
                        step.style.opacity = Math.min(1, progress * 2);
                        step.style.transform = `translateX(${xOffset}px)`;

                        if (progress > 0.4) {
                            step.classList.add('visible');
                        }
                        if (progress > 0.8) {
                            step.classList.add('settled');
                        }
                    } else {
                        step.classList.remove('parallax-active', 'visible', 'settled');
                        step.style.opacity = '';
                        step.style.transform = '';
                    }
                }
            });

            // Update connector lines
            if (!isMobileNow) {
                updateConnectorPaths(workflowSteps);
            }
        }

        // Easing function for smoother animation
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        // Run on scroll with throttling for performance
        window.addEventListener('scroll', throttle(updateParallax, 16), { passive: true });
        window.addEventListener('resize', throttle(() => {
            if (!isMobile && workflowContainer) {
                updateConnectorPaths(workflowSteps);
            }
        }, 100));

        // Initial call
        setTimeout(updateParallax, 100);
    }

    // ============================================
    // SVG CONNECTOR LINES
    // ============================================
    function createConnectorSVG(container, steps) {
        // Remove existing SVG if any
        const existing = container.querySelector('.workflow-connectors');
        if (existing) existing.remove();

        const svgContainer = document.createElement('div');
        svgContainer.className = 'workflow-connectors';
        svgContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2196F3;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#00BCD4;stop-opacity:1" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <g class="connector-lines" filter="url(#glow)"></g>
            </svg>
        `;
        container.insertBefore(svgContainer, container.firstChild);
    }

    function updateConnectorPaths(steps) {
        const container = document.querySelector('.workflow-container');
        if (!container) return;

        const svg = container.querySelector('.workflow-connectors svg');
        const linesGroup = svg?.querySelector('.connector-lines');
        if (!svg || !linesGroup) return;

        const containerRect = container.getBoundingClientRect();
        svg.setAttribute('width', containerRect.width);
        svg.setAttribute('height', containerRect.height);
        svg.style.width = containerRect.width + 'px';
        svg.style.height = containerRect.height + 'px';

        // Clear existing paths
        linesGroup.innerHTML = '';

        // Create paths between consecutive steps
        for (let i = 0; i < steps.length - 1; i++) {
            const currentStep = steps[i];
            const nextStep = steps[i + 1];

            const currentRect = currentStep.getBoundingClientRect();
            const nextRect = nextStep.getBoundingClientRect();

            const currentIcon = currentStep.querySelector('.workflow-icon');
            const nextIcon = nextStep.querySelector('.workflow-icon');

            if (!currentIcon || !nextIcon) continue;

            const currentIconRect = currentIcon.getBoundingClientRect();
            const nextIconRect = nextIcon.getBoundingClientRect();

            // Calculate positions relative to container
            const isCurrentOdd = i % 2 === 0;
            const isNextOdd = (i + 1) % 2 === 0;

            // Start point (center of current icon)
            const x1 = currentIconRect.left + currentIconRect.width / 2 - containerRect.left;
            const y1 = currentIconRect.bottom - containerRect.top;

            // End point (center of next icon)
            const x2 = nextIconRect.left + nextIconRect.width / 2 - containerRect.left;
            const y2 = nextIconRect.top - containerRect.top;

            // Control points for curved path
            const midY = (y1 + y2) / 2;
            const curveStrength = Math.abs(x2 - x1) * 0.3;

            // Create curved path
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = `M ${x1} ${y1}
                       C ${x1} ${y1 + curveStrength},
                         ${x2} ${y2 - curveStrength},
                         ${x2} ${y2}`;

            path.setAttribute('d', d);
            path.setAttribute('class', 'connector-path');

            // Calculate path length for animation
            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = pathLength;

            // Animate based on scroll progress of the next step
            const windowHeight = window.innerHeight;
            const progress = (windowHeight - nextRect.top) / (windowHeight * 0.8);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            // Draw the line as user scrolls
            path.style.strokeDashoffset = pathLength * (1 - clampedProgress);

            linesGroup.appendChild(path);

            // Add animated dot at the end of each path if visible
            if (clampedProgress > 0.1) {
                const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const pointOnPath = path.getPointAtLength(pathLength * clampedProgress);
                dot.setAttribute('cx', pointOnPath.x);
                dot.setAttribute('cy', pointOnPath.y);
                dot.setAttribute('r', '6');
                dot.setAttribute('class', 'connector-dot');
                linesGroup.appendChild(dot);
            }
        }
    }

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // CASE CARD INTERACTIONS
    // ============================================
    function setupCardInteractions() {
        const caseCards = document.querySelectorAll('.case-card');
        
        caseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add custom hover effects here if needed
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    function setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const mobileBreakpoint = 968;

        if (!mobileToggle || !navLinks) return;

        function checkMobile() {
            return window.innerWidth <= mobileBreakpoint;
        }

        // Store for future use
        window.isMobile = checkMobile;

        // Toggle menu
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                if (navLinks.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Close menu on resize if switching to desktop
        window.addEventListener('resize', throttle(() => {
            if (!checkMobile() && navLinks.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250));

        // ESC key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // PERFORMANCE: LAZY LOAD IMAGES (if we add them)
    // ============================================
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            // Observe all images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ============================================
    function setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Escape key - could close modals in future
            if (e.key === 'Escape') {
                // Close any open modals/menus
            }
            
            // Add more keyboard shortcuts as needed
        });
    }

    // ============================================
    // ANALYTICS / TRACKING (placeholder)
    // ============================================
    function trackEvents() {
        // Track CTA button clicks
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', () => {
                // Send to analytics
                console.log('CTA clicked:', button.textContent);
                // Example: gtag('event', 'click', { 'event_category': 'CTA' });
            });
        });

        // Track case study interactions
        document.querySelectorAll('.case-link').forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('Case study clicked');
                // Example: gtag('event', 'click', { 'event_category': 'Case Study' });
            });
        });
    }

    // ============================================
    // ADD DYNAMIC YEAR TO FOOTER
    // ============================================
    function updateCopyrightYear() {
        const footer = document.querySelector('.footer-bottom');
        if (footer) {
            const currentYear = new Date().getFullYear();
            footer.innerHTML = footer.innerHTML.replace(/\d{4}/, currentYear);
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        // Setup all features
        setupScrollAnimations();
        setupSmoothScrolling();
        setupCardInteractions();
        setupMobileMenu();
        setupLazyLoading();
        setupKeyboardNav();
        trackEvents();
        updateCopyrightYear();

        // Event listeners with throttling for performance
        window.addEventListener('scroll', throttle(() => {
            updateScrollProgress();
            handleNavScroll();
        }, 16)); // ~60fps

        // Parallax effect (only on desktop)
        if (window.innerWidth > 968) {
            document.addEventListener('mousemove', throttle(handleParallax, 16));
        }

        // Log initialization
        console.log('🔄 Zoflow Tech website initialized');
    }

    // ============================================
    // START WHEN DOM IS READY
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // EXPOSE UTILITIES TO WINDOW (optional)
    // ============================================
    window.ZoflowUtils = {
        throttle,
        updateScrollProgress,
        handleNavScroll
    };

})();