//Import Modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import 'regenerator-runtime/runtime';

const load3d = ()=>{
/* Bilschirmdimensionen -----------------------------------------------------------------------------------*/
var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Red Can for Landing Page
/* Definiert die Zeichenfläche im HTML-File ------------------------------------------------------------------*/
var canvas_er = document.querySelector('.webgl-er');

/* Erzeugt die Scene - 3D-Space ------------------------------------------------------------------------------*/
var scene_er = new THREE.Scene();

/* Lädt die Dose -> GLTF-File --------------------------------------------------------------------------------*/
var canObj_er;
var loader_er = new GLTFLoader();
loader_er.load('./scene_home_red.gltf', function(gltf){
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
const ambientLight_er = new THREE.AmbientLight(0xffffff);
var pointLight_er = new THREE.PointLight(0xffffff);
pointLight_er.position.set(20,50,50);
scene_er.add(pointLight_er, ambientLight_er);

/* Kamera ------------------------------------------------------------------------------------------------*/
var camera_er = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
camera_er.position.set(0,0,1);
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
controls.enableZoon = false;

/* Sichert korrekte Darstellung bei rezize ----------------------------------------------------------------*/
window.addEventListener('resize', () => {
    renderer_er.setSize(window.innerWidth, window.innerHeight);
    camera_er.aspect = window.innerWidth/window.innerHeight;
    camera_er.updateProjectionMatrix();
});

/* Lässt Objekt Rotieren -----------------------------------------------------------------------------------*/
async function animate_er() {
    await requestAnimationFrame( animate_er );
    /* canObj.rotation.y += 0.01; */
    renderer_er.render( scene_er, camera_er);
}
animate_er();


//Green Can for Landing Page
/* Definiert die Zeichenfläche im HTML-File ------------------------------------------------------------------*/
var canvas_abm = document.querySelector('.webgl-abm');

/* Erzeugt die Scene - 3D-Space ------------------------------------------------------------------------------*/
var scene_abm = new THREE.Scene();

/* Lädt die Dose -> GLTF-File --------------------------------------------------------------------------------*/
var canObj_abm;
var loader_abm = new GLTFLoader();
loader_er.load('./scene_home_green.gltf', function(gltf){
    console.log(gltf);
    canObj_abm = gltf.scene;
    canObj_abm.scale.set(5,5,5);
    canObj_abm.rotation.y += 1.9;
    scene_abm.add(canObj_abm);
}, function(xhr){
    console.log((xhr.loaded/xhr.total*100) + "% loaded");
}, function(error){
    console.log(error);
});


/* Lichter -------------------------------------------------------------------------------------*/
/* 
var light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(20,20,50); */
const ambientLight_abm = new THREE.AmbientLight(0xffffff);
var pointLight_abm = new THREE.PointLight(0xffffff);
pointLight_abm.position.set(20,50,50);
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
const controls_abm = new OrbitControls(camera_abm, renderer_abm.domElement);
controls_abm.enableZoon = false;


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


//Orange Can for Landing Page
/* Definiert die Zeichenfläche im HTML-File ------------------------------------------------------------------*/
var canvas_oi = document.querySelector('.webgl-oi');

/* Erzeugt die Scene - 3D-Space ------------------------------------------------------------------------------*/
var scene_oi = new THREE.Scene();

/* Lädt die Dose -> GLTF-File --------------------------------------------------------------------------------*/
var canObj_oi;
var loader_er = new GLTFLoader();
loader_er.load('./scene_home_orange.gltf', function(gltf){
    console.log(gltf);
    canObj_oi = gltf.scene;
    canObj_oi.scale.set(5,5,5);
    canObj_oi.rotation.y += 1.9;
    scene_oi.add(canObj_oi);
}, function(xhr){
    console.log((xhr.loaded/xhr.total*100) + "% loaded");
}, function(error){
    console.log(error);
});


/* Lichter -------------------------------------------------------------------------------------*/
/* 
var light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(20,20,50); */
const ambientLight_oi = new THREE.AmbientLight(0xffffff);
var pointLight_oi = new THREE.PointLight(0xffffff);
pointLight_oi.position.set(20,50,50);
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
const controls_oi = new OrbitControls(camera_oi, renderer_oi.domElement);
controls_oi.enableZoon = false;


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

/* Positioniert das pointLight bei Cursor-Position -------------------------------------------------------------*/
var pointerX = 0;
var pointerY = 0;
document.onmousemove = function(event) {
	pointerX = event.pageX;
    pointerX -= (window.innerWidth/2);
    //console.log("X: " + pointerX);
	pointerY = event.pageY;
    pointerY -= (window.innerHeight/2);
    //console.log("Y: " + pointerY);
    pointLight_er.position.set(pointerX,-pointerY,50);
    pointLight_abm.position.set(pointerX,-pointerY,50);
    pointLight_oi.position.set(pointerX,-pointerY,50);
}

}

export {load3d};