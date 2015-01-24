//nevos stuff

//RMS
var visionContainer = $("#the-vision-continuation").parent().parent();
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
    rmsCtx.arc(rmsCanvas.width-(radius+distance),rmsCanvas.height-(radius+distance), radius ,1.5*Math.PI , 1.5*Math.PI + 3*f.rms*Math.PI);
    rmsCtx.stroke();
    rmsCtx.closePath();

  }
}

callbacks.push(displayRMS);