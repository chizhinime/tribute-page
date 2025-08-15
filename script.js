document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Scroll down button
    document.querySelector('.scroll-down').addEventListener('click', function() {
        window.scrollTo({
            top: document.querySelector('#about').offsetTop - 70,
            behavior: 'smooth'
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Dynamic title effect
    const dynamicTitle = document.getElementById('dynamic-title');
    const originalText = dynamicTitle.textContent;
    let isAnimating = false;

    dynamicTitle.addEventListener('mouseenter', function() {
        if (isAnimating) return;
        isAnimating = true;
        
        let iteration = 0;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const interval = setInterval(() => {
            this.textContent = this.textContent.split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
                isAnimating = false;
            }
            
            iteration += 1 / 3;
        }, 30);
    });

    // Quote carousel
    const quotes = document.querySelectorAll('.quote');
    const prevBtn = document.querySelector('.prev-quote');
    const nextBtn = document.querySelector('.next-quote');
    const quoteCounter = document.querySelector('.quote-counter');
    let currentQuote = 0;

    function showQuote(index) {
        quotes.forEach(quote => quote.classList.remove('active'));
        quotes[index].classList.add('active');
        quoteCounter.textContent = `${index + 1}/${quotes.length}`;
    }

    prevBtn.addEventListener('click', function() {
        currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
        showQuote(currentQuote);
    });

    nextBtn.addEventListener('click', function() {
        currentQuote = (currentQuote + 1) % quotes.length;
        showQuote(currentQuote);
    });

    // Auto-rotate quotes
    let quoteInterval = setInterval(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        showQuote(currentQuote);
    }, 5000);

    // Pause auto-rotation on hover
    const quotesContainer = document.querySelector('.quotes-container');
    quotesContainer.addEventListener('mouseenter', () => {
        clearInterval(quoteInterval);
    });

    quotesContainer.addEventListener('mouseleave', () => {
        quoteInterval = setInterval(() => {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
        }, 5000);
    });

    // Initialize
    showQuote(0);
});
