import * as THREE from '/js/three.js-master/build/three.module.js';

//Get div to attach to
let myWindow = document.getElementById("window1");
var width = myWindow.offsetWidth;
var height = myWindow.offsetHeight;

console.log("myWindow is: ", myWindow);
console.log("Width is: ", width, "\nHeight is: ", height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );

myWindow.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

console.log("ThreeMiniWindow is running!");

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	
	cube.rotation.x += 0.001;
	cube.rotation.y += 0.0012;
	cube.rotation.z += 0.0011;
}
animate();

console.log("ThreeMiniWindow should now be rendering");

