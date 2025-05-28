import * as THREE from "three";
import gsap from "gsap";

const Canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
const size = {
  with: 800,
  height: 600,
};

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// const group = new THREE.Group();
// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const mesh = new THREE.Mesh(boxGeometry, material);
// group.add(mesh);

// const boxGeometry1 = new THREE.BoxGeometry(1, 1, 1);
// const boxMaterial1 = new THREE.MeshBasicMaterial({ color: "red" });
// const boxMesh1 = new THREE.Mesh(boxGeometry1, boxMaterial1);
// boxMesh1.position.set(2, 0, 0);
// const boxGeometry2 = new THREE.BoxGeometry(1, 1, 1);
// const boxMaterial2 = new THREE.MeshBasicMaterial({ color: "blue" });
// const boxMesh2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
// boxMesh2.position.set(-2, 0, 0);
// group.add(boxMesh1);
// group.add(boxMesh2);
// group.position.set(0.5, 0, 0, 0);
// group.scale.y = 2;
// group.rotation.reorder("YXZ");
// group.rotation.set(Math.PI / 3, Math.PI, 0);
// scene.add(group);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(boxGeometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  size.with / size.height,
  0.1,
  1000
);
camera.position.z = 3;
// camera.lookAt(boxMesh1.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: Canvas,
});
renderer.setSize(size.with, size.height);
renderer.render(scene, camera);

// const clock = new THREE.Clock()
gsap.to(mesh.position, { x: 2, delay: 1, direction: 1 });
gsap.to(mesh.position, { x: 0, delay: 2, direction: 1 });

const tick = () => {
  // const time = clock.getElapsedTime()
  // console.log(time)
  // mesh.rotation.z = time
  // mesh.position.x = time
  // mesh.position.y = Math.cos(time)

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();