// Protection contre l'affichage du code source
document.addEventListener('keydown', function(e) {
    // Bloquer Ctrl+U (voir le code source)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    
    // Bloquer Ctrl+Shift+I (outils de développement)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    
    // Bloquer F12 (outils de développement)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Bloquer Ctrl+Shift+J (console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    
    // Bloquer Ctrl+Shift+C (inspecteur)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
});

// Bloquer le clic droit sur toute la page
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Dynamic greeting based on time (now handled by LanguageManager in translations.js)
function updateGreeting() {
    // Check if langManager exists and use it
    if (window.langManager) {
        const currentLang = localStorage.getItem('preferredLang') || 'fr';
        window.langManager.updateGreeting(currentLang);
        return;
    }
    
    // Fallback for initial load before langManager is ready
    const hour = new Date().getHours();
    const greetingElement = document.getElementById('dynamicGreeting');
    if (!greetingElement) return;
    
    const currentLang = localStorage.getItem('preferredLang') || 'fr';
    const t = window.translations ? window.translations[currentLang]?.hero : null;
    
    let greeting;
    if (t) {
        if (hour >= 5 && hour < 12) {
            greeting = t.greeting;
        } else if (hour >= 12 && hour < 18) {
            greeting = t.greetingAfternoon;
        } else {
            greeting = t.greetingEvening;
        }
    } else {
        // Default French fallback
        if (hour >= 5 && hour < 12) {
            greeting = 'Bonjour, je me prénomme';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Bon après-midi, je me prénomme';
        } else {
            greeting = 'Bonsoir, je me prénomme';
        }
    }
    
    greetingElement.textContent = greeting;
}

// Update greeting on page load
updateGreeting();

// Protection contre le téléchargement des images
document.addEventListener('DOMContentLoaded', function() {
    // Protection image hero
    const profileImg = document.querySelector('.hero-profile-img');
    const imageContainer = document.querySelector('.hero-image-container');
    
    // Protection image avatar contact
    const avatarImg = document.querySelector('.avatar-img');
    const avatarContainer = document.querySelector('.contact-avatar');
    
    // Protection image logo navbar
    const logoImg = document.querySelector('.logo-img');
    const logoContainer = document.querySelector('.logo');
    
    // Fonction de protection générique
    function protectImage(img, container) {
        if (img) {
            // Bloquer le clic droit sur l'image
            img.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
            
            // Bloquer le drag
            img.addEventListener('dragstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
            
            // Bloquer la sélection
            img.addEventListener('selectstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
            
            // Bloquer mousedown
            img.addEventListener('mousedown', function(e) {
                if (e.button === 2) { // Clic droit
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        }
        
        if (container) {
            // Bloquer le clic droit sur le conteneur
            container.addEventListener('contextmenu', function(e) {
                if (e.target === img || container.contains(img)) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        }
    }
    
    // Appliquer la protection
    protectImage(profileImg, imageContainer);
    protectImage(avatarImg, avatarContainer);
    protectImage(logoImg, logoContainer);
    
    // Bloquer les raccourcis clavier pour sauvegarder l'image
    document.addEventListener('keydown', function(e) {
        // Ctrl+S ou Cmd+S
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            if (document.activeElement === profileImg || 
                document.activeElement === avatarImg ||
                document.activeElement === logoImg ||
                (imageContainer && imageContainer.contains(document.activeElement)) ||
                (avatarContainer && avatarContainer.contains(document.activeElement)) ||
                (logoContainer && logoContainer.contains(document.activeElement))) {
                e.preventDefault();
                return false;
            }
        }
    });
});

// Mobile menu toggle - iOS Style
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open (iOS style)
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    }
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Form submission avec EmailJS
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Afficher le message de chargement
    formStatus.textContent = 'Envoi en cours...';
    formStatus.className = 'form-status loading';
    
    try {
        // Configuration obfusquée
        const _0x2c3d = ['service_','3ais5uh','template_','e88k90u'];
        const sId = _0x2c3d[0] + _0x2c3d[1];
        const tId = _0x2c3d[2] + _0x2c3d[3];
        
        // Envoyer directement via EmailJS
        const result = await emailjs.sendForm(sId, tId, contactForm);
        
        console.log('Email envoyé avec succès:', result);
        
        formStatus.textContent = 'Message envoyé avec succès ! Je vous répondrai bientôt.';
        formStatus.className = 'form-status success';
        contactForm.reset();
        
        // Effacer le message après 5 secondes
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    } catch (error) {
        console.error('Erreur EmailJS:', error);
        formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
        formStatus.className = 'form-status error';
        
        // Effacer le message après 5 secondes
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    }
});

// Animate stats on scroll
const stats = document.querySelectorAll('.stat-number');
const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    target.textContent = finalValue + '+';
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(currentValue) + '+';
                }
            }, 30);
            observer.unobserve(target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
stats.forEach(stat => statsObserver.observe(stat));

// Particles animation
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
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
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 120)})`;
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

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Reveal text animation
const revealTexts = document.querySelectorAll('.reveal-text');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

revealTexts.forEach(text => revealObserver.observe(text));

// 3D Tilt effect
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Smooth cursor glow
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});


// Projects Carousel
class ProjectCarousel {
    constructor(carouselId) {
        this.carousel = document.getElementById(carouselId);
        if (!this.carousel) return;
        
        this.track = this.carousel.querySelector('.projects-track');
        this.cards = this.track.querySelectorAll('.project-card');
        this.prevBtn = document.querySelector(`[data-carousel="${carouselId.replace('-carousel', '')}"].prev-btn`);
        this.nextBtn = document.querySelector(`[data-carousel="${carouselId.replace('-carousel', '')}"].next-btn`);
        
        this.currentIndex = 0;
        this.cardWidth = 0;
        this.cardsPerView = 3;
        
        this.init();
    }
    
    init() {
        this.calculateDimensions();
        this.updateButtons();
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        window.addEventListener('resize', () => {
            this.calculateDimensions();
            this.updatePosition();
        });
        
        // Touch/Swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            isDragging = false;
        });
    }
    
    calculateDimensions() {
        const containerWidth = this.carousel.offsetWidth;
        
        if (window.innerWidth < 768) {
            this.cardsPerView = 1;
        } else if (window.innerWidth < 1024) {
            this.cardsPerView = 2;
        } else {
            this.cardsPerView = 3;
        }
        
        this.cardWidth = containerWidth / this.cardsPerView;
    }
    
    updatePosition() {
        const offset = -this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateButtons();
    }
    
    updateButtons() {
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= maxIndex;
        }
    }
    
    next() {
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updatePosition();
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updatePosition();
        }
    }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel('websites-carousel');
    new ProjectCarousel('apps-carousel');
});


// Timeline Scroll Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ne plus observer une fois visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialiser l'animation au chargement
document.addEventListener('DOMContentLoaded', () => {
    initTimelineAnimation();
});


// Timeline Animation on Scroll (bidirectionnelle)
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Apparaît quand visible
            entry.target.classList.add('visible');
        } else {
            // Disparaît quand invisible (scroll inverse)
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Observer tous les items de la timeline
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});




// Skills Animation on Scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animer les tags avec délai progressif
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach((tag, index) => {
                tag.style.animationDelay = `${index * 0.1}s`;
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observer skill categories
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        skillsObserver.observe(category);
    });
});


// Skill Details Data
const skillsData = {
    'HTML': {
        icon: 'devicon-html5-plain colored',
        description: 'HTML (HyperText Markup Language) est le langage de balisage standard pour créer des pages web. Il structure le contenu et définit la sémantique des éléments.',
        usage: [
            'Structure sémantique de tous mes sites web',
            'Création de formulaires interactifs',
            'Intégration de contenus multimédias',
            'Optimisation SEO avec balises appropriées'
        ]
    },
    'CSS': {
        icon: 'devicon-css3-plain colored',
        description: 'CSS (Cascading Style Sheets) est utilisé pour styliser et mettre en page les pages web. Il contrôle les couleurs, polices, espacements et animations.',
        usage: [
            'Design responsive pour tous les appareils',
            'Animations et transitions fluides',
            'Layouts modernes avec Flexbox et Grid',
            'Thèmes personnalisés et cohérents'
        ]
    },
    'JavaScript': {
        icon: 'devicon-javascript-plain colored',
        description: 'JavaScript est le langage de programmation qui rend les pages web interactives. Il permet de créer des expériences utilisateur dynamiques.',
        usage: [
            'Interactions utilisateur en temps réel',
            'Manipulation du DOM',
            'Validation de formulaires',
            'Intégration d\'APIs externes'
        ]
    },
    'React': {
        icon: 'devicon-react-original colored',
        description: 'React est une bibliothèque JavaScript pour construire des interfaces utilisateur. Elle permet de créer des composants réutilisables et des applications performantes.',
        usage: [
            'Applications web single-page (SPA)',
            'Composants réutilisables et modulaires',
            'Gestion d\'état avec hooks',
            'Interfaces utilisateur réactives'
        ]
    },
    'Vue.js': {
        icon: 'devicon-vuejs-plain colored',
        description: 'Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur. Il est facile à intégrer et très performant.',
        usage: [
            'Applications web interactives',
            'Composants Vue réutilisables',
            'Routing avec Vue Router',
            'Gestion d\'état avec Vuex'
        ]
    },
    'TypeScript': {
        icon: 'devicon-typescript-plain colored',
        description: 'TypeScript est un sur-ensemble de JavaScript qui ajoute le typage statique. Il améliore la qualité du code et facilite la maintenance.',
        usage: [
            'Projets à grande échelle',
            'Détection d\'erreurs à la compilation',
            'Meilleure autocomplétion IDE',
            'Code plus maintenable et documenté'
        ]
    },
    'Next.js': {
        icon: 'devicon-nextjs-plain',
        description: 'Next.js est un framework React pour la production. Il offre le rendu côté serveur, la génération de sites statiques et l\'optimisation automatique.',
        usage: [
            'Sites web optimisés pour le SEO',
            'Rendu côté serveur (SSR)',
            'Génération de sites statiques (SSG)',
            'Routing automatique basé sur les fichiers'
        ]
    },
    'Tailwind CSS': {
        icon: 'devicon-tailwindcss-plain colored',
        description: 'Tailwind CSS est un framework CSS utility-first qui permet de construire rapidement des designs personnalisés sans quitter le HTML.',
        usage: [
            'Prototypage rapide d\'interfaces',
            'Design system cohérent',
            'Responsive design simplifié',
            'Personnalisation facile des thèmes'
        ]
    },
    'Bootstrap': {
        icon: 'devicon-bootstrap-plain colored',
        description: 'Bootstrap est le framework CSS le plus populaire pour développer des sites web responsives et mobile-first.',
        usage: [
            'Grilles responsives prêtes à l\'emploi',
            'Composants UI pré-stylisés',
            'Développement rapide de prototypes',
            'Compatibilité cross-browser'
        ]
    },
    'Node.js': {
        icon: 'devicon-nodejs-plain colored',
        description: 'Node.js est un environnement d\'exécution JavaScript côté serveur. Il permet de créer des applications backend performantes et scalables.',
        usage: [
            'APIs RESTful',
            'Serveurs web performants',
            'Applications en temps réel',
            'Microservices'
        ]
    },
    'Express': {
        icon: 'devicon-express-original',
        description: 'Express est un framework web minimaliste pour Node.js. Il simplifie la création d\'APIs et d\'applications web.',
        usage: [
            'Création d\'APIs REST',
            'Middleware personnalisés',
            'Routing flexible',
            'Gestion des requêtes HTTP'
        ]
    },
    'Python': {
        icon: 'devicon-python-plain colored',
        description: 'Python est un langage de programmation polyvalent, lisible et puissant. Idéal pour le backend, l\'automatisation et le data science.',
        usage: [
            'Scripts d\'automatisation',
            'APIs backend',
            'Traitement de données',
            'Intégrations système'
        ]
    },
    'Firebase': {
        icon: 'devicon-firebase-plain colored',
        description: 'Firebase est une plateforme de développement d\'applications de Google. Elle offre une base de données en temps réel, l\'authentification et l\'hébergement.',
        usage: [
            'Base de données temps réel',
            'Authentification utilisateurs',
            'Hébergement d\'applications',
            'Cloud Functions serverless'
        ]
    },
    'Supabase': {
        icon: 'devicon-supabase-plain colored',
        description: 'Supabase est une alternative open-source à Firebase. Il offre une base de données PostgreSQL, l\'authentification et le stockage.',
        usage: [
            'Base de données PostgreSQL',
            'APIs auto-générées',
            'Authentification sécurisée',
            'Stockage de fichiers'
        ]
    },
    'PostgreSQL': {
        icon: 'devicon-postgresql-plain colored',
        description: 'PostgreSQL est un système de gestion de base de données relationnelle open-source, puissant et fiable.',
        usage: [
            'Stockage de données structurées',
            'Requêtes SQL complexes',
            'Transactions ACID',
            'Intégrité des données'
        ]
    },
    'Flutter': {
        icon: 'devicon-flutter-plain colored',
        description: 'Flutter est le framework de Google pour créer des applications mobiles natives pour iOS et Android à partir d\'une seule base de code.',
        usage: [
            'Applications mobiles cross-platform',
            'UI native performante',
            'Hot reload pour développement rapide',
            'Widgets personnalisables'
        ]
    },
    'Expo': {
        icon: 'devicon-react-original colored',
        description: 'Expo est un framework et une plateforme pour React Native. Il simplifie le développement d\'applications mobiles universelles.',
        usage: [
            'Applications React Native',
            'Développement sans configuration',
            'Accès aux APIs natives',
            'Déploiement simplifié'
        ]
    },
    'Git': {
        icon: 'devicon-git-plain colored',
        description: 'Git est un système de contrôle de version distribué. Il permet de suivre les modifications du code et de collaborer efficacement.',
        usage: [
            'Versioning du code source',
            'Collaboration en équipe',
            'Branches pour fonctionnalités',
            'Historique des modifications'
        ]
    },
    'Docker': {
        icon: 'devicon-docker-plain colored',
        description: 'Docker est une plateforme de conteneurisation qui permet d\'empaqueter des applications avec leurs dépendances.',
        usage: [
            'Conteneurisation d\'applications',
            'Environnements reproductibles',
            'Déploiement simplifié',
            'Isolation des services'
        ]
    },
    'AWS': {
        icon: 'devicon-amazonwebservices-plain-wordmark colored',
        description: 'Amazon Web Services est la plateforme cloud la plus complète. Elle offre des services d\'hébergement, de stockage et de calcul.',
        usage: [
            'Hébergement d\'applications',
            'Stockage cloud (S3)',
            'Bases de données managées',
            'Services serverless (Lambda)'
        ]
    },
    'CI/CD': {
        icon: 'devicon-github-original',
        description: 'CI/CD (Continuous Integration/Continuous Deployment) automatise les tests et le déploiement du code.',
        usage: [
            'Tests automatisés',
            'Déploiement continu',
            'Intégration GitHub Actions',
            'Pipeline de build automatique'
        ]
    }
};

// Modal Management
const modal = document.getElementById('skillModal');
const modalOverlay = modal.querySelector('.skill-modal-overlay');
const modalClose = modal.querySelector('.skill-modal-close');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalUsage = document.getElementById('modalUsage');

// Open modal
function openSkillModal(skillName) {
    const skill = skillsData[skillName];
    if (!skill) return;
    
    modalIcon.className = `skill-modal-icon ${skill.icon}`;
    modalTitle.textContent = skillName;
    modalDescription.textContent = skill.description;
    
    modalUsage.innerHTML = '';
    skill.usage.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalUsage.appendChild(li);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeSkillModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeSkillModal);
modalOverlay.addEventListener('click', closeSkillModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeSkillModal();
    }
});

// Add click event to all skill tags
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.style.cursor = 'pointer';
        tag.addEventListener('click', () => {
            const skillName = tag.textContent.trim();
            openSkillModal(skillName);
        });
    });
});
