import * as THREE from 'three';
import type { ThreeSceneConfig } from '$types/global';

export class ThreeScene {
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;
	private container: HTMLElement;
	private particles: THREE.Points | null = null;
	private wireframeObjects: THREE.Mesh[] = [];
	private animationId: number | null = null;
	private mouseX = 0;
	private mouseY = 0;

	constructor(container: HTMLElement, _config: ThreeSceneConfig) {
		this.container = container;
		this.scene = new THREE.Scene();

		// Setup camera
		this.camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		this.camera.position.z = 5;

		// Setup renderer
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		this.renderer.setSize(container.clientWidth, container.clientHeight);
		this.renderer.setPixelRatio(window.devicePixelRatio);

		container.appendChild(this.renderer.domElement);

		// Create original effects
		this.createGeometricParticles();
		this.createWireframeObjects();

		// Setup event listeners
		this.setupEventListeners();

		// Start animation
		this.animate();
	}

	private createGeometricParticles() {
		const geometry = new THREE.BufferGeometry();
		const vertices = [];
		const colors = [];

		for (let i = 0; i < 1000; i++) {
			vertices.push(
				(Math.random() - 0.5) * 20,
				(Math.random() - 0.5) * 20,
				(Math.random() - 0.5) * 20
			);

			// Cyan and magenta colors
			const color = new THREE.Color();
			color.setHSL(Math.random() > 0.5 ? 0.5 : 0.8, 1, 0.5);
			colors.push(color.r, color.g, color.b);
		}

		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 0.05,
			vertexColors: true,
			transparent: true,
			opacity: 0.8
		});

		this.particles = new THREE.Points(geometry, material);
		this.scene.add(this.particles);
	}

	private createWireframeObjects() {
		// Create floating geometric shapes
		const shapes = [
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.SphereGeometry(0.5, 16, 16),
			new THREE.ConeGeometry(0.5, 1, 8),
			new THREE.TorusGeometry(0.5, 0.2, 8, 16)
		];

		shapes.forEach((geometry, index) => {
			const material = new THREE.MeshBasicMaterial({
				color: index % 2 === 0 ? 0x00ffff : 0xff00ff,
				wireframe: true,
				transparent: true,
				opacity: 0.3
			});

			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(
				(Math.random() - 0.5) * 10,
				(Math.random() - 0.5) * 10,
				(Math.random() - 0.5) * 10
			);
			mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

			this.wireframeObjects.push(mesh);
			this.scene.add(mesh);
		});
	}

	private setupEventListeners() {
		// Mouse movement
		const handleMouseMove = (event: MouseEvent) => {
			this.mouseX = (event.clientX - window.innerWidth / 2) / 100;
			this.mouseY = (event.clientY - window.innerHeight / 2) / 100;
		};

		// Resize handler
		const handleResize = () => {
			const width = this.container.clientWidth;
			const height = this.container.clientHeight;

			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(width, height);
		};

		document.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('resize', handleResize);
	}

	private animate() {
		this.animationId = requestAnimationFrame(this.animate.bind(this));

		// Animate particles
		if (this.particles) {
			this.particles.rotation.x += 0.001;
			this.particles.rotation.y += 0.002;
		}

		// Animate wireframe objects
		this.wireframeObjects.forEach((mesh, index) => {
			mesh.rotation.x += 0.01 * (index + 1);
			mesh.rotation.y += 0.01 * (index + 1);
			mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
		});

		// Camera movement based on mouse
		this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
		this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
		this.camera.lookAt(this.scene.position);

		this.renderer.render(this.scene, this.camera);
	}

	public destroy() {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
		}

		// Clean up geometries and materials
		this.scene.traverse((object) => {
			if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
				object.geometry.dispose();
				if (Array.isArray(object.material)) {
					object.material.forEach((material) => material.dispose());
				} else {
					object.material.dispose();
				}
			}
		});

		// Remove renderer
		if (this.container.contains(this.renderer.domElement)) {
			this.container.removeChild(this.renderer.domElement);
		}
		this.renderer.dispose();
	}
}

export const defaultThreeConfig: ThreeSceneConfig = {
	particles: {
		count: 1000,
		size: 0.05,
		speed: 0.01,
		color: '#00ffff'
	},
	camera: {
		position: [0, 0, 5],
		fov: 75
	},
	renderer: {
		antialias: true,
		alpha: true
	}
};
