import './style.css';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'

// Setup

const scene = new THREE.Scene();

//const gui = new dat.GUI()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights




// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('Space.jpg');
//scene.background = spaceTexture;

// Avatar

const sphereTexture = new THREE.TextureLoader().load('NormalMap.png');

const sphereP = new THREE.Mesh(new THREE.SphereGeometry( 2, 32, 16 ), new THREE.MeshStandardMaterial({
    normalMap:sphereTexture,
    color:new THREE.Color(0x292929)
}));
sphereP.position.z = -5;
sphereP.position.x = 2.5;

scene.add(sphereP);

//Light front
const pointLightSphereP = new THREE.PointLight(0x33CAFF,5)
//gui.add(pointLightSphereP.position,"x").min(-10).max(100).step(0.1)
scene.add(pointLightSphereP)

const pointLightSphereS = new THREE.PointLight(0xFF33FC,5)
pointLightSphereS.position.x = 5
//gui.add(pointLightSphereP.position,"x").min(-10).max(100).step(0.1)
scene.add(pointLightSphereS)



// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);


const geometryDode = new THREE.CylinderGeometry( 1, 2, 3, 4 );
const materialDode = new THREE.MeshStandardMaterial()
const meshDode = new THREE.Mesh(geometryDode, materialDode)
scene.add(meshDode)
meshDode.position.z = 43
meshDode.position.setX(-10)
meshDode.position.y = -3


//Resize
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  sphereP.rotation.y += 0.01;
  sphereP.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

let targetX = 0
let targetY = 0

window.addEventListener("mousemove", onMouseMove)

function onMouseMove(event) {
    	pointer.x = ( event.clientX - window.innerWidth/2 ) 
	    pointer.y = - ( event.clientY - window.innerHeight/2 ) 
}


const clock = new THREE.Clock()

const tick = () =>
{
    
    raycaster.setFromCamera( pointer, camera )
    renderer.render( scene, camera );

    targetX = pointer.x * .001
    targetY = pointer.y * .001
    
    

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphereP.rotation.y = .5 * elapsedTime //.5 means how fast
    
    //mouse
    sphereP.rotation.y += .5 * (targetX - sphereP.rotation.y) 
    sphereP.rotation.x += .05 * (targetY - sphereP.rotation.x) 
    sphereP.rotation.y += -.05 * (targetY - sphereP.rotation.x) 
    
   

   
    

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()