//Bryam Barreto 
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.z = 4.5;
camera.position.x = -5.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);




//Luz del escenario sacado de un repositorio del semestre
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

function poligono(nlados, ladoigual) {
  const vertices = [];
  const ang = 2*Math.PI/nlados;
  for (let i = 0; i <= nlados; i++) {
      let x = ladoigual * Math.cos(i * ang);
      let y = ladoigual * Math.sin(i * ang);
      vertices[i] = new THREE.Vector3(x, y, 0);
  }
  return vertices;
}

  function crearGeometria(vertices){
     // Crear un Shape a partir de los vértices
  var shape = new THREE.Shape();

  // Establecer el primer vértice como punto de inicio del contorno
  shape.moveTo(vertices[0].x, vertices[0].y);

  // Unir los vértices para crear el contorno
  for (var i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  // Cerrar el contorno
  shape.closePath();


    const extrudeSettings = {
      
      depth: 1,
      bevelEnabled: false,
      
    };
    const geometry1 = new THREE.ExtrudeGeometry( shape, extrudeSettings );

      // Crear una Geometry a partir del Shape

  const color= new THREE.Color("rgb(34, 229, 17)"); //color
  const material = new THREE.MeshLambertMaterial( {color});
  const mesh = new THREE.Mesh( geometry1, material );
    scene.add(mesh);
  }
  

 crearGeometria(poligono(5, 1) );
  

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}



render();




