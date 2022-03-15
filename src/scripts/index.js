//Import Modules
import LocomotiveScroll from 'locomotive-scroll';
import $ from 'jquery';
import gsap from 'gsap';
import { load3d_er } from './3d-can_er';
import { load3d_abm } from './3d-can_abm';
import { load3d_oi } from './3d-can_oi';


//Mobile Device Check
var mobilecheck=false;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  mobilecheck=true;
};

//Session Storage Variables
var loading;
var sound;
loading = sessionStorage.getItem("loadingcheck");
if(loading!="false"){
  $('.loading-screen').css("display", "block");
}
if(loading!="true"){
  gsap.to('.hl', {opacity: 1, duration: 2});
  $('.landing-headline').addClass('in-view');
}


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
const hideLoadingElements = () =>{
  gsap.to('.text-loading', {opacity: 0, duration: 0.7});
  gsap.to('.sound-link', {opacity: 0, duration: 0.3, delay:0.9});
  gsap.to('.bt-loading', {opacity: 0, duration: 0.2, delay:0.3});
  gsap.to('.loading-screen', {opacity: 0, duration:0.2, delay:1.3});
  removeHoverClass();
}
const hideLoadingText = () =>{
  gsap.to('.pretext-loading', {opacity: 0, duration: 0.7});
}
const showLoadingElements = () =>{
  hideLoadingText();
  gsap.to('.text-loading', {opacity: 1, duration: 0.3, delay:1.5});
  gsap.to('.sound-link', {opacity: 1, duration: 0.3, delay:1.9});
  gsap.to('.bt-loading', {opacity: 1, translateY:0, rotateX:0, duration: 0.3, delay:0.7});
}
const fadeInVideo = () =>{
  gsap.from('.bgvideo', { filter:"blur(5px)", duartion:0.3, delay:2});
}


//Initialise Loading Screen
//Show Button if all Assests are loaded
$(window).on("load",()=>{
  setTimeout(()=>{
    showLoadingElements();
  },6700);
});
//Remove Loading Section on Button Click
$('.bt-loading').on("click", ()=>{
  sessionStorage.setItem("soundcheck", true);
  sessionStorage.setItem("loadingcheck", false);
  sound= sessionStorage.getItem("soundcheck");
  clicksound2.play();
  hideLoadingElements();
  setTimeout(()=>{
    $('.loading-screen').addClass('remove');
    $('.loading-screen').css("display", "none");
    },3000);
  fadeInVideo();
  //Add Effect Class to the Headline on Landing Page
  setTimeout(()=>{
    $('.landing-headline').addClass('in-view');
  },3000);
  });
//Remove Loading Section on Link Click + Deactivate Sound
$('.sound-link').on("click", ()=>{
  sessionStorage.setItem("soundcheck", false);
  sessionStorage.setItem("loadingcheck", false);
  sound= sessionStorage.getItem("soundcheck");
  hideLoadingElements();
  setTimeout(()=>{
    $('.loading-screen').addClass('remove');
    $('.loading-screen').css("display", "none");
  },3000);
  fadeInVideo();
  //Add Effect Class to the Headline on Landing Page
  setTimeout(()=>{
    $('.landing-headline').addClass('in-view');
  },3000);
});

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

//Remove Hover Class after Barba Transition
function removeHoverClass(){
  $('.cursor').removeClass('hover');
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

//Initialise Fade while scrolling down on Background Video
function initVideoFade(){
  scroll.on("scroll", (position)=>{
    console.log(sound);
    var scroll = position.scroll.y;
    const checkpoint = 300;
    var op;
    if (scroll <= checkpoint) {
      op = 0.8 - scroll/checkpoint;  
    } else {
      op = 0;
    }
    $('.bg').css({opacity:op});
  })
};

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

//Initialise  Hover Headline Changes in about Section
function headlineChanges(){
  $('.bt-info-1').on("mouseenter",()=>{
    setTimeout(()=>{
      $('.hd-info-1').addClass('appear');
    },500);
    $('.hd-info-0').addClass('disappear');
  });
  $('.bt-info-1').on("mouseleave",()=>{
    setTimeout(()=>{
      $('.hd-info-0').removeClass('disappear');
    },500);
    $('.hd-info-1').removeClass('appear');
  });
  $('.bt-info-2').on("mouseenter",()=>{
    setTimeout(()=>{
      $('.hd-info-2').addClass('appear');
    },500);
    $('.hd-info-0').addClass('disappear');
  });
  $('.bt-info-2').on("mouseleave",()=>{
    setTimeout(()=>{
      $('.hd-info-0').removeClass('disappear');
    },500);
    $('.hd-info-2').removeClass('appear');
  });
  $('.bt-info-3').on("mouseenter",()=>{
    setTimeout(()=>{
      $('.hd-info-3').addClass('appear');
    },500);
    $('.hd-info-0').addClass('disappear');
  });
  $('.bt-info-3').on("mouseleave",()=>{
    setTimeout(()=>{
      $('.hd-info-0').removeClass('disappear');
    },500);
    $('.hd-info-3').removeClass('appear');
  });
  $('.bt-info-4').on("mouseenter",()=>{
    setTimeout(()=>{
      $('.hd-info-4').addClass('appear');
    },500);
    $('.hd-info-0').addClass('disappear');
  });
  $('.bt-info-4').on("mouseleave",()=>{
    setTimeout(()=>{
      $('.hd-info-0').removeClass('disappear');
    },500);
    $('.hd-info-4').removeClass('appear');
  });
  $('.bt-info-5').on("mouseenter",()=>{
    setTimeout(()=>{
      $('.hd-info-5').addClass('appear');
    },500);
    $('.hd-info-0').addClass('disappear');
  });
  $('.bt-info-5').on("mouseleave",()=>{
    setTimeout(()=>{
      $('.hd-info-0').removeClass('disappear');
    },500);
    $('.hd-info-5').removeClass('appear');
  });
}

//Run all functions when Document is ready
$(function() {
  initCursor();
  initCursorHover();
  load3d_er();
  load3d_abm();
  load3d_oi();
  initMobileMenu();
  initBackgroundChange();
  initVideoFade();
  headlineChanges();
  initClickSounds();
});
