/** Responsive Menu Button */
const menuButton = document.querySelector('.nav-button');

menuButton.onclick = function() {
  const navLinks = document.querySelector('.nav-links');

  if ( navLinks.classList.contains('show') ) {
    navLinks.classList.remove('show');
    navLinks.classList.add('hide');
  } else {
    navLinks.classList.remove('hide');
    navLinks.classList.add('show');
  }

}
