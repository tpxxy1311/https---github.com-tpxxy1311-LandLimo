//Import Modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import 'regenerator-runtime/runtime';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const load3d_rhabarber = ()=>{
/* Bilschirmdimensionen -----------------------------------------------------------------------------------*/
var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Red Can for Landing and Product Page


/* Definiert die Zeichenfläche im HTML-File ------------------------------------------------------------------*/
var canvas_er = document.querySelector('.webgl-rhabarber');

/* Erzeugt die Scene - 3D-Space ------------------------------------------------------------------------------*/
var scene_er = new THREE.Scene();

/* Lädt die Dose -> GLTF-File --------------------------------------------------------------------------------*/
var canObj_er;
var loader_er = new GLTFLoader();
loader_er.load('./scene_rhabarber.gltf', function(gltf){
    console.log(gltf);
    canObj_er = gltf.scene;
    canObj_er.scale.set(5,5,5);
    canObj_er.rotation.y += 1.9;
    scene_er.add(canObj_er);
}, function(xhr){
    console.log((xhr.loaded/xhr.total*100) + "% loaded");
}, function(error){
    console.log(error);
});

/* Lichter -------------------------------------------------------------------------------------*/
/* 
var light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(20,20,50); */
var ambientLight_er = new THREE.AmbientLight(0xffc4ec);
var pointLight_er = new THREE.SpotLight(0xffc4ec);
pointLight_er.position.set(19,19,19);
pointLight_er.intensity=0.5;

ambientLight_er.position.set(20,20,20);
ambientLight_er.intensity=1;
scene_er.add(pointLight_er, ambientLight_er);


/* Kamera ------------------------------------------------------------------------------------------------*/
var camera_er = new THREE.PerspectiveCamera(65, sizes.width/sizes.height, 0.1, 10000);
camera_er.position.set(45,10,1);
scene_er.add(camera_er);

/* Renderer ----------------------------------------------------------------------------------------------*/
var renderer_er = new THREE.WebGLRenderer({
    canvas: canvas_er, alpha: true,
});

renderer_er.setClearColor( 0x000000, 0 ); //Transparenter Hintergrund
renderer_er.setSize(sizes.width, sizes.height);
renderer_er.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer_er.shadowMap.enabled = true;
renderer_er.outputEncoding = true;

/* Controls -> Ermöglichen das Bewegen der Szene ----------------------------------------------------------*/
const controls = new OrbitControls(camera_er, renderer_er.domElement);
controls.enableZoom = false;
controls.enableRotate=false;

/* Sichert korrekte Darstellung bei rezize ----------------------------------------------------------------*/
window.addEventListener('resize', () => {
    renderer_er.setSize(window.innerWidth, window.innerHeight);
    camera_er.aspect = window.innerWidth/window.innerHeight;
    camera_er.updateProjectionMatrix();
});

/* Lässt Objekt Rotieren -----------------------------------------------------------------------------------*/
async function animate_er() {
    await requestAnimationFrame( animate_er );
    //canObj_er.rotation.y += 0.01; 
    renderer_er.render( scene_er, camera_er);
}
animate_er(); 



/**
 * Animate
 */
//  document.addEventListener('mousemove', onDocumentMouseMove);

// let mouseX = 0;
// let mouseY = 0;
 
// let targetX = 0;
// let targetY = 0;
 
// const windowX = window.innerWidth / 2;
// const windowY = window.innerHeight / 2;

// function onDocumentMouseMove (event){
//     mouseX = (event.clientX - windowX);
//     mouseY = (event.clientY - windowY);

//     const clock = new THREE.Clock()

//     targetX= mouseX * .001
//     targetY= mouseY * .001
//     const elapsedTime = clock.getElapsedTime()

//     Update Red Can
//     canObj_er.rotation.y = 0.5 * elapsedTime
//     canObj_er.rotation.y += 6 * (targetX-canObj_er.rotation.y)
//     canObj_er.rotation.x += .5 * (targetY-canObj_er.rotation.x)
//     canObj_er.position.z += -.25 * (targetY-canObj_er.rotation.x)
   
    
//     Update Orbital Controls
//     controls.update()

//     Render
//     renderer_er.render(scene_er, camera_er)
    

//     Call tick again on the next frame
//     window.requestAnimationFrame(tick)
//}



}

export {load3d_rhabarber};