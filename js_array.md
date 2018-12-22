
# js - Array


## Array 선언 

```
var arrNumber = new Array();
var arrNumber = new Array( 'a', 'b','c','d');
var arrNumber = [1,2,3,4];

```

## Array 에 값 넎은 법 

```
var arrNumber = new Array(); //배열선언 

arrNumber[0] = 1;
arrNumber[1] = 2;
arrNumber[2] = 3;
arrNumber[3] = 4;
arrNumber[4] = 5;


for (var i=0; i < 5; i++){

	arrNumber[i] = i;
}

```

## Array 출력 
```
	var arrNumber = [];

	//초기화
	for(var i=0; i < 5; i++ ){
		
		arrNumber[i] = i;
	}

	for(var i=0; arrNumber.length; i++){

		document.write(arrNumber[i] +'<br>')
	}
```

## 자바스크립트 배열의 다양한 함수 소개 및 사용법

### 1. push  / 추가 

```
var example = new Array("a", "b", "c");
example.push("d");

document.write(example);
//결과값 a,b,c,d

```

### 2. pop  / 배열의 마지막 주소에 있는 값을 제거해주는 함수. 
```
var example = new Array("a", "b", "c");
example.pop();

document.write(example);
```


### 3. shift / 배열의 첫번째 주소에 있는 값을 제거하여 반환해주는 함수. 
```
var example = new Array("a","b","c");
example.shift();

document.write(example);

```


### 4. length - 배열의 길이를 반환해주는 함수
```
var example = new Array("a", "b", "c");

document.write(example.length);
//결과값 3

```


### 5. concat -  두개의 배열을 합쳐주는 기능을 하는 함수

```
var example = new Array("a", "b", "c");
var example2 = new Array("d","e","f");

example = example.concat(example2);
document.write(example);
//결과값 a,b,c,d,e,f

```

### 6. join -  배열값 사이에 원하는 문자를 삽입

```
var example = new Array("a", "b", "c");

example = example.join("/");

document.write(example);

//결과값 a/b/c

```

### 7. reverse를 사용하면 배열을 역순으로 재배치 

```
var example = new Array("a", "b", "c");
example.reverse();

document.write(example);

//결과값 c,b,a

```


### 8. reverse를  사용하면 배열을 정렬

```
var example = new Array(1,4,2,3,5);
example.sort();

document.write(example);
//결과값 1,2,3,4,5

```


### 9. slice는 배열의 일부분을 반환하는 함수

```
var example = [1, 2, 3, 4];
var example2 = example. slice(0, -1);

document.write(example);
document.write("<br/>");

example2 = example. slice(-2);
document.write(example2);

//결과값
//1,2,3,4
//3,4

```

### 10. splice는 배열값을 추가하거나 제거하여 반환해주는 함수

```
var example = ["a", "b", "c", "d"];
var example2 = example.splice(1, 2);

document.write(example);
document.write("<br/>");
document.write(example2)

//결과값
//a,d
//b,c

```

### 


