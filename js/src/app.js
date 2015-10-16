var scene,
    camera,
    renderer,
    controls;

init();
animate();
render();

function generateBox(width, height, depth, rgb){
    var box, material, mesh;

    box = new THREE.BoxGeometry(width, height, depth);
    material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        color: 0x59a4d4
    });

    var face, color;
    for (var i = 0; i < box.faces.length; i++) {
        face = box.faces[i];
        color = new THREE.Color('rgb('+rgb.join(',')+')');
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

    var group = new THREE.Object3D();

    //color dark-light 55,81,159
    var mesh = generateBox(320, 300, 1, [55,81,159]);
    mesh.rotation.y = 150;
    mesh.position.set(92, 0, 220);
    group.add(mesh);

    //color dark-dark 68,67,149
    mesh = generateBox(320, 300, 1, [68,67,149]);
    mesh.rotation.y = -150;
    mesh.position.set(-132, 0, 220);
    group.add(mesh);

    //color light-dark 48,157,196
    var mesh = generateBox(400, 300, 1, [48,157,196]);
    mesh.rotation.y = 150;
    mesh.position.set(-163, -1, -140);
    group.add(mesh);

    //color light-light 47,178,196
    mesh = generateBox(400, 300, 1, [47,178,196]);
    mesh.rotation.y = -150;
    mesh.position.set(117, -1, -140);
    group.add(mesh);

    group.rotation.x = 0.9;
    scene.add(group);

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
}

function render(){
    renderer.render(scene, camera);
}