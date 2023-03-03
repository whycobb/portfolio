import * as THREE from 'three';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

var startTime = Date.now();

//Get div to attach to
let myWindow = document.getElementById("headerpanel");
var width = myWindow.offsetWidth;
if (width > 850) width = 850;
var height = myWindow.offsetHeight * 2.5;
if (height > 120) height = 120;

console.log("myWindow is: ", myWindow);
console.log("Width is: ", width, "\nHeight is: ", height);

document.getElementById("output").innerText = ("Render width: " + width + "; height: " + height);

const renderer = new THREE.WebGLRenderer( {alpha: true} );
//const renderer = new THREE.WebGLRenderer( { antialias: (width > 860 ? true : false) } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );

//renderer.canvas.style['margin-left'] = 'auto';
//renderer.canvas.style['margin-right'] = 'auto';

myWindow.appendChild( renderer.domElement );

//Scene setup
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
camera.position.z = 4;

var brainGeo;

//load brain
var objLoader = new OBJLoader();
objLoader.load(		//load cottage geometry
	"./Assets/Header/Geo_Thin.obj",
	function(object) {
		brainGeo = object.children[0];
		brainGeo.material = bwMaterial;
		console.log( brainGeo.material );
		scene.add(brainGeo);
		brainGeo.scale.set( 9, 9, 1 );
		brainGeo.position.set( 0, 0, 0 );
		brainGeo.rotation.order = "YZX";
		brainGeo.rotation.set( 0/57.2957795131, 0/57.2957795131, 0/57.2957795131 );
	}
);




//get shaders
//const bwFrag = document.getElementById("bwshader-frag").textContent;
//const bwVert = document.getElementById("bwshader-vert").textContent;

//add click listener
myWindow.addEventListener( 'mousedown', onDocumentMouseDown, false );



//Set up brainwave shader
var noiseTex = new THREE.TextureLoader().load( './Images/Textures/Noise.png' );
noiseTex.wrapS = THREE.RepeatWrapping;
noiseTex.wrapT = THREE.RepeatWrapping;
noiseTex.premultiplyAlpha = false;

// var brainTex = new THREE.TextureLoader().load( 'BrainEdging.png' );
// brainTex.wrapS = THREE.RepeatWrapping;
// brainTex.wrapT = THREE.RepeatWrapping;
// brainTex.premultiplyAlpha = false;

var edgeTex = new THREE.TextureLoader().load( './Assets/Header/Heavitas_BW_UV.png' );
edgeTex.wrapS = THREE.RepeatWrapping;
edgeTex.wrapT = THREE.RepeatWrapping;
edgeTex.magFilter = THREE.NearestFilter;
edgeTex.minFilter = THREE.NearestFilter;
edgeTex.encoding = THREE.LinearEncoding;
edgeTex.premultiplyAlpha = false;

			
let uniforms = {
	x: { value: 1.0 },										//x->timeMsec
	t: {value:new THREE.Color(0x558ee6)},	//t->inColor
	m: { value: noiseTex },								//m->noiseTex
	v: { value: edgeTex }									//v->edgeTex
};

var bwMaterial = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: window.bwVert,
	fragmentShader: window.bwFrag
} );




console.log("ThreeMiniWindow is running!");

function animate() {
	updateCanvasSize();
	
	uniforms.x.value = (Date.now() - startTime) / 1000;	//x->timeMsec
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

console.log("ThreeMiniWindow should now be rendering");

//JUMP functions -----------------------------------

function updateCanvasSize() {
	width = myWindow.offsetWidth;
	if (width > 850) width = 850;
	height = myWindow.offsetHeight * 2.5;
	if (height > 120) height = 120;
	const prevSize = new THREE.Vector2();
	renderer.getSize(prevSize);
	
	if (width != prevSize.x || height != prevSize.y) {
		renderer.setPixelRatio( window.devicePixelRatio );
		
		//set updateStyle (third arg) to true if you want the new dimensions reflected in your CSS.
		renderer.setSize(width, height, true);
		
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
		document.getElementById("output").innerText = ("Render width: " + width + "; height: " + height);
	}
}

function onDocumentMouseDown( event ) {
	console.log("clickt");
	console.log(event);
	
}

