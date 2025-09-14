// Interactive Elements and Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Copy Contract Address Functionality
    const copyButton = document.getElementById('copyButton');
    const contractAddress = document.getElementById('contractAddress');
    
    copyButton.addEventListener('click', function() {
        contractAddress.select();
        contractAddress.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            navigator.clipboard.writeText(contractAddress.value).then(function() {
                showCopySuccess();
            });
        } catch (err) {
            // Fallback for older browsers
            document.execCommand('copy');
            showCopySuccess();
        }
    });
    
    function showCopySuccess() {
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<span class="copy-text">Copied! | 已复制!</span><span class="copy-icon">✅</span>';
        copyButton.style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)';
        
        setTimeout(function() {
            copyButton.innerHTML = originalText;
            copyButton.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
        }, 2000);
    }
    
    // Random Glitch Effects
    function addRandomGlitch() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        glitchElements.forEach(element => {
            if (Math.random() < 0.1) { // 10% chance
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'glitchText 2s ease-in-out infinite, glitchColor 3s ease-in-out infinite';
                }, 100);
            }
        });
    }
    
    // Trigger random glitch every 3 seconds
    setInterval(addRandomGlitch, 3000);
    
    // Mouse Movement Parallax Effect (Desktop only)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const floatingElements = document.querySelectorAll('.floating-can, .floating-symbol');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // Touch-friendly parallax for mobile
    if ('ontouchstart' in window) {
        document.addEventListener('touchmove', function(e) {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                const floatingElements = document.querySelectorAll('.floating-can, .floating-symbol');
                const touchX = touch.clientX / window.innerWidth;
                const touchY = touch.clientY / window.innerHeight;
                
                floatingElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.2; // Reduced speed for mobile
                    const x = (touchX - 0.5) * speed * 10;
                    const y = (touchY - 0.5) * speed * 10;
                    
                    element.style.transform = `translate(${x}px, ${y}px)`;
                });
            }
        });
    }
    
    // Scroll-triggered Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for scroll animations
    const cards = document.querySelectorAll('.conspiracy-card, .contract-card, .social-card, .warning-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Typing Effect for Hero Text
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect for hero text
    const heroText = document.querySelector('.conspiracy-text');
    if (heroText) {
        const originalText = heroText.innerHTML;
        setTimeout(() => {
            typeWriter(heroText, originalText, 30);
        }, 1000);
    }
    
    // Random Background Glitch
    function randomBackgroundGlitch() {
        const glitchBg = document.querySelector('.glitch-bg');
        if (glitchBg && Math.random() < 0.05) { // 5% chance
            glitchBg.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
            setTimeout(() => {
                glitchBg.style.filter = 'none';
            }, 200);
        }
    }
    
    setInterval(randomBackgroundGlitch, 2000);
    
    // Easter Egg: Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
    
    function activateEasterEgg() {
        // Create a special glitch effect
        document.body.style.animation = 'glitchText 0.5s ease-in-out infinite';
        
        // Show secret message
        const secretDiv = document.createElement('div');
        secretDiv.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                       background: rgba(0,0,0,0.9); color: #00ff00; padding: 30px; 
                       border-radius: 15px; z-index: 10000; text-align: center; font-family: 'Orbitron', monospace;">
                <h2>THE TRUTH IS REVEALED | 真相大白</h2>
                <p>You've unlocked the secret! The Chinese are indeed controlling everything through Coke Zero!</p>
                <p>你解锁了秘密！中国人确实通过可口可乐零度控制一切！</p>
                <button onclick="this.parentElement.parentElement.remove(); document.body.style.animation='none';" 
                        style="margin-top: 15px; padding: 10px 20px; background: #ff0000; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Close | 关闭
                </button>
            </div>
        `;
        document.body.appendChild(secretDiv);
        
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 5000);
    }
    
    // Add click effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Random floating element spawner
    function spawnFloatingElement() {
        const symbols = ['🥤', '👁️', '🔺', '⭐', '💀', '👽'];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        const floatingElement = document.createElement('div');
        floatingElement.innerHTML = randomSymbol;
        floatingElement.style.cssText = `
            position: fixed;
            font-size: 2rem;
            opacity: 0.2;
            z-index: -1;
            pointer-events: none;
            animation: float 8s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        document.body.appendChild(floatingElement);
        
        setTimeout(() => {
            floatingElement.remove();
        }, 8000);
    }
    
    // Spawn floating elements every 5 seconds
    setInterval(spawnFloatingElement, 5000);
    
    // Console Easter Egg
    console.log(`
    🥤 Coke Zero 可乐零 - The Conspiracy Unfolds 🥤
    
    You've discovered the developer console! 
    The Chinese conspiracy runs deeper than you think...
    
    你发现了开发者控制台！
    中国阴谋比你想象的更深...
    
    Try the Konami Code: ↑↑↓↓←→←→BA
    `);
    
    // Mobile-specific optimizations
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Performance optimization: Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
    
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
    
    // Mobile-specific performance optimizations
    if (isMobile()) {
        // Reduce floating element spawn rate on mobile
        clearInterval(window.floatingInterval);
        window.floatingInterval = setInterval(spawnFloatingElement, 10000); // Every 10 seconds instead of 5
        
        // Reduce glitch effect frequency on mobile
        clearInterval(window.glitchInterval);
        window.glitchInterval = setInterval(addRandomGlitch, 5000); // Every 5 seconds instead of 3
        
        // Disable some animations on mobile for better performance
        const floatingElements = document.querySelectorAll('.floating-can, .floating-symbol');
        floatingElements.forEach(element => {
            element.style.animationDuration = '8s'; // Slower animation
        });
        
        // Add mobile-specific touch feedback
        const touchElements = document.querySelectorAll('.copy-button, .social-link');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate layout after orientation change
            const heroSvg = document.querySelector('.hero-svg');
            if (heroSvg) {
                heroSvg.style.maxWidth = '100%';
            }
        }, 100);
    });
    
    // Prevent zoom on input focus (iOS Safari)
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (isMobile()) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            }
        });
        
        input.addEventListener('blur', function() {
            if (isMobile()) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }
            }
        });
    });
});
