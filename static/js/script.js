// --- Efeito Typewriter --- 
const typewriterText = document.getElementById("typewriter-text");
const texts = [
    "Desenvolvedora Full Stack transformando ideias em soluções digitais inovadoras",
    "Soluções Digitais com foco em experiência do usuário",
    "Foco em tecnologia e aprendizado contínuo",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function type() {
    if (!typewriterText) return;
    const currentText = texts[textIndex];
    if (isDeleting) {
        typewriterText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
            isDeleting = true;
        }, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const typingSpeed = isDeleting ? 50 : 90;
    if (!isPaused) setTimeout(type, typingSpeed);
}

// --- Menu Responsivo ---
const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".menu-list");
if (menuToggle && menuList) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuList.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
}

// --- Rolagem suave para links de navegação ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

// --- Botão Voltar ao Topo ---
const scrollToTopBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
    if (!scrollToTopBtn) return;
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// --- Inicialização --- 
document.addEventListener("DOMContentLoaded", () => {
    type();

    // Adicionar a classe animated-section às seções (defesa em profundidade)
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("animated-section");
    });

    // --- Animação de Seções (Intersection Observer) ---
    // Agora criado DEPOIS de as seções terem .animated-section
    const animatedSections = document.querySelectorAll(".animated-section");
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Evita remover 'visible' ao sair; anima só uma vez
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
    animatedSections.forEach(section => observer.observe(section));

    // --- Link ativo no menu conforme a seção visível ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.7
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").substring(1) === entry.target.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
