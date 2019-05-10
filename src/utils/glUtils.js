function setupScene() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  this.camera.position.set(0, 0, 30);
  this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  this.scene.add(this.camera);

  this.scene.add(new THREE.AmbientLight(0xcccccc));

  const sunlight = new THREE.DirectionalLight(0xffffff);
  sunlight.position.set(10, 80, 100);
  this.scene.add(sunlight);

  const geometry = new THREE.PlaneGeometry(80, 80);
  const material = new THREE.MeshBasicMaterial({
    color: "skyblue",
    side: THREE.DoubleSide
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 0, -20);
  this.scene.add(plane);

  // const ambient = new THREE.AmbientLight(0xffffff);
  // this.scene.add(ambient);

  // const light = new THREE.DirectionalLight(0xffffff);
  // light.position.copy(this.camera.position);

  this.controls = new THREE.OrbitControls(this.camera);
  this.controls.update();

  const axesHelper = new THREE.AxesHelper(5);
  this.scene.add(axesHelper);

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.domElement);

  // Definition 1
  const geometry1 = new THREE.SphereGeometry(1, 32, 24);
  const material1 = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.5
  });
  this.sphere1 = new THREE.Mesh(geometry1, material1);
  //   this.scene.add(this.sphere1);

  var wireframe = new THREE.WireframeGeometry(this.sphere1.geometry);
  console.log(wireframe);
  var line = new THREE.LineSegments(wireframe);
  // line.material.depthTest = false;
  line.material.transparent = false;

  this.scene.add(line);
}

function renderGL(drawfunc) {
  requestAnimationFrame(renderGL.bind(this, drawfunc));
  this.renderer.state.reset();
  this.controls.update();
  drawfunc && drawfunc();
  this.renderer.render(this.scene, this.camera);
}

export { setupScene, renderGL };
