//------------------------------------- custom cursor ---------------------------------------
let mouseCur = document.querySelector(".cursor");

window.addEventListener("mousemove", cursor);
    function cursor(e) {
        mouseCur.style.top = e.clientY + "px";
        mouseCur.style.left = e.clientX + "px";
    }

//------------------------------------ nav-links mouseover ------------------------------------
let navLinks = document.querySelectorAll(".clickable");


navLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
        mouseCur.classList.add("cursor-red");
    });

    link.addEventListener("mouseleave", () => {
        mouseCur.classList.remove("cursor-red");
    });
});

//------------------------------------ video mouseover ------------------------------------
let video = document.querySelector("video");
let play = document.querySelector(".play");

video.addEventListener("mouseover", () => {
    mouseCur.classList.add("cursor-vid");
    play.classList.add("play-vid");
});

video.addEventListener("mouseleave", () => {
    mouseCur.classList.remove("cursor-vid");
    play.classList.remove("play-vid");
});




