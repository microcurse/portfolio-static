/** Responsive Menu Button */

const showNav = function() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.add('show');
}

document.querySelector('.nav-button').addEventListener('click', showNav);
