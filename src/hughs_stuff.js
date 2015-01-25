$(document).ready(function(){
  $('#features').parent().append('<canvas id="specvis" style="z-index:-1;" class="wholeSlideCanvas" ></canvas>');
  $('#features').parent().parent().append('<div style="position: absolute;height:306px;width:460px;top:75px;left:675px;z-index:2;background: -moz-linear-gradient(left,  rgba(51,51,51,0) 0%, rgba(51,51,51,1) 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(51,51,51,0)), color-stop(100%,rgba(51,51,51,1))); /* Chrome,Safari4+ */background: -webkit-linear-gradient(left,  rgba(51,51,51,0) 0%,rgba(51,51,51,1) 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(left,  rgba(51,51,51,0) 0%,rgba(51,51,51,1) 100%); /* Opera 11.10+ */background: -ms-linear-gradient(left,  rgba(51,51,51,0) 0%,rgba(51,51,51,1) 100%); /* IE10+ */background: linear-gradient(to right,  rgba(51,51,51,0) 0%,rgba(51,51,51,1) 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#00000000", endColorstr="#a6000000",GradientType=1 ); /* IE6-9 */"></div>');
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
      x1:675,
      x2:75,
      y1:300,
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

    console.log(canvas.width-data.borders.x2-data.borders.x1);
    console.log(canvas.height-data.borders.y2-data.borders.y1);
  });
});
