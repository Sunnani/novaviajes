// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax hero effect
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (scrollPos < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollPos * 0.4}px) scale(1.05)`;
    }
});

// Scroll Reveal Intersection Observer
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve to trigger only once
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        btn.style.transition = 'transform 0.1s ease-out';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Flatpickr initialization
flatpickr("#datePicker", {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "j M, Y",
    locale: "es",
    showMonths: 1
});

// Dropdown Destino Logic
const destinoInput = document.getElementById('destinoInput');
const destinoDropdown = document.getElementById('destinoDropdown');

if(destinoInput && destinoDropdown) {
    destinoInput.addEventListener('click', (e) => {
        e.stopPropagation();
        destinoDropdown.classList.toggle('active');
    });

    destinoDropdown.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            destinoInput.value = item.textContent;
            destinoDropdown.classList.remove('active');
        });
    });

    document.addEventListener('click', () => {
        destinoDropdown.classList.remove('active');
    });
}
