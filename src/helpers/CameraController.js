import { PerspectiveCamera } from "three";


export class CameraController {

    constructor(fov, aspect, near, far) {
        this.aspect = aspect;
        this.fov = fov;
        this.near = near;
        this.far = far;
        this.perspectiveCamera = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    }
}