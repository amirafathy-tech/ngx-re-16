
import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent implements OnInit, AfterViewInit {
  public isLoading: boolean = true;
  @ViewChild('canvas') private canvasRef: ElementRef;
  @Input() public fieldOfView: number = 10;//1
  @Input('nearClipping') public nearClippingPane: number = 1;
  @Input('farClipping') public farClippingPane: number = 1000000;

  // Scene properties
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private model: any;
  private directionalLight: THREE.DirectionalLight;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private loaderGLTF = new GLTFLoader();
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;

  /**
   *Animate the model
   *
   * @private
   * @memberof ModelComponent
   */
  private animateModel() {
    // if (this.model) {
    //   this.model.rotation.z += 0.05;  //change
    // }
  }
  /**
   *create controls
   *
   * @private
   * @memberof ModelComponent
   */
  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '100px';//0
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    //this.controls.autoRotate = false;
    this.controls.enableZoom = true;
    //this.controls.enablePan = false;
    this.controls.update();
  };

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene() {
    this.isLoading = true;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8)
    this.loaderGLTF.load('assets/map.glb', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position);
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
      this.isLoading = false;
    });

    //Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )
    this.camera.position.x = 10;
    this.camera.position.y = 50;
    this.camera.position.z = 200;
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 1.5);
    this.directionalLight.position.set(64.19672, 11.82403, 11.82403);
    this.scene.add(this.directionalLight);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
 * Start the rendering
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: ModelComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    }());
  }
  constructor() { }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }

}