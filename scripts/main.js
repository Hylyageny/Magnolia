// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.getElementById('mainNav');
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                isScrolling = false;
            });
            isScrolling = true;
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

    // 7. Chatbot Logic
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const quickReplies = document.querySelectorAll('.quick-reply');

    if (chatToggle && chatWindow) {
        // Toggle Chat
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.add('active');
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        // Knowledge Base
        const botKnowledge = [
            { keywords: ['botox', 'dysport', 'wrinkle'], response: 'Botox is $14/unit and Dysport is $4.50/unit. We offer Lip Flips for $125! Both are excellent for smoothing fine lines. Would you like to book a consultation?' },
            { keywords: ['book', 'appointment', 'schedule'], response: 'You can book an appointment by clicking the "Book Now" buttons on our website, or calling our front desk!' },
            { keywords: ['facial', 'hydrafacial', 'oxygen', 'peel'], response: 'Our facials range from the $95 Express Facial to the $305 Platinum Hydrafacial! The standard Hydrafacial is $205. We also offer Perfect Derma Peels starting at $300. Check out our Treatments menu for more details.' },
            { keywords: ['membership', 'club', 'complexion'], response: 'We offer The Complexion Club! It includes The Radiance ($99/mo), The Luminary ($149/mo), and The Magnolia ($299/mo) with massive perks like free monthly facials, product discounts, and dermaplaning!' },
            { keywords: ['filler', 'cheek', 'lip', 'volume'], response: 'We offer Cheek Filler ($1500), Lip Filler ($750 full syringe / $550 half), and Facial Balancing. Results are natural and never overdone!' },
            { keywords: ['laser', 'resurfacing', 'erbium'], response: 'We offer Laser treatments like the Light Erbium Topper for $150. A $50 Laser Consult is required prior to any new laser treatments.' },
            { keywords: ['hours', 'location', 'open', 'where'], response: 'Magnolia Med Spa is open Monday-Saturday. You can find our full contact details in the footer of the site!' }
        ];

        function addMessage(text, isUser = false) {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${isUser ? 'user' : 'bot'}`;
            bubble.textContent = text;
            chatMessages.insertBefore(bubble, chatMessages.querySelector('.chat-quick-replies'));
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getBotResponse(input) {
            const normalized = input.toLowerCase();
            let response = "I'm not quite sure about that! Try asking about Botox, Facials, Memberships, or Booking.";
            
            for (let kb of botKnowledge) {
                if (kb.keywords.some(kw => normalized.includes(kw))) {
                    response = kb.response;
                    break;
                }
            }
            return response;
        }

        function handleSend(text) {
            if (!text.trim()) return;
            
            // Add user message
            addMessage(text, true);
            chatInput.value = '';

            // Bot response system
            setTimeout(() => {
                const typing = document.createElement('div');
                typing.className = 'chat-bubble bot chat-typing';
                typing.textContent = 'Typing...';
                chatMessages.insertBefore(typing, chatMessages.querySelector('.chat-quick-replies'));
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(() => {
                    typing.remove();
                    addMessage(getBotResponse(text), false);
                }, 800);
            }, 300);
        }

        chatSend.addEventListener('click', () => handleSend(chatInput.value));
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend(chatInput.value);
        });

        quickReplies.forEach(btn => {
            btn.addEventListener('click', () => {
                handleSend(btn.getAttribute('data-text'));
            });
        });
    }
});
