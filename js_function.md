       
# JS - function 

## 함수표현식 (Function Literal)
```
/anonymous function expression
var foo = function() {
    console.log('hello');
};

//named function expression
var foo = function foo() {
    console.log('hello');
};

// self invoking function expression
(function foo() {
    console.log('hello');
})();
```

함수정의 코드 

## named function expression (기명 함수 표현식 )
```
	var add = function add(a , b){
		 return a + b ;
	};

```


## anonymous function(익명함수) / unanmed function(무명 함수 표현식) / funtcion expression  <--- 쉽고 간결 

```

	//함수표현식 ( 익명함수 )
	var add = function(a , b){
		 return a + b ;
	};

```


```
	var findNodes = function(callback){
		var i = 10000,
			nodes =[],
			found;

		if(typeof callback !== "function"){

			calback = false;
		}	

		while(i){

			i -= 1;

			if(callback){
				callback(found);
			}

			node.push(found);
		}	

		return nodes
	};


	var hide = function(node){
			
			node.style.display = "none";

		
	};


	findeNodes( hide );
```
```
var newobj = {
  var1: true,
  var2: "very interesting",

  method1: function () {
    alert(this.var1)
  },

  method2: function () {
    alert(this.var2)
  }
};

newobj.method1();
newobj.method2();

```

## 함수 선언

```
	function foo(){
		// 함수 본문
	}
```
