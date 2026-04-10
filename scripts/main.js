// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Animation Observer (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only purely internal links (e.g. #about)
            const href = this.getAttribute('href');
            if(href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Parallax effect for hero background (optional)
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            heroBg.style.transform = `translateY(${scrollPos * 0.3}px)`;
        });
    }

    // 5. Pricing Toggle Logic
    const toggleCheckbox = document.getElementById('pricingToggleCheckbox');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    const priceElements = document.querySelectorAll('.price');
    const yearlyHints = document.querySelectorAll('.yearly-hint');

    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', function() {
            const isYearly = this.checked;
            
            if (isYearly) {
                monthlyLabel.classList.remove('active');
                yearlyLabel.classList.add('active');
                
                priceElements.forEach(el => {
                    el.innerText = el.getAttribute('data-yearly');
                });
                yearlyHints.forEach(el => {
                    el.innerText = el.getAttribute('data-yearly-text');
                });
            } else {
                yearlyLabel.classList.remove('active');
                monthlyLabel.classList.add('active');
                
                priceElements.forEach(el => {
                    el.innerText = el.getAttribute('data-monthly');
                });
                yearlyHints.forEach(el => {
                    el.innerHTML = '&nbsp;';
                });
            }
        });
    }

    // 6. Service Tabs Logic
    const serviceTabs = document.querySelectorAll('.service-tabs .tab-item');
    const servicePanes = document.querySelectorAll('.service-content-area .service-pane');

    if (serviceTabs.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active classes
                serviceTabs.forEach(t => t.classList.remove('active'));
                servicePanes.forEach(p => p.classList.remove('active'));

                // Add active class
                tab.classList.add('active');
                const targetPane = document.getElementById(tab.getAttribute('data-target'));
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
});
