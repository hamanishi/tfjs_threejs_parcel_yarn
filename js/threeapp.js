import * as Utils from '../lib/utils';
import { Matrix4 } from '../lib/matrix';

// shaders
import vertexSource from '../shaders/vertex.glsl';
import fragmentSource from '../shaders/fragment.glsl';

import * as THREE from 'three';
//const OrbitControls = require('three-orbitcontrols')
//import OrbitControls from 'three-orbitcontrols';
const OrbitControls = require('three-orbit-controls')(THREE)

export default class ThreeJSApp {
  constructor() {
    this.dinamics = {};

    this.currentAngle = 0.0;
    this.speed = 1.0;
  }


  main(canvas) {
    //window.addEventListener( 'resize', onWindowResize, false );

    // gt WebGL context
    this.gl = Utils.getWebGLContext(canvas);
    if (!this.gl) {
      console.error('Failed to get the rendering context for WebGL.');
      return;
    }

    // // setup shaders
    // if (!Utils.initShaders(this.gl, vertexSource, fragmentSource)) {
    //   console.error('Failed to initialize shaders.');
    //   return;
    // }

    // // set the positions of vertices
    // var n = this.initVertexBuffers();
    // if (n < 0) {
    //   console.error('Failed to set the positions of vertices.');
    //   return;
    // }
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas:canvas
    });

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.camera.position.set( 0, 10, 10 );
    this.camera.lookAt(0,0,0);
    //  this.camera.position.z = 0;

    //this.controls.enableDamping = true;
    //this.controls.dampingFactor = 0.25;
    //this.controls.enableZoom = true;
    //this.controls.minDistance = 300;
    //this.controls.maxDistance = 700;

    this.scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //const material = new THREE.MeshNormalMaterial();

    console.log(vertexSource);
    console.log(typeof vertexSource);
    console.log(String(vertexSource));
    //  this.uniforms = {
    //v_COlor: { type: "vec4", value: new THREE.Vector4() }
    //};
    const material = new THREE.RawShaderMaterial({
      //		uniforms: this.uniforms,
      vertexShader: vertexSource,
      fragmentShader: fragmentSource
    });
    const m = new THREE.MeshBasicMaterial( {color: 0xFF0000} );

    this.mesh = new THREE.Mesh( geometry, m );
    this.scene.add( this.mesh );

    this.scene.add( new THREE.GridHelper( 50, 50 ) );

    const g = new THREE.SphereGeometry( 0.1, 0.1, 0.1 );
    //const m = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
    const sphere = new THREE.Mesh( g, m );
    sphere.position.set(1,1,1);
    this.scene.add(sphere);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // // specific the color for clearing canvas and enable the hidden surface removal
    // this.gl.clearColor(0, 0, 0, 0.01);
    // this.gl.enable(this.gl.DEPTH_TEST);

    // // get the storage location of matrix
    // var u_MvpMatrix = this.gl.getUniformLocation(this.gl.program, 'u_MvpMatrix');

    // // set the aye point and view volume
    // var mvpMatrix = new Matrix4();

    // object of dinamics values control
    //this.dinamics.n = n;
    //this.dinamics.u_MvpMatrix = u_MvpMatrix;
    //this.dinamics.mvpMatrix = mvpMatrix;

    // init tick loop
    this.tick();
  }

  initVertexBuffers() {
    var gl = this.gl;

    var vertices = new Float32Array([   // Vertex coordinates
      1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,  // v0-v1-v2-v3 front
      1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,  // v0-v3-v4-v5 right
      1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
      -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,  // v1-v6-v7-v2 left
      -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,  // v7-v4-v3-v2 down
      1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0   // v4-v7-v6-v5 back
    ]);

    var colors = new Float32Array([     // Colors
      0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  // v0-v1-v2-v3 front(blue)
      0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  // v0-v3-v4-v5 right(green)
      1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
      1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
      0.9, 0.4, 0.2,  0.9, 0.4, 0.2,  0.9, 0.4, 0.2,  0.9, 0.4, 0.2,  // v7-v4-v3-v2 down
      0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0   // v4-v7-v6-v5 back
    ]);

    var indices = new Uint8Array([       // Indices of the vertices
      0, 1, 2,   0, 2, 3,    // front
      4, 5, 6,   4, 6, 7,    // right
      8, 9,10,   8,10,11,    // up
      12,13,14,  12,14,15,    // left
      16,17,18,  16,18,19,    // down
      20,21,22,  20,22,23     // back
    ]);

    // create buffer object
    var indexBuffer = gl.createBuffer();

    var FSIZE = vertices.BYTES_PER_ELEMENT;

    // write vertex coordinates to the buffer object and enable it
    if (!this.initArrayBuffer(vertices, 3, gl.FLOAT, 0, 0, 'a_Position'))
    return -1;

    if (!this.initArrayBuffer(colors, 3, gl.FLOAT, 0, 0, 'a_Color'))
    return -1;

    // write the indices to the buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    return indices.length;
  }

  initArrayBuffer(data, num, type, stride, offset, attribute) {
    var gl = this.gl;
    var buffer = gl.createBuffer();

    // write data into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    var a_attribute = gl.getAttribLocation(gl.program, attribute);
    gl.vertexAttribPointer(a_attribute, num, type, false, stride, offset);
    gl.enableVertexAttribArray(a_attribute);

    return true;
  }

  tick() {
    this.currentAngle += this.speed;
    this.draw();
    window.requestAnimationFrame(this.tick.bind(this));
  }

  draw() {
    this.mesh.rotation.x += 0.02;
    this.mesh.rotation.y += 0.02;
    //this.camera.rotation.order = "XYZ";
    //this.camera.rotation.x += 10;
    //this.camera.rotation.y += 0.1;
    //this.camera.position.x = Math

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    //var gl = this.gl;
    //var dn = this.dinamics;

    // // set up notation matrix
    // dn.mvpMatrix
    // .setPerspective(30, 1, 1, 100)
    // .lookAt(
    //   0, 0, 10, // eye point
    //   0, 0, 0, // look-at point
    //   0, 1, 0, // up direction
    //   )
    //   .rotate(this.currentAngle, 1, 0, 0)
    //   .rotate(this.currentAngle * 0.5, 0, 1, 0)
    //   .rotate(this.currentAngle * 0.1, 0, 0, 1);

    //   // pass the rotation matrix to the vertex shader
    //   gl.uniformMatrix4fv(dn.u_MvpMatrix, false, dn.mvpMatrix.elements);

    // clear the color and depth
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // draw the cube
    //gl.drawElements(gl.TRIANGLES, dn.n, gl.UNSIGNED_BYTE, 0);
  }
  // onWindowResize() {
  //   this.camera.aspect = window.innerWidth / window.innerHeight;
  //   this.camera.updateProjectionMatrix();
  //   this.renderer.setSize( window.innerWidth, window.innerHeight );
  // }
}