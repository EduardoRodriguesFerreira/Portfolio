/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Menu show
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    if(this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 100,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== TYPING EFFECT ===============*/
const typingText = document.querySelector('.typing-text');
const texts = [
    'Analista de Dados',
    'Full Stack Developer',
    'Especialista em Power BI',
    'Python Developer',
    'Desenvolvedor Web'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if(isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if(!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before starting new word
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

/*=============== SKILLS ACCORDION ===============*/
const skillsContent = document.querySelectorAll('.skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;
    
    for(let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }
    
    if(itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

// Open first skills section by default
if(skillsContent.length > 0) {
    skillsContent[0].classList.add('skills__open');
}

/*=============== SKILLS ANIMATION ON SCROLL ===============*/
const skillsSection = document.getElementById('skills');
const skillsBars = document.querySelectorAll('.skills__fill');

const animateSkills = () => {
    const skillsTop = skillsSection.offsetTop;
    const skillsHeight = skillsSection.offsetHeight;
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    if(scrollY > (skillsTop - windowHeight + skillsHeight / 2)) {
        skillsBars.forEach(bar => {
            bar.style.width = bar.parentElement.previousElementSibling.textContent;
        });
    }
}

window.addEventListener('scroll', animateSkills);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false
});

// Check if ScrollReveal is available
if(typeof ScrollReveal !== 'undefined') {
    sr.reveal('.home__data, .home__img, .about__content, .skills__content', {
        origin: 'top',
        interval: 100
    });

    sr.reveal('.experience__item', {
        origin: 'left',
        interval: 100
    });

    sr.reveal('.project__card', {
        origin: 'bottom',
        interval: 100
    });

    sr.reveal('.contact__card', {
        origin: 'bottom',
        interval: 100
    });
}

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
const elementsToAnimate = document.querySelectorAll('.project__card, .experience__item, .skills__content, .contact__card');

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.name.value;
        const email = contactForm.email.value;
        const message = contactForm.message.value;
        
        // Validate
        if(name && email && message) {
            // Show success message
            contactMessage.textContent = 'Mensagem enviada com sucesso! ✓';
            contactMessage.classList.add('success');
            contactMessage.classList.remove('error');
            
            // Clear form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                contactMessage.textContent = '';
                contactMessage.classList.remove('success');
            }, 5000);
            
            // Here you would normally send the data to a server
            console.log('Form data:', { name, email, message });
            
            // Example: Send to email service (requires backend)
            // emailjs.send('service_id', 'template_id', {
            //     from_name: name,
            //     from_email: email,
            //     message: message
            // });
            
        } else {
            contactMessage.textContent = 'Por favor, preencha todos os campos!';
            contactMessage.classList.add('error');
            contactMessage.classList.remove('success');
            
            setTimeout(() => {
                contactMessage.textContent = '';
                contactMessage.classList.remove('error');
            }, 3000);
        }
    });
}

/*=============== SMOOTH SCROLL ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*=============== PRELOADER (optional) ===============*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if(preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

/*=============== LAZY LOADING IMAGES ===============*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*=============== THEME TOGGLE (optional) ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Validate if the user previously chose a topic
if(selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    if(themeButton) {
        themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme);
    }
}

// Activate / deactivate the theme manually with the button
if(themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        
        localStorage.setItem('selected-theme', document.body.classList.contains(darkTheme) ? 'dark' : 'light');
        localStorage.setItem('selected-icon', themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun');
    });
}

/*=============== COUNTER ANIMATION ===============*/
const counters = document.querySelectorAll('.about__box span');

const countUp = (element) => {
    const target = element.textContent;
    const number = parseInt(target);
    
    if(isNaN(number)) return;
    
    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
        current += increment;
        if(current >= number) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current) + '+';
        }
    }, 30);
};

// Trigger counter animation when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            countUp(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    if(counter.textContent.includes('+')) {
        counterObserver.observe(counter);
    }
});

/*=============== CONSOLE MESSAGE ===============*/
console.log('%c👋 Olá! Bem-vindo ao meu portfólio!', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
console.log('%cSe você está vendo isso, provavelmente também é um desenvolvedor 😄', 'color: #10b981; font-size: 14px;');
console.log('%cVamos trabalhar juntos? Entre em contato!', 'color: #f59e0b; font-size: 14px;');

/*=============== PERFORMANCE MONITORING ===============*/
if('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Página carregada em ${pageLoadTime}ms`);
    });
}
