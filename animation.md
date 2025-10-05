Perfecto 💫 — te entiendo:
quieres **una escena sencilla** en **Three.js** con:

* fondo oscuro,
* muchas estrellas de distintos colores (blancas, azules, verdes, amarillas, moradas),
* un solo **exoplaneta**,
* y una **animación de zoom** de cámara que se acerque suavemente a él.

Aquí tienes el código completo y funcional (Three.js r150+, modular ES6).
Solo copia los dos archivos en una carpeta y ejecútalos con un servidor local (`npx http-server` o `python -m http.server`).

---

### ✅ `index.html`

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Zoom a Exoplaneta - Three.js</title>
  <style>
    html, body { margin:0; height:100%; background:#000; overflow:hidden; }
    #container { width:100vw; height:100vh; }
  </style>
</head>
<body>
  <div id="container"></div>
  <script type="module" src="./main.js"></script>
</body>
</html>
```

---

### ✅ `main.js`

```js
import * as THREE from 'https://unpkg.com/three@0.150.0/build/three.module.js';

let scene, camera, renderer, planet, stars;
let clock = new THREE.Clock();
let zooming = false;

init();
animate();

function init() {
  const container = document.getElementById('container');

  // Escena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000010);

  // Cámara
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 0, 150);

  // Renderizador
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Luz suave
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);

  const pointLight = new THREE.PointLight(0xffffff, 1.2, 500);
  pointLight.position.set(50, 30, 50);
  scene.add(pointLight);

  // Fondo con estrellas
  stars = createStarfield(3000);
  scene.add(stars);

  // Exoplaneta
  const planetGeo = new THREE.SphereGeometry(10, 64, 64);
  const planetMat = new THREE.MeshStandardMaterial({
    color: 0x6ac4ff,
    roughness: 0.5,
    metalness: 0.1,
    emissive: 0x1a4aff,
    emissiveIntensity: 0.3
  });
  planet = new THREE.Mesh(planetGeo, planetMat);
  scene.add(planet);

  // Ajustar tamaño
  window.addEventListener('resize', onWindowResize);

  // Inicia animación de zoom
  setTimeout(() => startZoomToPlanet(), 1500);
}

function createStarfield(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];

  const colorOptions = [
    new THREE.Color(0xffffff), // blanco
    new THREE.Color(0x88ccff), // azul
    new THREE.Color(0x80ff80), // verde
    new THREE.Color(0xffee88), // amarillo
    new THREE.Color(0xd18aff)  // morado
  ];

  for (let i = 0; i < count; i++) {
    const r = 800 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions.push(x, y, z);
    const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors.push(c.r, c.g, c.b);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8
  });

  return new THREE.Points(geometry, material);
}

function startZoomToPlanet() {
  zooming = true;
  const startZ = camera.position.z;
  const targetZ = 35;
  const duration = 4000;
  const startTime = performance.now();

  function zoomStep() {
    const t = (performance.now() - startTime) / duration;
    if (t < 1) {
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      camera.position.z = startZ - (startZ - targetZ) * eased;
      requestAnimationFrame(zoomStep);
    } else {
      camera.position.z = targetZ;
      zooming = false;
      showDetectionLabel();
    }
  }

  zoomStep();
}

function showDetectionLabel() {
  const div = document.createElement('div');
  div.textContent = '🌌 Exoplaneta Detectado';
  div.style.position = 'absolute';
  div.style.top = '50%';
  div.style.left = '50%';
  div.style.transform = 'translate(-50%, -50%)';
  div.style.color = '#b0e4ff';
  div.style.fontFamily = 'Arial, sans-serif';
  div.style.fontSize = '24px';
  div.style.opacity = '0';
  div.style.transition = 'opacity 1.5s';
  document.body.appendChild(div);

  setTimeout(() => div.style.opacity = '1', 100);
  setTimeout(() => div.style.opacity = '0', 4000);
  setTimeout(() => div.remove(), 6000);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  // rotar estrellas lentamente
  stars.rotation.y += delta * 0.01;
  stars.rotation.x += delta * 0.003;

  // girar planeta
  planet.rotation.y += delta * 0.2;

  renderer.render(scene, camera);
}
```

---

### 💡 Qué hace:

✔️ Crea un fondo profundo y oscuro con miles de estrellas de distintos colores.
✔️ Un exoplaneta con brillo azul suave.
✔️ La cámara hace **zoom automático** hacia el planeta.
✔️ Aparece un texto flotante “🌌 Exoplaneta Detectado” al final del zoom.

---

Quiero que además la cámara **orbite suavemente** alrededor del planeta después del zoom