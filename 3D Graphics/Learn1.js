function populateScene(scene) {
	// Our built-in 'ground' shape.
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
	
	let groundMat = new BABYLON.StandardMaterial("Ground", scene);
	groundMat.diffuseColor= BABYLON.Color3.Red();
	ground.material = groundMat;
	
	let groundText = new BABYLON.Texture("assets/textures/red_yellow_checker_80px.png", scene);
	groundMat.diffuseTexture = groundText

	let yeti = BABYLON.SceneLoader.ImportMeshAsync("", "assets/meshes/yeti/","Yeti.gltf", scene).then(result => {
		let meshes = result.meshes
		meshes[0].scaling = new BABYLON.Vector3(.1,.1,.1);
	})
}