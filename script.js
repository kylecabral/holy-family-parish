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
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
let slideInterval;

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
    if (slides.length > 0) {
        // Show first slide
        showSlide(0);
        // Auto-advance every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);
    }
}

// Click handlers for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

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

// Calendar functionality
const calendarContainer = document.getElementById('calendar-days');
const calendarTitle = document.getElementById('calendar-month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let displayMonth = currentDate.getMonth();
let displayYear = currentDate.getFullYear();

// Event data - dates with events (day of month)
const eventData = {
    '4-6-2026': {
        title: 'First Friday Adoration',
        time: '9:00 AM - 12:00 PM',
        description: 'Join us for Eucharistic Adoration following the 8:00 AM Mass. A peaceful time for prayer and reflection in the presence of the Blessed Sacrament.'
    },
    '4-12-2026': {
        title: 'Parish Fish Fry',
        time: '5:00 PM - 7:30 PM',
        description: 'Join us in the parish hall for our monthly community fish fry. All are welcome! Enjoy delicious fried fish, french fries, and fellowship. Free will offering accepted.'
    },
    '4-19-2026': {
        title: 'Religious Education Registration',
        time: 'After all Masses',
        description: 'Register children for fall Religious Education classes in the parish hall. Programs available for grades K-8, including sacramental preparation for First Communion and Confirmation.'
    },
    '4-27-2026': {
        title: 'Knights of Columbus Breakfast',
        time: '8:00 AM - 11:00 AM',
        description: 'Support our parish ministries while enjoying a delicious breakfast. Free will offering. All proceeds benefit parish ministries and community outreach programs.'
    }
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];

function renderCalendar() {
    if (!calendarContainer) return;

    const firstDay = new Date(displayYear, displayMonth, 1);
    const lastDay = new Date(displayYear, displayMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    // Update title
    calendarTitle.textContent = `${monthNames[displayMonth]} ${displayYear}`;

    // Clear previous days
    calendarContainer.innerHTML = '';

    // Add days from previous month
    const prevMonthLastDay = new Date(displayYear, displayMonth, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day other-month';
        dayEl.textContent = prevMonthLastDay - i;
        calendarContainer.appendChild(dayEl);
    }

    // Add days of current month
    for (let day = 1; day <= totalDays; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;

        // Check if today
        if (day === currentDate.getDate() &&
            displayMonth === currentDate.getMonth() &&
            displayYear === currentDate.getFullYear()) {
            dayEl.classList.add('today');
        }

        // Check if has event
        const eventKey = `${displayMonth + 1}-${day}-${displayYear}`;
        if (eventData[eventKey]) {
            dayEl.classList.add('has-event');
            dayEl.style.cursor = 'pointer';
            dayEl.addEventListener('click', () => showEventModal(eventKey));
        }

        calendarContainer.appendChild(dayEl);
    }

    // Add days from next month
    const remainingDays = 42 - (startingDay + totalDays);
    for (let i = 1; i <= remainingDays; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day other-month';
        dayEl.textContent = i;
        calendarContainer.appendChild(dayEl);
    }
}

function prevMonth() {
    displayMonth--;
    if (displayMonth < 0) {
        displayMonth = 11;
        displayYear--;
    }
    renderCalendar();
}

function nextMonth() {
    displayMonth++;
    if (displayMonth > 11) {
        displayMonth = 0;
        displayYear++;
    }
    renderCalendar();
}

if (prevMonthBtn && nextMonthBtn) {
    prevMonthBtn.addEventListener('click', prevMonth);
    nextMonthBtn.addEventListener('click', nextMonth);
}

// Initialize calendar
renderCalendar();

// Modal functionality
const eventModal = document.getElementById('event-modal');
const modalClose = document.getElementById('modal-close');
const modalDate = document.getElementById('modal-date');
const modalTitle = document.getElementById('modal-title');
const modalTime = document.getElementById('modal-time');
const modalDescription = document.getElementById('modal-description');

function showEventModal(eventKey) {
    const event = eventData[eventKey];
    if (!event) return;

    // Parse the event key to get date
    const [month, day, year] = eventKey.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    modalDate.textContent = `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
    modalTitle.textContent = event.title;
    modalTime.textContent = event.time;
    modalDescription.textContent = event.description;

    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    eventModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (modalClose) {
    modalClose.addEventListener('click', closeEventModal);
}

if (eventModal) {
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeEventModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && eventModal && eventModal.classList.contains('active')) {
        closeEventModal();
    }
});

// Bulletin year toggle
document.querySelectorAll('.bulletin-year-header').forEach(header => {
    header.addEventListener('click', () => {
        const group = header.parentElement;
        group.classList.toggle('collapsed');
    });
});
