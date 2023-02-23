import * as THREE from '/js/three.js-master/build/three.module.js';

//Get div to attach to
let myWindow = document.getElementById("window1");
var width = myWindow.offsetWidth;
var height = myWindow.offsetHeight;

console.log("myWindow is: ", myWindow);
console.log("Width is: ", width, "\nHeight is: ", height);

const renderer = new THREE.WebGLRenderer( {alpha: true} );
renderer.setSize( width, height );

myWindow.appendChild( renderer.domElement );

//Scene setup
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
camera.position.z = 5;

//Basic box geometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


//get shaders
const bwFrag = document.getElementById("bwshader-frag").textContent;
const bwVert = document.getElementById("bwshader-vert").textContent;

//add listener
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

console.log(bwFrag);
console.log(bwVert);




console.log("ThreeMiniWindow is running!");

function animate() {
	updateCanvasSize();
	
	cube.rotation.x += 0.001;
	cube.rotation.y += 0.0012;
	cube.rotation.z += 0.0011;
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

console.log("ThreeMiniWindow should now be rendering");

//JUMP functions -----------------------------------

function updateCanvasSize() {
	width = myWindow.offsetWidth;
	height = myWindow.offsetHeight;
	const prevSize = new THREE.Vector2();
	renderer.getSize(prevSize);
	
	if (width != prevSize.x || height != prevSize.y) {
		//set updateStyle (third arg) to true if you want the new dimensions reflected in your CSS.
		renderer.setSize(width, height, true);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
	}
}

function onDocumentMouseDown( event ) {
	console.log("clickt");
	console.log(event);
}

