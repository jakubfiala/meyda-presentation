//jakubs stuff

//LOUDNESS
var agendaContainer = $("#agenda").parent().parent();
agendaContainer.append('<canvas id="loudnessCanvas" class="wholeSlideCanvas">');
var loudnessCanvas = $("#loudnessCanvas")[0];
loudnessCanvas.width = scaler.width();
loudnessCanvas.height = scaler.height();
var loudnessCtx = loudnessCanvas.getContext('2d');


var displayLoudness = function(f) {
  if (agendaContainer.parent().parent().hasClass("remark-visible")) {

    loudnessCtx.clear();

    var maxValue = 0;
    var maxIndex = 0;

    loudnessCtx.fillStyle = "#ddd";

    for (var i = 0; i < f.loudness.specific.length; i++) {
      if (f.loudness.specific[i] > maxValue) {
        maxValue = f.loudness.specific[i];
        maxIndex = i;
      }
      loudnessCtx.fillRect(i*loudnessCanvas.width/24+2,loudnessCanvas.height-f.loudness.specific[i]*100,loudnessCanvas.width/24-2,loudnessCanvas.height);
    }

    loudnessCtx.font = "14px Courier New";
    loudnessCtx.fillText("BARK BAND LOUDNESS // Loudest band number: " + maxIndex, loudnessCanvas.width-400, loudnessCanvas.height-150);

    loudnessCtx.fillStyle = "#f00";

    loudnessCtx.fillRect(maxIndex*loudnessCanvas.width/24+2,loudnessCanvas.height-f.loudness.specific[maxIndex]*100,loudnessCanvas.width/24-2,loudnessCanvas.height);

  }
}

callbacks.push(displayLoudness);


//BUFFER
var thanksContainer = $("#thanks-").parent().parent();
thanksContainer.append('<canvas id="bufferCanvas" class="wholeSlideCanvas">');
var bufferCanvas = $("#bufferCanvas")[0];
bufferCanvas.width = scaler.width();
bufferCanvas.height = scaler.height();
var bufferCtx = bufferCanvas.getContext('2d');

var displayBuffer = function(f) {
  if (thanksContainer.parent().parent().hasClass("remark-visible")) {
    bufferCtx.clear();

    bufferCtx.fillStyle = "#ddd";

    f.buffer = meyda.windowing(f.buffer, "hamming");

    $.each(f.buffer, function(i, v) {
      var ysize = (v) * (600) / ( 2.0);
      var xsize = i * 500 / f.buffer.length;
      bufferCtx.fillRect(xsize + 500, 400/2-ysize+200,4,ysize);
    });

    bufferCtx.font = "14px Courier New";
    bufferCtx.fillText("BUFFER // hamming window", loudnessCanvas.width-400, loudnessCanvas.height-100);

  }
}

callbacks.push(displayBuffer);