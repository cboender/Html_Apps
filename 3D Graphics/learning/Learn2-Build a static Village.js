function populateScene() {
	createWorldGround()
	
	const houseTypes = [createHouse(cubeHouse), createHouse(doubleHouse)]
	
	const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
    places.push([2, -Math.PI / 16, -4.5, 3 ]);
    places.push([2, -Math.PI / 16, -1.5, 4 ]);
    places.push([2, -Math.PI / 3, 1.5, 6 ]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
    places.push([1, 5 * Math.PI / 4, 0, -1 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
    places.push([2, Math.PI / 1.9, 4.75, -1 ]);
    places.push([1, Math.PI / 1.95, 4.5, -3 ]);
    places.push([2, Math.PI / 1.9, 4.75, -5 ]);
    places.push([1, Math.PI / 1.9, 4.75, -7 ]);
    places.push([2, -Math.PI / 3, 5.25, 2 ]);
    places.push([1, -Math.PI / 3, 6, 4 ]);
	
	let houses = []
	for (placeIndex in places) {
		let place = places[placeIndex]
		let ogHouse = houseTypes[place[0] - 1]
		let house = ogHouse
		if (placeIndex > 1) {
			house = house.clone("house" + placeIndex)
		}
		house.rotation.y = place[1]
		house.position.x = place[2]
		house.scaling.y = .75 + Math.random()
		house.position.z = place[3]
		houses.push(house)
	}
	
	//const obj = BABYLON.OBJExport.OBJ(houseTypes, true, 'material',true)
	//const mtl = BABYLON.OBJExport.MTL(houseTypes[0])
	//const names = ['village.obj', 'material.mtl']
	//const blobs = [new Blob([obj], { type: 'octet/stream' })]
	//const a = document.createElement('a')
	//a.href = window.URL.createObjectURL(blobs[0])
	//a.download = 'village.gltf'
	const click = document.createEvent("MouseEvents");
	click.initEvent("click", true, false);
	//a.dispatchEvent(click);
}

const cubeHouse = {
	faceUV: [
		new BABYLON.Vector4(0.6, 0.0, 0.8, 1.0),//Rear
		new BABYLON.Vector4(0.0, 0.0, .2, 1.0),  //Front
		new BABYLON.Vector4(0.4, 0, 0.6, 1.0),  //Left
		new BABYLON.Vector4(0.1, 0, .3, .5), //Right
		new BABYLON.Vector4(0.5, 0, .6, .5), //Top
		new BABYLON.Vector4(0.5, 0, .6, .5) // Bottom
	],
	width: 1,
	depth: 1,
}
const doubleHouse = {
	faceUV: [new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0),
	new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0),
	new BABYLON.Vector4(0.4, 0, 0.6, 1.0),
	new BABYLON.Vector4(0.4, 0, .6, 1.0),
	new BABYLON.Vector4(0.5, 0, .6, .5),
	new BABYLON.Vector4(0.5, 0, .6, .5)
	],
	width: 2,
	depth: 1,
}

function createHouse(data) {
	let height = data?.height || 1;
	let width = data.width
	let depth = data.depth
	const faceUV = data.faceUV;
	
	let base = BABYLON.MeshBuilder.CreateBox("Base", {width: width, height: height, depth: depth, faceUV: faceUV, wrap: true})
	base.position.y = height / 2
	
	
	
	let houseBaseMat = new BABYLON.StandardMaterial("Base")
	houseBaseMat.diffuseTexture = new BABYLON.Texture("assets/textures/semihouse.png")
	base.material = houseBaseMat
	
	let roofWidth = (width * 1.3)
	let roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: roofWidth, height: (depth*1.2),tessellation: 3});
	
	
	let roofScale = .5
	roof.scaling.x = roofScale
	roof.position.y = ((roofWidth * roofScale) / 4) + height
	roof.rotation.z = BABYLON.Tools.ToRadians(90)
	roof.rotation.y = BABYLON.Tools.ToRadians(90)
	
	let roofMat = new BABYLON.StandardMaterial("roofMat")
	roofMat.diffuseTexture = new BABYLON.Texture("assets/textures/roof.jpg")
	roof.material = roofMat
	
	let house = BABYLON.Mesh.MergeMeshes([base, roof],true,false,null,false,true)
	return house
	
}

function createWorldGround() {
	// Our built-in 'ground' shape.
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50});
	
	let groundMat = new BABYLON.StandardMaterial("Ground");
	groundMat.diffuseColor= BABYLON.Color3.Green();
	ground.material = groundMat;
}