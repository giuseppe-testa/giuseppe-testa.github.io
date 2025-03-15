document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section');
  let currentSectionIndex = 0;

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      const section = sections[index];
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
      currentSectionIndex = index;

      // Add 'active' class to the section and remove from others
      sections.forEach((sec, idx) => {
        if (idx === index) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });
    }
  }

  // Arrow key navigation (up/down)
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') {
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  });

  // Mouse scroll navigation (down/up)
  window.addEventListener('wheel', function (e) {
    if (e.deltaY > 0) {
      // Scroll down
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    } else {
      // Scroll up
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  });

  // Smooth scroll to the first section when the page loads
  scrollToSection(0);
});
