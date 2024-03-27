console.log("test");

import * as three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// //Création du cube :
// const geometry = new three.BoxGeometry(1,1,1);
// const texture = new three.TextureLoader().load('/ryuk.jpg'); 
// const material = new three.MeshBasicMaterial({map: texture})
// const cube = new three.Mesh(geometry, material);

// scene.add(cube);

// camera.position.z = 5;
const geometry = new three.SphereGeometry(16,32,16)
const texture = new three.TextureLoader().load('/2k_earth.jpg'); 
const material = new three.MeshBasicMaterial({map: texture})

const sphere = new three.Mesh(geometry, material);

const controls = new OrbitControls(camera, renderer.domElement)
controls.update();
scene.add(sphere);
camera.position.z = 50;


//Rendu de la scène : 
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    sphere.rotation.y += 0.001;
}
animate();
