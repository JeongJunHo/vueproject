<template>
    <div>
        <div>Teachable Machine Image Model</div>
        <!-- <button type="button" onclick="init()">Start</button> -->
        <div id="webcam-container"></div>
        <div id="label-container"></div>
    </div>
</template>

<script>
// import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
export default {
    name: "whatisthis",
    data() {
        return {
            errored: false,
            loading: false,
            model: null,
            webcam: null,
            labelContainer: null,
            maxPredictions: null,
            URL: "https://teachablemachine.withgoogle.com/models/oKyBXOCv/"
        }
    },
    methods:{
        async init() {
            const modelURL = this.URL + "model.json";
            const metadataURL = this.URL + "metadata.json";
            

            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // or files from your local hard drive
            // Note: the pose library adds "tmImage" object to your window (window.tmImage)
            this.model = await tmImage.load(modelURL, metadataURL);
            this.maxPredictions = this.model.getTotalClasses();

            // Convenience function to setup a webcam
            const flip = true; // whether to flip the webcam
            this.webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
            window.console.log(this.webcam)
            await this.webcam.setup(); // request access to the webcam
            await this.webcam.play();
            window.requestAnimationFrame(this.loop());
            this.loop().then(function(){
                this.webcam.update(); // update the webcam frame
                this.predict();
                window.requestAnimationFrame(this.loop());
            })

            // append elements to the DOM
            document.getElementById("webcam-container").appendChild(this.webcam.canvas);
            this.labelContainer = document.getElementById("label-container");
            // for (let i = 0; i < maxPredictions; i++) { // and class labels
            //     labelContainer.appendChild(document.createElement("div"));
            // }
        },

        loop() {
            return new Promise(function (resolve) {
                resolve();
            });
        },

        // run the webcam image through the image model
        async predict() {
            // predict can take in an image, video or canvas html element
            const prediction = await this.model.predict(this.webcam.canvas);
            for (let i = 0; i < this.maxPredictions; i++) {
                // const classPrediction =
                //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                // labelContainer.childNodes[i].innerHTML = classPrediction;
                if(prediction[i].probability.toFixed(2) == 1){
                    document.getElementById("label-container").innerHTML = "이것은 " + prediction[i].className + "입니다! 아마도...";
                    break;
                }else{
                    document.getElementById("label-container").innerHTML = "모르겠습니다. 알려주세요!";
                }
            }
        }
    },
    mounted () {
        // More API functions here:
        // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

        // the link to your model provided by Teachable Machine export panel
        // const URL = "https://teachablemachine.withgoogle.com/models/oKyBXOCv/";

        // let model, webcam, labelContainer, maxPredictions;
        
        // Load the image model and setup the webcam
        window.console.log("getUserMedia::" + navigator.mediaDevices.getUserMedia)
        if(navigator.mediaDevices.getUserMedia){
            window.console.log("있음")
        }else{
            window.console.log("없음")
        }
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            window.console.log("stream :: " + stream);
        })
        .catch(function (err0r) {
            window.console.log("Something went wrong!" + err0r);
        });

        navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
        
        navigator.getMedia({video: true}, function() {
            // webcam is available
            window.console.log("웹캠있음");
        }, function() {
            // webcam is not available
            window.console.log("웹캠없음");
        });

        this.init();
    }    
}
</script>

<style scoped>

</style>