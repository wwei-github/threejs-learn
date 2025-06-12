import * as THREE from "three";
import gsap from "gsap";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { depth } from "three/tsl";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

const debugGUI = new GUI({
  title: "debug gui",
  width: 300,
});
const Gui = debugGUI.addFolder("Box");

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
camera.position.z = 5;
camera.position.y = 3.5;
camera.position.x = 0;
scene.add(camera);
renderer.setSize(size.with, size.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const control = new OrbitControls(camera, Canvas);
control.enableDamping = true;

const material = new THREE.MeshStandardMaterial();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMesh = new THREE.Mesh(boxGeometry, material);
boxMesh.position.set(-1.5, 1.2, 0);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.25);
const torusMesh = new THREE.Mesh(torusGeometry, material);
torusMesh.position.set(1.5, 1.2, 0);

const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(boxMesh, torusMesh, planeMesh);

const ambientLight = new THREE.AmbientLight("#ffffff", 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#fea530", 0.7);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);
const directionalLightHelp = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelp);

const hemisphereLight = new THREE.HemisphereLight("#0000ff", "#00ff00");
hemisphereLight.position.y = 3;
scene.add(hemisphereLight);
const hemisphereLightHelp = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.3
);
scene.add(hemisphereLightHelp);

const pointLight = new THREE.PointLight("#66c4fab9", 0.7);
const pointLightHelp = new THREE.PointLightHelper(pointLight, 0.3);
pointLight.position.set(-1, 2, -1);
scene.add(pointLight, pointLightHelp);

const rectAreaLight = new THREE.RectAreaLight("#ff00ff", 1, 1, 1);
rectAreaLight.position.x = 2;
rectAreaLight.position.z = 2;
rectAreaLight.position.y = 1;
rectAreaLight.lookAt(new THREE.Vector3());
const rectAreaLightHelp = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLight, rectAreaLightHelp);

const spotLight = new THREE.SpotLight("#ffffff", 1, 5, 0.2);
spotLight.position.set(-1, 1.5, 3);
const spotLightHelp = new THREE.SpotLightHelper(spotLight, 0.5);
scene.add(spotLight, spotLightHelp);

const tick = () => {
  control.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();