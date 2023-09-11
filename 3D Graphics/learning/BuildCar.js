import('../babylon/babylon.js')

function populateScene() {
    const car = createCar(.5,.2,.2)
}

function createCar(carlength, carHeight, carWidth) {
    const carCoords = [
         new BABYLON.Vector3(0,0,0),
         new BABYLON.Vector3(carlength,0,0)
    ]

    for (let x = 0; x < 20;x++) {
        carCoords.push(new BABYLON.Vector3((carlength - carHeight) + carHeight * Math.cos(x * Math.PI /40),0,carHeight * Math.sin(x * Math.PI / 40)))
    }

    carCoords.push(new BABYLON.Vector3((carlength-carHeight), 0, carHeight));
    carCoords.push(new BABYLON.Vector3(0, 0, carHeight));


    const carUV = [
        new BABYLON.Vector4(0, .5, .38 ,1), // Top
        new BABYLON.Vector4(0, 0, 1, .5), //Side
        new BABYLON.Vector4(.38 ,1,0, .5), //Bottom
    ]
    const carTexture = new BABYLON.StandardMaterial("carMat");
    carTexture.diffuseTexture = new BABYLON.Texture("assets/textures/car.png")

    const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: carCoords, depth: carWidth, faceUV: carUV,  wrap: true});
    car.material = carTexture

    const carAnim = new BABYLON.Animation("carAnim", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
    const carAnimKeys = [
        {frame: 0, value: -4},
        {frame: 120, value: 4},
        //{frame: 180, value: 4},
        {frame: 240, value: -4},
    ]
    carAnim.setKeys(carAnimKeys)

    car.animations = [carAnim]
    car.position.x = -4

    scene.beginAnimation(car, 0, 300, true)

    createWheels(car, carlength, carHeight *.5, carWidth)

    return car;
}

function createWheels(car, carlength, wheelOffset, carWidth) {
    const wheelUV = [
        new BABYLON.Vector4(0,0, 1,1),
        new BABYLON.Vector4(.1,.5, .1,.5),
    ]
    const wheelAnim = new BABYLON.Animation("wheelAnim", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

    const wheelAnimKeys = [
        {frame: 0, value: 0},
        {frame: 30, value: 2 * Math.PI}
    ]
    wheelAnim.setKeys(wheelAnimKeys)
   
    const wheelWidth = .05
    const wheelFR = BABYLON.MeshBuilder.CreateCylinder("wheelFR", { diameter: .125, height: wheelWidth, faceUV: wheelUV, wrap: true})
    wheelFR.parent = car
    wheelFR.position.x = carlength - wheelOffset
    wheelFR.position.y = wheelWidth / 2
    wheelFR.animations = [wheelAnim]

    let wheelMat = new BABYLON.StandardMaterial("WheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("assets/textures/wheel.png")
    wheelFR.material = wheelMat

    const wheelFL = wheelFR.clone("wheelFL")
    wheelFL.position.y = -(carWidth + (wheelWidth / 2))

    const wheelBR = wheelFR.clone("wheelBR")
    wheelBR.position.x = wheelOffset

    const wheelBL = wheelFL.clone("wheelBL")
    wheelBL.position.x = wheelOffset

    scene.beginAnimation(wheelFR, 0, 30, true)
    scene.beginAnimation(wheelFL, 0, 30, true)
    scene.beginAnimation(wheelBR, 0, 30, true)
    scene.beginAnimation(wheelBL, 0, 30, true)
}