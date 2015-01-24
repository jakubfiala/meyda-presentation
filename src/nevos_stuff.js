//nevos stuff

//RMS
var visionContainer = $("#the-vision-continued").parent().parent();
visionContainer.append('<canvas id="rmsCanvas" class="wholeSlideCanvas">');
var rmsCanvas = $("#rmsCanvas")[0];
rmsCanvas.width = scaler.width();
rmsCanvas.height = scaler.height();
var rmsCtx = rmsCanvas.getContext('2d');
var radius = 200;
var distance = 100;

var displayRMS = function(f) {
  if (visionContainer.parent().parent().hasClass("remark-visible")) {

    rmsCtx.clear();

    //darker circle
    rmsCtx.lineWidth = 16;
    rmsCtx.beginPath();
    rmsCtx.strokeStyle = "#555";
    rmsCtx.arc(rmsCanvas.width-(radius+distance), rmsCanvas.height-(radius+distance), radius, 0, 2*Math.PI)
    rmsCtx.stroke();
    rmsCtx.closePath();

    //brighter circle
    rmsCtx.lineWidth = 10;
    rmsCtx.beginPath();
    rmsCtx.strokeStyle = "#ddd";
    rmsCtx.arc(rmsCanvas.width-(radius+distance),rmsCanvas.height-(radius+distance), radius ,1.5*Math.PI , 1.5*Math.PI + 2*f.rms*Math.PI);
    rmsCtx.stroke();
    rmsCtx.closePath();

    rmsCtx.fillStyle = "#ddd";
    rmsCtx.font = "18px Courier New";
    rmsCtx.fillText("RMS: " + Math.round(f.rms*10000)/10000, rmsCanvas.width-(radius+distance)-60, rmsCanvas.height-(radius+distance)+8);

  }
}

callbacks.push(displayRMS);



//Amplitude spectrum + Centroid

var fftContainer = $("#fft").parent().parent();
fftContainer.append('<canvas id="fftCanvas" class="wholeSlideCanvas">');
var fftCanvas = $("#fftCanvas")[0];
fftCanvas.width = scaler.width();
fftCanvas.height = scaler.height();
var fftCtx = fftCanvas.getContext('2d');


var displayLoudness = function(f) {
  if (fftContainer.parent().parent().hasClass("remark-visible")) {

    var sizeOfDisplayedFFT = 2*f.amplitudeSpectrum.length/3;
    var width = fftCanvas.width/sizeOfDisplayedFFT;
    fftCtx.clear();

    fftCtx.fillStyle = "#ddd";
    fftCtx.fillRect(0, fftCanvas.height-50, fftCanvas.width, 1);
    for (var i = 0; i < sizeOfDisplayedFFT; i++) {
      fftCtx.fillRect(i*width,fftCanvas.height-f.amplitudeSpectrum[i]*100-50,width,(f.amplitudeSpectrum[i]*100));
    }

    fftCtx.fillStyle = "#f33";
    fftCtx.fillRect(width*f.spectralCentroid, fftCanvas.height-50, 3, 50);
  }
}

callbacks.push(displayLoudness);
