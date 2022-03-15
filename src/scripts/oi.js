//Import Modules
import LocomotiveScroll from 'locomotive-scroll';
import $ from 'jquery';
import gsap from 'gsap';
import { load3d_oi } from './3d-can_oi';
import { load3d_orange } from './3d-orange';
import { load3d_ingwer } from './3d-ginger';

//Mobile Device Check
var mobilecheck=false;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  mobilecheck=true;
};

//Session Storage Variables
var loading;
var sound;

//Define Click Sounds 
const clicksound1 = document.createElement("audio");
clicksound1.src = "can_opening.ogg";
clicksound1.crossOrigin='anonymous';
const clicksound2 = document.createElement("audio");
clicksound2.src = "bubble_sound.mp3";
clicksound2.crossOrigin='anonymous';

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
const fadeInOrangeCan = () =>{
  gsap.from('.webgl-oi', { opacity: 0, x:100, duartion:1, delay:1.5});
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

//Initalise the Background Change Function
function initBackgroundChange() {
  scroll.on("scroll",()=>{
    // Change 33% earlier than scroll position so colour is there when you arrive
    var scroll = ($(window).height()/3);
    $('.base-section').each(function () {
      var $this = $(this);
      // if position is within range of this panel.
      // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
      // Remember we set the scroll to 33% earlier in scroll var.
      if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
      // Remove all classes on body with color-
      $('body').removeClass(function (index, css) {
        return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
      });
        // Add class of currently active div
        $('body').addClass('color-' + $(this).data('color'));
      }
    }); 
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

//Initialise Click Sound
function initClickSounds(){
    $('.bt-sound').on("mouseover", () => {
      console.log(sound);
      clicksound1.play();
    });
    $('.bt-sound2').on("mouseover", () => {
      clicksound2.play();
    });
    $('.logo').on("mouseover", () => {
      clicksound2.play();
    });
    $('.klick-sound').on("mouseover", () => {
      clicksound2.play();
    });
}

//Initialise Background Sound
function initAmbientSound(){
    setTimeout(()=>{
        $('.bg-sound-oi').get(0).play();
    },1000); 
}

//Run all functions when Document is ready
$(function() {
    $('body').addClass("color-orange0");
    sound= sessionStorage.getItem("soundcheck");
    $('.landing-headline').addClass("in-view");
    load3d_oi();
    fadeInOrangeCan();
    load3d_orange();
    load3d_ingwer();
    initCursor();
    initCursorHover();
    initMobileMenu();
    initBackgroundChange();
    if(sound=="true"){
        initClickSounds();
        initAmbientSound();
    }
});
