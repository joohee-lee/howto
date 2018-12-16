var UI = (function(){
	var initHandle = function(){

        /**
         * oldBrowser Check
         * */

        //toggleMenu
		var first = false;
        $(document).on('click', '.kb-icon .more', function(){

            //iconShowMore
            if ($('html').hasClass('ie7')) {
                if($(this).find('span').hasClass('close')){
                    $('.kb-icon .more span').removeClass('close');
                    $('.kb-icon .more span').text('더보기');
                    $('.kb-icon .second > li').hide();
                    $('.kb-icon .second').slideUp(400);
                }else{
                    $('.kb-icon .more span').addClass('close');
                    $('.kb-icon .more span').text('접기');
                    $('.kb-icon .second').slideDown(400, function(){
                        $('.kb-icon .second > li').show();
                    });
                }
            }else{
                if($(this).find('span').hasClass('close')){
                    $('.kb-icon .more span').removeClass('close');
                    $('.kb-icon .more span').text('더보기');
                    $('.kb-icon .second').slideUp(400);
                }else{
                    $('.kb-icon .more span').addClass('close');
                    $('.kb-icon .more span').text('접기');
                    $('.kb-icon .second').slideDown(400, function(){
                        $('.kb-icon .second > li').show();
                    });
                    if(!first){
                        first = true;
                        TweenMax.from('.ico7', 0.5, {y:-40, opacity:0, delay:0,ease:Back.easeOut.config(1.7)});
                        TweenMax.from('.ico8', 0.5, {y:-40, opacity:0, delay:0.2,ease:Back.easeOut.config(1.7)});
                        TweenMax.from('.ico9', 0.5, {y:-40, opacity:0, delay:0.4,ease:Back.easeOut.config(1.7)});
                        TweenMax.from('.ico10', 0.5, {y:-40, opacity:0, delay:0.6,ease:Back.easeOut.config(1.7)});
                        TweenMax.from('.ico11', 0.5, {y:-40, opacity:0, delay:0.8,ease:Back.easeOut.config(1.7)});
                        TweenMax.from('.ico12', 0.5, {y:-40, opacity:0, delay:1,ease:Back.easeOut.config(1.7)});
                    }
                }
            }

		});
	};
	/**
	* UI.Slider
	* */
	var Slider = function(){
        var mainKeyVisual = function(){
            $('.mainVisual .box .kv').css('margin','0 21.5px');
            $('.mainVisual .innerWrap').css('position','relative');
            var wrapperW = (940 * 5) + 215; // 43 = margin
            var hiddenSpace;
            var winW;
            var prevAniEnded=true;

            var _timer = null,
                interval = 7000,
                value = 0;

            if (_timer !== null) return;
            _timer = setInterval(function () {
                goNextSlide();
            }, interval);

            var setVisualPosition = function (){
                winW = window.innerWidth || $(window).width();
                hiddenSpace = Math.abs( wrapperW - winW )/2 +8;

                if(winW > 1030){
                    if(winW < wrapperW ){
                        $('.mainVisual .kvArea .box').css('margin-left', -hiddenSpace);
                    }else{
                        $('.mainVisual .kvArea .box').css('margin-left', -hiddenSpace);
                    }
                }else{
                    $('.mainVisual .kvArea .box').css('margin-left', '-1945px');
                }
            };
            setVisualPosition();
            $(document).ready(function(){
                setVisualPosition();
                showVideo();
            });
            $(window).on('load resize', function(){
                setVisualPosition();
                showVideo();
            });
            
            var gapX = 983 ;
            if ($('html').hasClass('ie7')) {
                gapX = 983 - 25;
            }else{
                gapX = 983;
            }
            var ie7Gap = '25px';
            var mainVisualIdx=0;
            
            var here = $('.box .innerWrap .kv.here');
            var vid = null;
            
            var getPaging = function(kbIdx){
            	$('.box .innerWrap .kv').removeClass('here');
            	if(kbIdx == undefined) 
            		$('.box .innerWrap .kv').eq(3).addClass('here');
            	else 
            		$('.box .innerWrap .kv').eq(kbIdx).addClass('here');
                
                mainVisualIdx = $('.box .innerWrap .kv.here').attr("data-index");
                $('.mainVisual .paging a').removeClass('selected');
                $('.mainVisual .paging a').eq(mainVisualIdx).addClass('selected');
                $('.mainVisual .kvButton p').hide();
                $('.mainVisual .kvButton p').eq(mainVisualIdx).show();
            };
            
            var showVideo = function(){
                if (!$('html').hasClass('ie7') && !$('html').hasClass('ie8')) {
                	here = $('.box .innerWrap .kv.here');
                	if(here.find("video").length > 0) {
                		vid = document.getElementById(here.find("video:eq(0)").attr("id"));
                		vid.addEventListener('loadedmetadata',function() {vid.currentTime = '0';}, false);
                		if(vid.readyState > 0)
                			vid.currentTime = '0';
                		if(vid != null)
                			vid.play();
                	}
                	else {
                		if(vid != null)
                			vid.pause();
                	}
                	
                }
            };
            
            var goNextSlide = function(){
                $(".innerWrap").stop().animate({
                    "left": (-gapX ) + "px"
                }, 500, 'easeInOutQuad', function(){

                    $(".mainVisual .innerWrap .kv").first().appendTo(".mainVisual .innerWrap");
                    if ($('html').hasClass('ie7')) {
                        $(".mainVisual .innerWrap").css("left",ie7Gap);
                    }else{
                        $(".mainVisual .innerWrap").css("left","0px");
                    }

                });
                getPaging();
                showVideo();
            };

            var goFarNextSlide = function(){
                $(".innerWrap").stop().animate({
                    "left": (-gapX * 2) + "px"
                }, 500, 'easeInOutQuad', function(){

                    $(".mainVisual .innerWrap .kv").eq(0).appendTo(".mainVisual .innerWrap");
                    $(".mainVisual .innerWrap .kv").eq(0).appendTo(".mainVisual .innerWrap");
                    if ($('html').hasClass('ie7')) {
                        $(".mainVisual .innerWrap").css("left","8px");
                    }else{
                        $(".mainVisual .innerWrap").css("left","0px");
                    }
                });
                getPaging();
                showVideo();
            };
            var goFarPrevSlide = function(){
                $(".mainVisual .innerWrap .kv").eq(5).prependTo(".mainVisual .innerWrap");
                $(".mainVisual .innerWrap .kv").eq(5).prependTo(".mainVisual .innerWrap");
                $(".innerWrap").css("left",(-gapX *2)+"px");
                prevAniEnded=false;

                if ($('html').hasClass('ie7')) {
                    $(".innerWrap").stop().animate({
                        "left": ie7Gap
                    }, 500, 'easeInOutQuad', function(){
                        prevAniEnded=true;
                    });
                }else{
                    $(".innerWrap").stop().animate({
                        "left": "0px"
                    }, 500, 'easeInOutQuad', function(){
                        prevAniEnded=true;
                    });
                }
                getPaging();
                showVideo();

            };
            $(".mainVisual .ico_right").click(function() {
                goNextSlide();
                $('.mainVisual .btn_pause').hide();
                $('.mainVisual .btn_play').show();
                clearInterval(_timer);
                _timer = null;
                return false;
            });

            $(".mainVisual .ico_left").click(function() {

                $(".mainVisual .innerWrap .kv").last().prependTo(".mainVisual .innerWrap");
                $(".innerWrap").css("left",(-gapX)+"px");
                prevAniEnded=false;

                if ($('html').hasClass('ie7')) {
                    $(".innerWrap").stop().animate({
                        "left": ie7Gap
                    }, 500, 'easeInOutQuad', function(){
                        prevAniEnded=true;
                    });
                }else{
                    $(".innerWrap").stop().animate({
                        "left": "0px"
                    }, 500, 'easeInOutQuad', function(){
                        prevAniEnded=true;
                    });
                }
                $('.mainVisual .btn_pause').hide();
                $('.mainVisual .btn_play').show();
                getPaging(2);
                showVideo();

                clearInterval(_timer);
                _timer = null;
                
                return false;
            });

            $('.mainVisual .btn_pause').on('click', function(){
                $(this).hide();
                $('.mainVisual .btn_play').show();
                clearInterval(_timer);
                _timer = null;
                return false;
            });

            $('.mainVisual .btn_play').on('click', function(){
                $(this).hide();
                $('.mainVisual .btn_pause').show();
                if (_timer !== null) return;
                _timer = setInterval(function () {
                    goNextSlide();
                }, interval);
                return false;
            });

            $('.mainVisual .indi').on('click', function(){
                clearInterval(_timer);
                _timer = null;
                var _current = $('.mainVisual .indi.selected').index();
                var _idx = $(this).index();
                
                if(_idx > _current){
                    var gap = _idx - _current;
                    if(gap == 1){
                        $(".mainVisual .ico_right").trigger('click');
                    }else{
                        goFarNextSlide();
                        getPaging(4);
                    }
                }else if(_idx < _current){
                    var gap = _current - _idx;
                    if(gap == 1){
                        $(".mainVisual .ico_left").trigger('click');
                    }else{
                        goFarPrevSlide();
                        getPaging(2);
                    }
                }
                $('.mainVisual .btn_pause').hide();
                $('.mainVisual .btn_play').show();
                showVideo();
                return false;
            });
            
            //접근성
            $('.mainVisual .indi').on('focus', function(e){
            	//stopAutoPlay
            	clearInterval(_timer);
                _timer = null;	
                $('.mainVisual .btn_pause').hide();
                $('.mainVisual .btn_play').show();
            
                //moveSlide
                var _current = $('.mainVisual .indi.selected').index();
                var _idx = $(this).index();
                
                if(_idx > _current){
                    var gap = _idx - _current;
                    if(gap == 1){
                        $(".mainVisual .ico_right").trigger('click');
                    }else{
                        goFarNextSlide();
                        getPaging(4);
                    }
                }else if(_idx < _current){
                    var gap = _current - _idx;
                    if(gap == 1){
                        $(".mainVisual .ico_left").trigger('click');
                    }else{
                        goFarPrevSlide();
                        getPaging(2);
                    }
                }
            });
            
            var j;
            var cnt;
            $('.mainVisual .indi').on('keydown', function(e){
            	
            	cnt = $(this).index() + 1;
            	if(e.which == 13){
            		e.preventDefault();
            		j = $("#"+$('.mainVisual .kvButton p:nth-child('+cnt+')').attr('id')).find("a:eq(0)");
        			j.focus();	
            	}            	
            });
        };
        mainKeyVisual();
	};

    /**
     * Icon.Move
     * */
    var iconMotion = function(){

        var ico1 = $('.ico1 .m1'), ico2_1 = $('.ico2 .m1'), ico2_2 = $('.ico2 .m2'), ico3 = $('.ico3 .m1'), ico4 = $('.ico4 .m1'),
            ico5_1 = $('.ico5 .m1'), ico5_2 = $('.ico5 .m2'), ico6 = $('.ico6 .m1'), ico7_1 = $('.ico7 .m1'), ico7_2 = $('.ico7 .m2'),
            ico8 = $('.ico8 .m1'), ico9_1 = $('.ico9 .m1'), ico9_2 = $('.ico9 .m2'), ico9_3 = $('.ico9 .m3'), ico10 = $('.ico10 .m1'),
            ico11 = $('.ico11 .m1'), ico12 = $('.ico12 .m1');

        $('.ico1').mouseenter(function(){
            TweenMax.to(ico1, 0.5, {bezier:{type:'quadratic',  values:[/*p1*/{x:0, y:0},{x:5, y:0},{x:5, y:5},  /*p2*/{x:5, y:10},{x:0, y:10},  /*p3*/{x:-5, y:10},{x:-5, y:5},  /*p4*/{x:-5, y:0},{x:0, y:0}]}/*bezier end*/, ease:Linear.easeNone});
        });
        $('.ico2').mouseenter(function(){
            TweenMax.from(ico2_1, 0.5, {x:-20, ease:Back.easeOut.config(1.7)});
            TweenMax.from(ico2_2, 0.5, {x:20, ease:Back.easeOut.config(1.7)});
        });
        $('.ico3').mouseenter(function(){
            TweenMax.from(ico3, 0.7,  {y:15, ease: Elastic.easeOut.config(1, 0.3)});
        });
        $('.ico4').mouseenter(function(){
            TweenMax.from(ico4, 1, { x:-20,ease: Power2.easeOut});
        });

        ico5_2.show();
        TweenMax.to(ico5_2, 0, { rotation:0, opacity:0,  ease: Power2.easeOut});

        var reset = function(){
            TweenMax.to(ico5_1, 0.5, { rotation:0, opacity: 1, ease: Expo.easeOut});
            TweenMax.to(ico5_2, 0.5, { rotation:0, opacity: 0, ease: Expo.easeOut});
        };

        $('.ico5').mouseenter(function(){
            TweenMax.to(ico5_1, 0.5, { rotation:180, opacity:0, ease: Expo.easeOut});
            TweenMax.to(ico5_2, 0.5, { rotation:180, opacity:1,  ease: Expo.easeOut, onComplete:reset});
        });

        $('.ico6').mouseenter(function(){
            TweenMax.from(ico6, 1, { x:-15, ease: Elastic.easeOut.config(1, 0.4)});
        });

        $('.ico7').mouseenter(function(){
            TweenMax.from(ico7_1, 0.5, {x:-20, ease:Back.easeOut.config(1.7)});
            TweenMax.from(ico7_2, 0.5, {x:20, ease:Back.easeOut.config(1.7)});
        });

        $('.ico8').mouseenter(function(){
            //TweenMax.from(ico8, 0.5, {y:-15, ease: Bounce.easeOut});
            TweenMax.from(ico8, 0.5, {clip:"rect(0px 0px 15px 0px)"});
        });


        $('.ico9').mouseenter(function() {
            TweenMax.from(ico9_1, 0.3, {y:-10, ease: Back.easeOut.config(1.7)});
            TweenMax.from(ico9_2, 0.3, {y:-10,opacity:0, delay:0.2, ease: Back.easeOut.config(1.7)});
            TweenMax.from(ico9_3, 0.3, {y:-10,opacity:0, delay:0.4, ease: Back.easeOut.config(1.7)});
        });

        $('.ico10').mouseenter(function(){
            TweenMax.to(ico10, 0.5, {bezier:{type:'quadratic',  values:[/*p1*/{x:0, y:0},{x:5, y:0},{x:5, y:5},  /*p2*/{x:5, y:10},{x:0, y:10},  /*p3*/{x:-5, y:10},{x:-5, y:5},  /*p4*/{x:-5, y:0},{x:0, y:0}]}/*bezier end*/, ease:Linear.easeNone});
        });

        $('.ico11').mouseenter(function(){
            TweenMax.from(ico11, 0.7, { y:-15, ease: Bounce.easeOut});
        });

        $('.ico12').mouseenter(function(){
            TweenMax.from(ico12, 0.7, { y:-15, ease: Circ.easeOut});
        });
    };

    var icoSet =function(){
        TweenMax.from('.ico1', 0.5, {y:40, opacity:0, delay:0.5,ease:Back.easeOut.config(1.7)});
        TweenMax.from('.ico2', 0.5, {y:40, opacity:0, delay:0.7,ease:Back.easeOut.config(1.7)});
        TweenMax.from('.ico3', 0.5, {y:40, opacity:0, delay:0.9,ease:Back.easeOut.config(1.7)});
        TweenMax.from('.ico4', 0.5, {y:40, opacity:0, delay:1.1,ease:Back.easeOut.config(1.7)});
        TweenMax.from('.ico5', 0.5, {y:40, opacity:0, delay:1.3,ease:Back.easeOut.config(1.7)});
        TweenMax.from('.ico6', 0.5, {y:40, opacity:0, delay:1.5,ease:Back.easeOut.config(1.7)});
    };

    var fontSize = function(){
        var section ;
        var factor = 0.95;
        var sizeUp = 0;

        section = $('.mainContent').find('.fontSize');
        function getFontSize(el)
        {
            var fs = parseFloat($(el).css('font-size'), 10);
            if(!el.originalFontSize)el.originalFontSize =fs;
            return fs;
        }
        function setFontSize(fact){
            section.each(function(){
                var newsize = fact ? getFontSize(this) * fact : this.originalFontSize;
                if(newsize) $(this).css('font-size', newsize);
            });
        }

        function resetFont(){
            setFontSize();
        }
        function increaseFont() {
            sizeUp = sizeUp + 1;
            if(sizeUp < 5){
                setFontSize(1 / factor);
            }else{
                alert(' 최대 사이즈 입니다 ');
            }
        }

        $('.viewPoint .big').on('click', function(){
            increaseFont();
            return false;
        });
        $('.viewPoint .defualt').on('click', function(){
            sizeUp = 0;
            resetFont();
            return false;
        });
    };

    return {
		initHandle : initHandle,
		Slider : Slider,
		icoSet : icoSet,
		iconMotion : iconMotion,
        fontSize : fontSize
	};
})();

$(function(){
    if($('.mainVisual').length>0){
        UI.initHandle();
        UI.Slider();
    }

	$(document).ready(function(){
        if($('.mainVisual').length>0) {
            if (!$('html').hasClass('ie7')) {
                UI.iconMotion();
                UI.icoSet();
                UI.fontSize();

                $('.card1 a').mouseenter(function () {
                    var _thisCircle1 = $(this).find('.circle');
                    TweenMax.to(_thisCircle1, 1.2, {scale: 700, opacity: 0.3, ease: Back.easeOut.config(1.7)});
                });
                $('.card2 a').mouseenter(function () {
                    var _thisCircle2 = $(this).find('.circle');
                    TweenMax.to(_thisCircle2, 1.2, {scale: 700, opacity: 0.3, ease: Back.easeOut.config(1.7)});
                });
                $('.card1 a').mouseleave(function () {
                    var _thisCircle1 = $(this).find('.circle');
                    TweenMax.to(_thisCircle1, .3, {scale: 1, ease: Expo.easeOut});
                });
                $('.card2 a').mouseleave(function () {
                    var _thisCircle2 = $(this).find('.circle');
                    TweenMax.to(_thisCircle2, .3, {scale: 1, ease: Expo.easeOut});
                });

                TweenMax.to('.animation-element', 0, {y: 50, opacity: 0, ease: Expo.easeOut});
                TweenMax.to('.card1', 1.5, {y: 0, delay: 1, opacity: 1, ease: Expo.easeOut});
                TweenMax.to('.card2', 1.5, {y: 0, delay: 1.3, opacity: 1, ease: Expo.easeOut});
                TweenMax.to('.card3', 1.5, {y: 0, delay: 1.6, opacity: 1, ease: Expo.easeOut});

                TweenMax.to('.info1', 1.5, {y: 0, delay: 1.9, opacity: 1, ease: Expo.easeOut});
                TweenMax.to('.info2', 1.5, {y: 0, delay: 2.2, opacity: 1, ease: Expo.easeOut});
                TweenMax.to('.info3', 1.5, {y: 0, delay: 2.5, opacity: 1, ease: Expo.easeOut});

                $('.ico8 .m1').css({
                    'clip': 'rect(0px 15px 15px 0px)',
                    'width': '15px',
                    'height': '15px',
                    'position': 'absolute',
                    'top': '40px',
                    'left': '19px'
                });
            } else {
                $('.kb-icon .second').css('height', '120px');
                $('.kb-icon .second').css('display', 'none');
            }
        }
        $('.viewPoint > .search').on('click', function(){
            $(this).hide();
            $('.viewPoint .searchBox').show();
            return false;
        });
        
        
        //접근성
        $(".header .lnb > li > a").each(function(){
        	$(this).bind({ //0329
        		'focus' :function(e){
        			 $('.header .allMenu').hide();
        			 $(".header .lnb > li > a").removeClass('selected');
        			 $(this).addClass('selected');
        			 $(this).parent().find('.allMenu').show();
        		}
        	});
        	
        });
        
        $('.memArea a, .header h1 > a').focus(function(){
        	$(".header .lnb > li > a").removeClass('selected');
        	$('.header .allMenu').hide();
        })
    });
	
	$(document).on('mouseenter', '.lnb > li', function(){
		$('.lnb > li > a').removeClass('selected');
		$('.allMenu').hide();
		$(this).find('> a').addClass('selected');
		$(this).find('.allMenu').show();
	});
	
	$(document).on('mouseleave','.lnb > li, .allMenu', function(){
		$('.lnb > li > a').removeClass('selected');
		$('.allMenu').hide();
	});
	
	
	
	
	
});

