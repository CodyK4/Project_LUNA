import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

//Debug camera
//const controls = new OrbitControls(camera, renderer.domElement);

const pointLight = new THREE.PointLight(0xffffff); //Points Light
pointLight.position.set(10, 10, 15);
pointLight.rotation.set(10);

const ambientLightA = new THREE.AmbientLight(0xffffff); //Ambient Lighting
scene.add(/*pointLight,*/ ambientLightA)

/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
*/


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
  new THREE.SphereGeometry(1.62, 34.56, 34.56), //CREATE GEOMETRY
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
    envMap: earthSpecMap,
  }),
  new THREE.MeshNormalMaterial( {
    normalMap: earthNormalMap,
  }),
  new THREE.MeshDepthMaterial( {
    bumpMap: earthBumpMap,
  })
);

/*
const earth_atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(7, 128, 128),
  new THREE.MeshStandardMaterial({ color: 0x99ebff }))

earth_atmosphere.opacity = 0.1;
*/

scene.add(earth, /*earth_atmosphere*/);
earth.rotation.y = 30;
earth.rotation.x = 0.55;

function animate() {
  requestAnimationFrame( animate );

  earth.rotation.x += 0.00;
  earth.rotation.y += 0.00005;
  earth.rotation.z += 0.00;

  moon.position.x += 0.0001;
  moon.position.y += 0.00;
  moon.position.z += 0.0001;

  //controls.update()

  renderer.render( scene, camera );
}

animate()

//SCENE B //---------------------------------=------------------------------------------=------------------------------------------=-------------------------------------=--------------
const sceneB = new THREE.Scene();


const rendererB = new THREE.WebGLRenderer({
  canvas: document.querySelector('#second_canvas'),
});

const cameraB = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

rendererB.setPixelRatio(window.devicePixelRatio);
rendererB.setSize(window.innerWidth, window.innerHeight);
cameraB.position.setZ(10);
cameraB.position.setX(5);

//const controls = new THREE.OrbitControls( cameraB, rendererB.domElement ); controls.target.set(0,0,0);
const gridHelper = new THREE.GridHelper(200, 50);
sceneB.add(gridHelper);

const pointLightB = new THREE.PointLight(0xffffff); //Points Light
pointLightB.position.set(-25, 4, 7);
pointLightB.rotation.set(5);

sceneB.add(pointLightB);

//const ambientLightB = new THREE.AmbientLight(0xffffff); //Ambient Lighting
//sceneB.add(ambientLightB) //ambientLight)

sceneB.background = spaceTexture;

const marsTexture = new THREE.TextureLoader().load('assets/8k_earth_nightmap.jpg');
const marsNormal = new THREE.TextureLoader().load('assets/mars_1k_normal.jpg');

const mars = new THREE.Mesh( 
  new THREE.SphereGeometry(6, 128, 128),
  new THREE.MeshStandardMaterial( {
    map: marsTexture,
    normalMap: marsNormal,
  })
);

sceneB.add(mars);

rendererB.render(sceneB, cameraB);



function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  //camera.position.z = t * 0.01;
  //camera.position.x = t * 0.0002;
  camera.position.y = t * 0.009;
}

document.body.onscroll = moveCamera

rendererB.render(sceneB, cameraB);
