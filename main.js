import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Canvas is the thing that would hold everything, and also 
//it defines where the sceen must be shown on the screen.
const canvas = document.querySelector('#scene-container');

// THE SCENE, Holds objects or Mesh (geomertry + material), Lights
const scene = new THREE.Scene();
//  Setup the camera (Perspective Camera memic the human's eyes)
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
// RENDERER, holds The Camera, screen and all objects. 
const renderer = new THREE.WebGLRenderer({ canvas });

// Configure the renderer size and pixel ratio (renderer resolution)
//  renderer.setSize(window.innerWidth, window.innerHeight); // canvas's drawingbuffer size
// renderer.setPixelRatio(window.devicePixelRatio);

// The default camera position is set to the middle, reposition it by setting the z position.
// camera.position.z = 40 OR
camera.position.setZ(80);

// Create Objects => to create an object in three js we really need three things:
//1. A Geometry => the {x,y,z} that makeup the shape
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
//2. A Material => the wrapping paper for an object (or A Texture => load a picture that would wrap the object)
// The wireframe option will light the lines of the geometry
const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xFF6374, wireframe: true });
//3. A Mesh => is a combination of Geometry + material
const torus = new THREE.Mesh(torusGeometry, basicMaterial);
// Add the ceated object to the scene 
scene.add(torus);

// Object2
const strandardMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6374 });
const torus2 = new THREE.Mesh(torusGeometry, strandardMaterial);
torus2.position.x = -30;
scene.add(torus2);

// Create a light point (when you want to focus on a specific object)
const lightPoint = new THREE.PointLight({ color: 0xffffff });
lightPoint.position.set(-20, 0, 0);
// ADD object 2 to the scene

// AmbientLight: Light across the entire scene
const ambientLight = new THREE.AmbientLight({ color: 0xffffff });
scene.add(lightPoint, ambientLight);

// PointLightHelper: Show the position of the point light.
const lightHelper = new THREE.PointLightHelper(lightPoint);
scene.add(lightHelper);

// GRID HELPER
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// OrbitControl (Activate DOM Gestures), it listen to the mouse event and update the camera cordinally
const orbitControl = new OrbitControls(camera, renderer.domElement);

// Create stars on the space
function createStar() {
  const starGeometry = new THREE.SphereGeometry(0.25, 20, 20);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);
  return star;
}
// ADD 200 stars to the scene
Array(200).fill().forEach(() => {
  const star = createStar();
  scene.add(star);
});

// Create texture => Add a background to the scene
const spaceTexture = new THREE.TextureLoader().load('./assets/img/intro/space.jpg');
scene.background = spaceTexture;

// We could also add texture to individual material, 
//wich called Texture Mapping (is the process of taking 2 dimentionel pixels and mapping them to a 3D goemetry)
const moonTexture = new THREE.TextureLoader().load('./assets/img/intro/moon.jpg');
const normalMapTexture = new THREE.TextureLoader().load('./assets/img/intro/normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 40, 40),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalMapTexture })
);
moon.position.y = 30;
moon.position.x = 30;

scene.add(moon);

// responsive aspects
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRation = window.devicePixelRatio;

  const width = canvas.clientWidth * pixelRation | 0;
  const height = canvas.clientHeight * pixelRation | 0;
  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
// Update Camera projection
function updateCameraProjection() {
  const canvas = renderer.domElement;
  canvas.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

// RENDER SCENE and  CAMERA
function render() {

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x += 0.01;
  torus2.rotation.y += 0.005;
  torus2.rotation.z += 0.01;

  moon.rotation.z += 0.002;

  const needResize = resizeRendererToDisplaySize(renderer);
  if (needResize) {
    updateCameraProjection();
  }

  orbitControl.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();