// getting button element
const scrollToTopButton = document.getElementById('js-top');

//hide/show button
const scrollFunc = () => {
  let y = window.scrollY;           // getting current scroll value
  if (y > 0) {
    scrollToTopButton.className = "top-link show";
  } else {
    scrollToTopButton.className = "top-link hide";
  }
};

window.addEventListener("scroll", scrollFunc);

const scrollToTop = () => {
  // c = pixel distance from top of the document
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    // ScrollTo takes an x and a y coordinate.
    // Increase the '10' value to get a smoother/slower scroll!
    window.scrollTo(0, c - c / 12);
  }
};

//run ScrolltoTop function when button is clicked
scrollToTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
}