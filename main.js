import * as THREE from "three";
import gsap from "gsap";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { depth } from "three/tsl";

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
const matcap = TexturesLoader.load("/textures/matcaps/5.png");

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello three.js", {
    font,
    size: 0.5,
    depth: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 100,
  });
  textGeometry.center();
  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcap;
  const mesh = new THREE.Mesh(textGeometry, material);
  scene.add(mesh);

  const torus = new THREE.TorusGeometry(0.3, 0.2, 24, 15);
  console.time("start");
  for (let i = 0; i < 1000; i++) {
    const torusMesh = new THREE.Mesh(torus, material);

    torusMesh.position.x = (Math.random() - 0.5) * 10;
    torusMesh.position.y = (Math.random() - 0.5) * 10;
    torusMesh.position.z = (Math.random() - 0.5) * 10;

    const scale = Math.random();
    torusMesh.scale.set(scale, scale, scale);

    scene.add(torusMesh);
  }
  console.timeEnd("start");
});



const tick = () => {
  control.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();