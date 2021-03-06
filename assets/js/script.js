// scroll_down

function scrollBottom(x,y){
    window.scrollTo(0, document.body.scrollHeight);
}

//სურათების ოპტიმიზაცია, დასქროლვამდე არ ჩაიტვირთოს
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          // lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});

let add_buttons = document.getElementsByClassName('more');//განვსაზღვრეთ ელემენტი, რომელზე კლიკითაც უნდა მოხდეს მენიუს დამატება

let b = add_buttons.length;
for(let i = 0; i < b; i++) {
	  add_buttons[i].addEventListener('click', function() {
	  	this.classList.toggle('added');
	  	if(this.classList.contains('added')){
	  	  this.textContent = "დამატებულია"
	  	} else {
	  		this.textContent = "დამატება";
	  	}
	  	
	  });
}

//navbar-toggler
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.getElementById('menu');

navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

// რუკის შემოტანა
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 41.729483, lng: 44.4884286},
      zoom: 8
  });
}

// scroll to top
const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if(window.pageYOffset > 300) { //show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")){
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { //hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")){
        backToTopButton.classList.remove("btnEntrance");
       backToTopButton.classList.add("btnExit");
   setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t + 2) + b;
};

