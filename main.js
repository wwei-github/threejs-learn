import * as THREE from "three";
import gsap from "gsap";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
const debugGUI = new GUI({
  title: "debug gui",
  width: 300,
});
const boxGui = debugGUI.addFolder("Box");

const TexturesManage = new THREE.LoadingManager();
TexturesManage.onStart = () => {
  console.log("onStart");
};
TexturesManage.onError = () => {
  console.log("onError");
};

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
camera.position.z = 2.5;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);
renderer.setSize(size.with, size.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const control = new OrbitControls(camera, Canvas);
control.enableDamping = true;

const TexturesLoader = new THREE.TextureLoader(TexturesManage);
const alpha = TexturesLoader.load("/textures/door/alpha.jpg");
const ambientOcclusion = TexturesLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const color = TexturesLoader.load("/textures/door/color.jpg");
const height = TexturesLoader.load("/textures/door/height.jpg");
const metalness = TexturesLoader.load("/textures/door/metalness.jpg");
const normal = TexturesLoader.load("/textures/door/normal.jpg");
const roughness = TexturesLoader.load("/textures/door/roughness.jpg");
const gradients_3 = TexturesLoader.load("/textures/gradients/3.jpg");
const gradients_5 = TexturesLoader.load("/textures/gradients/5.jpg");
const matcaps = TexturesLoader.load("/textures/matcaps/5.png");

// color.colorSpace = THREE.SRGBColorSpace;
// const material = new THREE.MeshBasicMaterial();
// material.map = color;
// material.transparent = true;
// material.opacity = 0.1;
// material.side = THREE.DoubleSide;

// 越近越亮
// const material = new THREE.MeshDepthMaterial();
// material.map = color;

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcaps; // 网格捕捉

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 10000;
// material.specular = new THREE.Color("#ff0000");

// const material = new THREE.MeshToonMaterial();
// gradients_5.magFilter = THREE.NearestFilter;
// material.gradientMap = gradients_5;

// const material = new THREE.MeshStandardMaterial();
// // 对灯光反应
// material.metalness = 1;
// material.roughness = 1;
// boxGui.add(material, "metalness").min(0).max(1).step(0.0001);
// boxGui.add(material, "roughness").min(0).max(1).step(0.0001);
// material.map = color;
// material.aoMap = ambientOcclusion;
// material.aoMapIntensity = 1;
// // material.displacementMap = height;
// material.displacementScale = 0.2;
// boxGui.add(material, "displacementScale").min(0).max(1).step(0.001);
// material.metalnessMap = metalness;
// material.roughnessMap = roughness;
// material.normalMap = normal;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = alpha;

const material = new THREE.MeshPhysicalMaterial();
// // 对灯光反应
material.metalness = 1;
material.roughness = 1;
boxGui.add(material, "metalness").min(0).max(1).step(0.0001);
boxGui.add(material, "roughness").min(0).max(1).step(0.0001);
material.map = color;
material.aoMap = ambientOcclusion;
material.aoMapIntensity = 1;
// material.displacementMap = height;
material.displacementScale = 0.2;
boxGui.add(material, "displacementScale").min(0).max(1).step(0.001);
material.metalnessMap = metalness;
material.roughnessMap = roughness;
material.normalMap = normal;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = alpha;
material.clearcoat = 1;
material.clearcoatRoughness = 0;

const planeGeometry = new THREE.PlaneGeometry(1.6, 1.6, 20, 20);
const sphereGeometry = new THREE.SphereGeometry(0.8, 16, 16);

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = 1;
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -1.5;

scene.add(plane, sphere);

const light = new THREE.PointLight("#ffffff", 30);
light.position.x = 2;
light.position.y = 2;
light.position.z = 2;
scene.add(light);

const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (environmentMap) => {
  console.log("加载完毕");
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});



const tick = () => {
  control.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();