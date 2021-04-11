// https://www.pinterest.com/pin/336081190933901701/ Ground texture and wall texture reference (future)
// sunlight reference: https://github.com/dirkk0/threejs_daynight/blob/master/index.html


var scene, camera, renderer; // local variables scene, camera, renderer

//var raycaster = new THREE.Raycaster( new THREE.Vector3() );

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );            // sets camera variables

  
  camera.position.set(50, 30, -20);  // sets camera position inside the maze

  //camera.position.set(50, 400, -20);                     // TESTING CAM

  renderer = new THREE.WebGLRenderer({ antialias: true });  // antiailas
  renderer.setSize(window.innerWidth, window.innerHeight);  // render size
  renderer.shadowMapEnabled = true;
  renderer.shadowMapCullFace = THREE.CullFaceBack;

  document.body.appendChild(renderer.domElement);           // dom

  window.addEventListener('resize', () => {
    resizeWindowChanges();
    });


  const texture = new THREE.CubeTextureLoader().load([    // skybox loader. Generates skybox for maze
      './raw/posx.jpg',
      './raw/negx.jpg',
      './raw/posy.jpg',
      './raw/negy.jpg',
      './raw/posz.jpg',
      './raw/negz.jpg',
  ]);
  scene.background = texture;                           // sets the background for the scene as cubebox


  // Sunlight creation:
  sunLight = new THREE.DirectionalLight( 0xffffff, 2 );
  sunLight.color.setHSL( 0.1, 1, 0.95 );
  sunLight.position.set( 1.3, 0.75, 3 );
  sunLight.position.multiplyScalar( 50 );
  
// sun casts shadow 
  sunLight.castShadow = true;
  sunLight.shadowMapWidth = sunLight.shadowMapHeight = 3500;  // shadow quality

  var shadowSize = 250;

  sunLight.shadowCameraLeft = -shadowSize;
  sunLight.shadowCameraRight = shadowSize;
  sunLight.shadowCameraTop = shadowSize;
  sunLight.shadowCameraBottom = -shadowSize;

  sunLight.shadowCameraFar = 1000;
  sunLight.shadowBias = -0.000001;

  scene.add( sunLight );





  testCube = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20)) // length, width, height
    testCube.position.set(200, 5, 0);
    testCube.material.color.setHex(0x333333)
    testCube.castShadow = true;
    testCube.receiveShadow = true;
  scene.add(testCube);



  let texture1 = new THREE.TextureLoader().load("./raw/grassC.png", function ( texture ){    // makes the ground texture 100x100 in the plane
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 2,3 );
  });

  const plane = new THREE.Mesh(             // creates a plane and mesh
  new THREE.BoxGeometry(500, 500,1),
  new THREE.MeshPhongMaterial({
    map:texture1
  }))                                        // creates a square cube plane for ground
  plane.material.color.setHex( 0xffffff );
  plane.rotation.x = -Math.PI/2;          // Make the plane horizontal instead of vertical
  plane.receiveShadow = true;
  
  scene.add(plane);

  rend();
}


function rend(){
  requestAnimationFrame(rend);
  renderer.render(scene, camera);
}

// When widow size is changed, resizes the scene properly
function resizeWindowChanges(){
    camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
    
		render();
}

init();                                                  // initialize the display (runs at start)
