/* ============================================
   PORTFOLIO MODERNE - ANIMATIONS & INTERACTIONS
   ============================================ */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Add loaded class for animations
    document.body.classList.add('loaded');

    // ============================================
    // PROTECTION CODE SOURCE
    // ============================================
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'u') { e.preventDefault(); return false; }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) { e.preventDefault(); return false; }
        if (e.key === 'F12') { e.preventDefault(); return false; }
    });

    document.addEventListener('contextmenu', e => e.preventDefault());

    // ============================================
    // CURSOR PERSONNALISÉ (Desktop only)
    // ============================================
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        const cursorDot = document.createElement('div');
        cursor.className = 'cursor';
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX - 3 + 'px';
            cursorDot.style.top = mouseY - 3 + 'px';
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect
        document.querySelectorAll('a, button, .skill-tag, .project-card, .gallery-item').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ============================================
    // LANGUAGE - Géré par translations.js
    // ============================================
    // Le sélecteur de langue est géré par LanguageManager dans translations.js

    // ============================================
    // DYNAMIC GREETING
    // ============================================
    function updateGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.getElementById('dynamicGreeting');
        if (!greetingElement) return;
        
        const currentLang = localStorage.getItem('preferredLang') || 'fr';
        const t = window.translations?.[currentLang]?.hero;
        
        let greeting;
        if (t) {
            if (hour >= 5 && hour < 12) greeting = t.greeting;
            else if (hour >= 12 && hour < 18) greeting = t.greetingAfternoon;
            else greeting = t.greetingEvening;
        } else {
            if (hour >= 5 && hour < 12) greeting = 'Bonjour, je me prénomme';
            else if (hour >= 12 && hour < 18) greeting = 'Bon après-midi, je me prénomme';
            else greeting = 'Bonsoir, je me prénomme';
        }
        
        greetingElement.textContent = greeting;
    }

    // Ne pas appeler updateGreeting ici car translations.js le fait déjà;

    // ============================================
    // PARTICLES ANIMATION
    // ============================================
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        const particleCount = 60;
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            
            draw() {
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 150) {
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }

    // ============================================
    // SCROLL ANIMATIONS - INTERSECTION OBSERVER
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Reveal text animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 150);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text').forEach(el => revealObserver.observe(el));

    // Timeline items - apparition et disparition au scroll (bidirectionnel)
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajoute un petit délai pour l'effet
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            } else {
                // Retire immédiatement la classe quand l'élément sort de la vue
                entry.target.classList.remove('visible');
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '-80px 0px -80px 0px'
    });

    document.querySelectorAll('.timeline-item').forEach(item => timelineObserver.observe(item));

    // Skills animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, i) => {
                    tag.style.animationDelay = `${i * 0.08}s`;
                });
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-category').forEach(cat => skillsObserver.observe(cat));

    // Gallery items animation
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-item').forEach(item => galleryObserver.observe(item));

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                const finalValue = parseInt(finalText);
                
                if (isNaN(finalValue)) return;
                
                let current = 0;
                const increment = finalValue / 40;
                const hasPlus = finalText.includes('+');
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        target.textContent = finalValue + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                    }
                }, 40);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => statsObserver.observe(stat));

    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const galleryImages = ['gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg', 'gallery-5.jpg'];
    let currentImageIndex = 0;

    document.querySelectorAll('.gallery-zoom-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentImageIndex = index;
            if (lightboxImg) lightboxImg.src = galleryImages[index];
            if (lightbox) {
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-overlay')?.addEventListener('click', closeLightbox);

    document.querySelector('.lightbox-prev')?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        if (lightboxImg) lightboxImg.src = galleryImages[currentImageIndex];
    });

    document.querySelector('.lightbox-next')?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        if (lightboxImg) lightboxImg.src = galleryImages[currentImageIndex];
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (formStatus) {
                formStatus.textContent = 'Envoi en cours...';
                formStatus.className = 'form-status loading';
            }
            
            try {
                const sId = 'service_3ais5uh';
                const tId = 'template_e88k90u';
                
                const result = await emailjs.sendForm(sId, tId, contactForm);
                
                if (formStatus) {
                    formStatus.textContent = 'Message envoyé avec succès !';
                    formStatus.className = 'form-status success';
                }
                contactForm.reset();
                
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }
                }, 5000);
            } catch (error) {
                console.error('Erreur:', error);
                if (formStatus) {
                    formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                    formStatus.className = 'form-status error';
                }
                
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }
                }, 5000);
            }
        });
    }

    // ============================================
    // SKILL MODAL
    // ============================================
    const skillsData = {
        'HTML': { icon: 'devicon-html5-plain colored', description: 'Langage de balisage pour structurer le contenu web.', usage: ['Structure sémantique', 'Formulaires interactifs', 'SEO optimisé'] },
        'CSS': { icon: 'devicon-css3-plain colored', description: 'Stylisation et mise en page des pages web.', usage: ['Design responsive', 'Animations fluides', 'Flexbox & Grid'] },
        'JavaScript': { icon: 'devicon-javascript-plain colored', description: 'Langage de programmation pour l\'interactivité.', usage: ['DOM manipulation', 'APIs externes', 'Expériences dynamiques'] },
        'React': { icon: 'devicon-react-original colored', description: 'Bibliothèque pour interfaces utilisateur.', usage: ['Composants réutilisables', 'State management', 'SPA performantes'] },
        'Vue.js': { icon: 'devicon-vuejs-plain colored', description: 'Framework JavaScript progressif.', usage: ['Applications réactives', 'Vue Router', 'Vuex'] },
        'TypeScript': { icon: 'devicon-typescript-plain colored', description: 'JavaScript avec typage statique.', usage: ['Code maintenable', 'Détection d\'erreurs', 'Autocomplétion'] },
        'Next.js': { icon: 'devicon-nextjs-plain', description: 'Framework React pour la production.', usage: ['SSR & SSG', 'SEO optimisé', 'Routing automatique'] },
        'Tailwind CSS': { icon: 'devicon-tailwindcss-plain colored', description: 'Framework CSS utility-first.', usage: ['Prototypage rapide', 'Design system', 'Responsive simplifié'] },
        'Bootstrap': { icon: 'devicon-bootstrap-plain colored', description: 'Framework CSS responsive.', usage: ['Grilles responsives', 'Composants UI', 'Cross-browser'] },
        'Node.js': { icon: 'devicon-nodejs-plain colored', description: 'JavaScript côté serveur.', usage: ['APIs RESTful', 'Temps réel', 'Microservices'] },
        'Express': { icon: 'devicon-express-original', description: 'Framework web minimaliste.', usage: ['APIs REST', 'Middleware', 'Routing flexible'] },
        'Python': { icon: 'devicon-python-plain colored', description: 'Langage polyvalent et puissant.', usage: ['Automatisation', 'Backend', 'Data processing'] },
        'Firebase': { icon: 'devicon-firebase-plain colored', description: 'Plateforme de développement Google.', usage: ['Base de données temps réel', 'Auth', 'Hosting'] },
        'Supabase': { icon: 'devicon-supabase-plain colored', description: 'Alternative open-source à Firebase.', usage: ['PostgreSQL', 'APIs auto-générées', 'Auth sécurisée'] },
        'PostgreSQL': { icon: 'devicon-postgresql-plain colored', description: 'Base de données relationnelle.', usage: ['SQL complexe', 'Transactions ACID', 'Intégrité données'] },
        'Flutter': { icon: 'devicon-flutter-plain colored', description: 'Framework mobile cross-platform.', usage: ['iOS & Android', 'UI native', 'Hot reload'] },
        'Expo': { icon: 'devicon-react-original colored', description: 'Framework React Native.', usage: ['Apps universelles', 'APIs natives', 'Déploiement simple'] },
        'Git': { icon: 'devicon-git-plain colored', description: 'Contrôle de version distribué.', usage: ['Versioning', 'Collaboration', 'Branches'] },
        'Docker': { icon: 'devicon-docker-plain colored', description: 'Plateforme de conteneurisation.', usage: ['Conteneurs', 'Environnements reproductibles', 'Déploiement'] },
        'AWS': { icon: 'devicon-amazonwebservices-plain-wordmark colored', description: 'Services cloud Amazon.', usage: ['Hébergement', 'S3', 'Lambda'] },
        'CI/CD': { icon: 'devicon-github-original', description: 'Intégration et déploiement continus.', usage: ['Tests automatisés', 'Déploiement continu', 'GitHub Actions'] }
    };

    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const skillName = tag.textContent.trim();
            const skill = skillsData[skillName];
            if (!skill) return;
            
            const modal = document.querySelector('.skill-modal');
            if (!modal) return;
            
            const iconEl = modal.querySelector('.skill-modal-icon');
            const titleEl = modal.querySelector('.skill-modal-header h3');
            const descEl = modal.querySelector('.skill-modal-body p');
            const ulEl = modal.querySelector('.skill-modal-details ul');
            
            if (iconEl) iconEl.className = `skill-modal-icon ${skill.icon}`;
            if (titleEl) titleEl.textContent = skillName;
            if (descEl) descEl.textContent = skill.description;
            if (ulEl) ulEl.innerHTML = skill.usage.map(u => `<li>${u}</li>`).join('');
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeSkillModal() {
        const modal = document.querySelector('.skill-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    document.querySelector('.skill-modal-close')?.addEventListener('click', closeSkillModal);
    document.querySelector('.skill-modal-overlay')?.addEventListener('click', closeSkillModal);

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeSkillModal();
        }
        if (lightbox?.classList.contains('active')) {
            if (e.key === 'ArrowLeft') document.querySelector('.lightbox-prev')?.click();
            if (e.key === 'ArrowRight') document.querySelector('.lightbox-next')?.click();
        }
    });

    // ============================================
    // IMAGE PROTECTION
    // ============================================
    document.querySelectorAll('.protected-img, .hero-profile-img, .avatar-img, .logo-img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
    });

    // ============================================
    // TILT EFFECT ON CARDS
    // ============================================
    if (window.innerWidth > 768) {
        document.querySelectorAll('[data-tilt]').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    console.log('🚀 Portfolio loaded successfully!');

}); // End DOMContentLoaded
