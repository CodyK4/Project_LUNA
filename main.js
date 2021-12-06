import './style.css';

import * as THREE from 'three';

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Exported from Blender
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

console.log("JS Loaded");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#first_canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);
camera.position.setX(5);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff); //Points Light
pointLight.position.set(10, 10, 15);
pointLight.rotation.set(10);

const ambientLight = new THREE.AmbientLight(0xffffff); //Ambient Lighting
scene.add(/*pointLight,*/ ambientLight)

/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
*/

//const controls = new OrbitControls(camera, renderer.domElement);

const blend_loader = new GLTFLoader();

//Export blender model as .gltf seperate, then import this function in 3js and should work fine.
blend_loader.load( 'assets/lunalogo.gltf', function ( gltf ) {

	scene.add( gltf.scene );
  gltf.scene.position.z = 3;
  gltf.scene.position.x = 10;
  gltf.scene.position.y = 1;
  gltf.scene.rotation.y = 29.75;

}, undefined, function ( error ) {

	console.error( error );

} );

const spaceTexture = new THREE.TextureLoader().load('assets/2k_stars_milky_way.jpg');
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg');     //BASE TEXTURE
const normalTexture = new THREE.TextureLoader().load('assets/normal.jpg'); //NORMAL MAP

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), //CREATE GEOMETRY
  new THREE.MeshStandardMaterial( {
    map: moonTexture,   //APPLY TEXTURES
    normalMap: normalTexture,
  })
);


moon.position.z = -30;
moon.position.x = 40;

scene.add(moon);

const earthTexture = new THREE.TextureLoader().load('assets/8k_earth_nightmap.jpg'); //change to 2k
const earthBumpMap = new THREE.TextureLoader().load('assets/earthbump1k.jpg');
const earthSpecMap = new THREE.TextureLoader().load('assets/2k_earth_specular_map.tif');
const earthNormalMap = new THREE.TextureLoader().load('assets/2k_earth_normal_map.tif');
const earthCloudMap = new THREE.TextureLoader().load('assets/2k_earth_clouds.jpg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 128, 128),
  new THREE.MeshStandardMaterial( {
    map: earthTexture,
    bumpMap: earthBumpMap,
    envMap: earthSpecMap,
    normalMap: earthNormalMap,
    envMap: earthCloudMap,
  })
);

/*
const earth_atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(7, 128, 128),
  new THREE.MeshStandardMaterial({ color: 0x99ebff }))

earth_atmosphere.opacity = 0.1;
*/

scene.add(earth, /*earth_atmosphere*/);


function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  //camera.position.z = t * 0.01;
  //camera.position.x = t * 0.0002;
  camera.position.y = t * 0.009;
}


document.body.onscroll = moveCamera


function animate() {
  requestAnimationFrame( animate );

  earth.rotation.x += 0.00;
  earth.rotation.y += 0.0001;
  earth.rotation.z += 0.00;

  moon.position.x += 0.0001;
  moon.position.y += 0.00;
  moon.position.z += 0.0001;

  //controls.update()

  renderer.render( scene, camera );
}

animate()