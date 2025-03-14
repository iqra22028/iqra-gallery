document.addEventListener('DOMContentLoaded', function() {
    const imageGrid = document.getElementById('imageGrid');
    const loadMoreBtn = document.getElementById('loadMore');
    const pageButtons = document.querySelectorAll('.page-btn');

    let currentPage = 1;
    let imagesPerPage = 24;
    let loadedImages = 15;
    
    function loadImages(page) {
        imageGrid.innerHTML = ''; // Clear previous images
        let start = (page - 1) * imagesPerPage;
        let end = start + loadedImages;
        
        for (let i = start; i < end; i++) {
            let img = document.createElement('img');
            img.src = `images/image${(i + 1)}.jpg`; // Correctly map images
            img.alt = `Image ${i + 1}`;
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
});
document.addEventListener('DOMContentLoaded', function () {
    const imageGrid = document.getElementById('imageGrid');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const closeModal = document.querySelector('.close');

    // Open modal on image click
    imageGrid.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
        }
    });

    // Close modal when clicking "X" or outside image
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

