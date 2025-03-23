document.addEventListener('DOMContentLoaded', function() {
    // Gallery functionality - preserved from original
    const imageGrid = document.getElementById('imageGrid');
    const loadMoreBtn = document.getElementById('loadMore');
    const pageButtons = document.querySelectorAll('.page-btn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const imageDescription = document.getElementById('imageDescription');
    const closeModal = document.querySelector('.close');
    
    // Image metadata - new feature for descriptions
    const imageData = {
        // This would be populated with your image descriptions
        // Format: 'images/imageX.jpg': { title: 'Image Title', description: 'Image description' }
        'images/image1.jpg': { title: 'Spring Blossoms', description: 'Delicate white flowers blooming in spring.' },
        'images/image2.jpg': { title: 'City Taxis', description: 'Yellow taxis navigating wet city streets at night.' },
        'images/image3.jpg': { title: 'Wading Bird', description: 'A heron hunting among tall reeds in a wetland.' },
        'images/image4.jpg': { title: 'Fireworks', description: 'Celebration fireworks lighting up the night sky.' },
        // Add more as needed for your images
    };
    
    let currentPage = 1;
    let imagesPerPage = 24;
    let loadedImages = 15;
    
    function loadImages(page) {
        imageGrid.innerHTML = ''; // Clear previous images
        let start = (page - 1) * imagesPerPage;
        let end = start + loadedImages;
        
        for (let i = start; i < end; i++) {
            let imageSrc = `images/image${(i + 1)}.jpg`;
            let img = document.createElement('img');
            img.src = imageSrc;
            img.alt = imageData[imageSrc]?.title || `Image ${i + 1}`;
            img.dataset.description = imageData[imageSrc]?.description || '';
            imageGrid.appendChild(img);
        }
    }
    
    loadImages(currentPage);
    
    loadMoreBtn.addEventListener('click', function() {
        loadedImages = imagesPerPage;
        loadImages(currentPage);
        loadMoreBtn.style.display = 'none';
    });
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentPage = parseInt(this.dataset.page);
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadedImages = 15;
            loadImages(currentPage);
            loadMoreBtn.style.display = 'block';
        });
    });
    
    // Modal functionality - enhanced from original
    imageGrid.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
            
            // Add description to modal if available
            const description = e.target.dataset.description;
            if (description) {
                imageDescription.textContent = description;
                imageDescription.style.display = 'block';
            } else {
                imageDescription.style.display = 'none';
            }
        }
    });
    
    // Close modal when clicking "X" or outside image
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Smooth scrolling for navigation - new feature
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission - new feature
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});