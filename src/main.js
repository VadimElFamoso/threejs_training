console.log("test");

import * as three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Raycaster } from 'three';

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
console.log(sphere.matrix);

camera.position.set(0, 0, 0);

//Planetes
let planets = []

const mercury = new three.SphereGeometry(16,32,16)
const venus = new three.SphereGeometry(16,32,16)
const earth = new three.SphereGeometry(16,32,16)
const mars = new three.SphereGeometry(16,32,16)
const jupiter = new three.SphereGeometry(16,32,16)

//Texture
const background_texture = new three.TextureLoader().load('/8k_stars_milky_way.jpg');

const mercury_texture = new three.TextureLoader().load('/8k_mercury.jpg'); 
const venus_texture = new three.TextureLoader().load('/8k_venus.jpg'); 
const earth_texture = new three.TextureLoader().load('/8k_earth.jpg'); 
const mars_texture = new three.TextureLoader().load('/8k_mars.jpg'); 
const jupiter_texture = new three.TextureLoader().load('/8k_jupiter.jpg'); 

//Material
const mercury_material = new three.MeshBasicMaterial({map: mercury_texture});
const venus_material = new three.MeshBasicMaterial({map: venus_texture});
const earth_material = new three.MeshBasicMaterial({map: earth_texture});
const mars_material = new three.MeshBasicMaterial({map: mars_texture});
const jupiter_material = new three.MeshBasicMaterial({map: jupiter_texture});

//Meshes
const mercury_mesh = new three.Mesh(mercury, mercury_material);
const venus_mesh = new three.Mesh(venus, venus_material);
const earth_mesh = new three.Mesh(earth, earth_material);
const mars_mesh = new three.Mesh(mars, mars_material);
const jupiter_mesh = new three.Mesh(jupiter, jupiter_material);

//Position
mercury_mesh.position.x = 50;
venus_mesh.position.x = 100;
earth_mesh.position.x = 150;
mars_mesh.position.x = 200;
jupiter_mesh.position.x = 250;

scene.background = background_texture;

//Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.update();

//Help
var axesHelper = new three.AxesHelper( 5 );
scene.add(mercury_mesh, venus_mesh, earth_mesh, mars_mesh, jupiter_mesh, axesHelper);
camera.position.z = 50;


//Rendu de la scène : 
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    mercury_mesh.rotation.y += 0.001;
	venus_mesh.rotation.y += 0.001;
    earth_mesh.rotation.y += 0.001;
    mars_mesh.rotation.y += 0.001;
    jupiter_mesh.rotation.y += 0.001;
}
animate();
