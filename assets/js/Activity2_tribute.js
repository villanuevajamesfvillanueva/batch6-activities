//getting the button
var mybutton = document.getElementById("myBtn");

// when user scrolls down 30px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 30 || document.documentElement.scrollTop >30) {
    mybutton.style.display = "block";
} else {
    mybutton.style.display = "none";
}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}

var counter = 1;
setInterval(function(){
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 7) {
    counter = 1;
  }
}, 8000);
