import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Canvas = document.querySelector("canvas.webgl");

window.addEventListener("resize", () => {
  size.with = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.with / size.height;
  // 更新相机的参数
  camera.updateProjectionMatrix();

  // setSize 同时设置canvas.style.width的宽高 和 canvas.width 像素的宽高 两部分
  // 也就是 canvas 的css 大小  和  绘图的分辨率
  renderer.setSize(size.with, size.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    Canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const size = {
  with: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  canvas: Canvas,
});

const camera = new THREE.PerspectiveCamera(
  75,
  size.with / size.height,
  0.1,
  1000
);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);
// camera.lookAt(boxMesh1.position);
renderer.setSize(size.with, size.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const control = new OrbitControls(camera, Canvas);
control.enableDamping = true;
control.enabled = false;
control.listenToKeyEvents(Canvas);

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

// const clock = new THREE.Clock()
gsap.to(mesh.position, { x: 2, delay: 1, direction: 1 });
gsap.to(mesh.position, { x: 0, delay: 2, direction: 1 });

const tick = () => {
  // const time = clock.getElapsedTime()
  // console.log(time)
  // mesh.rotation.z = time
  // mesh.position.x = time
  // mesh.position.y = Math.cos(time)
  control.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();