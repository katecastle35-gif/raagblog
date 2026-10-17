// Only one video plays at a time
const videos = document.querySelectorAll('.track video');
videos.forEach(v => v.addEventListener('play', () => {
  videos.forEach(other => { if (other !== v) other.pause(); });
}));
