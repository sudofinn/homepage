// animation at end ( might be deleted if becomes unnecessary)
const observer = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      entry.target.classList.add(".header-ani");
    }
  });
});

observer.observe(document.querySelector('.header-ani'));