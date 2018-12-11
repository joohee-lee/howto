       
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

