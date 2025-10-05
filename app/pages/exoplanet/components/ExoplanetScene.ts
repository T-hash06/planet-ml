import * as THREE from 'three';

export class ExoplanetScene {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private planet: THREE.Mesh; // El exoplaneta destacado
    private stars: THREE.Points;
    private clock: THREE.Clock;
    private container: HTMLElement;
    private animationId: number | null = null;
    private zooming = false;
    private orbiting = false;
    private orbitAngle = 0;
    private orbitRadius = 35;
    private orbitHeight = 5;
    
    // Sistema solar
    private sun: THREE.Mesh | null = null;
    private solarSystem: THREE.Group | null = null;
    private planets: Array<{
        mesh: THREE.Mesh;
        orbitGroup: THREE.Group;
        distance: number;
        speed: number;
        angle: number;
        rotationSpeed: number;
    }> = [];

    constructor(container: HTMLElement) {
        this.container = container;
        this.clock = new THREE.Clock();

        // Escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000010);

        // Cámara
        this.camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            2000
        );
        // Posición inicial: lejos, ligeramente arriba y a un lado para crear expectativa
        this.camera.position.set(45, 12, 120);
        this.camera.lookAt(0, 0, 0); // mirando al centro donde está el planeta

        // Renderizador
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // Luz ambiental suave para que todo sea visible
        const ambient = new THREE.AmbientLight(0x404060, 0.4);
        this.scene.add(ambient);

        // Luz principal para el exoplaneta destacado
        const mainLight = new THREE.PointLight(0xffffff, 1.5, 300);
        mainLight.position.set(30, 25, 40);
        this.scene.add(mainLight);

        // Luz de relleno suave
        const fillLight = new THREE.DirectionalLight(0x8899ff, 0.3);
        fillLight.position.set(-50, 10, -30);
        this.scene.add(fillLight);

        // Fondo con estrellas de colores
        this.stars = this.createStarfield(3000);
        this.scene.add(this.stars);

        // Crear sistema solar completo
        this.createSolarSystem();

        // Exoplaneta con textura (intenta cargar app/assets/planet.webp)
        const planetGeo = new THREE.SphereGeometry(10, 64, 64);

        const loader = new THREE.TextureLoader();
        const textureURL = '/app/assets/planet.webp';

        // Material provisional mientras carga (morado-azulado oscuro)
        const planetMat = new THREE.MeshStandardMaterial({
            color: 0x321a5f, // morado azulado oscuro
            roughness: 0.55,
            metalness: 0.03,
            emissive: 0x1a0633,
            emissiveIntensity: 0.28,
        });

        this.planet = new THREE.Mesh(planetGeo, planetMat);
        this.scene.add(this.planet);

        // Cargar textura y aplicarla (fallback a canvas si falla)
        loader.load(
            textureURL,
            (tex) => {
                // Aplicar wrap + repeat
                try {
                    (tex as any).wrapS = (tex as any).wrapT = THREE.RepeatWrapping;
                    // repetir más veces para aumentar detalle aparente
                    (tex as any).repeat.set(2, 2);
                } catch (e) {
                    // ignore
                }

                // generar normal map con intensidad mayor para más relieve
                const normal = this.generateNormalMapCanvas((tex as any).image || (tex as any), 3.0);

                planetMat.map = tex;
                planetMat.normalMap = normal;
                planetMat.roughness = 0.6;
                planetMat.metalness = 0.01;
                // tint ligero para emparejar con morado
                planetMat.color = new THREE.Color(0x321a5f);
                planetMat.emissive = new THREE.Color(0x22083a);
                planetMat.emissiveIntensity = 0.35;
                planetMat.needsUpdate = true;
            },
            undefined,
            () => {
                // fallback: crear textura procedural si no se puede cargar
                const fallback = this.createProceduralTexture();
                planetMat.map = fallback;
                planetMat.roughness = 0.7;
                planetMat.needsUpdate = true;
            }
        );

        // Event listeners
        window.addEventListener('resize', this.onWindowResize);

        // Iniciar animación
        this.animate();

        // Pausa inicial breve antes de iniciar la secuencia didáctica
        setTimeout(() => this.startZoomToPlanet(), 800);
    }

    // Crea una textura procedural sencilla (canvas) como fallback
    private createProceduralTexture(): THREE.Texture {
        const size = 1024;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;

        // fondo radial
        const grad = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.95);
        grad.addColorStop(0, '#4c2a84');
        grad.addColorStop(0.5, '#2b1b5a');
        grad.addColorStop(1, '#071026');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // texturas sutiles
        for (let i = 0; i < 1800; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const r = Math.random() * 2;
            // estrellas con tonos azul/púrpura
            const alpha = 0.01 + Math.random() * 0.06;
            const tone = Math.random();
            const color = tone < 0.6 ? `rgba(180,200,255,${alpha})` : `rgba(210,170,255,${alpha})`;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }

    // Genera un normal map aproximado desde una imagen (canvas sobreamplificado)
    // intensity: multiplica el efecto de derivada para exagerar relieve
    private generateNormalMapCanvas(img: any, intensity: number = 1.0): THREE.Texture {
        try {
            const w = img.width || 1024;
            const h = img.height || 1024;
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0, w, h);

            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;
            // crear buffer para normal map
            const nCanvas = document.createElement('canvas');
            nCanvas.width = w;
            nCanvas.height = h;
            const nCtx = nCanvas.getContext('2d')!;
            const nImg = nCtx.createImageData(w, h);

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const i = (y * w + x) * 4;
                    const l = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255;
                    // derivadas sencillas
                    const lx = ((((x < w - 1 ? (data[i + 4] + data[i + 5] + data[i + 6]) / 3 : l * 255) / 255) - l) * intensity);
                    const ly = ((((y < h - 1 ? (data[i + w * 4] + data[i + w * 4 + 1] + data[i + w * 4 + 2]) / 3 : l * 255) / 255) - l) * intensity);
                    const nx = (lx * 2 + 1) * 0.5;
                    const ny = (ly * 2 + 1) * 0.5;
                    nImg.data[i] = Math.floor((nx) * 255);
                    nImg.data[i + 1] = Math.floor((ny) * 255);
                    nImg.data[i + 2] = 255;
                    nImg.data[i + 3] = 255;
                }
            }

            nCtx.putImageData(nImg, 0, 0);
            const tex = new THREE.CanvasTexture(nCanvas);
            tex.needsUpdate = true;
            return tex;
        } catch (e) {
            // fallback si algo falla
            return this.createProceduralTexture();
        }
    }

    private createStarfield(count: number): THREE.Points {
        const geometry = new THREE.BufferGeometry();
        const positions: number[] = [];
        const colors: number[] = [];

        const colorOptions = [
            new THREE.Color(0xffffff), // blanco
            new THREE.Color(0x88ccff), // azul
            new THREE.Color(0x80ff80), // verde
            new THREE.Color(0xffee88), // amarillo
            new THREE.Color(0xd18aff), // morado
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
            opacity: 0.8,
        });

        return new THREE.Points(geometry, material);
    }

    private createSolarSystem() {
        this.solarSystem = new THREE.Group();
        this.scene.add(this.solarSystem);

        // Posición del sistema solar: desplazado a un lado
        this.solarSystem.position.set(-80, -15, -60);

        // Crear el sol central (brillante y emisivo)
        const sunGeo = new THREE.SphereGeometry(8, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({
            color: 0xffcc66,
        });
        this.sun = new THREE.Mesh(sunGeo, sunMat);
        this.solarSystem.add(this.sun);

        // Brillo del sol
        const sunGlow = new THREE.PointLight(0xffbb66, 2.0, 200, 1.5);
        sunGlow.position.copy(this.sun.position);
        this.solarSystem.add(sunGlow);

        // Crear anillo de brillo adicional
        const glowGeo = new THREE.SphereGeometry(12, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0xffcc88,
            transparent: true,
            opacity: 0.08,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        this.sun.add(glow);

        // Datos de los planetas del sistema con inclinación orbital y velocidad de rotación
        const planetData = [
            { distance: 18, size: 1.8, color: 0x8b7355, speed: 0.6, rotationSpeed: 0.4, inclination: 2, name: 'Rocky-A' },
            { distance: 28, size: 2.5, color: 0xe8b86d, speed: 0.4, rotationSpeed: 0.3, inclination: 1, name: 'Desert-B' },
            { distance: 42, size: 3.2, color: 0x4a90e2, speed: 0.25, rotationSpeed: 0.35, inclination: 3.5, name: 'Ocean-C' },
            { distance: 58, size: 2.8, color: 0xd4756f, speed: 0.18, rotationSpeed: 0.28, inclination: 1.8, name: 'Red-D' },
            { distance: 75, size: 4.5, color: 0xc9a86a, speed: 0.12, rotationSpeed: 0.5, inclination: 0.8, name: 'Gas-E' },
            { distance: 95, size: 3.8, color: 0x88b8d8, speed: 0.08, rotationSpeed: 0.2, inclination: 4.2, name: 'Ice-F' },
        ];

        // Crear cada planeta
        planetData.forEach((data, index) => {
            const orbitGroup = new THREE.Group();
            
            // Aplicar inclinación orbital para más realismo
            orbitGroup.rotation.x = THREE.MathUtils.degToRad(data.inclination);
            orbitGroup.rotation.z = THREE.MathUtils.degToRad(data.inclination * 0.5);
            
            this.solarSystem!.add(orbitGroup);

            // Crear órbita visible (anillo sutil)
            const orbitGeo = new THREE.RingGeometry(data.distance - 0.15, data.distance + 0.15, 128);
            const orbitMat = new THREE.MeshBasicMaterial({
                color: 0x2a4a6a,
                transparent: true,
                opacity: 0.12,
                side: THREE.DoubleSide,
            });
            const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
            orbitRing.rotation.x = Math.PI / 2;
            
            // Aplicar la misma inclinación al anillo orbital
            const orbitRingGroup = new THREE.Group();
            orbitRingGroup.add(orbitRing);
            orbitRingGroup.rotation.x = THREE.MathUtils.degToRad(data.inclination);
            orbitRingGroup.rotation.z = THREE.MathUtils.degToRad(data.inclination * 0.5);
            this.solarSystem!.add(orbitRingGroup);

            // Crear planeta
            const planetGeo = new THREE.SphereGeometry(data.size, 32, 32);
            const planetMat = new THREE.MeshStandardMaterial({
                color: data.color,
                roughness: 0.6,
                metalness: 0.1,
                emissive: new THREE.Color(data.color).multiplyScalar(0.05),
            });
            const planetMesh = new THREE.Mesh(planetGeo, planetMat);
            planetMesh.position.x = data.distance;

            // Pequeña atmósfera
            const atmoGeo = new THREE.SphereGeometry(data.size * 1.06, 32, 32);
            const atmoMat = new THREE.MeshBasicMaterial({
                color: data.color,
                transparent: true,
                opacity: 0.08,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });
            const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
            planetMesh.add(atmosphere);

            orbitGroup.add(planetMesh);

            // Guardar referencia con velocidad de rotación
            this.planets.push({
                mesh: planetMesh,
                orbitGroup,
                distance: data.distance,
                speed: data.speed,
                angle: Math.random() * Math.PI * 2, // ángulo inicial aleatorio
                rotationSpeed: data.rotationSpeed,
            });
        });
    }

    private startZoomToPlanet() {
        this.zooming = true;

        // Posiciones iniciales y finales
        const startPos = new THREE.Vector3().copy(this.camera.position);
        const targetZ = this.orbitRadius;
        const targetY = this.orbitHeight;

        // Duración total: 5 segundos exactos
        const duration = 5000;
        const startTime = performance.now();

        // Ángulo inicial para la órbita cinematográfica
        const startAngle = Math.atan2(startPos.z, startPos.x);

        const zoomStep = () => {
            const elapsed = performance.now() - startTime;
            const t = Math.min(1, elapsed / duration);

            if (t < 1) {
                // Easing suave con aceleración al inicio y desaceleración al final
                const eased = t < 0.5
                    ? 2 * t * t  // ease in
                    : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease out

                // Movimiento orbital cinematográfico mientras hace zoom
                // La cámara rota ligeramente alrededor del planeta mientras se acerca
                const currentAngle = startAngle + eased * Math.PI * 0.25; // rota 45 grados
                const currentRadius = startPos.length() - (startPos.length() - targetZ) * eased;

                this.camera.position.x = Math.cos(currentAngle) * currentRadius;
                this.camera.position.z = Math.sin(currentAngle) * currentRadius;
                this.camera.position.y = startPos.y + (targetY - startPos.y) * eased;

                // Siempre mira al centro del planeta para mantenerlo centrado
                this.camera.lookAt(0, 0, 0);

                requestAnimationFrame(zoomStep);
            } else {
                // Posición final exacta
                this.camera.position.set(
                    Math.cos(startAngle + Math.PI * 0.25) * targetZ,
                    targetY,
                    Math.sin(startAngle + Math.PI * 0.25) * targetZ
                );
                this.camera.lookAt(0, 0, 0);
                this.zooming = false;

                // Mostrar texto inmediatamente
                this.showDetectionLabel().then(() => {
                    // Iniciar órbita suave después
                    setTimeout(() => {
                        this.orbitAngle = startAngle + Math.PI * 0.25;
                        this.orbiting = true;
                    }, 400);
                });
            }
        };

        zoomStep();
    }

    private showDetectionLabel(): Promise<void> {
        return new Promise((resolve) => {
            const div = document.createElement('div');
            div.textContent = '🌌 EXOPLANETA DETECTADO';
            div.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.6);
      color: #e9d7ff;
      font-family: Inter, Arial, sans-serif;
      font-size: 44px;
      font-weight: 800;
      letter-spacing: 1px;
      opacity: 0;
      transition: opacity 0.8s ease, transform 0.9s cubic-bezier(.2,.9,.2,1);
      z-index: 1000;
      text-shadow: 0 6px 30px rgba(120,80,200,0.45), 0 0 12px rgba(200,170,255,0.18);
      pointer-events: none;
    `;
            document.body.appendChild(div);

            // animación de entrada suave
            setTimeout(() => {
                div.style.opacity = '1';
                div.style.transform = 'translate(-50%, -50%) scale(1.02)';
            }, 120);

            // pequeño rebote
            setTimeout(() => {
                div.style.transform = 'translate(-50%, -50%) scale(0.98)';
            }, 900);

            // empezar a ocultar después
            setTimeout(() => {
                div.style.opacity = '0';
                div.style.transform = 'translate(-50%, -50%) scale(0.85)';
            }, 3800);

            setTimeout(() => {
                div.remove();
                resolve();
            }, 5200);
        });
    }

    private onWindowResize = () => {
        if (!this.container) return;

        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    };

    private animate = () => {
        this.animationId = requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();

        // Rotar estrellas lentamente para sensación de movimiento
        this.stars.rotation.y += delta * 0.01;
        this.stars.rotation.x += delta * 0.003;

        // Animar sistema solar
        if (this.sun) {
            // Rotar el sol sobre su eje (más rápido, es una estrella)
            this.sun.rotation.y += delta * 0.4;
            this.sun.rotation.x += delta * 0.05;
        }

        // Animar planetas del sistema solar
        this.planets.forEach((planet) => {
            // Actualizar ángulo orbital (movimiento de traslación alrededor del sol)
            planet.angle += delta * planet.speed * 0.15;
            
            // Actualizar posición del grupo orbital (rotación alrededor del sol)
            planet.orbitGroup.rotation.y = planet.angle;
            
            // Rotar el planeta sobre su propio eje (movimiento de rotación)
            // Cada planeta tiene su propia velocidad de rotación
            planet.mesh.rotation.y += delta * planet.rotationSpeed;
            planet.mesh.rotation.x += delta * planet.rotationSpeed * 0.1; // ligera inclinación axial
        });

        // Rotar todo el sistema solar lentamente sobre su eje para más dinamismo
        if (this.solarSystem) {
            this.solarSystem.rotation.y += delta * 0.04; // Más visible
            this.solarSystem.rotation.x += delta * 0.008; // Movimiento sutil adicional
        }

        // Girar exoplaneta sobre su eje
        this.planet.rotation.y += delta * 0.15;

        // Órbita de cámara después del zoom (más lenta y suave)
        if (this.orbiting) {
            this.orbitAngle += delta * 0.25;
            this.camera.position.x = Math.cos(this.orbitAngle) * this.orbitRadius;
            this.camera.position.z = Math.sin(this.orbitAngle) * this.orbitRadius;
            this.camera.position.y = this.orbitHeight + Math.sin(this.orbitAngle * 0.4) * 1.5;
            this.camera.lookAt(this.planet.position);
        } else if (!this.zooming) {
            // Antes del zoom: mantener la cámara apuntando al planeta
            this.camera.lookAt(0, 0, 0);
        }

        this.renderer.render(this.scene, this.camera);
    };

    public dispose() {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }

        window.removeEventListener('resize', this.onWindowResize);

        // Limpiar geometrías y materiales
        this.planet.geometry.dispose();
        (this.planet.material as THREE.Material).dispose();
        this.stars.geometry.dispose();
        (this.stars.material as THREE.Material).dispose();

        // Limpiar renderer
        this.renderer.dispose();
        if (this.renderer.domElement.parentElement) {
            this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
        }
    }
}
