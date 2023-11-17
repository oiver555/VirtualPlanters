import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const canvas = document.querySelector('canvas.webgl')

const timeStep = 1 / 60
let lastCallTime = performance.now() / 1000
const clock = new THREE.Clock()
const scene = new THREE.Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 4.5



const renderer = new THREE.WebGLRenderer({
  canvas
})



const controls = new OrbitControls(camera, canvas)
controls.enabled = true

const objLoader = new OBJLoader()
const mtl = new THREE.MeshStandardMaterial({ color: "grey", })
objLoader.load('Scene.obj', (obj) => {
  console.log(obj)
  obj.castShadow = true
  obj.receiveShadow = true

  obj.traverse(mesh => {
    if (mesh.isMesh) {
      console.log(mesh)
      mesh.material = mtl
    }
  })
  scene.add(obj)

})

//LIGHTS
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 60, 5, 5)
rectAreaLight.position.set(10, 10, 0);
rectAreaLight.rotation.set(10, 0, 0);
rectAreaLight.castShadow = true
rectAreaLight.receiveShadow = true
scene.add(rectAreaLight)

const rectAreaLight2 = new THREE.RectAreaLight(0xffffff, 60, 5, 5)
rectAreaLight2.position.set(-10, 10, 0);
rectAreaLight2.rotation.set(10, 0, 0);
rectAreaLight2.castShadow = true
rectAreaLight2.receiveShadow = true
scene.add(rectAreaLight2)

const rectAreaLight3 = new THREE.RectAreaLight(0xffffff, 10, 5, 5)
rectAreaLight3.position.set(0, -10, 0);
rectAreaLight3.rotation.set(Math.PI / 2, 0, 0);
rectAreaLight3.castShadow = true
rectAreaLight3.receiveShadow = true
scene.add(rectAreaLight3)

const ambLight = new THREE.AmbientLight(0xffffff, 1)

scene.add(ambLight)

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () => {

  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const tick = () => {

  const elapsedTime = clock.getElapsedTime()
  const time = performance.now() / 1000
  const dt = time - lastCallTime
  lastCallTime = time

  controls.update(dt)
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()