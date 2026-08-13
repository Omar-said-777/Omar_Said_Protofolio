// ================================
// Mobile Navigation
// ================================

const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

function setMenuState(open) {
    if (!menuToggle || !navList) return;

    navList.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
}

if (menuToggle && navList) {
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();

        const isOpen = navList.classList.contains('active');
        setMenuState(!isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (
            !navList.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            setMenuState(false);
        }
    });

    // Close menu with Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const wasOpen = navList.classList.contains('active');

            setMenuState(false);

            if (wasOpen) {
                menuToggle.focus();
            }
        }
    });
}

// Close mobile menu after clicking a link
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        setMenuState(false);

        navLinks.forEach((item) => {
            item.classList.remove('active');
        });

        link.classList.add('active');
    });
});


// ================================
// Active Navigation
// ================================

const sections = document.querySelectorAll('section[id]');
const header = document.querySelector('.site-header');

function updateActiveNav() {
    const headerHeight = header ? header.offsetHeight : 84;
    const scrollPosition = window.scrollY + headerHeight + 20;

    let currentSection = null;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {
            currentSection = section;
        }
    });

    // If we're at the bottom of the page,
    // make the last section active.
    if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
    ) {
        currentSection = sections[sections.length - 1];
    }

    navLinks.forEach((link) => {
        link.classList.remove('active');
    });

    if (currentSection) {
        const activeLink = document.querySelector(
            `.nav-link[href="#${currentSection.id}"]`
        );

        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });

        ticking = true;
    }
});

// Set the correct active link on page load
updateActiveNav();

// ================================
// Scroll Reveal
// ================================

const revealElements = document.querySelectorAll(
    '.feature, .project-card, .skill-card, .about-card, .experience-card, .testimonial-card, .service-item, .contact-card, .contact-info'
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});