$(document).ready(function(){
  $('#features').parent().append('<canvas id="specvis" style="z-index:-1" class="wholeSlideCanvas" ></canvas>');
  var canvas = document.getElementById('specvis');
  canvas.width = scaler.width();
  canvas.height = scaler.height();
  var ctx = canvas.getContext('2d');
  var displayMagnitude = 100;
  var historyLength = 100;
  ctx.font = "14px Courier New";
  ctx.lineWidth = 3;
  var xoffset = 500;
  var yBottomOffset = 200;
  var data = {
    sharpness:{
      max:0,
      previous:[]
    },
    rolloff:{
      max:0,
      previous:[]
    },
    flatness:{
      max:0,
      previous:[]
    },
  }
  for(var i = 0; i < historyLength; i++){
    data.sharpness.previous[i]=0;
    data.rolloff.previous[i]=0;
    data.flatness.previous[i]=0;
  }
  callbacks.push(function(f){
    ctx.clear();
    data.sharpness.previous.unshift(f.perceptualSharpness);
    data.sharpness.previous.pop();
    data.rolloff.previous.unshift(f.spectralRolloff);
    data.rolloff.previous.pop();
    data.flatness.previous.unshift(f.spectralFlatness);
    data.flatness.previous.pop();
    // data.sharpness.max = f.perceptualSharpness > data.sharpness.max ? f.perceptualSharpness : data.sharpness.max;
    data.rolloff.max = f.spectralRolloff > data.rolloff.max ? f.spectralRolloff : data.rolloff.max;
    data.flatness.max = f.spectralFlatness > data.flatness.max ? f.flatness : data.flatness.max;
    // data.rolloff.max = 1;
    data.flatness.max = 1;
    data.sharpness.max = 1;

    //spectralFlatness
    ctx.beginPath();
    for(var i = 0; i < historyLength; i++){
      var x = xoffset+(i*(canvas.width-xoffset)/historyLength);
      var y = (canvas.height-yBottomOffset)-(canvas.height-yBottomOffset)*(data.flatness.previous[i]/data.flatness.max);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#FFF";
    ctx.fillStyle = "#FFF";
    ctx.stroke();
    ctx.fillText("Flatness // " + f.spectralFlatness, canvas.width-400, canvas.height-80);

    //Perceptual Sharpness
    ctx.beginPath();
    for(var i = 0; i < historyLength; i++){
      var x = xoffset+(i*(canvas.width-xoffset)/historyLength);
      var y = (canvas.height-yBottomOffset)-(canvas.height-yBottomOffset)*(data.sharpness.previous[i]/data.sharpness.max);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#F00";
    ctx.fillStyle = "#F00";
    ctx.stroke();
    ctx.fillText("Sharpness // " + f.perceptualSharpness, canvas.width-400, canvas.height-60);

    //Spectral Rolloff
    ctx.beginPath();
    for(var i = 0; i < historyLength; i++){
      var x = xoffset+(i*(canvas.width-xoffset)/historyLength);
      var y = (canvas.height-yBottomOffset)-(canvas.height-yBottomOffset)*(data.rolloff.previous[i]/data.rolloff.max);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#0CF";
    ctx.fillStyle = "#0CF";
    ctx.stroke();
    ctx.fillText("Rolloff // " + f.spectralRolloff, canvas.width-400, canvas.height-40);
  });
});
