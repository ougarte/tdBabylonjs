/**
 *
 */
class Canvas {
    constructor(idSelector) {
        this.element = $(`#${idSelector}`)[0];
        this.listeners = [];
    }

    addEvent(event) {
        this.element.addEventListener(event.name, event.listener, false);
        this.listeners[event.name] = event.listener;
    }

    removeEvent(event) {
        this.element.removeEventListener(event.name, event.listener);
    }

    removeEvents() {
        const element = this.element;
        this.listeners.forEach((listener, name) => {
            element.removeEvent({name:name, listener: listener});
        });
    }
}

class CanvasEvent {
    constructor(name, listener) {
        this.name = name;
        this.listener = listener;
    }
}

/**
 *
 */
class EngineFactory {
    static create(canvas) {
        if (EngineFactory.instance) return EngineFactory.instance;
        if (!canvas || !canvas.element) throw new Error('Canvas is required');

        EngineFactory.instance = new BABYLON.Engine(canvas.element, true);

        return EngineFactory.instance;
    }
}

/**
 *
 */
class CameraFactory {
    static create(name, position, canvas, scene) {
        const cameraName = name || "default";
        // const cameraPosition = position || new BABYLON.Vector3(45, 45, 45);
        // const camera = new BABYLON.FreeCamera(cameraName, cameraPosition, scene);
        const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
        // const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), scene);
        // camera.rotationOffset = 180;
        return camera;
    }
}

class SceneFactory {
    static create(engine, options) {
        const scene = new BABYLON.Scene(engine);
        let color = new BABYLON.Color3(.486, .714, .427);
        
        if(options && options.color) {
            color = new BABYLON.Color3(options.color.red, options.color.green, options.color.blue);
        }

        scene.clearColor = color;

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
        sphere.metadata = { type: 'sphere' }

        if(options.material) {
            let material = new BABYLON.StandardMaterial(options.material.name, scene);
            let color = new BABYLON.Color3(options.material.color.red, options.material.color.green, options.material.color.blue);

            material.diffuseColor = color;
            material.alpha = options.material.alpha;
            sphere.material = material;
        }

        if(options.animations && options.animations.length) {
            let animation;

            options.animations.forEach((data) => {
                animation = new BABYLON.Animation(data.name, data.property, data.frames, data.type, data.behavior);
                animation.setKeys(data.keys);
                sphere.animations.push(animation);
            });
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
        line.metadata = { type: 'line' }
        MeshCollection.push(line);
    }
}

/**
 *
 */
$(function() {
    const canvas = new Canvas('main');
    const engine = EngineFactory.create(canvas);
    const scene = SceneFactory.create(engine, {color: {red: .186, green: .714, blue: .427}});
    
    const camera = CameraFactory.create(null, null, canvas, scene);
    camera.attachControl(canvas.element, false);
    camera.setPosition(new BABYLON.Vector3(20, 20, 20));
    // camera.viewport = new BABYLON.Viewport(0.0, 0.0, 0.5, 0.5);

    // const cameraAlternative = CameraFactory.create(null, null, canvas, scene);
    // cameraAlternative.attachControl(canvas.element, false);
    // cameraAlternative.setPosition(new BABYLON.Vector3(50, 50, 20));
    // cameraAlternative.viewport = new BABYLON.Viewport(0.2, 0.2, 0.5, 0.5);

    // scene.activeCameras.push(camera);
    // scene.activeCameras.push(cameraAlternative);

    // const ground = BABYLON.Mesh.CreateGround("ground1", 10, 10, 2, scene);
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = .5;

    const  ground = BABYLON.MeshBuilder.CreateGround("gd", {}, scene);

    spheredb.forEach(sphere =>  MeshManager.createSphere(scene, sphere));
    linedb.forEach(line => MeshManager.createLine(scene, line));
    engine.runRenderLoop(() => {
        scene.render();
    });

    /**
     * Canvas Events
     */
    let followCamera;
    const sphereConstraint = (mesh) => { return mesh.metadata && mesh.metadata.type === 'sphere'; }
    const getPickedMesh = (event, scene) => {
        let pickInfo = scene.pick(scene.pointerX, scene.pointerY, sphereConstraint);

        if (event.button) return;
        if (!pickInfo || !pickInfo.hit) return;

        return pickInfo;
    }

    const pointerDownEvent = new CanvasEvent('pointerdown', (event)=> {
        const pickInfo = getPickedMesh(event, scene);

        if (!pickInfo) return;

        const currentMesh = pickInfo.pickedMesh;

        if (currentMesh.animations.length) {
            console.log('Animation...' + currentMesh.animations.length);
            scene.beginAnimation(currentMesh, 0, 100, true);
        }
    });

    const pointerUpEvent = new CanvasEvent('pointerup', (event)=> {
        const pickInfo = getPickedMesh(event, scene);

        if (!pickInfo) return;

        // const currentMesh = pickInfo.pickedMesh;
        // currentMesh.scaling.x /= 2;
        // currentMesh.scaling.y /= 2;
        // currentMesh.scaling.z /= 2;
    });

    canvas.addEvent(pointerDownEvent);
    canvas.addEvent(pointerUpEvent);

    /**
     * Creating an specific scene
     */
    scene.onDispose = function() {
        canvas.removeEvents();
    };

});