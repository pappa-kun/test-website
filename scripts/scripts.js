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

const themeToggleBtn = document.getElementById('theme-toggle');
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

if (userTheme) {
    document.documentElement.setAttribute('data-theme', userTheme);
} else if (systemTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

themeToggleBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});



