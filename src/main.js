console.log("test");

import GUI from 'lil-gui';
import * as three from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MathUtils } from 'three';
import { randFloat, randInt } from 'three/src/math/MathUtils.js';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 0);

const proportions = [78/100, 21/100, 1/100];
const atoms_distribution = [proportions[0] * 1000, proportions[1] * 1000, proportions[2] * 1000];

//Planetes
let rayon = 25;
const gaz_bubble = new three.SphereGeometry(rayon,50,50);

//Material
const gaz_bubble_material = new three.MeshBasicMaterial({color: '#faf2f8', transparent: true})
gaz_bubble_material.opacity = 0.2;

//Meshes
const gaz_bubble_mesh = new three.Mesh(gaz_bubble, gaz_bubble_material);

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
let dioxyde_carbone_atoms = [];
let divers_atoms = [];

//Azote
for(let i = 0; i < atoms_distribution[0]; i++){
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

//Oxygene
for(let i = 0; i < atoms_distribution[1]; i++){
    const oxygene = new three.SphereGeometry(0.2,32,32)
    const oxygene_material = new three.MeshBasicMaterial({color: '#ff0000'});
    const oxygene_mesh = new three.Mesh(oxygene, oxygene_material);
    let saved_coordinates = oxygene_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))

    while(!(saved_coordinates.x**2 + saved_coordinates.y**2 + saved_coordinates.z**2 < rayon**2)){
        oxygene_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))
    }
    oxygene_atoms.push(oxygene_mesh);

    scene.add(oxygene_mesh);

}

//Dioxyde de carbone :
function dioxyde_Carbone_add(presence){
    for(let i = 0; i < Math.round(presence * 1000); i++){
        const dioxyde_carbone = new three.SphereGeometry(0.2,32,32)
        const dioxyde_carbone_material = new three.MeshBasicMaterial({color: '#454647'});
        const dioxyde_carbone_mesh = new three.Mesh(dioxyde_carbone, dioxyde_carbone_material);
        let saved_coordinates = dioxyde_carbone_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))
    
        while(!(saved_coordinates.x**2 + saved_coordinates.y**2 + saved_coordinates.z**2 < rayon**2)){
            dioxyde_carbone_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))
        }
    
        dioxyde_carbone_atoms.push(dioxyde_carbone_mesh);

        scene.add(dioxyde_carbone_mesh);


    }
}

// //Gaz divers :
for(let i = 0; i < atoms_distribution[2]; i++){
    const divers = new three.SphereGeometry(0.2,32,32)
    const divers_material = new three.MeshBasicMaterial({color: '#e803fc'});
    const divers_mesh = new three.Mesh(divers, divers_material);
    let saved_coordinates = divers_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))

    //On positionne les atomes
    while(!(saved_coordinates.x**2 + saved_coordinates.y**2 + saved_coordinates.z**2 < rayon**2)){
        divers_mesh.position.set(Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon), Math.random() * (rayon - (-rayon)) + (-rayon))
    }
    divers_atoms.push(divers_mesh);

    scene.add(divers_mesh);
}

dioxyde_Carbone_add(0.20);

let gui_details = {
    azote: true,
    oxygene: true,
    dioxyde_carbone: true,
    autre: true,
    taux_co2: 0.10,
    function_add: 'taux_co2',
}

const gui = new GUI();
gui.add(gui_details, 'taux_co2', 0.05, 0.20).onChange(value => {
    dioxyde_Carbone_add(value);
})
// gui.add(gui_details, 'function');
gui.add(gui_details, 'azote');
gui.add(gui_details, 'oxygene');
gui.add(gui_details, 'dioxyde_carbone');
gui.add(gui_details, 'autre');

let decelerator = 1/20;

// Génération du vecteur random :
function getRandomVector(min, max, atom){
    let randomVec = new Vector3(randFloat(min,max),randFloat(min,max),randFloat(min,max));
    return atom.position.add(randomVec);
}

function isColliding(atom, rayon){
    //L'atome entre en collision avec la sphère de gaz :
    if(atom.position.x**2 + atom.position.y**2 + atom.position.z**2 >= rayon **2){
        console.log("Collision détectée");
        return true;
    }
    //L'atome n'est pas en collision avec la sphère de gaz :
    else{
        return false;
    }
}

console.log(azote_atoms);
console.log(oxygene_atoms);
console.log(dioxyde_carbone_atoms);
console.log(divers_atoms);

let atoms = Array.from(azote_atoms.concat(oxygene_atoms, dioxyde_carbone_atoms, divers_atoms));
console.log(atoms);


//Rendu de la scène : 
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    atoms.forEach(atom => {
        if(isColliding(atom, rayon)){
            getRandomVector(-0.1 * decelerator, 0.1 * decelerator, atom).negate();
            console.log(`Collision détectée sur ${atom}`); 
        }
        else{
            getRandomVector(-0.1 * decelerator, 0.1 * decelerator, atom);
        }
    });

   
}

animate();
