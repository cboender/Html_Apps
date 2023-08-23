 var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    let camera = initCamera(scene)

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1;

    return scene;
};

function initCamera(scene) {
	// This creates and positions a free camera (non-mesh)
   // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(5, 5, -10), scene);
	var camera = new BABYLON.ArcRotateCamera("camera2", BABYLON.Tools.ToRadians(-115), BABYLON.Tools.ToRadians(65),20, BABYLON.Vector3.Zero(), scene);
    // This targets the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
   camera.attachControl(canvas, true);
	
	return camera
}