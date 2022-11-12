import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraController, SceneController } from './helpers';

// GET CANVAS ID
const canvas = document.querySelector('#scene-container');
// CREATE A RENDERER 
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// CREATE CAMERA CONTROLLER
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraController = new CameraController(70, aspectRatio, 1, 1000);
cameraController.perspectiveCamera.position.z = 40;
// CREATE A SCENE CONTROLLER 
const sceneController = new SceneController();
// SET THE SCENE BACKGROUND
// spaceTexture.load('./assets/img/intro/space.jpg', texture => {
//     sceneController.setBackground(texture);
//     renderer.render(sceneController.scene, cameraController.perspectiveCamera);
// });

// Wait for all textures of being loaded
const loadManager = new Three.LoadingManager();
const spaceTexture = new Three.TextureLoader().load('./assets/img/intro/space.jpg');
sceneController.setBackground(spaceTexture);

loadManager.onLoad = () => {
    //  do something after all textures being loaded
}

// CREATE OBJECTS
const sunTexture = new Three.TextureLoader().load('./assets/img/planets/sun.jpg');
const sunMaterial = new Three.MeshStandardMaterial({ map: sunTexture })
const sunGeomertry = new Three.SphereGeometry(5, 40, 40);
const sunMeshObject = new Three.Mesh(sunGeomertry, sunMaterial);

sceneController.addObjectToScene(sunMeshObject);

// ADD LIGHTS TO THE SCENE
sceneController.addAmbientLight();
// ADD LIGHT POINT TO THE SCENE
// const lightPoint = sceneController.createPointLight(new Three.Color(0xffffff), .2);

const directionalLight = sceneController.createDirectionalLight(new Three.Color('orange'), 1);

directionalLight.castShadow = true;


const pointLightHelper = sceneController.createLightHelper(directionalLight);

sceneController.addObjectToScene(directionalLight, pointLightHelper);

const orbitControls = new OrbitControls(cameraController.perspectiveCamera, renderer.domElement);

function render() {
    renderer.render(sceneController.scene, cameraController.perspectiveCamera);
    orbitControls.update();

    requestAnimationFrame(render)
}

render();