// sunlight reference: https://github.com/dirkk0/threejs_daynight/blob/master/index.html

// Imports
import * as THREE from '../plugins/three.module.js';
import { PointerLockControls } from '../plugins/PointerLockControls.js'
import { MTLLoader } from '../plugins/MTLLoader.js'
import { OBJLoader } from '../plugins/OBJLoader.js'


// GREY PATH SHADERS
// const _VShader = `
// void main(){
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }`;

// const _FShader = `
// void main(){
//   gl_FragColor = vec(1, 1, 1, 1);
// }`;

var scene, camera, renderer; // local variables scene, camera, renderer
var clock = new THREE.Clock();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );            // sets camera variables

  
  camera.position.set(5, 1.75, 20);  // sets camera position inside the maze

  //camera.position.set(50, 50, -20);                     // TESTING CAM

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
let amLight = new THREE.AmbientLight(0xffffff, 0.2);    // adds ambient light. very dim
scene.add(amLight);

  // Sunlight creation:
 var sunLight = new THREE.DirectionalLight( 0xffffff, 1 );
  sunLight.color.setHSL( 0.1, 1, 0.95 );
  sunLight.position.set( 1.3, 0.75, 3 );
  sunLight.position.multiplyScalar( 10 );
  
// sun casts shadow 
  sunLight.castShadow = true;
  sunLight.shadowMapWidth = sunLight.shadowMapHeight = 3000;  // shadow quality

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
        object.position.set(0,0.5,0);
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add(object);
        });
    });

    let objLoader33 = new OBJLoader();
    let mtlLoader33 = new MTLLoader();

    mtlLoader33.load('./raw/fence.mtl', (mtl) => {
      mtl.preload();
      objLoader33.setMaterials(mtl);
      objLoader33.load('./raw/fence.obj', (object) => {
      object.position.set(0,0.5,0);
      object.castShadow = true;
      object.receiveShadow = true;
      scene.add(object);
      });
  });

  

  let sofaObjLoader = new OBJLoader();
  let sofaMtlLoader = new MTLLoader();

  sofaMtlLoader.load('./raw/Sofa.mtl', (sofaMtl) => {
    sofaMtl.preload();
    sofaObjLoader.setMaterials(sofaMtl);
    sofaObjLoader.load('./raw/Sofa.obj', (sofaObject) => {
    sofaObject.position.set(4.5,.9,6);
    sofaObject.rotation.y = 1.57;
    sofaObject.castShadow = true;
    sofaObject.receiveShadow = true;
    scene.add(sofaObject);
    });
});


let tableOL = new OBJLoader();
  let tableML = new MTLLoader();

  tableML.load('./raw/Wood_Table/Wood_Table.mtl', (tableMtl) => {
    tableMtl.preload();
    tableOL.setMaterials(tableMtl);
    tableOL.load('./raw/Wood_Table/Wood_Table.obj', (tableObject) => {
    tableObject.position.set(6,.5,6.4);
    tableObject.castShadow = true;
    tableObject.receiveShadow = true;
    scene.add(tableObject);
    });
});

let bedOL = new OBJLoader();
  let bedML = new MTLLoader();

  bedML.load('./raw/Bed/cama.mtl', (bedMtl) => {
    bedMtl.preload();
    bedOL.setMaterials(bedMtl);
    bedOL.load('./raw/Bed/cama.obj', (bedObject) => {
    bedObject.position.set(5.4,.4,1.5);
    bedObject.castShadow = true;
    bedObject.receiveShadow = true;
    scene.add(bedObject);
    });
});

let paintOL = new OBJLoader();
let paintML = new MTLLoader();

paintML.load('./raw/painting/PM.mtl', (paintMtl) => {
  paintMtl.preload();
  paintOL.setMaterials(paintMtl);
  paintOL.load('./raw/painting/PM.obj', (paintObject) => {
  paintObject.position.set(4.5,2,4);
  paintObject.rotation.y = -1.57;
  paintObject.castShadow = true;
  paintObject.receiveShadow = true;
  scene.add(paintObject);
  });
});

let toiletOL = new OBJLoader();
let toiletML = new MTLLoader();

toiletML.load('./raw/Toilet/Toilet.mtl', (toiletMtl) => {
toiletMtl.preload();
toiletOL.setMaterials(toiletMtl);
toiletOL.load('./raw/Toilet/Toilet.obj', (toiletObject) => {
toiletObject.position.set(3.5,.5,0);
toiletObject.rotation.y = 1.57;
toiletObject.scale.set(.25,.25,.25);
toiletObject.castShadow = true;
toiletObject.receiveShadow = true;
scene.add(toiletObject);
});
});


let sinkOL = new OBJLoader();
let sinkML = new MTLLoader();

sinkML.load('./raw/Sink/lavandino.mtl', (sinkMtl) => {
sinkMtl.preload();
sinkOL.setMaterials(sinkMtl);
sinkOL.load('./raw/Sink/lavandino.obj', (sinkObject) => {
sinkObject.position.set(2.8,1,3.2);
sinkObject.rotation.y = 1.57;
sinkObject.scale.set(.001,.001,.001);
sinkObject.castShadow = true;
sinkObject.receiveShadow = true;
scene.add(sinkObject);
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
    music.play();
    
});
controls.addEventListener('unlock', function () {                   // if locked, mouse is released and music is stopped
     menuPanel.style.display = 'block';
    music.pause(); 
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


  let texture2 = new THREE.TextureLoader().load("./raw/woodenGround.png", function ( texture ){    // makes the ground texture 100x100 in the plane
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 20,10 );
  });

  const houseFloor = new THREE.Mesh(             // creates a plane and mesh
  new THREE.BoxGeometry(7, 7.9,1.05),
  new THREE.MeshPhongMaterial({
    map:texture2
  }))                                        // creates a square cube plane for ground
  houseFloor.material.color.setHex( 0xffffff );
  houseFloor.rotation.x = -Math.PI/2;          // Make the plane horizontal instead of vertical
  houseFloor.position.x = 3.5;
  houseFloor.position.z = 3.8;
  houseFloor.receiveShadow = true;
  
  scene.add(houseFloor);



  
  let texture3 = new THREE.TextureLoader().load("./raw/marbleKitchenGround.png", function ( texture ){    // makes the ground texture 100x100 in the plane
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 2,2 );
  });

  const kitchenFloor = new THREE.Mesh(             // creates a plane and mesh
  new THREE.BoxGeometry(4, 4.1,1.07),
  new THREE.MeshPhongMaterial({
    map:texture3
  }))                                        // creates a square cube plane for ground
  kitchenFloor.material.color.setHex( 0xffffff );
  kitchenFloor.rotation.x = -Math.PI/2;          // Make the plane horizontal instead of vertical
  kitchenFloor.position.x = 2;
  kitchenFloor.position.z = 5.7;
  kitchenFloor.receiveShadow = true;
  
  scene.add(kitchenFloor);


  



  let texture4 = new THREE.TextureLoader().load("./raw/marbleBathroom.png", function ( texture ){    // makes the ground texture 100x100 in the plane
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 4,4 );
  });

  const bathroomFloor = new THREE.Mesh(             // creates a plane and mesh
  new THREE.BoxGeometry(1.9, 3.5, 1.07),
  new THREE.MeshPhongMaterial({
    map:texture4
  }))                                        // creates a square cube plane for ground
  bathroomFloor.material.color.setHex( 0xffffff );
  bathroomFloor.rotation.x = -Math.PI/2;          // Make the plane horizontal instead of vertical
  bathroomFloor.position.x = 2.9;
  bathroomFloor.position.z = 1.8;
  bathroomFloor.receiveShadow = true;
  
  scene.add(bathroomFloor);

const path = new THREE.Mesh(
  new THREE.BoxGeometry(1,1.1,10),
  new THREE.MeshStandardMaterial({color: 0xFFFFFF})
);
path.position.set(3.5,0,14.5);
path.castShadow = false;
scene.add(path);




// SUPPOSE TO BE FILLED WITH VERTEX SHADERS.
// const path2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1,1.1,10),
//   new THREE.ShaderMaterial({
//     uniforms:{},
//     vertexShader: _VShader,
//     fragmentShader: _FShader,
//   })
// );

// path2.position.set(3.5,0,14.5);
// path2.castShadow = false;
// scene.add(path2);


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
