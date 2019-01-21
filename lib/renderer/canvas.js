let camera, cameraTarget, scene, renderer, stlLoader, material, canSatMesh, stats

let container = {
  height: $('view-3d').clientHeight,
  width: $('view-3d').clientWidth,
  dom: $('view-3d')
}

init()
animate()

function init () {
  camera = new THREE.PerspectiveCamera(70, container.width / container.height, 0.1, 1000)
  camera.position.set( 3, 0.15, 3 )

  let controls = new THREE.OrbitControls(camera)

  // stats
  stats = new Stats()
  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  $('viewContainer').appendChild(stats.dom)

  cameraTarget = new THREE.Vector3( 0, - 0.25, 0 )

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xFFFFFF)

  // Material
  material = new THREE.MeshPhongMaterial({
    color: 0xAAAAAA,
    specular: 0x111111,
    shininess: 100
  })

  // Load STL file
  stlLoader = new THREE.STLLoader()
  stlLoader.load(path.join(__dirname, '/lib/models/Mothercan.stl'), (geometry) => {
    canSatMesh = new THREE.Mesh(geometry, material)

    canSatMesh.position.set( 0, - 0.37, - 0.6 )
  	canSatMesh.rotation.set( - Math.PI / 2, 0, 0 )
  	canSatMesh.scale.set( 2, 2, 2 )

    canSatMesh.castShadow = true
  	canSatMesh.receiveShadow = true

    scene.add(canSatMesh)
  })

  // Lights
  scene.add(new THREE.HemisphereLight(0x443333, 0x111122))

  addShadowedLight( 1, 1, 1, 0xffffff, 1.35 )
	addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1)

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: $('view-3d')
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(container.width, container.height)
}

function addShadowedLight( x, y, z, color, intensity ) {
	let directionalLight = new THREE.DirectionalLight( color, intensity );
	directionalLight.position.set( x, y, z );
	scene.add( directionalLight );
	directionalLight.castShadow = true;
	let d = 1;
	directionalLight.shadow.camera.left = - d;
	directionalLight.shadow.camera.right = d;
	directionalLight.shadow.camera.top = d;
	directionalLight.shadow.camera.bottom = - d;
	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 4;
	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;
	directionalLight.shadow.bias = - 0.002;
}

function animate () {
  requestAnimationFrame(animate)

  stats.begin()

  canSatMesh.rotation.x += 0.01
  canSatMesh.rotation.y += 0.005

  stats.end()

  render()
}

// Render function
function render () {
  renderer.render(scene, camera)
}
