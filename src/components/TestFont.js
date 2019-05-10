import React, { Component } from "react";
import "three/examples/js/controls/OrbitControls";
import createTextGeometry from "three-bmfont-text";
import loadFont from "load-bmfont";
// import Shader from "three-bmfont-text/shaders/multipage";
import Shader from "three-bmfont-text/shaders/multipage";
import { setupScene, renderGL } from "../utils/glUtils";

function loadTexture(path) {
  return new Promise(function(resolve, reject) {
    THREE.ImageUtils.loadTexture(path, undefined, resolve, reject);
  });
}

function loadFontFile(path) {
  return new Promise((resolve, reject) => {
    loadFont(path, (err, font) => {
      if (err) {
        reject(err);
      } else {
        resolve(font);
      }
    });
  });
}

function fontFileLoaders(folder, name, from, to) {
  const loaders = [];
  loaders.push(loadFontFile(folder + "/" + name + ".fnt"));
  // loaders.push(loadTexture(folder + "/" + name + ".png"));
  for (let index = from; index <= to; index++) {
    loaders.push(loadTexture(folder + "/" + name + "_" + index + ".png"));
  }
  return loaders;
}

export class TestFont extends Component {
  loadFont() {
    Promise.all(fontFileLoaders("fonts/bmfnt", "test", 0, 9)).then(assets => {
      console.log(assets);
      this.bmfont = assets[0];
      this.fontTextures = assets.slice(1);
      this.fontReady = true;
    });
  }

  createFont() {
    if (!this.fontReady) {
      setTimeout(() => {
        this.createFont();
      }, 500);
    } else {
      console.log("font is ready!");
      const fontGeo = createTextGeometry({
        multipage: true,
        font: this.bmfont,
        align: "left",
        lineHeight: 10,
        baseline: 5,
        text: "A"
      });

      // fontGeo.update("好的");
      console.log(fontGeo);
      const m = new THREE.RawShaderMaterial(
        Shader({
          textures: this.fontTextures,
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 0.8,
          color: 0xff0000
        })
      );
      console.log(fontGeo.layout);

      const t = new THREE.Mesh(fontGeo, m);

      t.scale.multiplyScalar(0.1);

      this.scene.add(t);
    }
  }

  componentDidMount() {
    setupScene.call(this);
    renderGL.call(this);
    this.loadFont();
    this.createFont();
  }

  render() {
    return <div />;
  }
}

export default TestFont;
