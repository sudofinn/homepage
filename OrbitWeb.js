import './OrbitWeb.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import "./spinner.js"


// Debug
//const gui = new dat.GUI()


// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

//Light front
const pointLightSphereP = new THREE.PointLight(0x33CAFF,5)
pointLightSphereP.position.x = 1
//gui.add(pointLightSphereP.position,"x").min(-10).max(100).step(0.1)
scene.add(pointLightSphereP)

const pointLightSphereS = new THREE.PointLight(0xFF33FC,5)
pointLightSphereS.position.x = 2

//gui.add(pointLightSphereP.position,"x").min(-10).max(100).step(0.1)
scene.add(pointLightSphereS)

//Sizes
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

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)



// Controls
 const controls = new OrbitControls(camera, document.querySelector("#bg"))
 controls.enableDamping = true

 //Particles
// Random objects
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24,24) //radius, width, height segments
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)


    //randomly generate x,y,z for each star
    // randFloatSpread() generates value between -100 and 100
      const [x, y, z] = Array(3).fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z)
    scene.add(star)



}

Array(200).fill().forEach(addStar) // want to have 200 random values







//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Animate
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
     controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()