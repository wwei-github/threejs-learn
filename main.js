import * as THREE from "three";

const Canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
const size = {
  with: 800,
  height: 600,
};

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
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: Canvas,
});
renderer.setSize(size.with, size.height);
renderer.render(scene, camera);
