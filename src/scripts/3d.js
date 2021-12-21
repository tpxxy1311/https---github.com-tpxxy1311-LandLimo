import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import 'regenerator-runtime/runtime';

/* Definiert die Zeichenfläche im HTML-File ------------------------------------------------------------------*/
var canvas = document.querySelector('.webgl-abm');

/* Erzeugt die Scene - 3D-Space ------------------------------------------------------------------------------*/
var scene = new THREE.Scene();


/* Lädt die Dose -> GLTF-File --------------------------------------------------------------------------------*/
var canObj;
var loader = new GLTFLoader();
loader.load('./scene.gltf', function(gltf){
    console.log(gltf);
    canObj = gltf.scene;
    canObj.scale.set(5,5,5);
    canObj.rotation.y += 1.9;
    scene.add(canObj);
}, function(xhr){
    console.log((xhr.loaded/xhr.total*100) + "% loaded");
}, function(error){
    console.log(error);
});


/* Lichter -------------------------------------------------------------------------------------*/
/* 
var light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(20,20,50); */
const ambientLight = new THREE.AmbientLight(0xffffff);
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,50,50);
scene.add(pointLight, ambientLight);


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


/* Bilschirmdimensionen -----------------------------------------------------------------------------------*/
var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/* Kamera ------------------------------------------------------------------------------------------------*/
var camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
camera.position.set(0,0,1);
scene.add(camera);


/* Renderer ----------------------------------------------------------------------------------------------*/
var renderer = new THREE.WebGLRenderer({
    canvas: canvas, alpha: true,
});

renderer.setClearColor( 0x000000, 0 ); //Transparenter Hintergrund
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.outputEncoding = true;


/* Controls -> Ermöglichen das Bewegen der Szene ----------------------------------------------------------*/
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoon = false;


/* Sichert korrekte Darstellung bei rezize ----------------------------------------------------------------*/
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();
});


/* Lässt Objekt Rotieren -----------------------------------------------------------------------------------*/
async function animate() {
    await requestAnimationFrame( animate );
    /* canObj.rotation.y += 0.01; */
    renderer.render( scene, camera );
}
animate();


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
    pointLight.position.set(pointerX,-pointerY,50);
}