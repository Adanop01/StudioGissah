// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (window.scrollY > 100) {
        if (isDark) {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (isDark) {
            navbar.style.background = 'rgba(44, 62, 80, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        }
        navbar.style.boxShadow = 'none';
    }
});

// Set initial navbar state for dark mode
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        navbar.style.background = 'rgba(44, 62, 80, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const project = formData.get('project');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .service-card, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced image loading with fallbacks
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Skip images that already have onload handlers
        if (img.hasAttribute('onload')) {
            return;
        }
        
        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            img.classList.add('loaded');
            img.style.opacity = '1';
        };
        
        imageLoader.onerror = () => {
            // Fallback for broken images
            img.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
            img.style.opacity = '1';
            console.warn('Image failed to load:', img.src);
        };
        
        // Start loading
        imageLoader.src = img.src;
        
        // If image is already cached/loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
            img.style.opacity = '1';
        }
    });
    
    // Optimize background images loading
    const bgImages = document.querySelectorAll('.bg-image');
    bgImages.forEach((bgImg, index) => {
        // Add loading delay for better performance
        setTimeout(() => {
            bgImg.style.willChange = 'opacity';
        }, index * 200);
    });
});

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    // Add a small delay before starting the typing effect
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 500);
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.testimonial-prev');
        this.nextBtn = document.querySelector('.testimonial-next');
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play slider
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const slider = document.querySelector('.testimonial-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.showSlide(this.currentSlide);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize testimonial slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.testimonial-slider')) {
        new TestimonialSlider();
    }
});

// Trusted Partners Animation with Image Error Handling
const observeTrustedPartners = () => {
    const partnerLogos = document.querySelectorAll('.partner-logo');
    const partnerImages = document.querySelectorAll('.partner-logo img');
    
    // Handle image loading errors
    partnerImages.forEach(img => {
        img.addEventListener('error', function() {
            // Create a fallback with company name
            const companyName = this.alt;
            const fallbackDiv = document.createElement('div');
            fallbackDiv.style.cssText = `
                width: 100px;
                height: 50px;
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: 600;
                border-radius: 4px;
                text-align: center;
                padding: 0.5rem;
            `;
            fallbackDiv.textContent = companyName.toUpperCase();
            
            // Replace the broken image with the fallback
            this.parentNode.replaceChild(fallbackDiv, this);
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150); // Stagger animation
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    partnerLogos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px) scale(0.9)';
        logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        logoObserver.observe(logo);
    });
};

// Initialize trusted partners animation
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.trusted-partners')) {
        observeTrustedPartners();
    }
});

// Portfolio Gallery Data
const portfolioData = {
    'modern-villa': {
        title: 'Modern Villa Estate',
        description: 'A luxurious modern villa with sustainable design elements and panoramic city views.',
        location: 'Mumbai, India',
        year: '2024',
        type: 'Residential Villa',
        area: '4,500 sq ft',
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607688960-e095ff8d5c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607688888-1b8b1b1b1b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'corporate-office': {
        title: 'Tech Corporate Hub',
        description: 'A state-of-the-art office complex designed for innovation and collaboration.',
        location: 'Bangalore, India',
        year: '2024',
        type: 'Commercial Office',
        area: '25,000 sq ft',
        images: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'luxury-apartment': {
        title: 'Luxury Penthouse',
        description: 'An elegant penthouse apartment with contemporary design and premium finishes.',
        location: 'Delhi, India',
        year: '2023',
        type: 'Residential Apartment',
        area: '3,200 sq ft',
        images: [
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566752229-450c5e0c8c6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566752734-d1d394c41b3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'cultural-center': {
        title: 'Heritage Cultural Center',
        description: 'A cultural center that celebrates local heritage through modern architectural design.',
        location: 'Jaipur, India',
        year: '2023',
        type: 'Institutional',
        area: '15,000 sq ft',
        images: [
            'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'restaurant-interior': {
        title: 'Fine Dining Restaurant',
        description: 'An upscale restaurant interior with warm ambiance and sophisticated design elements.',
        location: 'Goa, India',
        year: '2024',
        type: 'Interior Design',
        area: '2,800 sq ft',
        images: [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'shopping-mall': {
        title: 'Premium Shopping Complex',
        description: 'A modern shopping complex with innovative retail spaces and entertainment zones.',
        location: 'Chennai, India',
        year: '2023',
        type: 'Commercial Retail',
        area: '50,000 sq ft',
        images: [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'residential-complex': {
        title: 'Green Living Complex',
        description: 'An eco-friendly residential complex with sustainable living solutions and green spaces.',
        location: 'Pune, India',
        year: '2024',
        type: 'Residential Complex',
        area: '35,000 sq ft',
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'hotel-interior': {
        title: 'Boutique Hotel Lobby',
        description: 'A luxurious hotel lobby design combining traditional Rajasthani elements with modern comfort.',
        location: 'Udaipur, India',
        year: '2023',
        type: 'Interior Design',
        area: '1,800 sq ft',
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    },
    'university-campus': {
        title: 'Modern University Campus',
        description: 'A contemporary university campus designed to foster learning and innovation.',
        location: 'Hyderabad, India',
        year: '2024',
        type: 'Institutional',
        area: '75,000 sq ft',
        images: [
            'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ]
    }
};

// Portfolio Gallery Class
class PortfolioGallery {
    constructor() {
        this.modal = document.getElementById('portfolioModal');
        this.currentProject = null;
        this.currentImageIndex = 0;
        this.init();
    }
    
    init() {
        // Filter functionality
        this.initFilters();
        
        // Gallery buttons
        this.initGalleryButtons();
        
        // Modal functionality
        this.initModal();
    }
    
    initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    initGalleryButtons() {
        const galleryBtns = document.querySelectorAll('.view-gallery-btn');
        
        galleryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = btn.getAttribute('data-project');
                this.openModal(projectId);
            });
        });
    }
    
    initModal() {
        const closeBtn = document.getElementById('modalClose');
        const overlay = this.modal.querySelector('.modal-overlay');
        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');
        
        // Close modal
        closeBtn.addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', () => this.closeModal());
        
        // Navigation
        prevBtn.addEventListener('click', () => this.prevImage());
        nextBtn.addEventListener('click', () => this.nextImage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.prevImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
    }
    
    openModal(projectId) {
        this.currentProject = portfolioData[projectId];
        if (!this.currentProject) return;
        
        this.currentImageIndex = 0;
        this.populateModal();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    populateModal() {
        const project = this.currentProject;
        
        // Update modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalLocation').textContent = project.location;
        document.getElementById('modalYear').textContent = project.year;
        document.getElementById('modalType').textContent = project.type;
        document.getElementById('modalArea').textContent = project.area;
        
        // Update main image
        this.updateMainImage();
        
        // Create thumbnails
        this.createThumbnails();
    }
    
    updateMainImage() {
        const mainImg = document.getElementById('mainGalleryImage');
        mainImg.src = this.currentProject.images[this.currentImageIndex];
    }
    
    createThumbnails() {
        const thumbnailContainer = document.getElementById('galleryThumbnails');
        thumbnailContainer.innerHTML = '';
        
        this.currentProject.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `gallery-thumbnail ${index === this.currentImageIndex ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}">`;
            
            thumbnail.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.updateMainImage();
                this.updateThumbnails();
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });
    }
    
    updateThumbnails() {
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentImageIndex);
        });
    }
    
    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProject.images.length) % this.currentProject.images.length;
        this.updateMainImage();
        this.updateThumbnails();
    }
    
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProject.images.length;
        this.updateMainImage();
        this.updateThumbnails();
    }
}

// Initialize Portfolio Gallery
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.projects-grid')) {
        new PortfolioGallery();
    }
});

// Enhanced Background Image Slideshow
class BackgroundSlideshow {
    constructor() {
        this.images = document.querySelectorAll('.bg-image');
        this.video = document.querySelector('.background-video');
        this.currentIndex = 0;
        this.isPreloaded = false;
        this.init();
    }
    
    init() {
        console.log(`Found ${this.images.length} background images`);
        
        // Ensure first image is visible immediately
        if (this.images.length > 0) {
            this.images[0].classList.add('active');
            this.images[0].style.opacity = '1';
            this.images[0].style.zIndex = '1';
        }
        
        // Start preloading images immediately
        this.preloadImages().then(() => {
            this.isPreloaded = true;
            console.log('All background images preloaded');
        });
        
        // Start slideshow after a short delay
        setTimeout(() => {
            this.startImageSlideshow();
        }, 4000);
        
        // Handle video (disable for now to focus on images)
        if (this.video) {
            this.video.style.display = 'none';
        }
    }
    
    async preloadImages() {
        const imagePromises = Array.from(this.images).map((bgElement, index) => {
            return new Promise((resolve) => {
                const bgImage = bgElement.style.backgroundImage;
                if (!bgImage || bgImage === 'none') {
                    resolve();
                    return;
                }
                
                const url = bgImage.slice(4, -1).replace(/"/g, "");
                const img = new Image();
                
                img.onload = () => {
                    bgElement.classList.remove('loading');
                    bgElement.setAttribute('data-loaded', 'true');
                    console.log(`Image ${index + 1} loaded successfully`);
                    resolve();
                };
                
                img.onerror = () => {
                    console.warn(`Image ${index + 1} failed to load, using fallback`);
                    bgElement.setAttribute('data-loaded', 'fallback');
                    resolve();
                };
                
                // Skip first image as it's already visible
                if (index === 0) {
                    bgElement.setAttribute('data-loaded', 'true');
                    resolve();
                    return;
                }
                
                bgElement.classList.add('loading');
                img.src = url;
            });
        });
        
        await Promise.all(imagePromises);
    }
    
    showNextImage() {
        if (this.images.length === 0) return;
        
        // Move to next image
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        
        // Hide all images
        this.images.forEach((img, index) => {
            img.classList.remove('active');
            img.style.zIndex = '0';
        });
        
        // Show current image
        const currentImage = this.images[this.currentIndex];
        if (currentImage) {
            currentImage.classList.add('active');
            currentImage.style.opacity = '1';
            currentImage.style.zIndex = '1';
            console.log(`Showing image ${this.currentIndex + 1}`);
        }
    }
    
    startImageSlideshow() {
        console.log('Starting background slideshow');
        
        // Show next image immediately
        setTimeout(() => {
            this.showNextImage();
        }, 1000);
        
        // Continue slideshow
        setInterval(() => {
            this.showNextImage();
        }, 4000); // Change image every 4 seconds
    }
}

// Initialize background slideshow with immediate start
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.background-media')) {
        // Start immediately for faster visual feedback
        setTimeout(() => {
            new BackgroundSlideshow();
        }, 100);
    }
});

// Preload critical images on page load
window.addEventListener('load', () => {
    // Preload hero image if not already loaded
    const heroImg = document.querySelector('.hero-image img');
    if (heroImg && !heroImg.classList.contains('loaded')) {
        const img = new Image();
        img.onload = () => {
            heroImg.classList.add('loaded');
            heroImg.style.opacity = '1';
        };
        img.src = heroImg.src;
    }
});

// Loading Screen Management
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.init();
    }
    
    init() {
        // Wait for fonts and basic DOM
        if (document.fonts) {
            document.fonts.ready.then(() => {
                setTimeout(() => this.hideLoadingScreen(), 800);
            });
        } else {
            // Fallback for older browsers
            setTimeout(() => this.hideLoadingScreen(), 1500);
        }
        
        // Maximum loading time
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2500);
    }
    
    hideLoadingScreen() {
        if (this.loadingScreen && !this.loadingScreen.classList.contains('hidden')) {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 500);
        }
    }
}

// Initialize loading manager
document.addEventListener('DOMContentLoaded', () => {
    new LoadingManager();
});

// Enhanced Dark Mode Toggle with background update
darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update navbar background immediately
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        if (newTheme === 'dark') {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        if (newTheme === 'dark') {
            navbar.style.background = 'rgba(44, 62, 80, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    }
});