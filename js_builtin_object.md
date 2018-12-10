       
# JS - Builtin 객체

- 브라우져 객체 모델 ( Window - document - History - location - Navigator - Screen)
- Dom 문서 객체 모델 (document Object Model)
- global 객체 (전역 자바스크립트 객체) - string / Number / Boolean - Date / Math / RegEx

# Builtin 객체 - window 객체 
## 주요 속성과 메소드 

- window.innerHeight - 창의 높이 (브라우져 창 테두리 및 사용자 인터페이스 부분은 제외)
- window.innerWidth - 창의 너비 (브라우져 창 테두리 및 사용자 인터페이스 부분은 제외)
- window.pageXOffset - 문선의 가로 스크롤 크기
- window.pageYOffset - 문서의 세로 스크롤 크기 
- window.screenX -  화면의 좌측 상단으로부터 현재 마우스 포인터의 X좌표 
- window.screenY - 화면의 좌측 상단으로부터 현재 마우스 포인터의 Y좌표 
- window.location - window 객체의 현재 URL (혹은 파일 경로)
- window.document -  현재 창에 로드된 페이지를 표현하는 document 객체 
- window.history - 현채 창이나 탭을 통해 로드 되었던 페이들의 상세 정보를 제공하는 history 객체에 대한 참조 
- window.history.length - 브라우저 창 또는 탭의 history 객체에 보관된 페이지의 수 
- window.screen - screen 객체에 대한 참조 
- window.screen.width - screen 객체에 접근하여 width 속성 값을 조회 (단위는 픽셀 )
- window.screen.height - screen 객체에 접근하여 height 속성 값을 조회 (단위는 픽셀)


## 메소드 
- window.alert();
- window.open();
- widndow.print();


# Builtin 객체 - document(DOM) 객체 

- document.title  - 현재 문저의 제목 
- document.lastModified - 현재 문서가 가장 마지막으로 수정된 날짜 
- document.URL - 현재 문서의 URL 을 문자열로 리턴한다. 
- doucment.domain  - 현재 문서의 도메인을 리턴한다. 


## 메소드 
- document.write()

### element 선택(selector)
- document.getElementById('id name');  
- documenet.getElementsByTagName('h1');
- document.getElementsByClassName('className');  ( IE9 / 파이어폭스3 / 크롬 이상  / 오페라9.5 / 사파리 )
- docuemnt.querySelectorAll('li[id]');
- docuemnt.querySelector('.hot'); (ie8 이상 / 파이어폭스 3.5 이상  / 오페라 10 이상 / 크롬 1 이상 / 사파리 3.2 이상)

var elItem = document.querySelectorAll('.item');

for(var i = 1; i > elItem.length ; i++){
	
	elItem[i].className = 'cool';
} 


- 하나의 element만 리턴  : getElementById() / querySelector() - css 선택자를 이용하여 일치하는 요소들 중 첫 번쨰 요소를 리턴. 
- 그외 나머지는 배열(NodeList)로 리턴


### element 조작

#### TextNode 접근 / 수정 
- nodeValue

#### HTML 내용 변경 
- innerHtml  / html + text 변경 
- textContent / text 변경 
- createElement()
- createTextNode()

#### HTML element attribute(특성) 값에 접근 / 변경 
- appendChild()
- removeCHild()
- hasAttribute() - attribute 존재 여부 
- getAttribute()  - attribute 가져오기
- setAttribute() - attribute 변경
- removeAttribute() - atrribute 삭제 

#### dom 탐색 
- parentNode 부모노드
- previousSibling 이전노드
- nextSibling 다음노드 


- firstChild 첫번째 노드 
- lastChild 마지막 노드 
- 공백노드 
	: previousSibling
	: nextSibling
	: firstChild
	: lastChild 
	: IE 를 제외한 대부분 브라우져들은 ㅇ소 사이의 공백 문자를 텍스트 노드로 취급, 아래의 속성들이 리턴하는 값은 브라우저에 따라 달라짐. 
    ( 브라우져의 차이점을 보완해주는 라이브러리 - 
    jquery )
 


# Builtin 객체 - global 객체 

## global 객체 - String 객체 

###  속성 or 메서드 
- var saying = "home sweet home "
- length  / saying.length / 16
- toUpperCase(); / saying.toUpperCase(); / HOME SWEET HOME
- toLowerCase(); / saying.toLowCase(); / home sweet home
- charAt(); / saying.charAt(12) / o
- indexof(); / saying.indexof('ee');  문자열 내에서 지정된 문자 혹은 문자 집합이 처음 발견된 곳의 인덱스 번호를 리턴 / 7
- lastIndexof(); / saying.lastindexof('e') : 문자열 내에서 지정된 문자 혹은 문자 집합이 마지막  발견된 곳의 인덱스 번호를 리턴 / 14
- subString(); / saying.substring(8, 14); et hom
- split(); / saying.split(' '); // 공백기준으로 문자열을 분리한 후, 분리된 문자열을 배열로 만들어 리턴 // (4) ["home", "sweet", "home", ""] 
- trim(); / saying.trim(); // 문자열의 양끝 공백 문자를 제거한 후 리턴 'home sweet home'
- repalce(); / saying.replace('me', 'w'); 'how sweet home'  // 첫번째 인수로 지정된 문자열을 처음 발견했을 때 한번만 실행. 


## global 객체 - Number 객체 

###  메서드 
- var orgNumber = 10.23456
- isNaN() - 숫자여부 체크 
- toFixed()  - 특정 소숫점자리를 반올림(결과는 문자열로 리턴)  orgNumber.toFixed(3); "10.235"
- toPrecision() - 자정된 자릿수까지만 반올림 ( 결과는 문자열로 리턴 ) orgNumber.toPrecision(3) "10.2"
- toExponential() - 숫자를 지수 표기법으로 변환한 문자열로 리턴.  orgNumber.toExponential(3) "1.023e+1"


## global 객체 - Math 객체  (수학 상수 및 함수를 위한 속성과 메서드를 제공 )

### 속성
- Math.PI  - PI 값을 리턴한다. 

### 메서드 
- Math.round() - 숫자를 가장 근접한 정수로 올림 / 내림한다. 
- Math.sqrt(n) - 양의 제곱근을 리턴한다. Math.sqrt(9)는 3을 리턴한다. 
- Math.ceil() - 지정된 숫자를 자신보다 큰 가장 가까운 정수로 올림한다. 
- Math.floor() - 지정된 숫자를 자신보다 작은 , 가장 가까운 정수로 내림한다. 
- Math.random() - 0, 1 사이의 임의의 숫자를 생성한다. 이때 0은 포함되지만 1은 포함되지 않는다. 


## global 객체 - Date 객체 - 날짜를 다루려면 먼저 Date 객체의 인스턴스를 생성해야 한다. 

- var today = new Date();

## 메서드 
- getDate() / setDate() - 해당월의 날짜(1일 ~ 31일 ) 사이를 리턴 / 지정한다. 
- getDay()
- getFullYear() / setFullYear()
- getHours() / setHours()
- getMilliseconds() / setMilliseconds()
- getMinutes() / setMinutes()
- getMonth() / setMonth()
- getSeconds() / setSeconds()
- getTime() / setTime()
- getTimezoneOffset()
- toDateString()
- toTimestring()
- toString()




