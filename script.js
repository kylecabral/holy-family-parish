// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Mobile Dropdown Toggle
document.querySelectorAll('.has-dropdown > a').forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = item.parentElement;
            parent.classList.toggle('open');
            // Close other dropdowns
            document.querySelectorAll('.has-dropdown.open').forEach(openItem => {
                if (openItem !== parent) {
                    openItem.classList.remove('open');
                }
            });
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Donation Amount Selection
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('custom-amount');

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        amountBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Clear custom amount
        if (customAmountInput) {
            customAmountInput.value = '';
        }
    });
});

if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
        // Remove active class from preset buttons when custom amount is entered
        amountBtns.forEach(b => b.classList.remove('active'));
    });
}

// Contact Form Submission (placeholder - would connect to backend)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Placeholder - in production, this would send to a backend
        console.log('Contact form submitted:', data);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Give Button (placeholder - would connect to payment processor)
const giveBtn = document.querySelector('.give-form .btn-primary');
if (giveBtn) {
    giveBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Get selected amount
        const activeBtn = document.querySelector('.amount-btn.active');
        const customAmount = customAmountInput?.value;
        const donationType = document.getElementById('donation-type')?.value;

        let amount = customAmount;
        if (activeBtn && !customAmount) {
            amount = activeBtn.dataset.amount;
        }

        if (!amount) {
            alert('Please select or enter a donation amount.');
            return;
        }

        // Placeholder - in production, this would connect to Stripe, PayPal, etc.
        console.log('Donation:', { amount, type: donationType });
        alert(`Thank you for your generosity! This would redirect to a secure payment processor for a $${amount} donation to the ${donationType} fund.`);
    });
}

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active nav link highlighting based on centered section
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const viewportCenter = window.innerHeight / 2;
    let closestSection = null;
    let closestDistance = Infinity;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + (rect.height / 2);
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

        if (distanceFromCenter < closestDistance) {
            closestDistance = distanceFromCenter;
            closestSection = section;
        }
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the closest section's nav link
    if (closestSection) {
        const sectionId = closestSection.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }
    }
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Simple animation on scroll (elements with .animate class will fade in)
const animateElements = document.querySelectorAll('.animate');

const animateOnScroll = () => {
    animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;

        if (isVisible) {
            el.classList.add('visible');
        }
    });
};

if (animateElements.length > 0) {
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on load
}

// Slideshow functionality
const slides = document.querySelectorAll('.slide');
const slideIndicatorsContainer = document.getElementById('slide-indicators');
let indicators = [];
let currentSlide = 0;
let slideInterval;

// Dynamically create slide indicators
function createSlideIndicators() {
    if (!slideIndicatorsContainer || slides.length === 0) return;

    slideIndicatorsContainer.innerHTML = '';
    indicators = [];

    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'indicator' + (i === 0 ? ' active' : '');
        indicator.dataset.slide = i;
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(i);
            slideInterval = setInterval(nextSlide, 5000);
        });
        slideIndicatorsContainer.appendChild(indicator);
        indicators.push(indicator);
    }
}

function showSlide(index) {
    // Wrap around
    if (index >= slides.length) {
        index = 0;
    } else if (index < 0) {
        index = slides.length - 1;
    }

    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function startSlideshow() {
    createSlideIndicators();
    if (slides.length > 0) {
        // Show first slide
        showSlide(0);
        // Auto-advance every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);
    }
}

// Start slideshow on page load
startSlideshow();

// Announcements Carousel
const announcementsTrack = document.getElementById('announcements-track');
const announcementCards = document.querySelectorAll('.announcement-card');
const announcementsIndicators = document.getElementById('announcements-indicators');
const announcementPrev = document.getElementById('announcement-prev');
const announcementNext = document.getElementById('announcement-next');
let currentAnnouncementSlide = 0;
let announcementInterval;
let announcementDots = [];

// Check if carousel should be enabled (more than 3 cards)
const carouselEnabled = announcementCards.length > 3;

// Dynamically create dots based on number of cards
function createAnnouncementDots() {
    if (!announcementsIndicators || announcementCards.length === 0) return;

    announcementsIndicators.innerHTML = '';
    announcementDots = [];

    // Hide indicators if carousel is disabled
    if (!carouselEnabled) {
        announcementsIndicators.style.display = 'none';
        return;
    }

    announcementsIndicators.style.display = '';

    for (let i = 0; i < announcementCards.length; i++) {
        const dot = document.createElement('button');
        dot.className = 'announcement-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            clearInterval(announcementInterval);
            goToAnnouncementSlide(i);
            announcementInterval = setInterval(nextAnnouncementSlide, 6000);
        });
        announcementsIndicators.appendChild(dot);
        announcementDots.push(dot);
    }
}

function getCardsPerView() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
}

function getMaxSlide() {
    // Allow scrolling through all cards one at a time
    return Math.max(0, announcementCards.length - 1);
}

function updateAnnouncementSlide() {
    if (!announcementsTrack || announcementCards.length === 0) return;

    const card = announcementCards[0];
    const cardWidth = card.offsetWidth;
    const gap = 24; // var(--space-lg) = 1.5rem = 24px
    const offset = currentAnnouncementSlide * (cardWidth + gap);

    announcementsTrack.style.transform = `translateX(-${offset}px)`;

    // Update dots
    announcementDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentAnnouncementSlide);
    });
}

function nextAnnouncementSlide() {
    const maxSlide = getMaxSlide();
    if (currentAnnouncementSlide < maxSlide) {
        currentAnnouncementSlide++;
    } else {
        currentAnnouncementSlide = 0;
    }
    updateAnnouncementSlide();
}

function prevAnnouncementSlide() {
    const maxSlide = getMaxSlide();
    if (currentAnnouncementSlide > 0) {
        currentAnnouncementSlide--;
    } else {
        currentAnnouncementSlide = maxSlide;
    }
    updateAnnouncementSlide();
}

function goToAnnouncementSlide(index) {
    const maxSlide = getMaxSlide();
    currentAnnouncementSlide = Math.min(index, maxSlide);
    updateAnnouncementSlide();
}

function startAnnouncementCarousel() {
    if (announcementCards.length > 0) {
        updateAnnouncementSlide();
        if (carouselEnabled) {
            announcementInterval = setInterval(nextAnnouncementSlide, 6000);
        }
    }
}

// Hide nav buttons if carousel is disabled
if (announcementPrev) {
    if (!carouselEnabled) {
        announcementPrev.style.display = 'none';
    } else {
        announcementPrev.addEventListener('click', () => {
            clearInterval(announcementInterval);
            prevAnnouncementSlide();
            announcementInterval = setInterval(nextAnnouncementSlide, 6000);
        });
    }
}

if (announcementNext) {
    if (!carouselEnabled) {
        announcementNext.style.display = 'none';
    } else {
        announcementNext.addEventListener('click', () => {
            clearInterval(announcementInterval);
            nextAnnouncementSlide();
            announcementInterval = setInterval(nextAnnouncementSlide, 6000);
        });
    }
}

// Recalculate on window resize
window.addEventListener('resize', () => {
    if (carouselEnabled) {
        clearInterval(announcementInterval);
        currentAnnouncementSlide = Math.min(currentAnnouncementSlide, getMaxSlide());
        updateAnnouncementSlide();
        announcementInterval = setInterval(nextAnnouncementSlide, 6000);
    }
});

// Initialize announcements
createAnnouncementDots();
startAnnouncementCarousel();

// Modal functionality
const eventModal = document.getElementById('event-modal');
const modalClose = document.getElementById('modal-close');
// Bulletin year toggle
document.querySelectorAll('.bulletin-year-header').forEach(header => {
    header.addEventListener('click', () => {
        const group = header.parentElement;
        group.classList.toggle('collapsed');
    });
});

// Google Calendar theme based on browser preference
function updateCalendarTheme() {
    const calendar = document.getElementById('google-calendar');
    if (!calendar) return;

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const baseUrl = 'https://calendar.google.com/calendar/u/0/embed?src=c_d158be754cd07057b26f07738ab260729dbad7ae92a80738b198fb323e345a77@group.calendar.google.com&ctz=America/New_York';
    calendar.src = isDark ? baseUrl + '&theme=1' : baseUrl + '&theme=0';
}

// Initial theme set
updateCalendarTheme();

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateCalendarTheme);
