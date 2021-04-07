// Wall texture (from pintrest): https://www.bittbox.com/freebies/free-texture-tuesday-metal

let wallLength = 200;       // wall size
let wallHeight = 50;
let wallWidth = 3

var wallText;               // wall texture

// Wall texture
wallText = new THREE.TextureLoader().load("./raw/wallText2.jpg", function (texture) {      // gets texture and puts on wall
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(50, 0);
});

_createMainWall()                         // creates the main house outside wall

//_createInnerHouseWalls()




// wrapper function for making walls
//pos x "x-axis", pos z = "y-axis"
function _create_wall(xsize, ysize, zsize, xpos, ypos, zpos) {
  let wallBuild = null;

  wallBuild = new THREE.Mesh(
    new THREE.BoxGeometry(xsize, ysize, zsize),
    new THREE.MeshPhongMaterial({
      map: wallText
    })) // length, width, height
  wallBuild.position.set(xpos, ypos, zpos);
  wallBuild.material.color.setHex(0xff00ff)
  scene.add(wallBuild);

}

function _createMainWall() {
  // Main wall -->
  _create_wall(wallWidth, wallHeight, wallLength, -200, wallHeight / 2, 0);   
  _create_wall(wallWidth, wallHeight, 150, 0, wallHeight / 2, 25);
  _create_wall(wallLength, wallHeight, wallWidth, -100, wallHeight / 2, 100);
  _create_wall(wallLength, wallHeight, wallWidth, -100, wallHeight / 2, -100);

  // <-- End Main Wall 
}