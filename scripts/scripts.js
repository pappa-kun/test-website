// Hide & Show Animation
const mobileObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.2 });

const desktopObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.4 });

const hiddenElements = document.querySelectorAll('.hidden');

if (window.matchMedia("(max-width: 768px)").matches) {
    hiddenElements.forEach((el) => mobileObserver.observe(el));
} else {
    hiddenElements.forEach((el) => desktopObserver.observe(el));
}

window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        hiddenElements.forEach((el) => {
            mobileObserver.observe(el);
            desktopObserver.unobserve(el);
        });
    } else {
        hiddenElements.forEach((el) => {
            desktopObserver.observe(el);
            mobileObserver.unobserve(el);
        });
    }
});

// Progress bar (disabled)
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.progress-bar-section');
    const prevDot = document.querySelector('#section-prev');
    const currentDot = document.querySelector('#section-current');
    const nextDot = document.querySelector('#section-next');

    const updateProgressBar = () => {
        let currentIndex = 0;
        console.log('Updating Progress Bar');

        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;
            console.log(`Section ${index + 1} Top: ${sectionTop}`);

            if (sectionTop < window.innerHeight / 2) {
                currentIndex = index;
            }
        });

        console.log(`Current Index: ${currentIndex}`);

        const prevTitle = currentIndex > 0 ? sections[currentIndex - 1].querySelector('.section-title').textContent : '';
        const currentTitle = sections[currentIndex].querySelector('.section-title').textContent;
        const nextTitle = currentIndex < sections.length - 1 ? sections[currentIndex + 1].querySelector('.section-title').textContent : '';

        console.log(`Previous: ${prevTitle}, Current: ${currentTitle}, Next: ${nextTitle}`);

        prevDot.textContent = prevTitle;
        currentDot.textContent = currentTitle;
        nextDot.textContent = nextTitle;

        prevDot.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
        nextDot.style.visibility = currentIndex < sections.length - 1 ? 'visible' : 'hidden';
    };

    updateProgressBar();

    window.addEventListener('scroll', updateProgressBar);
});

// Theme switching
const themeToggleButton = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);

    localStorage.setItem('theme', theme);

    updateIcons();
};

const updateIcons = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }
};

const savedTheme = localStorage.getItem('theme');
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme(userPrefersDark ? 'dark' : 'light');
}

themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});






