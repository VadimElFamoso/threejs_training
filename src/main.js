console.log("test");

import * as three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Raycaster } from 'three';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 0);

//Planetes

const earth = new three.SphereGeometry(8,32,32)
const sun = new three.SphereGeometry(16,32,32)
const moon = new three.SphereGeometry(4,32,32)

//Texture
const background_texture = new three.TextureLoader().load('/8k_stars_milky_way.jpg');
scene.background = background_texture;

const earth_texture = new three.TextureLoader().load('/8k_earth.jpg'); 
const sun_texture = new three.TextureLoader().load('/8k_sun.jpg'); 
const moon_texture = new three.TextureLoader().load('/8k_moon.jpg'); 

//Material
const earth_material = new three.MeshBasicMaterial({map: earth_texture});
const sun_material = new three.MeshBasicMaterial({map: sun_texture});
const moon_material = new three.MeshBasicMaterial({map: moon_texture});

//Meshes
const earth_mesh = new three.Mesh(earth, earth_material);
const sun_mesh = new three.Mesh(sun, sun_material);
const moon_mesh = new three.Mesh(moon, moon_material);

//Position

//Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.update();

//Help
var axesHelper = new three.AxesHelper( 5 );
scene.add(earth_mesh, sun_mesh, moon_mesh, axesHelper);
camera.position.z = 50;

let startTime = Date.now();


//Rendu de la scène : 
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    let currentTime = Date.now();
    let timeElapsed = (currentTime - startTime) / 1000;
    
    let angle = (2 * Math.PI * 365 / 1500) * timeElapsed;
    let moon_angle = (2 * Math.PI * 365 / 270) * timeElapsed;

    earth_mesh.rotation.x += 0.001;
    earth_mesh.rotation.y += 0.001;

    earth_mesh.position.x = Math.cos(angle) * 50;
    earth_mesh.position.y = Math.sin(angle) * 50;

    moon_mesh.position.x = earth_mesh.position.x + Math.cos(moon_angle) * 25;
    moon_mesh.position.y = earth_mesh.position.y + Math.sin(moon_angle) * 25;




    



}
animate();
