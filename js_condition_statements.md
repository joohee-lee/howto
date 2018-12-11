       
# JS - condition statemets

## 비교 연산자 
- == ('반갑습니다' == '또만나요' false / "반값습니다" == "반갑습니다" true)
- === ( '3' === 3 false) ( '3' === '3' true)
- !=  ( 서로 다른 값을 갖는지 ) ( '반갑습니다' !=  '또만나요' true / "반값습니다" == "반갑습니다" false)
- !== (두 값의 데이터 타입과 값이 모두 불일치 하면 true) ( 3 !== '3' true. /'3' === '3' false )
- > ~ 보다 크다
- < ~ 보다 작다
- >= ~ 보다 크거나 같다
- <= ~ 보다 작거나 같다 


## 논리연산자  (둘 이상의 비교 연산자의 결과를 비교하기 위해 사용.)


- &&  (AND)

```
((5 < 2]) && (2 >= 3))  false
((5 > 2]) && (2 <= 3))  true

true && true  = true
false && true = false
true && false = false
false && false = false


```

- || ( OR )
```
	true || true = true
	true || false = true
	false || true = true
	false || false = false

```

- ! 논리부정  - 하나의 불리언 값을 받아 그 반대의 값을 리턴 


```

!(2<1)  ---> true
!true ----> false
!false  ---> true

```


- if 구문 

```
	if (score >= 50) {  //함수가 true 일때, 

	
	//함수가 true 일때, 
	congratulate();
}
```


- if ... else 구문 
```
   if(score >= 50){

 		congratulate();

   }else{

   		encourage();
 }

 // 삼항연산자 

 var a = (score > 50) ? true : false ; 	
```


- switch 구문 

: switch 구문은 스위치 값이라고 부르는 변수와 함께 시작한다. 

```
	var msg;
	var level = 2;

	//메세지 결정

	switch(level){
		case 1:

			msg = "1. 메세지 "
			break

		case 2:

			msg="2. 세 단계중 .... "
            break();


        default : 
        	
        	msg = '3. 행운을 빕니다.' 
        	break();   


	} 

```


- type coercion ( 타입 강제 )

```
	'1' > 0 (문자열 1은 숫자 1로 변환될 수 있다. / true)
	string  -  문자 
	number -  숫자
	Boolean - true / false
	null - 빈값 
	undefined - 변수가 선언되긴 했지마 아무런 값도 대입되지 않은 상태. 

```
```
	false 로 취급 될 수 있는 값들 
	var highScore = false ;     // false
	var highScore = 0;          //숫자 0 
	var highScore = '';         //NaN ( Not a Number)
	var highScore = 10/'score'. //반값 
	var highScore; // 아직 값을 대입하지 않은 변수 

```
```
	true 로 취급 될 수 있는 값들 
	var highScore = ture ;     // true
	var highScore = 1;          //숫자 1 
	var highScore = 'carrot';         //내용을 가진 문자열
	var highScore = 10/5;          // 계산된 숫자
	var highScore = 'true';        // 문자열로 표혀된 true
	var highScore = '0';        // 문자열로 표현된 숫자 0
	         
	var highScore = 'false' // 문자열로 표혀된 false




```

## 동질성 및 존재 여부 검사 

```
	if (document.getElementByID('header')){

		// 요소가 존재함 : 필요한 작업 수행
	}else{

		//요소가 존재하지 않음 : 다른 작업을 수행 


## loop(루프)

- for / while / do while 

### for 
```
	for (var i=0; i < 10; i++){

		console.log(i);
	}

	// 초기화 / 조건 / 카운터수정 
```

### while

```
	var i = 1;
	var msg ='';

	while (i<10){

		msg += i + ' * 5 = '  + (i * 5) + '<br>';
		i++;
	} 

```


### do while 
```
	var i = 1;
	var msg = '';

	do{
			msg += i + ' * 5 = ' + ( i * 5 ) + ' <br> ' ;
			i++;


		}while (i < 1);
```





