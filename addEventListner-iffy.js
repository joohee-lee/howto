/* 즉시 실행 함수로 addEvent 등록 */
var addEvent = (function(window){

	if (window.attachEvent){
   		
   		return function ( element, eventName, cb) { element.attachEvent("on" + eventName, cb); }; 
	
	}else{
   	
   		return function ( element, eventName, cb, isCapture) { element.addEventListener(eventName, cb, isCapture); }; 
   	
   	}
 
}(window));


//https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick
/*
http://unikys.tistory.com/312
빠른 개발, 단순한 기능, 보안상 중요하지 않은 기능, 라이브러리를 이용 안한다면 inline 또는 onload와 같이 속성을 통해 직접 이벤트 등록
복잡한 기능, 안전하고 보안이 필요한 기능, 다수의 라이브러리를 활용하는 페이지 또는 라이브러리를 개발하고자 한다면 addEventListener 또는 attachEvent 함수를 활용
하지만 정식 스펙인 addEventListener를 사용하는 것을 습관화 들이면 좋을 것이다
*/

/*
var a = document.getElementById("link");
a.addEventListener('click',function(e){
   e.preventDefault(); // Cancel the native event
   e.stopPropagation();// Don't bubble/capture the event
}, false);

*/