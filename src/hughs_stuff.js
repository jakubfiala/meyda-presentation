$(document).ready(function(){
  $('#features').parent().append('<canvas id="specvis" style="z-index:-1;" class="wholeSlideCanvas" ></canvas>');
  var canvas = document.getElementById('specvis');
  canvas.width = scaler.width();
  canvas.height = scaler.height();
  var ctx = canvas.getContext('2d');
  var displayMagnitude = 100;
  var historyLength = 100;
  ctx.font = "14px Courier New";
  ctx.lineWidth = 2;
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
    borders:{
      x1:500,
      x2:350,
      y1:400,
      y2:75
    }
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
      var x = data.borders.x1+(i*(canvas.width-data.borders.x1-data.borders.x2)/historyLength);
      var val = data.flatness.previous[i]/data.flatness.max;
      val = val<1?val>0?val:0:1;
      var y = (canvas.height-data.borders.y1)-(canvas.height-data.borders.y1-data.borders.y2)*(val);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#FFF";
    ctx.fillStyle = "#FFF";
    ctx.stroke();
    ctx.fillText("Flatness // " + Math.round(f.spectralFlatness*10000)/10000, data.borders.x1, canvas.height-(data.borders.y1-20));

    //Perceptual Sharpness
    ctx.beginPath();
    for(var i = 0; i < historyLength; i++){
      var x = data.borders.x1+(i*(canvas.width-data.borders.x1-data.borders.x2)/historyLength);
      var val = data.sharpness.previous[i]/data.sharpness.max;
      val = val<1?val>0?val:0:1;
      var y = (canvas.height-data.borders.y1)-(canvas.height-data.borders.y1-data.borders.y2)*(val);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#F00";
    ctx.fillStyle = "#F00";
    ctx.stroke();
    ctx.fillText("Sharpness // " + Math.round(f.perceptualSharpness*10000)/10000, data.borders.x1, canvas.height-(data.borders.y1-40));

    //Spectral Rolloff
    ctx.beginPath();
    for(var i = 0; i < historyLength; i++){
      var x = data.borders.x1+(i*(canvas.width-data.borders.x1-data.borders.x2)/historyLength);
      var val = data.rolloff.previous[i]/data.rolloff.max;
      val = val<1?val>0?val:0:1;
      var y = (canvas.height-data.borders.y1)-(canvas.height-data.borders.y1-data.borders.y2)*(val);
      i==0?ctx.moveTo(x, y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#0CF";
    ctx.fillStyle = "#0CF";
    ctx.stroke();
    ctx.fillText("Rolloff // " + Math.round(f.spectralRolloff*10000)/10000, data.borders.x1, canvas.height-(data.borders.y1-60));

    //Borders
    ctx.strokeStyle = "#CCC";
    ctx.beginPath()
    ctx.moveTo(data.borders.x1,data.borders.y2);
    ctx.lineTo(data.borders.x1,canvas.height-data.borders.y1);
    ctx.lineTo(canvas.width-data.borders.x2,canvas.height-data.borders.y1);
    ctx.lineTo(canvas.width-data.borders.x2,data.borders.y2);
    ctx.lineTo(data.borders.x1,data.borders.y2);
    ctx.stroke();
  });
});
