//Import Modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import 'regenerator-runtime/runtime';

const load3d_oi = ()=>{
/* Bilschirmdimensionen -----------------------------------------------------------------------------------*/
var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
    
//Orange Can for Landing Page
/* Definiert die Zeichenfläche im HTML-File ------------------------------------------------------------------*/
var canvas_oi = document.querySelector('.webgl-oi');

/* Erzeugt die Scene - 3D-Space ------------------------------------------------------------------------------*/
var scene_oi = new THREE.Scene();

/* Lädt die Dose -> GLTF-File --------------------------------------------------------------------------------*/
var canObj_oi;
var loader_oi = new GLTFLoader();
loader_oi.load('./scene_home_orange.gltf', function(gltf){
    
    canObj_oi = gltf.scene;
    canObj_oi.scale.set(5,5,5);
    canObj_oi.rotation.y += 1.9;
    scene_oi.add(canObj_oi);
}, function(xhr){
    // console.log((xhr.loaded/xhr.total*100) + "% loaded");
}, function(error){
    // console.log(error);
});


/* Lichter -------------------------------------------------------------------------------------*/
/* 
var light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(20,20,50); */
const ambientLight_oi = new THREE.AmbientLight(0xffffff);
var pointLight_oi = new THREE.PointLight(0xffffff);
pointLight_oi.position.set(20,50,50);
pointLight_oi.intensity=1.3;

ambientLight_oi.position.set(20,20,20);
ambientLight_oi.intensity=2.9;
scene_oi.add(pointLight_oi, ambientLight_oi);


/* Kamera ------------------------------------------------------------------------------------------------*/
var camera_oi = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
camera_oi.position.set(0,0,1);
scene_oi.add(camera_oi);


/* Renderer ----------------------------------------------------------------------------------------------*/
var renderer_oi = new THREE.WebGLRenderer({
    canvas: canvas_oi, alpha: true,
});

renderer_oi.setClearColor( 0x000000, 0 ); //Transparenter Hintergrund
renderer_oi.setSize(sizes.width, sizes.height);
renderer_oi.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer_oi.shadowMap.enabled = true;
renderer_oi.outputEncoding = true;


/* Controls -> Ermöglichen das Bewegen der Szene ----------------------------------------------------------*/
// const controls_oi = new OrbitControls(camera_oi, renderer_oi.domElement);
// controls_oi.enableZoon = false;


/* Sichert korrekte Darstellung bei rezize ----------------------------------------------------------------*/
window.addEventListener('resize', () => {
    renderer_oi.setSize(window.innerWidth, window.innerHeight);
    camera_oi.aspect = window.innerWidth/window.innerHeight;
    camera_oi.updateProjectionMatrix();
});


/* Lässt Objekt Rotieren -----------------------------------------------------------------------------------*/
async function animate_oi() {
    await requestAnimationFrame( animate_oi );
    /* canObj.rotation.y += 0.01; */
    renderer_oi.render( scene_oi, camera_oi);
}
animate_oi();

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
    
//     pointLight_oi.position.set(pointerX,-pointerY,50);
    
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
    canObj_oi.rotation.y = 0.5 * elapsedTime
    canObj_oi.rotation.y += 6 * (targetX-canObj_oi.rotation.y)
    canObj_oi.rotation.x += .5 * (targetY-canObj_oi.rotation.x)
    canObj_oi.position.z += -.25 * (targetY-canObj_oi.rotation.x)
  
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer_oi.render(scene_oi, camera_oi)
    
    // Call tick again on the next frame
    //window.requestAnimationFrame(tick)
}



}

export { load3d_oi };