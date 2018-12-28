const THREE = require('three');

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000 )

let renderer = new THREE.WebGLRenderer({
  // Renderer properties.
  canvas: $('view-3d'),
  antialias: true
})
renderer.setSize( 200, 200)
//$('viewContainer').appendChild(renderer.domElement)

// Create shapes for the view.
let geo = new THREE.BoxGeometry(2, 2, 2)

// Create material for the shapes.
let material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
})
let cube = new THREE.Mesh(geo, material)
scene.add(cube)

// Move camera to get cube into view.
camera.position.z = 3

// View logic.
let update = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.005
}

// Draw View.
let render = () => {
  renderer.render(scene, camera)
}


// Run View loop. (update, render, repeat).
let GameLoop = () => {
  requestAnimationFrame(GameLoop)
  update()
  render()
}

GameLoop()
