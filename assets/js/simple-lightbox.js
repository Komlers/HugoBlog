// Simple lightbox for regular images in blog posts
document.addEventListener('DOMContentLoaded', () => {
    // Only process if gallery lightbox is enabled
    if (!window.imageLightbox) {
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        lightboxOverlay.id = 'simpleImageLightbox';
        lightboxOverlay.setAttribute('role', 'dialog');
        lightboxOverlay.setAttribute('aria-modal', 'true');
        lightboxOverlay.setAttribute('aria-label', 'Image lightbox');

        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';

        const lightboxImage = document.createElement('img');
        lightboxImage.alt = 'Lightbox image';

        const closeButton = document.createElement('span');
        closeButton.className = 'lightbox-close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('role', 'button');
        closeButton.setAttribute('aria-label', 'Close lightbox');
        closeButton.setAttribute('tabindex', '0');

        lightboxContent.appendChild(lightboxImage);
        lightboxOverlay.appendChild(lightboxContent);
        lightboxOverlay.appendChild(closeButton);
        document.body.appendChild(lightboxOverlay);

        window.simpleLightbox = {
            overlay: lightboxOverlay,
            image: lightboxImage,
            close: function() {
                this.overlay.classList.remove('active');
                this.image.setAttribute('src', '');
                this.image.setAttribute('alt', '');
                document.body.style.overflow = '';
            },
            open: function(src, alt) {
                this.image.setAttribute('src', src);
                this.image.setAttribute('alt', alt || '');
                this.overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                closeButton.focus();
            }
        };

        closeButton.addEventListener('click', () => window.simpleLightbox.close());
        closeButton.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.simpleLightbox.close(); });
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) window.simpleLightbox.close();
        });
        document.addEventListener('keydown', (e) => {
            if (window.simpleLightbox.overlay.classList.contains('active') && e.key === 'Escape') {
                window.simpleLightbox.close();
            }
        });
    }

    // Find all images in post content that are not inside a gallery
    const postContent = document.querySelector('.post-content, .content, main');
    if (postContent) {
        const images = postContent.querySelectorAll('img:not(.image-gallery img)');
        images.forEach(img => {
            // Skip if already has a link or is inside a figure with link
            if (img.closest('a') || img.closest('figure a')) return;
            
            // Create wrapper link
            const wrapper = document.createElement('a');
            wrapper.href = img.src;
            wrapper.setAttribute('data-lightbox', 'true');
            
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
            
            // Add click handler
            wrapper.addEventListener('click', (e) => {
                e.preventDefault();
                window.simpleLightbox.open(img.src, img.alt);
            });
        });
    }
});