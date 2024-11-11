// Add event listener for the scroll event
window.addEventListener("scroll", scrollEffect);

function scrollEffect() {
  var navbar = document.getElementById("navbar");

  // Add class 'scrolled' to change the nav style on scroll
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

  