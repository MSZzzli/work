var s = window.screen;
var width = q.width = s.width;
var height = q.height = s.height;
var letters = Array(256).join(1).split('');
var draw = function () {
  q.getContext('2d').fillStyle='rgba(0,0,0,0.3)';
  q.getContext('2d').fillRect(0,0,width,height);
  q.getContext('2d').fillStyle='white';
  letters.map(function(y_pos, index){
    text = Math.floor(Math.random()*(2));
    x_pos = index * 10;
    q.getContext('2d').fillText(text, x_pos, y_pos);
    letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
  });
};
setInterval(draw, 30);

