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
    });
});


// ================================
// Active Navigation
// ================================

const sections = document.querySelectorAll('section[id]');

const sectionLinks = new Map();

navLinks.forEach((link) => {
    const href = link.getAttribute('href');

    if (href && href.startsWith('#')) {
        sectionLinks.set(href.substring(1), link);
    }
});

const header = document.querySelector('.site-header');

const getHeaderHeight = () => {
    return header ? header.offsetHeight : 84;
};

const sectionObserver = new IntersectionObserver(
    (entries) => {
        const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
                (a, b) =>
                    Math.abs(a.boundingClientRect.top - getHeaderHeight()) -
                    Math.abs(b.boundingClientRect.top - getHeaderHeight())
            );

        if (!visibleSections.length) return;

        const activeSection = visibleSections[0].target;

        navLinks.forEach((link) => {
            link.classList.remove('active');
        });

        const activeLink = sectionLinks.get(activeSection.id);

        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    {
        root: null,
        rootMargin: `-${getHeaderHeight()}px 0px -50% 0px`,
        threshold: 0
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


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