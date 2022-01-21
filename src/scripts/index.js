//Import Modules
import LocomotiveScroll from 'locomotive-scroll';
import $ from 'jquery';
import barba from '@barba/core';
import gsap from 'gsap';
import {load3d} from './3d';

//Sound on or off
var sound=true;
//Define Click Sounds 
const clicksound1 = document.createElement("audio");
clicksound1.src = "can_opening.ogg";
clicksound1.crossOrigin='anonymous';
const clicksound2 = document.createElement("audio");
clicksound2.src = "bubble_sound.mp3";
clicksound2.crossOrigin='anonymous';
// const $backgroundsound_er = document.createElement("audio");
// $backgroundsound_er.src = "er_ambient.mp3";
// $backgroundsound_er.crossOrigin='anonymous'; 


//Smooth Scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smartphone: {
      breakpoint: 0,
      smooth: true,
      getDirection: true,
    },
    tablet: {
      breakpoint: 0,
      smooth: true,
      getDirection: true,
    }
});

//Barba Hook to update the Cursor and Scroll and load 3d Objects
barba.hooks.after(() => {
	scroll.update();
  initCursorHover();
  removeHoverClass();
  $('.landing-headline').addClass('in-view');
  initBackgroundChange();
  $('.bgvideo').trigger('play');
  load3d();
});

//Barba Page Transitions
barba.init({
	debug: true,
	transitions: [
		{
			name: 'general-transition',
			once: ({ next }) => {
				fadeIn(next.container);
			},
			leave: ({ current }) => fadeOut(current.container),
			enter: ({ next }) => {
				fadeIn(next.container);
			},
			beforeEnter() {
        //Set Page Scroll to the top
				scroll.setScroll(0,0);
			}
		}
  ],
  //Play Background Audio Depending on Namespace
  views: [{
    namespace: 'erdbeer-rhabarber',
    beforeEnter() {
      $('body').addClass("er");
    },
    afterEnter() {
      if(sound==true){
        //Play Sound with delay and Click Animation first
        setTimeout(()=>{
         $('.bg-sound-er').get(0).play();
        },2000); 
      }
    },
    beforeLeave() {
      if(sound==true){
        //Fade out sound and then pause it
        $('.bg-sound-er').animate({volume: 0}, 1000, ()=>{
          $('.bg-sound-er').pause();
        });
      } 
    }
  },
  {
    namespace: 'apfel-birne-minze',
    beforeEnter() {
      $('body').addClass("er");
    },
    afterEnter() {
      if(sound==true){
        //Play Sound with delay and Click Animation first
        setTimeout(()=>{
         $('.bg-sound-er').get(0).play();
        },2000); 
      }
    },
    beforeLeave() {
      if(sound==true){
        //Fade out sound and then pause it
        $('.bg-sound-er').animate({volume: 0}, 1000, ()=>{
          $('.bg-sound-er').pause();
        });
      } 
    }
  }]
});

//GSAP Animations
const fadeIn = (container) => {
  //Goes form opacity 0 to 1 in 1.5s
	return gsap.from(container, {autoAlpha: 0, duration: 1.5});
}

const fadeOut = (container) => {
  //Goes to opacity 0 from 1 in 1.5s
	return gsap.to(container, {autoAlpha: 0, duration:1.5});
}

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
    clicksound2.play();
    hideLoadingElements();
    setTimeout(()=>{
      $('.loading-screen').addClass('remove');
    },3000);
    fadeInVideo();
    //Add Effect Class to the Headline on Landing Page
    setTimeout(()=>{
      $('.landing-headline').addClass('in-view');
    },3000);
  });
  //Remove Loading Section on Link Click + Deactivate Sound
  $('.sound-link').on("click", ()=>{
    sound=false;
    hideLoadingElements();
    setTimeout(()=>{
      $('.loading-screen').addClass('remove');
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

//Remove 'Hover' Class after Barba Transition
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
    var scroll = position.scroll.y;
    const checkpoint = 300;
    var op;
    if (scroll <= checkpoint) {
      op = 1 - scroll/checkpoint;
      
    } else {
      op = 0;
    }
    $('.bgvideo').css({opacity:op});
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
}

//Initialise Sound
function initClickSounds(){
  $('.bt-sound').on("click", () => {
    if(sound==true){
      clicksound1.play();
    }
    
  });
  $('.logo').on("click", () => {
    if(sound==true){
      clicksound2.play();
    }
  });
  $('.klick-sound').on("click", () => {
    if(sound==true){
      clicksound2.play();
    }
  });
}

// //Test
// function test(){
//   if($('body').hasClass("er")==true){
//     alert("Erdbeer");
//   }
// }

//Run all functions when Document is ready
$(function() {
  initCursor();
  initCursorHover();
  initMobileMenu();
  load3d();
  initBackgroundChange();
  initVideoFade();
  if(sound===true){
    initClickSounds();
  }
});
