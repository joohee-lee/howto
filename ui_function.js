
//함수 선언
function area( width, height){

  return width * height;

 }

//함수 표현식

var area = function(width, height){

  return width * height;

};

var size = area(10, 10);


// 즉시
var area = (function(){

  var width = 3;
  var height = 3;
  return width * height;

}());
