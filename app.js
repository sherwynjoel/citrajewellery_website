/* ==========================================================================
   CITRA JEWELLERY - DYNAMIC INTERACTIONS & LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Brand WhatsApp configuration
    const WHATSAPP_NUMBER = '919677510474'; // Replace with store owner's actual phone number with country code

    // 1. Header scroll effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Nav Toggle
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        mobileNavToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        // Prevent body scroll when menu is active
        document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
    };

    mobileNavToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavOverlay.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu if clicked outside
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            toggleMobileMenu();
        }
    });

    // 3. Collection Filters
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            button.classList.add('active');

            const filterValue = button.getAttribute('data-tab');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Add smooth transition effect
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 4. Smooth scroll active nav highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    // 5. WhatsApp Product Grid Buttons
    const whatsappActionButtons = document.querySelectorAll('.btn-whatsapp-action');
    
    whatsappActionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click triggers if any
            const productName = button.getAttribute('data-product');
            const productUrl = window.location.href;
            
            // Build pre-filled message text
            const message = `Hi Citra Jewellery! I am interested in inquiring about the pricing and details of the "${productName}" from your collection. Link: ${productUrl}`;
            const encodedMessage = encodeURIComponent(message);
            
            // Redirect to WhatsApp chat URL
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            window.open(waUrl, '_blank');
        });
    });

    // 6. Contact Form Submission via WhatsApp redirect
    const inquiryForm = document.getElementById('inquiryForm');
    
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const phone = document.getElementById('userPhone').value.trim();
        const interest = document.getElementById('interestType').value;
        const message = document.getElementById('userMessage').value.trim();
        
        // Construct detailed inquiry message
        const waText = `*Citra Jewellery Inquiry Details*:\n\n` + 
                       `• *Name*: ${name}\n` +
                       `• *Email*: ${email}\n` +
                       `• *WhatsApp*: ${phone}\n` +
                       `• *Collection Interest*: ${interest}\n\n` +
                       `*Message/Request*:\n${message}`;
                       
        const encodedText = encodeURIComponent(waText);
        const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
        
        // Show user confirmation alert, then open WhatsApp
        alert('Thank you for your interest! Opening WhatsApp to send your inquiry detail directly to our specialists.');
        window.open(waLink, '_blank');
        
        // Reset form
        inquiryForm.reset();
    });

    // 7. Scroll Animation Trigger (Intersection Observer)
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                fadeObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Select sections to animate
    const animSections = [
        document.querySelector('.hero-content'),
        document.querySelector('.hero-image-wrapper'),
        document.querySelector('.collections-section'),
        document.querySelector('.craftsmanship-content'),
        document.querySelector('.craftsmanship-visual'),
        document.querySelector('.gallery-section'),
        document.querySelector('.contact-info-panel'),
        document.querySelector('.contact-form-panel')
    ];

    animSections.forEach(section => {
        if (section) {
            section.classList.add('scroll-hidden');
            fadeObserver.observe(section);
        }
    });
});

// ==========================================================================
// 8. Lightbox Modal Logic (Global Scope for inline HTML onclick calls)
// ==========================================================================
const lightbox = document.getElementById('productLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxMeta = document.getElementById('lightboxMeta');
const lightboxWhatsAppBtn = document.getElementById('lightboxWhatsAppBtn');

window.openLightbox = (imgSrc, title, desc, meta = 'Citra Signature Piece') => {
    const WHATSAPP_NUMBER = '919677510474';
    
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightboxMeta.textContent = meta;
    
    // Configure Lightbox WhatsApp CTA message
    const currentUrl = window.location.href;
    const message = `Hi Citra Jewellery! I am inquiring about the "${title}" featured in your signature collection. Link: ${currentUrl}`;
    const encodedMessage = encodeURIComponent(message);
    
    lightboxWhatsAppBtn.onclick = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    };

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scrolling
    lightbox.setAttribute('aria-hidden', 'false');
};

window.closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
    lightbox.setAttribute('aria-hidden', 'true');
};

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
