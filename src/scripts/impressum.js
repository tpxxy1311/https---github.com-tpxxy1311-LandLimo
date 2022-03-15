//Import Modules
import LocomotiveScroll from 'locomotive-scroll';
import $ from 'jquery';
import gsap from 'gsap';

//Mobile Device Check
var mobilecheck=false;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  mobilecheck=true;
};

//Session Storage Variables
var loading;
var sound;

//Smooth Scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    touchMultiplier: 3.5,
    smartphone: {
      breakpoint: 760,
      smooth: false,
      getDirection: true,
    },
    tablet: {
      breakpoint: 1020,
      smooth: false,
      getDirection: true,
    }
});

// //GSAP Animations
const fadeInSubeheadline = () =>{
    gsap.to('.landing-text', { opacity: 1,  duartion:2 , delay:1});
}


//Initialise Custom Cursor
function initCursor(){
  $(document).on("mousemove", (e) => {
    setTimeout(function() {
        $('.cursor')
          .eq(0)
          .css({
            left: e.pageX,
            top: e.pageY,
          });
      }, 0);
  });
}

//Set Hover Elements for Custom Cursor to change Color
function initCursorHover(){
  $('.hoverable').on("mouseenter", () => {
    $('.cursor').addClass('hover');
  });
  $('.hoverable').on("mouseleave", () => {
    $('.cursor').removeClass('hover');
  });
}

//Initialise Mobile Menu
function initMobileMenu(){
  $('.hamburger').on("click", ()=>{
    $('.menu').toggleClass('menu-open');
    $('.hamburger').toggleClass('open');
    $('.menu-items').toggleClass('show-list-items');
    $('.menu-link').toggleClass('show-links');
  });
  $('.menu-items').on("click", ()=>{
    $('.menu').toggleClass('menu-open');
    $('.hamburger').toggleClass('open');
    $('.menu-items').toggleClass('show-list-items');
    $('.menu-link').toggleClass('show-links');
  });
}

//Initialise Sound
function initClickSounds(){
    $('.bt-sound').on("mouseover", () => {
      if(sound=="true"){
        clicksound1.play();
      }
    });
    $('.hover-sound').on("mouseover", () => {
      if(sound=="true"){
        clicksound2.play();
      }
    });
}

//Run all functions when Document is ready
$(function() {
  sound= sessionStorage.getItem("soundcheck");
  $('.landing-headline').addClass("in-view");
  fadeInSubeheadline();
  initCursor();
  initCursorHover();
  initMobileMenu();
  initClickSounds();
});
