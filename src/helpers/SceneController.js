import { Scene, AmbientLight, Color, PointLight, PointLightHelper, DirectionalLight } from "three";

export class SceneController {

    constructor() {
        this.scene = new Scene();
        this.objects = [];
    }

    setBackground(bg) {
        this.scene.background = bg;
    }

    addObjectToScene(...obj) {
        this.scene.add(...obj);
        this.objects = [this.objects, ...obj]
    }

    addAmbientLight() {
        this.scene.add(new AmbientLight(new Color(0xffffff)));
    }

    createPointLight(color, intensity) {
        const lightpoint = new PointLight(color, intensity);
        return lightpoint;
    }

    createDirectionalLight(color, intensity) {
        const directionalLight = new DirectionalLight(color, intensity);
        return directionalLight;
    }

    createLightHelper(lightPoint) {
        const pointLightHelper = new PointLightHelper(lightPoint);
        return pointLightHelper;
    }
}