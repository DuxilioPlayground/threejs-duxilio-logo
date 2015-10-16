var scene,
    camera,
    renderer,
    controls;

var meshes = [];

init();
animate();
render();

function generateBox(){
    var box, material, mesh;

    box = new THREE.BoxGeometry(800, 200, 200);
    material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        color: 0x59a4d4
    });

    var face, color;
    for (var i = 0; i < box.faces.length; i++) {
        face = box.faces[i];
        color = new THREE.Color('rgb('+(89-(i*12))+', '+(164-(i*12))+', '+(212-(i*12))+')');
        face.color = color;
    }

    mesh = new THREE.Mesh(box, material);
    return mesh;
}

function init() {
    var box, material;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    var mesh = generateBox();
    mesh.rotation.y = 150;
    scene.add(mesh);
    meshes.push(mesh);

    mesh = generateBox();
    mesh.rotation.y = -150;
    scene.add(mesh);
    meshes.push(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x0f445c);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);

    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // meshes.forEach(function(mesh, idx){
    //     mesh.rotation.x += 0.01*(idx+1);
    //     mesh.rotation.y += 0.02*(idx+1);
    // });
}

function render(){
    renderer.render(scene, camera);
}