// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initSkillBars();
    initProjectFilters();
    initContactForm();
    initScrollAnimation();
});

// Navbar functionality
function initNavbar() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const header = document.querySelector('header');

    // Toggle mobile menu
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });

    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Add animation to menu button
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const burger = menuBtn.querySelector('.menu-btn__burger');
            burger.classList.toggle('active');
            
            if (burger.classList.contains('active')) {
                burger.style.transform = 'rotate(45deg)';
                burger.style.backgroundColor = 'var(--primary-color)';
                burger.style.transition = 'var(--transition)';
                
                // Animate pseudo-elements
                document.documentElement.style.setProperty('--before-transform', 'rotate(90deg)');
                document.documentElement.style.setProperty('--after-transform', 'rotate(90deg)');
            } else {
                burger.style.transform = 'rotate(0)';
                burger.style.backgroundColor = 'var(--dark-color)';
                
                // Reset pseudo-elements
                document.documentElement.style.setProperty('--before-transform', 'translateY(-8px)');
                document.documentElement.style.setProperty('--after-transform', 'translateY(8px)');
            }
        });
    }
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animate skill bars on scroll
function initSkillBars() {
    const skillSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-per');
    
    if (skillSection && skillBars.length) {
        const showSkills = () => {
            if (isElementInViewport(skillSection)) {
                skillBars.forEach(skill => {
                    const skillPercentage = skill.getAttribute('per');
                    skill.style.width = skillPercentage;
                    skill.classList.add('animate');
                });
                window.removeEventListener('scroll', showSkills);
            }
        };
        
        window.addEventListener('scroll', showSkills);
        // Check on initial load as well
        showSkills();
    }
}

// Project filtering functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(filterBtn => {
                    filterBtn.classList.remove('active');
                });
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    // Hide all cards first
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        // Show all cards if filter is 'all', otherwise show only cards with matching category
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }
}

// Contact form validation
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully!';
                successMessage.style.color = '#4CAF50';
                successMessage.style.padding = '10px';
                successMessage.style.marginTop = '10px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                successMessage.style.border = '1px solid #4CAF50';
                
                // Insert success message after the form
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
}

// Show error message for form validation
function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#f44336';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.style.borderColor = '#f44336';
}

// Remove error message
function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '';
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animations
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.about-content, .project-card, .timeline-item, .contact-item');
    
    if (animatedElements.length) {
        const showElement = () => {
            animatedElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('animate-in');
                }
            });
        };
        
        window.addEventListener('scroll', showElement);
        // Check on initial load as well
        showElement();
    }
    
    // Add animation classes to elements
    document.querySelectorAll('.about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    document.querySelectorAll('.contact-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Add animate-in class to handle animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translate(0, 0) !important;
        }
    </style>
`);