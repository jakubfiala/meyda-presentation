$(document).ready(function(){
  $('#integration').parent().append('<canvas id="specvis" class="wholeSlideCanvas" ></canvas>');
  var canvas = document.getElementById('specvis');
  canvas.width = scaler.width();
  canvas.height = scaler.height();
  var ctx = canvas.getContext('2d');
  var previousCentroids = [];
  var previousRolloffs = [];
  var previousRMS = [];
  var maxCentroid = 0;
  var maxRMS = 0;
  var maxRolloff = 0;
  var displayMagnitude = 100;
  var historyLength = 100;
  ctx.fillStyle = "#000";
  for(var i = 0; i < historyLength; i++){
    previousCentroids[i]=0;
    previousRolloffs[i]=0;
    previousRMS[i]=0;
  }
  callbacks.push(function(f){
    ctx.clear();
    previousCentroids.unshift(f.spectralCentroid);
    previousCentroids.pop();
    previousRolloffs.unshift(f.spectralRolloffs);
    previousRolloffs.pop();
    previousRMS.unshift(f.rms);
    previousRMS.pop();
    maxCentroid = f.spectralCentroid > maxCentroid ? f.spectralCentroid : maxCentroid;
    maxRolloff = f.spectralRolloff > maxRolloff ? f.spectralRolloff : maxRolloff;
    maxRMS = f.rms > maxRMS ? f.rms : maxRMS;

    console.log(previousRMS.length);

    for(var i = 0; i < historyLength; i++){
      var x = i*canvas.width/historyLength;
      var y = canvas.height;
      ctx.fillRect(x,y,x+canvas.width/historyLength,(y-canvas.height*displayMagnitude)*f.spectralCentroid/maxCentroid);
    }
  });
});
