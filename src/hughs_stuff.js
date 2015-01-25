$(document).ready(function(){
  $('#integration').parent().append('<canvas id="specvis" style="z-index:-1" class="wholeSlideCanvas" ></canvas>');
  var canvas = document.getElementById('specvis');
  canvas.width = scaler.width();
  canvas.height = scaler.height();
  var ctx = canvas.getContext('2d');
  var displayMagnitude = 100;
  var historyLength = 100;
  ctx.font = "14px Courier New";
  var data = {
    centroid:{
      max:0,
      previous:[]
    },
    rolloff:{
      max:0,
      previous:[]
    },
    rms:{
      max:0,
      previous:[]
    },
  }
  for(var i = 0; i < historyLength; i++){
    data.centroid.previous[i]=0;
    data.rolloff.previous[i]=0;
    data.rms.previous[i]=0;
  }
  callbacks.push(function(f){
    ctx.clear();
    data.centroid.previous.unshift(f.spectralCentroid);
    data.centroid.previous.pop();
    data.rolloff.previous.unshift(f.spectralRolloff);
    data.rolloff.previous.pop();
    data.rms.previous.unshift(f.rms);
    data.rms.previous.pop();
    data.centroid.max = f.spectralCentroid > data.centroid.max ? f.spectralCentroid : data.centroid.max;
    data.rolloff.max = f.spectralRolloff > data.rolloff.max ? f.spectralRolloff : data.rolloff.max;
    data.rms.max = f.rms > data.rms.max ? f.rms : data.rms.max;

    //RMS
    ctx.beginPath();
    for(var i = 0; i < historyLength; i++){
      var x = i*canvas.width/historyLength;
      var y = canvas.height-canvas.height*(data.rms.previous[i]/data.rms.max);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#FFF";
    ctx.fillStyle = "#FFF";
    ctx.stroke();
    ctx.fillText("RMS // " + f.rms, canvas.width-400, canvas.height-80);
    //SpectralCentroid
    ctx.beginPath();
    for(var i = 0; i < historyLength; i++){
      var x = i*canvas.width/historyLength;
      var y = canvas.height-canvas.height*(data.centroid.previous[i]/data.centroid.max);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#F00";
    ctx.fillStyle = "#F00";
    ctx.stroke();
    ctx.fillText("Spectral Centroid // " + f.spectralCentroid, canvas.width-400, canvas.height-60);
    //SpectralRolloff
    ctx.beginPath();
    for(var i = 0; i < historyLength; i++){
      var x = i*canvas.width/historyLength;
      var y = canvas.height-canvas.height*(data.rolloff.previous[i]/data.rolloff.max);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#00F";
    ctx.fillStyle = "#00F";
    ctx.stroke();
    ctx.fillText("Spectral Rolloff // " + f.spectralRolloff, canvas.width-400, canvas.height-40);
  });
});
