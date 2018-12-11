       
# JS - event

## Event Handling 

### HTML 이벤트 핸들러 

```
 <a href="" onclick="hide()">click</a> 
```
- 이 방법은 권장하지는 않지만 운영이 쉽다고 생각함. 
- 빠른 개발, 단순한 기능, 보안상 중요하지 않은 기능, 
- 라이브러리를 이용 안한다면 inline 또는 onload와 같이 속성을 통해 직접 이벤트 등록



### 전통적인 DOM 이벤트 핸들러  / HTML 과 자바스크립트 분리. 

#### element.onevent = functionName;

- ex) 
```
next.onclick = next ;

function next(){
	
	current = current +1;

	if( current > elItemsCount ){

		current = 1;
	}

	setCurrent(current);

	return false;

}
```

### DOM2 이벤트 리스너 (event lintener) - ie8 에서 작동 되지 않음. 
- 하나의 이벤트로 여러개의 함수를 실행 할 수 있다. 

#### element.addEventListener('event', functionName [,불리언]); 
#### element.removeEventListener('event', functionName [,불리언]);

[, 불리언] --> capture 기능을 지정하며 일반적으로 false 를 사용한다. 

- ex1) 
```
function next(){
	current = current +1;

	if( current > elItemsCount ){

		current = 1;
	}

	setCurrent(current);

	return false;
}


var el = document.ElementById('btnNext');
el.addEventListener('click', next, false);
```

(이벤트 네이밍 줄때 "on" 을 생략 )

- ex2 ) 함수의 인수를 전달하여야 할 경우, 익명함수(anonymous funciton) 으로 감싼다. 

```
 el.addEventListner('click', function(){  chekUsername(5);  }, false);

```
#### addEventListener & attachEvent

```
if (el.addEventListener){
		
 	el.addEventListner('click', function(){  chekUsername(5);  }, false);

}else {
	
	el.attachEventListner('onclick', function(){  chekUsername(5);  }, false);
}

file - /ecommerce/ecom_banner-1-addEventListener.html
js - addEventListener-iffy.js
```

#### 이벤트 (캡쳐링, 버블링)
- 링크의 기본동작을 실행되지 않도록 한다. 

```
- preventDefault()

if(event.preventDefault){
	event.preventDefault();
}else{
	event.returnValue = false;
}

- stopPropagation();

if(event.stopPropagation){
	event.stopPropagation();
}else{
	event.cancelBubble = true;

}
```

- return flase;
:요소의 기본동작을 중단함과 동시에 이벤트가 버블링 되거나, 캡처링되는 것도 중단 할 수 있다. 
: 이 방법은 모든 브라우져에서 동작, 보편적으로 사용
: 그러나, 자바스크립트 해석기가 return false  구문을 만나게되면, 이후의 코드의 실행을 중단하고 함수를 호출한 문장의 다음 문장을 실행. 
: preventDefault() 사용하는것이 나을때도 있음 




#### 사용자 인터페이지 이벤트 
- load
- unload 
- error
- resize
- scroll

#### focus 와 blur 이벤트 

- focus
- blur
- focusin (파폭 x)
- focusout (파폭 x)

#### mouse 이벤트 

- click
	: 마우스 왼쪽 버튼을 클릭 의미. 
	: 터치환경  - 손가락으로 탭하는 동작은 마우스 왼쪽 버튼을 한번 클릭한 것과 동일하게 처리 
- dbclick
	: 터치환경  - 두번탭하는 동작은 마우스 왼쪽 버튼을 더블 클릭 
- mousedown
    : 사용자가 마우스 버튼을 누르는 동안에 발생하는 이벤트 
	: 터치환경 - touchstart 이벤트가 발생
- mouseup
 	: 터치환경 - touchend 이벤트가 발생
- mouseover
- mouseout
- mousemove 


#### 이벤트가 발생한 시점

- 스크린 : 모니터화면 전체 대상 
	: screenX , screenY

- 페이지 
	:pageX, pageY


- 클라이언트 
	:clientX, clientY 


#### 키보드 이벤트 
- e.keycode
- input
- keydown
- keypress
- keyup

#### 폼 이벤트 
- submit
- change
- input 







