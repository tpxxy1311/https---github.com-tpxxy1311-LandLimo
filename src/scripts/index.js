//Import Modules
import LocomotiveScroll from 'locomotive-scroll';
import $ from 'jquery';
import barba from '@barba/core';
import gsap from 'gsap';

//Smooth Scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: true
});

//Barba Hook to update the Cursor and Scroll
barba.hooks.after(() => {
	scroll.update();
  initCursorHover();
  removeHoverClass();
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
				fadeIn(next.container)
			},
			beforeEnter() {
        //Set Page Scroll to the top
				scroll.setScroll(0,0);
			}
		}
]
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

//Initialise Loading Screen
function initLoader(){
  //Show Button if all Assests are loaded
  $(window).on("load",()=>{
    setTimeout(()=>{
      $('.bt-loading').addClass('bt-ready');
      $('.text-loading').addClass('bt-ready');
    },5000);
  });
  //Remove Loading Section on Button Click
  $('.bt-loading').on("click", ()=>{
    $('.loading-screen').addClass('remove');
    removeHoverClass();
    //Add Effect Class to the Headline on Landing Page
    setTimeout(()=>{
      $('.landing-headline').addClass('in-view');
    },1000);
  })
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

//Remove 'Hover' Class after Barba Transition
function removeHoverClass(){
  $('.cursor').removeClass('hover');
}

//Initalise the Background Change Function
function initBackgroundChange() {
  scroll.on("scroll",()=>{
    // Change 33% earlier than scroll position so colour is there when you arrive
    var scroll = $(window).scrollTop() + ($(window).height()/3);
    console.log("scroll:"+scroll);
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
    console.log(scroll);
  })
};


//Run all functions when Document is ready
$(function() {
  initLoader();
  initCursor();
  initCursorHover();
  initBackgroundChange();
  initVideoFade();
});








