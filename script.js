// =========================================================
// 1. INITIALIZE ICONS
// =========================================================
// This renders the icons from the feather-icons library
feather.replace();

// =========================================================
// 2. DARK MODE TOGGLE
// =========================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

// Check Local Storage for saved preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    bodyElement.setAttribute('data-theme', 'dark');
    updateIcon('sun');
} else {
    updateIcon('moon');
}

// Toggle Logic
themeToggleBtn.addEventListener('click', () => {
    if (bodyElement.getAttribute('data-theme') === 'dark') {
        bodyElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateIcon('moon');
    } else {
        bodyElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateIcon('sun');
    }
});

// Helper to switch the icon inside the button
function updateIcon(iconName) {
    themeToggleBtn.innerHTML = `<i data-feather="${iconName}"></i>`;
    feather.replace(); // Re-render the new icon
}

// =========================================================
// 3. TYPING ANIMATION (HERO SECTION)
// =========================================================
const typeWriterElement = document.querySelector('.type-writer');
const phrases = [
    "Coding imagination.",
    "Designing logic.",
    "Building solutions."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Remove a character
        typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Deleting is faster
    } else {
        // Add a character
        typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Typing is normal speed
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing phrase, wait before deleting
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Only start if the element exists on the page
if(typeWriterElement) {
    document.addEventListener('DOMContentLoaded', type);
}

// =========================================================
// 4. 3D TILT EFFECT (PROJECT CARDS)
// =========================================================
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        // Calculate mouse position relative to the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation (max 10 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;

        // Apply style
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    // Reset when mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        card.style.transition = 'transform 0.5s ease';
    });

    // Remove transition on enter to make movement snappy
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; 
    });
});

// =========================================================
// 5. PROJECT FILTERS
// =========================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Update Active Button State
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Get Filter Value (ui, dev, ai, or all)
        const filterValue = btn.getAttribute('data-filter');

        // 3. Show/Hide Cards
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
                card.classList.add('show');
            } else {
                card.classList.add('hide');
                card.classList.remove('show');
            }
        });
        
        // Safety check to ensure icons stay rendered after filtering
        if(typeof feather !== 'undefined') {
            feather.replace();
        }
    });
});

// =========================================================
// 6. LIVE VISITOR COUNTER
// =========================================================
const counterElement = document.getElementById('visit-count');

function updateCounter() {
    // Unique ID for your portfolio. 
    // If you change the 'namespace', the count resets to 0.
    const namespace = 'naveen-biradar-portfolio-2025'; 
    const key = 'visits';

    if (!counterElement) return;

    // Fetch data from counterapi.dev
    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
        .then(response => response.json())
        .then(data => {
            counterElement.innerText = data.count;
            counterElement.style.opacity = 1;
        })
        .catch(error => {
            console.error('Visitor count failed:', error);
            // Fallback text if API fails (e.g., due to adblocker)
            counterElement.innerText = '100+'; 
        });
}

// Run the counter when page loads
document.addEventListener('DOMContentLoaded', updateCounter);