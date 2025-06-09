import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const TexturesManage = new THREE.LoadingManager();
TexturesManage.onStart = () => {
  console.log("onStart");
};
TexturesManage.onError = () => {
  console.log("onError");
};
const TexturesLoader = new THREE.TextureLoader(TexturesManage);
const color = TexturesLoader.load("/textures/door/color.jpg");
// const color = TexturesLoader.load("/textures/checkerboard-8x8.png");
// const color = TexturesLoader.load("/textures/checkerboard-1024x1024.png");

// color.repeat.x = 2;
// color.repeat.y = 3;
// color.wrapS = THREE.RepeatWrapping;
// color.wrapS = THREE.MirroredRepeatWrapping;
// color.wrapT = THREE.RepeatWrapping;
// color.wrapS = THREE.MirroredRepeatWrapping;

// color.offset.x = 0.5;
// color.offset.y = 0.5;

// color.rotation = Math.PI / 4;
// color.center.x = 0.5;
// color.center.y = 0.5;

color.magFilter = THREE.NearestFilter;

const GlobalConfig = {};

const debugGUI = new GUI({
  title: "debug gui",
  width: 300,
});
const boxGui = debugGUI.addFolder("Box");

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
camera.position.z = 0.7;
camera.position.y = 0.7;
camera.position.x = 0.7;
scene.add(camera);
// camera.lookAt(boxMesh1.position);
renderer.setSize(size.with, size.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const control = new OrbitControls(camera, Canvas);
control.enableDamping = true;

GlobalConfig.color = "#0edd1c";
const BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const BoxMaterial = new THREE.MeshBasicMaterial({
  // color: GlobalConfig.color,
  map: color,
});
const mesh = new THREE.Mesh(BoxGeometry, BoxMaterial);
scene.add(mesh);

boxGui.add(mesh.position, "z", 0, 2, 0.1);
boxGui.add(BoxMaterial, "wireframe");
boxGui.addColor(GlobalConfig, "color").onChange((val) => {
  BoxMaterial.color.set(val);
  console.log(val);
});
GlobalConfig.meshAnimate = () => {
  gsap.to(mesh.position, { x: 2 });
  gsap.to(mesh.rotation, { x: mesh.rotation.x + Math.PI * 2 });
};
boxGui.add(GlobalConfig, "meshAnimate");

GlobalConfig.widthSegments = 1;
GlobalConfig.heightSegments = 1;
GlobalConfig.depthSegments = 1;

boxGui.add(GlobalConfig, "widthSegments", 1, 4, 1).onFinishChange((val) => {
  mesh.geometry.dispose();
  GlobalConfig.widthSegments = val;
  mesh.geometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    val,
    GlobalConfig.heightSegments,
    GlobalConfig.depthSegments
  );
});
boxGui.add(GlobalConfig, "heightSegments", 1, 4, 1).onFinishChange((val) => {
  mesh.geometry.dispose();
  GlobalConfig.heightSegments = val;
  mesh.geometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    GlobalConfig.widthSegments,
    val,
    GlobalConfig.depthSegments
  );
});
boxGui.add(GlobalConfig, "depthSegments", 1, 4, 1).onFinishChange((val) => {
  mesh.geometry.dispose();
  GlobalConfig.depthSegments = val;
  mesh.geometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    GlobalConfig.widthSegments,
    GlobalConfig.heightSegments,
    val
  );
});
boxGui.close();

// boxGui.addFolder("boxItem");

const tick = () => {
  control.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();