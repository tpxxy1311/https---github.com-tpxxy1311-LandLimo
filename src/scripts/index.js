//Import Modules
import LocomotiveScroll from 'locomotive-scroll';
import $ from 'jquery';
import barba from '@barba/core';
import gsap from 'gsap';



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
    },6700);
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
    var scroll = ($(window).height()/3);
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


//Run all functions when Document is ready
$(function() {
  initLoader();
  initCursor();
  initCursorHover();
  initBackgroundChange();
  initVideoFade();
});


// //3D
// /* Definiert die Zeichenfläche im HTML-File ------------------------------------------------------------------*/
// var canvas = document.querySelector('.webgl');


// /* Erzeugt die Scene - 3D-Space ------------------------------------------------------------------------------*/
// var scene = new THREE.Scene();


// /* Lädt die Dose -> GLTF-File --------------------------------------------------------------------------------*/
// var canObj;
// var loader = new GLTFLoader();
// loader.load('scene.gltf', function(gltf){
//     console.log(gltf);
//     canObj = gltf.scene;
//     canObj.scale.set(5,5,5);
//     canObj.rotation.y += 1.9;
//     scene.add(canObj);
// }, function(xhr){
//     console.log((xhr.loaded/xhr.total*100) + "% loaded");
// }, function(error){
//     console.log(error);
// });


// /* Lichter -------------------------------------------------------------------------------------*/
// /* 
// var light = new THREE.DirectionalLight(0xffffff, 2);
// light.position.set(20,20,50); */
// const ambientLight = new THREE.AmbientLight(0xffffff);
// var pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(20,50,50);
// scene.add(pointLight, ambientLight);


// /* Erzeugt Weiße Kugeln an zufälliger Position in der Scene ------------------------------------------------*/
// function addStar(){
//     const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//     const material = new THREE.MeshStandardMaterial( { color: 0x000000 } );
//     const star = new THREE.Mesh( geometry, material );
  
//     const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 70 ) );
  
//     star.position.set(x, y, z);
//     scene.add(star);
// }
// //Erzeugen von 200 Sternen in einem Array
// Array(200).fill().forEach(addStar);


// /* Bilschirmdimensionen -----------------------------------------------------------------------------------*/
// var sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }


// /* Kamera ------------------------------------------------------------------------------------------------*/
// var camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
// camera.position.set(0,0,1);
// scene.add(camera);


// /* Renderer ----------------------------------------------------------------------------------------------*/
// var renderer = new THREE.WebGLRenderer({
//     canvas: canvas, alpha: true,
// });

// renderer.setClearColor( 0x000000, 0 ); //Transparenter Hintergrund
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.shadowMap.enabled = true;
// renderer.outputEncoding = true;


// /* Controls -> Ermöglichen das Bewegen der Szene ----------------------------------------------------------*/
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableZoon = false;


// /* Sichert korrekte Darstellung bei rezize ----------------------------------------------------------------*/
// window.addEventListener('resize', () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth/window.innerHeight;

//     camera.updateProjectionMatrix();
// });


// /* Lässt Objekt Rotieren -----------------------------------------------------------------------------------*/
// async function animate() {
//     await requestAnimationFrame( animate );
//     /* canObj.rotation.y += 0.01; */
//     renderer.render( scene, camera );
// }
// animate();


// /* Positioniert das pointLight bei Cursor-Position -------------------------------------------------------------*/
// var pointerX = 0;
// var pointerY = 0;
// document.onmousemove = function(event) {
// 	pointerX = event.pageX;
//     pointerX -= (window.innerWidth/2);
//     //console.log("X: " + pointerX);
// 	pointerY = event.pageY;
//     pointerY -= (window.innerHeight/2);
//     //console.log("Y: " + pointerY);
//     pointLight.position.set(pointerX,-pointerY,50);
// }







