/**
 *
 */
class Canvas {
    constructor(idSelector) {
        this.element = $(`#${idSelector}`)[0];
    }
}

class EngineFactory {
    static create(canvas) {
        const engine = new BABYLON.Engine(canvas.element, true);

        return engine;
    }
}

class CameraFactory {
    static create(name, position, canvas, scene) {
        const cameraName = name || "default"; 
        const cameraPosition = position || new BABYLON.Vector3(0, 0, -45);
        // const camera = new BABYLON.FreeCamera(cameraName, cameraPosition, scene);
        const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
        // const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), scene);
        return camera;
    }
}

class SceneFactory {
    static create(canvas, engine) {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(.486, .714, .427);

        return scene;
    }
}

$(function() {
    const canvas = new Canvas('main');
    const engine = EngineFactory.create(canvas);
    const scene = SceneFactory.create(canvas, engine);
    const camera = CameraFactory.create(null, null, canvas, scene);

    // scene.activeCamera.panningSensibility = 0;
    // camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas.element, false);
    // camera.attachControl(canvas.element, noPreventDefault, useCtrlForPanning);

    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = .5;

    // const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    // sphere.position.y = 1;

    // const ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    // camera.lockedTarget = sphere;

    const lineX = BABYLON.Mesh.CreateLines("lineX", [
        new BABYLON.Vector3(-10, 0, 0),
        new BABYLON.Vector3(10, 0, 0)
    ], scene);

    const lineY = BABYLON.Mesh.CreateLines("lineY", [
        new BABYLON.Vector3(0, -10, 0),
        new BABYLON.Vector3(0, 10, 0)
    ], scene);

    const lineZ = BABYLON.Mesh.CreateLines("lineZ", [
        new BABYLON.Vector3(0, 0, -10),
        new BABYLON.Vector3(0, 0, 10)
    ], scene);

    engine.runRenderLoop(function () {
        scene.render();
    });

});