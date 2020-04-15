import * as faceapi from 'face-api.js';


export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';

    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
}

export async function getFullFaceDescription(incomingVideo) {

    // const detections = await faceapi.detectAllFaces(incomingVideo)
    // .then(res => {
    //     console.log("INSIDE", res)
    // })
    const detectionsWithExpressions = await faceapi.detectAllFaces(incomingVideo).withFaceLandmarks().withFaceExpressions()


    // .withFaceLandmarks().withFaceDescriptors()
}

// export async function getFullFaceDescription(blob, inputSize = 512) {
//     let scoreThreshold = 0.5;

//     const OPTION = new faceapi.TinyFaceDetectorOptions({
//         inputSize,
//         scoreThreshold
//     });

//     const useTinyModel = true;

//     let img = await faceapi.fetchImage(blob);

//     let fullDesc = await faceapi
//         .detectAllFaces(img, OPTION)
//         .withFaceLandmarks(useTinyModel)
//         .withFaceDescriptors();
//     return fullDesc;
// }