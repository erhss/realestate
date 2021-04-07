// References:


var clock = new THREE.Clock();


const menuPanel = document.getElementById('menuPanel');             // gets menu id from html
const startButton = document.getElementById('startButton');         // gets startbutton id from html
let music = document.getElementById("music");                       // gets music id from html
music.loop = true;                                                  // loops the music 


startButton.addEventListener('click', function () {                 // event listener for the start button. sets lock to false
    controls.lock();
    document.body.requestFullscreen();
}, false);

const controls = new THREE.PointerLockControls(camera, document.body);  // imports pointerlock control to camera and controls.

controls.addEventListener('lock', function (){                      // if lock is false, takes control of the mouse and starts music.
    menuPanel.style.display = 'none';
    //music.play();
    
});
controls.addEventListener('unlock', function () {                   // if locked, mouse is released and music is stopped
     menuPanel.style.display = 'block';
    //music.pause(); 
    });

let keyboard = [];                                                  // listens to keyboard input and stores in array
addEventListener('keydown', (e)=>{
    keyboard[e.key] = true;
});

addEventListener('keyup', (e)=>{                                   // listens to keyboard release and pops from array
    keyboard[e.key] = false;
});


function processKeyboard(delta){                                    // processes the keys pressed
    let speed = 50;
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



function drawScene() {                                                              // draws the scene again and re-renders it.

    renderer.render(scene, camera);
    let delta = clock.getDelta();                                                   // gets change in time
    processKeyboard(delta);

    requestAnimationFrame(drawScene);
}


drawScene();


