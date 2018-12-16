
//preventDefalut() - 브라우져의 기본동작을 막는다. 
// stopPropagation() - 이벤트가 상위노드로 전파되지 않게 중단 )

var myevent = {

	//..
	stop: function(e){

		e.preventDefalut();
		e.stopPropagation();
	}

};


var myevent = {

	stop: function(e){

		//IE 외 브라우져 
		if( typeof e.preventDefalut === "function"){
			e.preventDefault();
		}

		if( typeof e.stopPropagation === "function"){
			e.stopPropagation();
		}

		//IE
		if ( typeof e.returnValue === "boolean" ){
			e.returnValue = false;
		}

		if( typeof e.cancelBubble === "boolean" ){
			e.cancelBubble = true;	
		}

	}
};