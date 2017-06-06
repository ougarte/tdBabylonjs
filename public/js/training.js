/**
 *
 */
class Canvas {
    constructor(idSelector) {
        this.element = $(`#${idSelector}`)[0];
    }
}

/**
 *
 */
class EngineFactory {
    static create(canvas) {
        const engine = new BABYLON.Engine(canvas.element, true);

        return engine;
    }
}

/**
 *
 */
class CameraFactory {
    static create(name, position, canvas, scene) {
        const cameraName = name || "default"; 
        const cameraPosition = position || new BABYLON.Vector3(45, 45, 45);
        // const camera = new BABYLON.FreeCamera(cameraName, cameraPosition, scene);
        const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 1, 30, BABYLON.Vector3.Zero(), scene);
        // const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), scene);
        // camera.rotationOffset = 180;
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

/**
 *
 */
const MeshCollection = [];
class MeshManager {
    static createSphere(scene, options) {
        let sphere = BABYLON.Mesh.CreateSphere(options.name, options.segments, options.size, scene);
        sphere.position = options.position;

        if(options.material) {
            let material = new BABYLON.StandardMaterial(options.material.name, scene);
            let color = new BABYLON.Color3(options.material.color.red, options.material.color.green, options.material.color.blue);

            material.diffuseColor = color;
            material.alpha = options.material.alpha;
            sphere.material = material;
        }

        MeshCollection.push(sphere);
    }

    static createLine(scene, options) {
        const vectors = [];

        options.vectors.forEach((vector) => {
            let vector3d = new BABYLON.Vector3(vector.x, vector.y, vector.z);
            vectors.push(vector3d);
        });

        const line = BABYLON.Mesh.CreateLines(options.name, vectors, scene);
        MeshCollection.push(line);
    }
}

/**
 *
 */
$(function() {
    const canvas = new Canvas('main');
    const engine = EngineFactory.create(canvas);
    const scene = SceneFactory.create(canvas, engine);
    const camera = CameraFactory.create(null, null, canvas, scene);

    // scene.activeCamera.panningSensibility = 0;
    // camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas.element, false);
    // camera.attachControl(canvas.element, noPreventDefault, useCtrlForPanning);

    // const ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    // camera.lockedTarget = sphereX;

    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = .5;

    spheredb.forEach((sphere) => {
        MeshManager.createSphere(scene, sphere);
    });

    linedb.forEach((line) => {
        MeshManager.createLine(scene, line);
    });

    engine.runRenderLoop(function () {
        scene.render();
    });

});