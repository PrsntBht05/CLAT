// main.js - Complete JavaScript for CLATniti Website Enhancements

document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Navigation ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Handle dropdowns on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // ========== Sticky Navbar on Scroll ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========== Animated Counters ==========
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target + '+';
            }
        });
    }
    
    // Start counter animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelector('.stats').querySelectorAll('.count').forEach(counter => {
        observer.observe(counter);
    });
    
    // ========== Countdown Timer for Crash Course ==========
    function updateCountdown() {
        // Set the date we're counting down to (3 days from now)
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 3);
        
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display results
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.timer').innerHTML = '<div class="expired">Offer Expired!</div>';
        }
    }
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    // ========== Video Modal Functionality ==========
    const videoModal = document.getElementById('videoModal');
    
    window.openVideoModal = function(videoId) {
        // In a real implementation, you would use the actual YouTube embed URL
        let videoUrl = '';
        switch(videoId) {
            case 'video1':
                videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
                break;
            case 'video2':
                videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
                break;
            case 'video3':
                videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
                break;
            default:
                videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        }
        
        document.getElementById('modalVideo').src = videoUrl;
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };
    
    window.closeVideoModal = function() {
        videoModal.style.display = 'none';
        document.getElementById('modalVideo').src = '';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };
    
    // Close modal when clicking outside the video
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // ========== Smooth Scrolling for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
    
    // ========== Form Submission Handling ==========
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to your server
            const formData = new FormData(this);
            const formName = this.getAttribute('name') || 'form';
            
            console.log(`Form "${formName}" submitted with:`, Object.fromEntries(formData));
            
            // Show success message
            alert('Thank you for your submission! We will contact you shortly.');
            this.reset();
        });
    });
});