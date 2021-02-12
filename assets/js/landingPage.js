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



//--------------------------------- other projects button ---------------------------------------
let bigRed = document.getElementById("other-proj-circ");
let redcover = document.getElementById("red-cover");

bigRed.onclick = function(){
    redcover.classList.add("red-cover");
};


function delay (URL) {
    setTimeout( function() { window.location = URL }, 1000 );
}

//---------------------------------- contact us page ------------------------------------------
let contactUs = document.querySelector("#contact-us");

contactUs.addEventListener("mouseover", () => {
    mouseCur.classList.add("cursor-contact-us");
});

contactUs.addEventListener("mouseleave", () => {
    mouseCur.classList.remove("cursor-contact-us"); 
});

//----------------------------------- view project ------------------------------------------------
let works = document.querySelectorAll(".work-sample");

works.forEach(work => {
    work.addEventListener("mouseover", () => {
        mouseCur.classList.add("view-project");
        mouseCur.lastElementChild.innerHTML = "VIEW PROJECT";
    });

    work.addEventListener("mouseleave", () => {
        mouseCur.classList.remove("view-project");
        mouseCur.lastElementChild.innerHTML = "";
    });
});


//----------------------------------side nav ----------------------------------
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    console.log("closing");
}
