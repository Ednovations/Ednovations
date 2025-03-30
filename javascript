// Enhanced Elysium Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. INITIAL SETUP
    // ======================
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Set current date in footer
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = currentDate;
    
    // ======================
    // 2. PARTICLE BACKGROUND
    // ======================
    
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00c8ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00a2ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // ======================
    // 3. SOUND EFFECTS
    // ======================
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let hoverSoundBuffer = null;
    
    // Load hover sound
    function loadSound(url) {
        return fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
    }
    
    // Play sound function
    function playSound(buffer) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
    
    // Load and play hover sound
    const soundElements = document.querySelectorAll('[data-sound]');
    
    loadSound('assets/sounds/hover.mp3')
        .then(buffer => {
            hoverSoundBuffer = buffer;
            soundElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    playSound(hoverSoundBuffer);
                });
            });
        })
        .catch(error => {
            console.error('Error loading sound:', error);
        });
    
    // ======================
    // 4. TYPEWRITER EFFECT
    // ======================
    
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(el => {
        const text = el.getAttribute('data-text');
        let i = 0;
        const speed = 50; // milliseconds per character
        
        function typeWriter() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Start blinking cursor animation after typing completes
                el.style.borderRight = '2px solid var(--elysium-blue)';
                setInterval(() => {
                    el.style.borderRight = el.style.borderRight === '2px solid var(--elysium-blue)' ? 
                        '2px solid transparent' : 
                        '2px solid var(--elysium-blue)';
                }, 500);
            }
        }
        
        // Start typing after 1 second delay
        setTimeout(typeWriter, 1000);
    });
    
    // ======================
    // 5. ANIMATED SKILL BARS
    // ======================
    
    const skillBars = document.querySelectorAll('.skill-level .level-bar');
    
    // Animate skill bars when they come into view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.parentElement.parentElement.getAttribute('data-level');
                entry.target.style.width = `${percent}%`;
                entry.target.style.backgroundColor = getSkillColor(percent);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    function getSkillColor(percent) {
        if (percent > 85) return '#00ff88';
        if (percent > 70) return '#00c8ff';
        if (percent > 50) return '#7700ff';
        return '#ff00e6';
    }
    
    // ======================
    // 6. INTERACTIVE ELEMENTS
    // ======================
    
    // Holographic button effects
    const holographicButtons = document.querySelectorAll('.holographic-btn, .elysium-btn');
    
    holographicButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = `0 0 15px ${getRandomColor()}, 0 0 30px ${getRandomColor()}`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '0 0 10px var(--elysium-blue), 0 0 20px var(--elysium-blue)';
        });
    });
    
    function getRandomColor() {
        const colors = ['#ff00e6', '#00c8ff', '#7700ff', '#00ff88'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Initiate Protocol button effect
    const initiateBtn = document.getElementById('initiate-btn');
    if (initiateBtn) {
        initiateBtn.addEventListener('click', () => {
            initiateBtn.textContent = 'INITIALIZING...';
            initiateBtn.style.background = 'linear-gradient(90deg, #ff00e6, #7700ff)';
            
            setTimeout(() => {
                initiateBtn.textContent = 'SYSTEMS ONLINE';
                initiateBtn.style.background = 'linear-gradient(90deg, #00ff88, #00c8ff)';
                
                setTimeout(() => {
                    initiateBtn.textContent = 'INITIATE PROTOCOL';
                    initiateBtn.style.background = 'linear-gradient(90deg, var(--elysium-blue), #00ffcc)';
                }, 2000);
            }, 1500);
        });
    }
    
    // ======================
    // 7. SMOOTH SCROLLING
    // ======================
    
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Add active class to clicked nav item
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // ======================
    // 8. FORM HANDLING
    // ======================
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'TRANSMITTING...';
            submitBtn.style.background = 'linear-gradient(90deg, #ff00e6, #7700ff)';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'TRANSMISSION SUCCESSFUL';
                submitBtn.style.background = 'linear-gradient(90deg, #00ff88, #00c8ff)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(90deg, var(--elysium-blue), #00ffcc)';
                    submitBtn.disabled = false;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Message successfully transmitted to Elysium Central';
                    contactForm.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                }, 2000);
            }, 1500);
        });
    }
    
    // ======================
    // 9. PROJECT CARD EFFECTS
    // ======================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            card.querySelector('.image-overlay').style.background = 
                `radial-gradient(circle at ${x}px ${y}px, rgba(0, 200, 255, 0.3), transparent)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            card.querySelector('.image-overlay').style.background = 
                'linear-gradient(to bottom, transparent, rgba(0, 200, 255, 0.1))';
        });
    });
    
    // ======================
    // 10. RESPONSIVE ADJUSTMENTS
    // ======================
    
    function handleResponsiveChanges() {
        const nav = document.querySelector('.elysium-nav ul');
        if (window.innerWidth < 768) {
            nav.style.flexDirection = 'column';
            nav.style.alignItems = 'center';
        } else {
            nav.style.flexDirection = 'row';
            nav.style.alignItems = 'flex-start';
        }
    }
    
    window.addEventListener('resize', handleResponsiveChanges);
    handleResponsiveChanges();
    
    // ======================
    // 11. LOADING ANIMATION
    // ======================
    
    // Show loading animation while assets load
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>CONNECTING TO ELYSIUM NETWORK...</p>
        </div>
    `;
    document.body.prepend(loadingScreen);
    
    // Hide loading screen when everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    });
});