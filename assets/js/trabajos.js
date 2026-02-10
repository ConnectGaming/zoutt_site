// trabajos.js - preview y modal video (lazy posters + lazy video)
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeBtn = document.querySelector('.close-modal');

// Lazy-load posters: mover poster a data-poster y limpiar hasta interacción
function prepareLazyPosters() {
  document.querySelectorAll('.video-card video').forEach(vid => {
    const poster = vid.getAttribute('poster');
    if (poster) {
      vid.dataset.poster = poster;
      vid.removeAttribute('poster');
    }
    // asegurar que no se descargue el video hasta interacción
    vid.preload = 'none';
  });
}

prepareLazyPosters();

document.querySelectorAll('.video-card').forEach(card => {
  const vid = card.querySelector('video');
  if (!vid) return;

  // setear poster en el primer hover
  let posterLoaded = false;

  card.addEventListener('mouseenter', () => {
    if (!posterLoaded && vid.dataset.poster) {
      vid.setAttribute('poster', vid.dataset.poster);
      posterLoaded = true;
    }
    vid.play().catch(() => { });
  });

  card.addEventListener('mouseleave', () => {
    vid.pause();
    vid.currentTime = 0;
  });

  // abrir modal al clic
  card.addEventListener('click', () => {
    const src = vid.querySelector('source').src;
    modalVideo.src = src;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modalVideo.currentTime = 0;
    modalVideo.play().catch(() => { });
    document.body.style.overflow = 'hidden';
  });
});

// cerrar modal
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modalVideo.pause();
  modalVideo.src = '';
  document.body.style.overflow = '';
}
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
