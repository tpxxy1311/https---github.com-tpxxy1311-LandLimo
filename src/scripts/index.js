//Import Modules
import LocomotiveScroll from 'locomotive-scroll';
import $ from 'jquery';

//Smooth Scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: true
});

//Loading Screen
function initLoader(){
  //Show Button if all Assests are loaded
  $(window).on("load",()=>{
    setTimeout(()=>{
      $('.bt-loading').addClass('bt-ready');
    },5000);
  });
  //Remove Loading Section on Button Click
  $('.bt-loading').on("click", ()=>{
    $('.loading-screen').addClass('remove');
    //Add Effect Class to the Headline on Landing Page
    setTimeout(()=>{
      $('.landing-headline').addClass('in-view');
    },1000);
  })
}

//Initialise Custom Cursor with Event Listener on Scroll
function initCursor(){
  $(document).on("mousemove", (e) => {
    setTimeout(function() {
        $('.cursor')
          .eq(0)
          .css({
            left: e.pageX,
            top: e.pageY,
          });
      }, 110);
});
}

//Initalise the Background Change Function
function initBackgroundChange() {
  scroll.on("scroll",()=>{
    // Change 33% earlier than scroll position so colour is there when you arrive
    var scroll = $(window).scrollTop() + ($(window).height()/3);
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

//Run all functions when Document is ready
$(function() {
  initLoader();
  initBackgroundChange();
  initCursor();
});
