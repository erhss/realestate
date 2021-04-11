// sunlight reference: https://github.com/dirkk0/threejs_daynight/blob/master/index.html

// Imports
import * as THREE from '../plugins/three.module.js';
import { PointerLockControls } from '../plugins/PointerLockControls.js'
import { MTLLoader } from '../plugins/MTLLoader.js'
import { OBJLoader } from '../plugins/OBJLoader.js'

var scene, camera, renderer; // local variables scene, camera, renderer
var clock = new THREE.Clock();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );            // sets camera variables

  
  camera.position.set(5, 1.5, 20);  // sets camera position inside the maze

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

// LIGHTING ----------------------------------------------
  // Sunlight creation:
 var sunLight = new THREE.DirectionalLight( 0xffffff, 2 );
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

// OBJECT IMPORT
  let objLoader = new OBJLoader();
   let mtlLoader = new MTLLoader();

    mtlLoader.load('./raw/House.mtl', (mtl) => {
        mtl.preload();
        objLoader.setMaterials(mtl);
        objLoader.load('./raw/House.obj', (object) => {
        object.position.set(0,0,0);
        scene.add(object);
        });
    });




  let keyboard = [];                                                  // listens to keyboard input and stores in array
  addEventListener('keydown', (e)=>{
      keyboard[e.key] = true;
  });
  
  addEventListener('keyup', (e)=>{                                   // listens to keyboard release and pops from array
      keyboard[e.key] = false;
  });




const menuPanel = document.getElementById('menuPanel');             // gets menu id from html
const startButton = document.getElementById('startButton');         // gets startbutton id from html
let music = document.getElementById("music");                       // gets music id from html
music.loop = true;                                                  // loops the music 


startButton.addEventListener('click', function () {                 // event listener for the start button. sets lock to false
    controls.lock();
    document.body.requestFullscreen();
}, false);

const controls = new PointerLockControls(camera, document.body);  // imports pointerlock control to camera and controls.

controls.addEventListener('lock', function (){                      // if lock is false, takes control of the mouse and starts music.
    menuPanel.style.display = 'none';
    //music.play();
    
});
controls.addEventListener('unlock', function () {                   // if locked, mouse is released and music is stopped
     menuPanel.style.display = 'block';
    //music.pause(); 
    });


  function processKeyboard(delta){                                    // processes the keys pressed
    let speed = 5;
    let actualSpeed = speed * delta;                                 // Uses time-delta so that speed is not dependent on framerate.
    
    if (keyboard['w'] || keyboard['ArrowUp']){                      // if w is pressed, move forward etc...
        controls.moveForward(actualSpeed);
    }

    if (keyboard['s'] || keyboard['ArrowDown']){
        controls.moveForward(-actualSpeed)
    }

    if (keyboard['a'] || keyboard['ArrowLeft']){
        controls.moveRight(-actualSpeed);
    }

    if (keyboard['d'] || keyboard['ArrowRight']){
        controls.moveRight(actualSpeed);
    }
}

  var testCube = new THREE.Mesh(
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





function rend(){
  renderer.render(scene, camera);
  let delta = clock.getDelta();                                                   // gets change in time
  processKeyboard(delta);
  requestAnimationFrame(rend);
}

// When widow size is changed, resizes the scene properly
function resizeWindowChanges(){
    camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
    
		rend();
}

rend();                                               // initialize the display (runs at start)
