const spheredb = [
    {
        id: 1,
        name: 'sXPositive',
        segments: 100,
        size: 1,
        position: {
            x: 10,
            y:0,
            z: 0
        },
        material: {
            name: 'texture1',
            color: {
                red: 1.0,
                green: 0.0,
                blue: 0.0
            },
            alpha: 1.0
        },
        animations: [
            {
                id: 1,
                name: "animationOne",
                property: "scaling.x",
                frames: 30,
                type: BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                behavior: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
                keys: [
                    {frame: 0, value: 1},
                    {frame: 2, value: .8},
                    {frame: 4, value: .6},
                    {frame: 6, value: .4},
                    {frame: 7, value: .6},
                    {frame: 8, value: .8},
                    {frame: 10, value: 1}
                ]
            },
            {
                id: 2,
                name: "animationTwo",
                property: "scaling.y",
                frames: 30,
                type: BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                behavior: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
                keys: [
                    {frame: 0, value: 1},
                    {frame: 2, value: .8},
                    {frame: 4, value: .6},
                    {frame: 6, value: .4},
                    {frame: 7, value: .6},
                    {frame: 8, value: .8},
                    {frame: 10, value: 1}
                ]
            },
            {
                id: 3,
                name: "animationThree",
                property: "scaling.z",
                frames: 30,
                type: BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                behavior: BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
                keys: [
                    {frame: 0, value: 1},
                    {frame: 2, value: .8},
                    {frame: 4, value: .6},
                    {frame: 6, value: .4},
                    {frame: 7, value: .6},
                    {frame: 8, value: .8},
                    {frame: 10, value: 1}
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'sXNegative',
        segments: 100,
        size: 1,
        position: {
            x: -10,
            y:0,
            z: 0
        },
        material: {
            name: 'texture2',
            color: {
                red: 1.0,
                green: 0.0,
                blue: 0.0
            },
            alpha: .5
        }
    },
    {
        id: 3,
        name: 'sYPositive',
        segments: 100,
        size: 1,
        position: {
            x: 0,
            y: 10,
            z: 0
        },
        material: {
            name: 'texture3',
            color: {
                red: 0.0,
                green: 1.0,
                blue: 0.0
            },
            alpha: 1.0
        }
    },
    {
        id: 4,
        name: 'sYNegative',
        segments: 100,
        size: 1,
        position: {
            x: 0,
            y: -10,
            z: 0
        },
        material: {
            name: 'texture4',
            color: {
                red: 0.0,
                green: 1.0,
                blue: 0.0
            },
            alpha: .5
        }
    },
    {
        id: 5,
        name: 'sZPositive',
        segments: 100,
        size: 1,
        position: {
            x: 0,
            y: 0,
            z: 10
        },
        material: {
            name: 'texture5',
            color: {
                red: 0.0,
                green: 0.0,
                blue: 1.0
            },
            alpha: 1.0
        }
    },
    {
        id: 6,
        name: 'sZNegative',
        segments: 100,
        size: 1,
        position: {
            x: 0,
            y: 0,
            z: -10
        },
        material: {
            name: 'texture5',
            color: {
                red: 1.0,
                green: 0.0,
                blue: 1.0
            },
            alpha: .5
        }
    }
];