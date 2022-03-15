//Import Modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import 'regenerator-runtime/runtime';

const load3d_abm = ()=>{
/* Bilschirmdimensionen -----------------------------------------------------------------------------------*/
var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Green Can for Landing Page


/* Definiert die Zeichenfläche im HTML-File ------------------------------------------------------------------*/
var canvas_abm = document.querySelector('.webgl-abm');

/* Erzeugt die Scene - 3D-Space ------------------------------------------------------------------------------*/
var scene_abm = new THREE.Scene();

/* Lädt die Dose -> GLTF-File --------------------------------------------------------------------------------*/
var canObj_abm;
var loader_abm = new GLTFLoader();
loader_abm.load('./scene_home_green.gltf', function(gltf){
    canObj_abm = gltf.scene;
    canObj_abm.scale.set(5,5,5);
    canObj_abm.rotation.y += 1.9;
    scene_abm.add(canObj_abm);
}, function(xhr){
    // console.log((xhr.loaded/xhr.total*100) + "% loaded");
}, function(error){
    // console.log(error);
});


/* Lichter -------------------------------------------------------------------------------------*/
/* 
var light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(20,20,50); */
const ambientLight_abm = new THREE.AmbientLight(0xffffff);
var pointLight_abm = new THREE.PointLight(0xffffff);
pointLight_abm.position.set(50,50,50);
pointLight_abm.intensity=1.3;

ambientLight_abm.position.set(20,20,20);
ambientLight_abm.intensity=2.5;
scene_abm.add(pointLight_abm, ambientLight_abm);


/* Kamera ------------------------------------------------------------------------------------------------*/
var camera_abm = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
camera_abm.position.set(0,0,1);
scene_abm.add(camera_abm);


/* Renderer ----------------------------------------------------------------------------------------------*/
var renderer_abm = new THREE.WebGLRenderer({
    canvas: canvas_abm, alpha: true,
});

renderer_abm.setClearColor( 0x000000, 0 ); //Transparenter Hintergrund
renderer_abm.setSize(sizes.width, sizes.height);
renderer_abm.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer_abm.shadowMap.enabled = true;
renderer_abm.outputEncoding = true;


/* Controls -> Ermöglichen das Bewegen der Szene ----------------------------------------------------------*/
// const controls_abm = new OrbitControls(camera_abm, renderer_abm.domElement);
// controls_abm.enableZoon = false;


/* Sichert korrekte Darstellung bei rezize ----------------------------------------------------------------*/
window.addEventListener('resize', () => {
    renderer_abm.setSize(window.innerWidth, window.innerHeight);
    camera_abm.aspect = window.innerWidth/window.innerHeight;
    camera_abm.updateProjectionMatrix();
});


/* Lässt Objekt Rotieren -----------------------------------------------------------------------------------*/
async function animate_abm() {
    await requestAnimationFrame( animate_abm );
    /* canObj.rotation.y += 0.01; */
    renderer_abm.render( scene_abm, camera_abm);
}
animate_abm();



// /* Positioniert das pointLight bei Cursor-Position -------------------------------------------------------------*/
// var pointerX = 0;
// var pointerY = 0;
// document.onmousemove = function(event) {
// 	pointerX = event.pageX;
//     pointerX -= (window.innerWidth/2);
//     console.log("X: " + pointerX);
// 	pointerY = event.pageY;
//     pointerY -= (window.innerHeight/2);
//     console.log("Y: " + pointerY);
    
//     pointLight_abm.position.set(pointerX,-pointerY,50);
    
// }

/**
 * Animate
 */
var mobile=false;
//Mobile Device Check
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  mobile=true;
};
if(mobile==false){
    document.addEventListener('mousemove', onDocumentMouseMove);
}
 

let mouseX = 0;
let mouseY = 0;
 
let targetX = 0;
let targetY = 0;
 
const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove (event){
    mouseX = (event.clientX - windowX);
    mouseY = (event.clientY - windowY);

    const clock = new THREE.Clock()

    targetX= mouseX * .001
    targetY= mouseY * .001
    const elapsedTime = clock.getElapsedTime()

 
    // Update Green Can
    canObj_abm.rotation.y = 0.5 * elapsedTime
    canObj_abm.rotation.y += 6 * (targetX-canObj_abm.rotation.y)
    canObj_abm.rotation.x += .5 * (targetY-canObj_abm.rotation.x)
    canObj_abm.position.z += -.25 * (targetY-canObj_abm.rotation.x)
  
    
    // Update Orbital Controls
    // controls.update()

    // Render
    
    renderer_abm.render(scene_abm, camera_abm)
    

    // Call tick again on the next frame
    //window.requestAnimationFrame(tick)
}





}

export {load3d_abm};