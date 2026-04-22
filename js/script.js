// ========== TEMA DARK/LIGHT ==========
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Verificar tema salvo no localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Atualizar ícone baseado no tema atual
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Inicializar ícone
updateThemeIcon();

// Alternar tema ao clicar no botão
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// ========== NAVEGAÇÃO MOBILE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== NAVBAR COM SCROLL ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
    }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ANIMAÇÃO DAS HABILIDADES ==========
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// ========== ANIMAÇÃO DE ENTRADA DOS ELEMENTOS ==========
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .about-content');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ========== FORMULÁRIO DE CONTATO ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obter valores do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        // Por exemplo, usando EmailJS, Formspree, ou sua própria API
        
        // Exemplo de mensagem de sucesso
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        contactForm.reset();
        
        // Você pode substituir isso por uma integração real, como:
        // - EmailJS: https://www.emailjs.com/
        // - Formspree: https://formspree.io/
        // - Ou criar sua própria API backend
    });
}

// ========== CARREGAMENTO DAS IMAGENS DE PROJETO ==========
// Esta função cria placeholders para as imagens dos projetos
// Substitua os caminhos das imagens no HTML pelos seus projetos reais
document.addEventListener('DOMContentLoaded', () => {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        // Se a imagem não existir, adiciona um placeholder
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400/6366f1/ffffff?text=Seu+Projeto';
        };
    });
    
    // Placeholder para a imagem de perfil
    const profileImage = document.querySelector('.about-image img');
    if (profileImage) {
        profileImage.onerror = function() {
            this.src = 'https://via.placeholder.com/400x400/6366f1/ffffff?text=Sua+Foto';
        };
    }
});

// ========== ACTIVE LINK NA NAVEGAÇÃO ==========
const sections = document.querySelectorAll('section[id]');

function activeMenu() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', activeMenu);

// ========== TYPED EFFECT (OPCIONAL) ==========
// Se você quiser um efeito de digitação no título
// Você pode descomentar e personalizar isso:
/*
const typedText = document.querySelector('.hero-subtitle');
const textArray = ['Desenvolvedor Full Stack', 'Designer UI/UX', 'Criador de Soluções'];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) setTimeout(type, 1000);
});
*/
