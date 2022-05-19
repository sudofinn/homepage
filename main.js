import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()


// Scene
const scene = new THREE.Scene()

// Objects

const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const material = new THREE.PointsMaterial( {
    size:0.005,
    //color:0xff33cc,
    lights:true
})
const sphere = new THREE.Points(geometry, material);



sphere.position.x = 1
scene.add(sphere)


// Lights

const pointLight = new THREE.PointLight(0xff33cc, 2)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 1
scene.add(pointLight)

gui.add(pointLight.position,"x").min(-5).max(10).step(0.1)
//gui.add(pointLight.position,"y").min(-5).max(10).step(0.1)
//gui.add(pointLight.position,"z").min(-5).max(10).step(0.1)

//const pointLightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(pointLightHelper)




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

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Interactivity using Raycaster


const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

let targetX = 0
let targetY = 0

window.addEventListener("mousemove", onMouseMove)

function onMouseMove(event) {
    	pointer.x = ( event.clientX - window.innerWidth/2 ) 
	    pointer.y = - ( event.clientY - window.innerHeight/2 ) 
}


//Renderer
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
   
    
    raycaster.setFromCamera(pointer, camera)
    targetX = pointer.x * .001
    targetY = pointer.y * .001

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

     //Mouse
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y) 
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x) 
    //sphere.rotation.y += -.05 * (targetY - sphere.rotation.x)
    

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()