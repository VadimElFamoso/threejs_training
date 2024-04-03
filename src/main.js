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

const proportions = [78/100, 21/100, 1/100];
const atoms = [proportions[0] * 1000, proportions[1] * 1000, proportions[2] * 1000]

//Planetes
let rayon = 25;
const gaz_bubble = new three.SphereGeometry(rayon,50,50);
const autre = new three.SphereGeometry(0.2,32,32)
const dioxyde_carbone = new three.SphereGeometry(0.2,32,32)

//Material
const gaz_bubble_material = new three.MeshBasicMaterial({color: '#faf2f8', transparent: true})
gaz_bubble_material.opacity = 0.2;
const autre_material = new three.MeshBasicMaterial({color: '11600001'});
const dioxyde_carbone_material = new three.MeshBasicMaterial({color: '10001'});

//Meshes
const gaz_bubble_mesh = new three.Mesh(gaz_bubble, gaz_bubble_material);
const autre_mesh = new three.Mesh(autre, autre_material);
const dioxyde_carbone_mesh = new three.Mesh(dioxyde_carbone, dioxyde_carbone_material);

//Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.update();

//Help
var axesHelper = new three.AxesHelper( 5 );
camera.position.z = 100;

//On génère les particules :
scene.add(gaz_bubble_mesh);

let offset = rayon; //todo: Evite aux atomes de fusionner avec la gaz_bubble (décalage latérale du rayon);
let azote_atoms = [];
let oxygene_atoms = [];

for(let i = 0; i < atoms[0]; i++){
    const azote = new three.SphereGeometry(0.2,32,32)
    const azote_material = new three.MeshBasicMaterial({color: '#0400f7'});
    const azote_mesh = new three.Mesh(azote, azote_material);
    let saved_coordinates = azote_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))
    
    while(!(saved_coordinates.x**2 + saved_coordinates.y**2 + saved_coordinates.z**2 < rayon**2)){
        azote_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))
    }
    azote_atoms.push(azote_mesh);
    scene.add(azote_mesh);
}

for(let i = 0; i < atoms[1]; i++){
    const oxygene = new three.SphereGeometry(0.2,32,32)
    const oxygene_material = new three.MeshBasicMaterial({color: '#ff0000'});
    const oxygene_mesh = new three.Mesh(oxygene, oxygene_material);
    let saved_coordinates = oxygene_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))

    while(!(saved_coordinates.x**2 + saved_coordinates.y**2 + saved_coordinates.z**2 < rayon**2)){
        oxygene_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))
    }
    oxygene_atoms.push(oxygene_mesh);
    scene.add(oxygene_mesh)
}

console.log("Voici les arrays :");
console.log(azote_atoms);
console.log(oxygene_atoms);

//Rendu de la scène : 
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    //Animation des atomes 
    let coordinates_increment = [-0.01, 0.01];

    // azote_atoms.forEach(element => {
    //     element.position.x**2 + element.position.y**2 + element.position.z**2 > rayon**2 ? element.position.x += coordinates_increment[Math.random * coordinates_increment.length] / 1000 : element.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon));
    //     element.position.y**2 + element.position.y**2 + element.position.z**2 > rayon**2 ? element.position.y += coordinates_increment[Math.random * coordinates_increment.length] / 1000 : element.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon));
    //     element.position.z**2 + element.position.y**2 + element.position.z**2 > rayon**2 ? element.position.z += coordinates_increment[Math.random * coordinates_increment.length] / 1000 : element.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon));

        

    // });
        
        

}

animate();
