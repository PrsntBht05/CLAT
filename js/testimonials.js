// testimonials.js - Testimonial Slider Implementation

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length < 2) return; // No need for slider if only one slide
    
    let currentIndex = 0;
    const slideCount = slides.length;
    const slideWidth = slides[0].offsetWidth;
    const intervalTime = 5000; // 5 seconds
    
    // Set up initial positions
    function setupSlider() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
        });
    }
    
    // Move to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
    }
    
    // Update slider position
    function updateSliderPosition() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
        });
    }
    
    // Start auto-sliding
    let slideInterval = setInterval(nextSlide, intervalTime);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume when mouse leaves
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    });
    
    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        slideInterval = setInterval(nextSlide, intervalTime);
    }, { passive: true });
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
            // Swipe left - next slide
            nextSlide();
        } else if (difference < -50) {
            // Swipe right - previous slide
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSliderPosition();
        }
    }
    
    // Initialize the slider
    setupSlider();
    
    // Handle window resize
    window.addEventListener('resize', setupSlider);
});