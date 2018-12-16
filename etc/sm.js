/* **********************************************
 * �ㅼ엫�ㅽ럹�댁뒪 �앹꽦
*********************************************** */
;(function(window, $){
	'use strict';

	var global = "$utils", nameSpace = "SAMSUNGLIFE.utils", nameSpaceRoot = null;

	function createNameSpace(identifier, module){
		var win = window, name = identifier.split('.'), p, i = 0;
		if(!!identifier){
			for (i = 0; i < name.length; i += 1){
				if(!win[ name[ i ] ]){
					if(i === 0){
						win[ name[ i ] ] = {};
						nameSpaceRoot = win[ name[ i ] ];
					} else {
						win[ name[ i ] ] = {};
					}
				}
				win = win[ name[ i ] ];
			}
		}
		if(!!module){
			for (p in module){
				if(!win[ p ]){
					win[ p ] = module[ p ];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return win;
	}
	if(!!window[ global ]){
		throw new Error("already exists global!> " + global);
	}
	/* ---------------------------------------------------------------------------
		namespace SAMSUNGLIFE.utils

		* �ㅼ엫�ㅽ럹�댁뒪 �앹꽦
		* method namespace
		* memberof SAMSUNGLIFE.utils
		* param {Object} identifier 援щ텇��
		* param {Object} module �ㅼ엫�ㅽ럹�댁뒪 �섏쐞濡� �앹꽦 �� 媛앹껜
		* return createNameSpace
		* example

			$utils.namespace('a.b.c', {
				functionA: function(){
					console.log("call a!");
				},
				functionB: function {
					console.log("call b!");
				}
			});

			a.b.c.functionA(); // call a!
			a.b.c.functionB(); // call b!
	--------------------------------------------------------------------------- */
	window[ global ] = createNameSpace(nameSpace, {
		namespace : function(identifier, module){
			return createNameSpace(identifier, module);
		}
	});
})(window, jQuery);

var ui;
var sliderNotice;
/* **********************************************
 * SAMSUNGLIFE.common
*********************************************** */
;(function(window, $) {
	'use strict';

	ui = $utils.namespace('SAMSUNGLIFE.common', {
		/**
		 * ui script 珥덇린��
		 * @methods init
		 * @memberof SAMSUNGLIFE.common
		 */
		setPlaceholder : function(){
			$('.placeholder').each(function(){
				if($(this).val()!="") $(this).addClass("valueon");
				else $(this).removeClass("valueon");
			});
			$(document).on('focus click', 'input.placeholder, textarea.placeholder', function(){
				$(this).addClass("valueon");
			})
			.on('blur keyup change', 'input.placeholder, textarea.placeholder', function(){
				if($(this).val()=="") $(this).removeClass("valueon");
				else $(this).addClass("valueon");
			})
			.on('focus click', 'select', function(){
				$(this).parent('span').addClass("focus");
			})
			.on('blur', 'select', function(){
				$(this).parent('span').removeClass("focus");
			});

			$(document).on('click', '.form-wrap1 > label', function(){
				$('#'+$(this).attr('for')).focus();
			});
		},
		setTooltip : function(){
			/* �댄똻 : mouseover 諛� focus�� */
			$plugin.togglecon($('.tooltip-area:not(.ui-tip-click)'),{
				toggle_type : 'tooltip',
				selector_btn: '.icon-tip',
				selector_con: '.tooltip',
				event_btn : 'focus'
			});

			/* �댄똻 : click�� */
			$plugin.togglecon($('.ui-tip-click'),{
				toggle_type : 'tooltip',
				selector_btn: '.icon-tip',
				selector_con: '.tooltip',
				selector_close : '.ui-close'
			});

			/* �댄똻 : �ъ��섏슜 */
			$plugin.togglecon($('.ui-tip-wrapper'),{
				toggle_type : 'position',
				selector_btn: '.ui-tip-position',
				selector_con: '#href',
				event_btn : 'focus'
			});

			/* �댄똻 : �ъ��섏슜 */
			$plugin.togglecon($('.con-type1'),{
				toggle_type : 'position',
				selector_btn: '.ui-tip-position',
				selector_con: '#href',
				event_btn : 'focus'
			});
		},
		setFormCheck : function(){
			$('input:checked').prev('label').addClass('on');
			$('input:not(:checked)').prev('label').removeClass('on');

			$('input:disabled').prev('label').removeClass('on').addClass('disabled');
			$('input:not(:disabled)').prev('label').removeClass('disabled');

			$(document).on('click', 'input.radio, input.check', function(){
				var $that = $(this);
				if ($that.is('.check')) {
					if($that.prop('checked')) $that.prev().addClass('on');
					else $that.prev().removeClass('on');
				} else if ($that.is('.radio')) {
					$('input[name="'+ $that.attr('name') +'"]').each(function() {
						if (this == $that[0]) $(this).prev().addClass('on');
						else $(this).prev().removeClass('on');
					});

					if($that.parent('.label-star').length>0){
						$that.prevAll().addClass('on');
					}
				}
			})
			.on('focus', 'input.radio, input.check', function() {
				$(this).prev().addClass('focus');
			})
			.on('blur', 'input.radio, input.check', function() {
				$(this).prev().removeClass('focus');
			});
		},
		setViewMode : function(){
			$(document).on('click', '.label-mode .radio', function(){
				if($(this).val()=="thum"){
					$('.ui-list-mode').addClass('thum');
					$('.ui-list-mode').removeClass('list');
				}else{
					$('.ui-list-mode').addClass('list');
					$('.ui-list-mode').removeClass('thum');
				}
			});
		},
		setDatepicker : function(){
			$(".form-date").each(function(){
				var $that= $(this);
				var $buttonText = $that.find(">.hd-t").text();
				var todayYear = new Date().getYear()+1900;
				var calEndYear = todayYear+1;

				if($that.find("input").eq(0).hasClass('today')){
					$that.find("input").eq(0).datepicker({
						dateFormat : "yymmdd",
						minDate : new Date(new Date().setDate(new Date().getDate())),
						showOn: "button",
						showOtherMonths : true,
						showMonthAfterYear : true,
						showButtonPanel: true,
						changeYear : true,
						changeMonth : true,
						//yearSuffix : "��",
						yearRange : "1900 : "+ calEndYear,
						dayNamesMin : ['��','��','��','��','紐�','湲�','��'],
						monthNames : ['01��','02��','03��','04��','05��','06��','07��','08��','09��','10��','11��','12��'],
						monthNamesShort : ['01��','02��','03��','04��','05��','06��','07��','08��','09��','10��','11��','12��'],
						buttonText : $buttonText+" �щ젰�쇰줈 �좏깮<span></span>",
						maxDate: 14,
						onSelect : function(dateText, inst){
							//console.log(""+dateText+" "+inst);
						}
					});
				}else{
					$that.find("input").eq(0).datepicker({
						dateFormat : "yymmdd",
						showOn: "button",
						showOtherMonths : true,
						showMonthAfterYear : true,
						showButtonPanel: true,
						changeYear : true,
						changeMonth : true,
						//yearSuffix : "��",
						yearRange : "1900 : "+ calEndYear,
						dayNamesMin : ['��','��','��','��','紐�','湲�','��'],
						monthNames : ['01��','02��','03��','04��','05��','06��','07��','08��','09��','10��','11��','12��'],
						monthNamesShort : ['01��','02��','03��','04��','05��','06��','07��','08��','09��','10��','11��','12��'],
						buttonText : $buttonText+" �щ젰�쇰줈 �좏깮<span></span>",
						maxDate: 14,
						onSelect : function(dateText, inst){
							//console.log(""+dateText+" "+inst);
						}
					});
				}
				
				$('.ui-datepicker-trigger').css({
					'text-indent':'-9999em',
					'width':'38px',
					'height':'39px'
				}).find('span').css({
					'left':'2px',
					'top':'2px'
				});
				
				//Datepicker �붿궡�� �대룞
				$that.find("input").eq(0).datepicker().keydown(function(e){
					//e.preventDefault();
					//TAB : 9
					//LEFT : 37
					//UP : 38
					//RIGHT : 39
					//DOWN : 40	
					var code = e.keyCode || e.which;
					if(code >= 37 && code <= 40){
						//console.log(code);
						//e.preventDefault();
						/*var parts = $(this).val().split("/");
						var currentDate = new Date(parts[2], parts[0] - 1, parts[1]);
						switch(code){
							case 37: currentDate.setDate(currentDate.getDate() - 1); break;
							case 38: currentDate.setDate(currentDate.getDate() - 7); break;
							case 39: currentDate.setDate(currentDate.getDate() + 1); break;
							case 40: currentDate.setDate(currentDate.getDate() + 7); break;
						}
						if(currentDate != null){
							$(this).datepicker("setDate", currentDate);
						}else{
							return false;
						}*/
					}
				});
				
			});
		},
		scrollFixed : function(){
			var $base_position = 0;
			var $base_scroll = $('#header').height();
			var $base_height = 0;

			//fixed而⑦뀗痢� 湲곗� �ㅽ겕濡� 泥댄겕 : fixed而⑦뀗痢� �ㅽ��쇰�寃쎌슜
			if($('#uiNavFloat').length){
				$base_position = $('#uiNavFloat').offset().top;

				$(window).on('scroll',function(e){
					if($('#wrapper').hasClass('scrolling')){
						if($(window).scrollTop() <= $base_position){
							$('#wrapper').removeClass('scrolling');
						}
					}else{
						if($(window).scrollTop() >= $('#uiNavFloat').outerHeight() + $('#uiNavFloat').offset().top){
							$base_position = $('#uiNavFloat').offset().top;

							$('#wrapper').addClass('scrolling');
							$('#uiNavFloat').stop().css({'marginTop' : -$('#uiNavFloat').outerHeight()}).animate({
								marginTop : 0
							},500);
						}
					}
				});
			}
			//header 湲곗� �ㅽ겕濡� 泥댄겕 : �곷떒�쇰줈 �대룞 踰꾪듉��
			$(window).on('scroll',function(e){
				if($(window).scrollTop() >= $base_scroll){
					$('body').addClass('scroll');
				}else{
					$('body').removeClass('scroll');
				}
			});

			ui.quickReset();
			$(window).on('resize',function(e){
				ui.quickReset();
			});
		},
		quickReset : function(){
			var navQuick = $('#uiNavQuick');
			
			var leftValNav = (-1) * navQuick.width();
			
			if($(window).width() <= 970+(navQuick.width()*2)){
				leftValNav = 0;
			}
			
			navQuick.css({
				left : '100%',
				top : ($(window).height()-navQuick.height())/2,
				marginLeft : leftValNav
			});
		},
		targetScroll : function(element){
			var target_value = element.offset().top;
			if($('#uiNavFloat').length){
				target_value = target_value - $('#uiNavFloat').outerHeight() - 300;
			}
			$('html,body').animate({scrollTop : target_value},400);
			element.focus();
		},
		productEffect : function(){
			/* �곹뭹�곸꽭 怨꾩궛寃곌낵 */
			if($('.product-result').length>0){
				var sel_box_num = 1;
				$(document).on('click', '#uiProductResult1 .list-result .box:not(.empty)', function(e){
					$("#uiProductResult1 .list-result .box").removeClass("on");
					if ($(e.target).closest('#uiProductResult1 .list-result .box:not(.empty)').length){
						$(e.target).parents('.box').addClass("on");
						sel_box_num = $("#uiProductResult1 .list-result .box:not(.empty)").index($(e.target).parents('.box'));
					}else{
						$("#uiProductResult1 .list-result .box:not(.empty)").eq(sel_box_num).addClass("on");
					}
				});
			}

			/* 理쒓렐�ㅺ퀎�댁뿭 */
			$(document).on('focus.produdtResult2', '.list-result2 a', function(e){
				$(".list-result2 li").removeClass("on");
				$(e.target).parents('li').addClass("on");
			})
			.on('blur.produdtResult2', '.list-result2 a', function(e){
				$(".list-result2 li").removeClass("on");
			});

			/* 理쒓렐�ㅺ퀎�댁뿭 */
			$(document).on('focus.produdtResult3', '.direct-form fieldset.step3', function(e){
				$(e.target).parents('.direct-form fieldset.step3').addClass("on");
			})
			.on('blur.produdtResult3', '.direct-form fieldset.step3', function(e){
				$(".direct-form fieldset.step3").removeClass("on");
			});

			/* �닿쾶留욌뒗 蹂댄뿕李얘린 */
			$(document).on('focus.produdtResult3', '.list-result3 a', function(e){
				$(".list-result3 li").removeClass("on");
				$(e.target).parents('li').addClass("on");
			})
			.on('blur.produdtResult3', '.list-result3 a', function(e){
				$(".list-result3 li").removeClass("on");
			});

			//�ㅻⅨ怨좉컼�섏쓽 �좏깮��?
			$plugin.togglecon($('.product-other'),{
				selector : '.product-other',
				selector_btn: '> .heading > a'
			});

			//�곹뭹湲곕낯��
			$plugin.togglecon($('.product-tab li'),{
				toggle_type : 'tab',
				selector : '.product-tab li',
				selector_group : true,
				selector_btn: '>a',
				selector_con: '#href',
				class_open : 'on',
				auto_scroll : false,
				callback_after : function(){
					if($('#wrapper').hasClass('scrolling')){
						var scroll_value = $(".product-con.on").offset().top - 116;
						$('html,body').animate({scrollTop : scroll_value},600);
					}
				}
			});

			//�곹뭹�쒕툕��
			$plugin.togglecon($('.tab-sub1 li'),{
				toggle_type : 'tab',
				selector : '.tab-sub1 li',
				selector_group : true,
				selector_btn: '>a',
				selector_con: '#href',
				class_open : 'on'
			});

			//�곹뭹�쒕툕 �ㅽ궢�ㅻ퉬
			$(document).on('click', '.menu-skip a', function(e){
				e.preventDefault();
				var target_scroll = $("#"+$(this).prop('href').split("#")[1]).offset().top;
				$('html,body').animate({scrollTop : target_scroll},400);
			});

			//�곹뭹�쒕툕 Floating 而⑦뀗痢� �ъ빱�ㅼ떆 �곷떒�쇰줈 �대룞
			/*
			$(document).on('click', '#wrapper.scrolling #uiProductResult1 input#monthlyPremium2', function(e){
				$('html,body').animate({scrollTop : 0},400);
			});
			*/
		},
		productResultShow : function(callback){
			$('#uiProductResult1 > div').eq(0).find('>h3').animate({top : -21},1000);

			if(insuranceType != '49' && insuranceType != '50' && insuranceType != '51'){
				
				if( typeof( insuranceType ) !== "undefined" && null != insuranceType && "" != insuranceType ){
					if( "18" == insuranceType || "19" == insuranceType  ){
					} else {
						$("#uiProductResult1 .list-result .box").removeClass('on');
						$("#uiProductResult1 .list-result .box").eq(1).addClass("on");
					}
				} else {
					$("#uiProductResult1 .list-result .box").removeClass('on');
					$("#uiProductResult1 .list-result .box").eq(1).addClass("on");								
				}
				
			}
			
			$('#uiProductResult1').delay(100).slideDown(600,function(){
				$('html,body').animate({scrollTop : $('#uiProductResult1').position().top-100},700, function(){
					if(callback){
						callback();
					}else{
						$('#uiProductResult1').focus();
					}
				});
			}).addClass('open');
		},
		bannerScroll : function(){
			//�섏씠吏� �먭컻�댁긽 諛곕꼫 濡ㅻ쭅諛곕꼫 議댁옱�� each臾� 異붽��꾩슂
			if($('.banner-area1 .list > li').length>1){
				var eventSlider =  $('.banner-area1 > .list').bxSlider({
					mode : 'vertical',
					controls : false,
					autoControls : true,
					pause : 4000,
					auto : true,
					infiniteLoop : true,
					onSliderLoad : function(){
						var list_el = $('.banner-area1 .list > li');
						$(document).on('focus', '.main-event .list a', function(){
							eventSlider.stopAuto();
							eventSlider.goToSlide(list_el.index($(this).parent('li')));
						});
					},
					buildPager : function(index){
						return '<span>�대깽��'+(index+1)+'</span>';
					}
				});
			}
		},
		initReload : function(){
			ui.setPlaceholder();
			ui.setTooltip();
		},
		init: function() {
			/* body addClass */
			if($.browser.name == 'msie'){
				$('body').addClass("msie "+$.browser.className);
			} else {
				$('body').addClass($.browser.name);
			}

			/* �곷떒�쇰줈 �대룞踰꾪듉 */
			$(document).on('click', '#uiNavQuick .btn-top, .product-skip a[href="#formCalculator"]', function(e){
				e.preventDefault(e);
				$('html,body').animate({scrollTop : $($(this).attr('href')).offset().top},800);
			});

			/* �곷떒�쇰줈 �대룞踰꾪듉 : 湲고� */
			$(document).on('click', '.btn-go', function(e){
				e.preventDefault(e);
				$('html,body').animate({scrollTop : 0},400);
			});

			/* �ㅻ뜑�곸뿭 �ㅽ겕濡ㅺ났吏� */
			sliderNotice = $('.section-notice > ul').bxSlider({
				mode : 'vertical',
				pager : false,
				pause : 1500,
				autoControls : false,
				auto : true,
				autoHover: true,
				nextText : '�ㅼ쓬',
				prevText : '�댁쟾',
				infiniteLoop : true,
				ariaHidden : false,
				airaLive : false,
				keyboardEnabled : true,
				onSliderLoad : function(){
					$('.section-notice div.bx-viewport').find('a').attr({'tabindex':'-1', 'aria-hidden':'true'})
					.focus(function(){
						sliderNotice.stopAuto();
					})
					.focusout(function(){
						sliderNotice.startAuto();
					});
					$('.section-notice div.bx-controls').find('a')
					.focus(function(){
						sliderNotice.stopAuto();
					})
					.focusout(function(){
						sliderNotice.startAuto();
					});
				},
				onSlideAfter : function(){
					$('.section-notice div.bx-viewport').find('li').not('.bx-clone').eq(sliderNotice.getCurrentSlide()).find('a').attr({'tabindex':'0', 'aria-hidden':'false'});
					$('.section-notice div.bx-viewport').find('li').not('.bx-clone').eq(sliderNotice.getCurrentSlide()).siblings().find('a').attr({'tabindex':'-1', 'aria-hidden':'true'});
				}
			});
			
			/*$('.section-notice').on('focus', 'li', function(){
				sliderNotice.stopAuto();
			});
			
			$('.section-notice').on('blur', 'li', function(){
				sliderNotice.startAuto();
			});*/

			/* 湲곕낯�좉� : (�ъ씠�몃㏊, �⑤�由ъ궗�댄듃, 泥�빟�곷떒�곸꽭 ��)*/
			$plugin.togglecon($('.ui-toggle'),{
				selector_group : true
			});

			/* �꾩퐫�붿뼵 : 寃뚯떆�� */
			$plugin.togglecon($('.board-list:not(.faq) > li'),{
				selector_group : true,
				selector_btn: '.tit',
				selector_con: '.con',
				txt_state : true
			});

			/* �꾩퐫�붿뼵 : 由ъ뒪�명삎而⑦뀗痢� */
			$plugin.togglecon($('.list-content li'),{
				selector_group : true,
				selector_btn: '.tit',
				selector_con: '.con',
				txt_state : true
			});

			ui.setPlaceholder();					//placeholder �ㅼ젙
			ui.setTooltip();						//�댄똻�ㅼ젙
			ui.setFormCheck();					//�쇰뵒�� 諛� 泥댄겕諛뺤뒪 css�붾쾭源낆슜
			ui.setDatepicker();					//�щ젰 jquery ui datepicker
			ui.setViewMode();					//由ъ뒪�� 蹂닿린紐⑤뱶 �ㅼ젙
			ui.scrollFixed();						//scroll fixed 而⑦뀗痢� �ㅼ젙
			ui.productEffect();					//怨꾩궛湲� 寃곌낵�곸뿭 css�붾쾭源낆슜
			ui.bannerScroll();					//�ㅽ겕濡ㅻ같�덊샇異�

			$(".select-list").selectdesign();		//���됲듃諛뺤뒪 �붿옄��(linemap�곸뿭)

			/* �⑥닚�덈궡 �덉씠�댄뙘�� �몄텧�좎뼵 */
			$(".ui-pop-call").each(function(){
				$plugin.popmodal($('#'+$(this).attr('id')));
			});
		}
	});

	$(document).ready(ui.init);

} )(window, jQuery);

/* **********************************************
 * PLUGIN [popmodal]
 * �덉씠�댄뙘��
*********************************************** */
;(function(window, $){
	'use strict';
	var short = '$plugin';

	window[short] = window['$utils'].namespace('SAMSUNGLIFE.plugins', {
		popmodal : function(element, options){
			var version = "0.0.1",
				pluginName = "publish.popmodal",
				methods = {},
				el = element,
				el_idvalue = element.attr('id'),
				el_ev = $('[href="#'+el_idvalue+'"]'),
				length = el.size(),
				pops = [],
				popmodals,
				defaults = {
					overlay : true,
					overlay_fixed : false,
					overlay_click : true,
					class_overlay : "modal-overlay",
					class_open : "open",
					selector_close : '.ui-close',
					selector_return : false,
					position_top : null,
					position_target : false,
					position_auto : true,
					load_display : false,
					load_img : false,
					load_animation : false,
					load_only : false,
					load_only_expect : false,
					scroll_doc : true,
					auto_focus : true,
					modal_type : "modal",
					callback_before: null,
					callback_load : null,
					callback_after: null
				};

			if (length < 1) return;
			if (length > 1){
				el.each(function(i, tar){
					pops.push(window[short].popmodal($(tar), options));
				});
				return pops;
			}
			if (el.data(pluginName)) return;

			/* ---------------------------------------------------------------------------
				popmodal.init : 珥덇린��
			--------------------------------------------------------------------------- */
			methods.init = function(){
				methods.initVars();
				methods.initEvent();
				//methods.validation();
			};

			/* ---------------------------------------------------------------------------
				popmodal.initVars : 蹂��� 珥덇린��
			--------------------------------------------------------------------------- */
			methods.initVars = function(){
				el.options = $.extend({}, defaults, options);
				el.vars = {
					id : pluginName + "-" + new Date().getTime(),
					pop : null,
					pop_ev : null,
					pop_close : null,
					popWidth : null,
					popHeight : null,
					modal : null,
					modalTop : null,
					active : false,
					overflow : null
				};
			};

			/* ---------------------------------------------------------------------------
				popmodal.initEvent : �대깽�� 珥덇린��
			--------------------------------------------------------------------------- */
			methods.initEvent = function(){
				el.vars.pop = $("#"+el_idvalue);

				$(document).on("click.popmodal", 'a[href="#'+el_idvalue+'"]', function(event) {
					event.preventDefault();
					var href = el_ev.filter("a").attr("href") || el_ev.find("a").attr("href");
					el.vars.pop_ev = $(this);

					if(el.options.modal_type=="toggle"){
						if(!methods.display()){
							if (typeof el.options.callback_before === 'function'){
								if(!el.options.callback_before.call(el.vars.pop_ev)) return;
							};
							methods.pop();
						}else{
							el.vars.pop_close.trigger('click');
						}
					}else{
						if(!methods.display()){
							if (typeof el.options.callback_before === 'function'){
								if(!el.options.callback_before.call(el.vars.pop_ev)) return;
							};
							methods.pop();
						}
					}
				});

				if(el.options.load_display){
					methods.popCall();
				}
			};

			/* ---------------------------------------------------------------------------
				popmodal.validation : href 媛믪뿉 ���� element �좏슚�� 寃���.
			--------------------------------------------------------------------------- */
			methods.validation = function(){
			};

			/* ---------------------------------------------------------------------------
				popmodal.pop : �앹뾽 �몄텧
			--------------------------------------------------------------------------- */
			methods.pop = function(){
				//蹂��섏꽕��
				el.vars.overflow = $("body").css("overflow");
				el.vars.popWidth = el.vars.pop.width();
				el.vars.popHeight = el.vars.pop.height();
				el.vars.active = true;

				if(el.options.load_only){
					popmodals.each(function(index){
						if(popmodals[index]!=el && !popmodals[index].options.load_only_expect){
							popmodals[index].closeOutput();
						}
					});
				}

				//�덉씠�댄뙘�� 異쒕젰
				methods.popShow();

				//釉뚮씪�곗� 由ъ궗�댁쫰��
				$(window).resize(function(){
					methods.setResize();
				});

				if(el.options.overlay_fixed){
					$(window).on("scroll",function(){
						if (!!el.vars.modal){
							el.vars.modal.css({ marginTop : $(window).scrollTop()*(-1) });
						}
					});
				}

			};
			/* ---------------------------------------------------------------------------
				popmodal.pop : �앹뾽 �몄텧
			--------------------------------------------------------------------------- */
			methods.popCall = function(){
				el.vars.pop = el;
				if(el.options.selector_return) el.vars.pop_ev = $(el.options.selector_return);
				methods.pop();
			};
			/* ---------------------------------------------------------------------------
				popmodal.popShow : �앹뾽 異쒕젰
			--------------------------------------------------------------------------- */
			methods.popShow = function(){
				if(el.options.load_only_expect){
					$('body').addClass('ui-banner-open');
				}

				if(el.options.load_animation){
					el.vars.pop.slideDown(function(){
						$(this).addClass(el.options.class_open);
					});
				}else{
					el.vars.pop.addClass(el.options.class_open);
				}
				if(el.vars.pop_ev!=null) el.vars.pop_ev.addClass(el.options.class_open);
				methods.setResize();

				//紐⑤떖異쒕젰
				methods.modalCreate();

				//�リ린踰꾪듉�ъ빱�� 諛� �대깽�몄꽕��
				if (!!el.options.selector_close){
					el.vars.pop_close = el.find(el.options.selector_close);
					if(el.vars.pop_close){
						if(el.options.auto_focus) el.vars.pop_close.eq(0).focus();
						else $(el.vars.pop_ev).focus();
					}
					el.vars.pop_close.on("click.popmodal", function(event){
						event.preventDefault();
						methods.close();
					});
				}

				//諛붾떏�섏씠吏� �ㅽ겕濡ㅼ꽕��
				if(!el.options.scroll_doc) $('body').bind('touchmove.Modal', function(e){e.preventDefault()});

				//�대�吏�濡쒕뱶 �� �덉씠�댄뙘�� �ъ��� �ъ꽕�뺤떆
				if(el.options.load_img){
					el.vars.pop.find("img").load(function(){
						methods.setResize();
					});
				}

				//濡쒕뱶 肄쒕갚�⑥닔 �ㅽ뻾
				if (typeof el.options.callback_load === 'function'){
					el.options.callback_load.call(el.vars.pop);
				};
			};
			/* ---------------------------------------------------------------------------
				popmodal.setResize : �앹뾽 �꾩튂�ㅼ젙
			--------------------------------------------------------------------------- */
			methods.setResize = function(){
				if(el.options.position_auto){
					var browser_width = $(window).width();
					var browser_height = $(window).height();
					var layer_width = el.vars.pop.outerWidth();
					var layer_height = el.vars.pop.outerHeight();
					var margin_left = Math.floor(layer_width /2) * (-1) + 'px';
					var position_top = $(window).scrollTop() + ((browser_height-layer_height)/2);

					var margin_left = (-1)*(layer_width/2);

					if(browser_height<=layer_height) position_top = $(window).scrollTop();
					if(el.options.position_top) position_top  = el.options.position_top + $(window).scrollTop();
					//position_top  = el.options.position_top;

					if(el.options.position_target){
						el.vars.pop.css({
							"top" : el.vars.pop_ev.position().top,
							"left" : el.vars.pop_ev.position().left + el.vars.pop_ev.outerWidth(true)
						});
					}else{
						el.vars.pop.css({
							"top" : position_top,
							"marginLeft" : margin_left
						});
					}
				}
			};
			/* ---------------------------------------------------------------------------
				el.close : �앹뾽 �リ린 �ㅽ뻾(�몃��몄텧)
			--------------------------------------------------------------------------- */
			el.closeOutput = function(){
				methods.popHide();
			};
			/* ---------------------------------------------------------------------------
				el.close : �앹뾽 �닿린 �ㅽ뻾(�몃��몄텧)
			--------------------------------------------------------------------------- */
			el.openOutput = function(etarget){
				if(etarget){
					if(etarget.tagName=="SPAN") etarget = $(etarget).parent();
					el.vars.pop_ev = $(etarget);	//�몃��몄텧�� �대깽�� �쇱뼱�� 媛앹껜(�ㅻ낫�� �묎렐�깆쓣 �꾪븿)
				}
				methods.popCall();
			};
			/* ---------------------------------------------------------------------------
				el.openCheck : �앹뾽 �붿뒪�뚮젅�� �곹깭
			--------------------------------------------------------------------------- */
			el.openCheck = function(){
				return methods.display();
			};
			methods.display = function(){
				return el.vars.active;
			};
			/* ---------------------------------------------------------------------------
				popmodal.close : �앹뾽 �リ린 �ㅽ뻾
			--------------------------------------------------------------------------- */
			methods.close = function(){
				if (typeof el.options.callback_after === 'function'){
					el.options.callback_after.call();
				};
				methods.popHide();
			};
			/* ---------------------------------------------------------------------------
				popmodal.popHide : �앹뾽 �④린湲�
			--------------------------------------------------------------------------- */
			methods.popHide = function(){
				$(window).off("resize.popmodal");

				if(el.options.load_only_expect){
					$('body').removeClass('ui-banner-open');
				}

				if (!!el.vars.pop){
					if(el.options.load_animation){
						el.vars.pop.slideUp(function(){
							$(this).removeClass(el.options.class_open);
						});
					}else{
						el.vars.pop.removeClass(el.options.class_open);
					}
					if(el.vars.pop_ev!=null) el.vars.pop_ev.removeClass(el.options.class_open);
				}

				methods.modalRemove();

				if (!!el.vars.this_close){
					el.vars.this_close.off("click.popmodal");
				}
				el.vars.active = false;

				if(!!el.vars.pop_ev) el.vars.pop_ev.focus();

				if(!el.options.scroll_doc) $('body').unbind('touchmove.Modal');
			};
			/* ---------------------------------------------------------------------------
				popmodal.modalCreate : 紐⑤떖�앹꽦
			--------------------------------------------------------------------------- */
			methods.modalCreate = function(zindex){
				if (!!el.options.overlay){
					var id = el_idvalue + "Overlay";
					if(!el.vars.modal){
						var modal_el = $('<div id="' + id + '" class="'+el.options.class_overlay+'"></div>')
						el.before(modal_el);
						el.vars.modal = modal_el;

						el.vars.modal = el.vars.modal.css({
							"width" : $(document).width(),
							"height" : $(document).height()
						});

						if(el.options.overlay_fixed){
							el.vars.modal.css({ marginTop : $(window).scrollTop()*(-1) });
						}

						if(el.options.overlay_click){
							el.vars.modal.on("click.popmodal", function(event){
								methods.close();
							});
						}
					}
				}
			};
			/* ---------------------------------------------------------------------------
				popmodal.modalRemove : 紐⑤떖��젣
			--------------------------------------------------------------------------- */
			methods.modalRemove = function(){
				if (!!el.vars.modal){
					el.vars.modal.off("click.popmodal");
					el.vars.modal.remove();
					el.vars.modal = null;
				}
			};

			methods.init();

			popmodals = $(document).data(pluginName);
			if (!popmodals){
				popmodals = $([]);
			}

			if ($.inArray(el, popmodals) === -1){
				popmodals.push(el);
			}
			$(document).data(pluginName, popmodals);
			el.data(pluginName, el);
			return el;
		}
	});
})(window, jQuery);

/* **********************************************
 * PLUGIN [togglecon]
 * �좉�而⑦뀗痢�
*********************************************** */
;(function(window, $){
	'use strict';
	var short = '$plugin';

	window[short] = window['$utils'].namespace('SAMSUNGLIFE.plugins', {
		togglecon : function(element, options){
			var version = "0.0.1",
				pluginName = "publish.togglecon",
				methods = {},
				el = element,
				length = el.size(),
				toggles = [],
				togglecons,
				defaults = {
					toggle_type : 'toggle',
					selector : "",
					selector_group : false,
					selector_btn : '.ui-toggle-btn',
					selector_con : '.ui-toggle-con',
					selector_close : '.ui-toggle-close',
					event_btn : 'click',
					class_open : "open",
					auto_scroll : false,
					txt_state : false,
					txt_state_open : "�닿린",
					txt_state_close : "�リ린",
					callback_before : null,
					callback_after : null
				};

			if (length < 1) return;
			if (length > 1){
				el.each(function(i, tar){
					toggles.push(window[short].togglecon($(tar), options));
				});
				return toggles;
			}
			if (el.data(pluginName)) return;

			/* ---------------------------------------------------------------------------
				togglecon.init : 珥덇린��
			--------------------------------------------------------------------------- */
			methods.init = function(){
				methods.initVars();
				methods.initEvent();
			};

			/* ---------------------------------------------------------------------------
				togglecon.initVars : 蹂��� 珥덇린��
			--------------------------------------------------------------------------- */
			methods.initVars = function(){
				el.options = $.extend({}, defaults, options);
				el.vars = {
					this_group : null,
					this_wrapper : null,
					this_btn : null,
					this_con : null,
					this_close : null
				};
			};

			/* ---------------------------------------------------------------------------
				togglecon.initEvent : �대깽�� 珥덇린��
			--------------------------------------------------------------------------- */
			methods.initEvent = function(){
				el.vars.this_wrapper = el;

				/* �대깽�몄꽕�� */
				if(el.options.event_btn=="focus"){
					$(el.find(el.options.selector_btn)).on('focus mouseover', function(event) {
						el.vars.this_btn = $(this);
						if(el.options.selector_con=="#href") el.vars.this_con = $(this).attr("href");
						else el.vars.this_con = el.find(el.options.selector_con);
						methods.conShow();
					}).on('click', function(event) {
						//event.preventDefault();
					});

					if(!el.options.selector_group){
						$(el.find(el.options.selector_btn)).on('blur mouseout', function(event) {
							methods.conHide();
						});
					}
				}else{
					$(el.find(el.options.selector_btn)).on('click.togglecon', function(event) {
						event.preventDefault();
						el.vars.this_btn = $(this);

						if(el.options.selector_con=="#href") el.vars.this_con = $(this).attr("href");
						else el.vars.this_con = el.find(el.options.selector_con);

						if(el.options.toggle_type=="form"){
							if($(this).val()=="Y"){
								methods.conShow();
							}else{
								methods.conHide();
							}
						}else{
							if (!el.vars.this_wrapper.hasClass(el.options.class_open) || el.options.toggle_type=="tab") {
								methods.conShow();
							} else {
								methods.conHide();
							}
						}
					});
				}

				if(el.options.txt_state && el.vars.this_wrapper.hasClass(el.options.class_open)){
					$(el.find(el.options.selector_btn)).each(function(){
						$(this).attr('title',$(this).attr('title').replace(el.options.txt_state_open,el.options.txt_state_close));
					});
				}

				//$(el.find(el.options.selector_btn));
			};

			/* ---------------------------------------------------------------------------
				togglecon.conShow : 而⑦뀗痢� �닿린
			--------------------------------------------------------------------------- */
			methods.conShow = function(){

				if(el.options.selector_group){
					el.vars.this_wrapper.siblings().removeClass(el.options.class_open);
					if(el.options.txt_state){
						el.vars.this_wrapper.siblings().find(el.options.selector_btn).each(function(){
							$(this).attr('title',$(this).attr('title').replace(el.options.txt_state_close,el.options.txt_state_open));
						});
					}
				}

				el.vars.this_wrapper.addClass(el.options.class_open);

				if(el.options.txt_state){
					el.vars.this_btn.attr('title',el.vars.this_btn.attr('title').replace(el.options.txt_state_open,el.options.txt_state_close));
				}

				if(el.options.selector_con=="#href"){
					$(el.vars.this_con).addClass(el.options.class_open);
					el.vars.this_wrapper.siblings().find(el.options.selector_btn).each(function(){
						$($(this).attr('href')).removeClass(el.options.class_open);
					});
				}

				if(el.options.toggle_type=="position"){
					if($(el.vars.this_con).hasClass('bottom')){
						var position_left = $(el.vars.this_btn).position().left - ($(el.vars.this_con).outerWidth(true)/2) + 5;
						var position_top = $(el.vars.this_btn).position().top - ($(el.vars.this_con).outerHeight(true));
						//if(position_left<0) position_left = 0;
					}else{
						var position_left = $(el.vars.this_btn).position().left + $(el.vars.this_btn).outerWidth(true) + 5;
						var position_top = $(el.vars.this_btn).position().top;
					}
					$(el.vars.this_con).css({
						left : position_left,
						top : position_top
					});
				}

				if(el.options.auto_scroll){
					var scroll_value = $(el.vars.this_con).offset().top-400;
					$('html,body').animate({scrollTop : scroll_value},600);
				}

				if (typeof el.options.callback_after === 'function'){
					el.options.callback_after.call(el);
				};

				//�リ린踰꾪듉 �대깽�몄꽕��
				if (!!el.options.selector_close){
					el.vars.this_close = el.vars.this_wrapper.find(el.options.selector_close);
					el.vars.this_close.on("click.togglecon", function(event){
						event.preventDefault();
						methods.conHide();
						$(el.vars.this_btn).focus();
					});
				}
			};
			/* ---------------------------------------------------------------------------
				togglecon.conHide : 而⑦뀗痢� �リ린
			--------------------------------------------------------------------------- */
			methods.conHide = function(){

				el.vars.this_wrapper.removeClass(el.options.class_open);

				if(el.options.txt_state){
					el.vars.this_btn.attr('title',el.vars.this_btn.attr('title').replace(el.options.txt_state_close,el.options.txt_state_open));
				}

				if(el.options.selector_con=="#href"){
					$(el.vars.this_con).removeClass(el.options.class_open);
				}

				if (el.vars.this_close){
					el.vars.this_close.off("click.togglecon");
				}
			};

			methods.init();

			togglecons = $(document).data(pluginName);

			if (!togglecons){
				togglecons = $([]);
			}

			if ($.inArray(el, togglecons) === -1){
				togglecons.push(el);
			}
			$(document).data(pluginName, togglecons);
			el.data(pluginName, el);
			return el;
		}
	});
})(window, jQuery);

/***********************************************
* selectbox list
************************************************/
;(function($) {

	$.fn.selectdesign = function(options){
		return this.each(function(){
			var opts = $.extend({}, $.fn.selectdesign.defaults, options || {});
			options = options || {};
			var $cont = $(this);
			var $headline = $cont.find(opts.headline).eq(0);
			var $list = $cont.find(opts.list);
			var $list_option = $list.find(opts.selectEl);
			var $list_option_e = $list.find(opts.selectEvent);
			var $cont_name = $list_option_e.eq(0).attr("name");

			//媛�濡쒓만�댁꽕��
			$cont.css("min-width", opts.listWidth+"px");
			if($.browser.className=="msie7"){ $headline.css("width", opts.listWidth-($headline.outerWidth()-$headline.width())); }

			//�곗씠�곗큹湲고솕
			var $selected_index = 0;

			if($list.find("."+opts.selectedClass).length){
				$selected_index = $list_option.index($list.find(opts.selectEl+"."+opts.selectedClass));
				var default_text = $list_option_e.eq($selected_index).html();
			}else{
				var default_text = $headline.html();
			}

			$list.addClass("hd");

			if(opts.headlineDefault){
				$headline.empty().append(opts.headlineDefault);
			}else{
				$headline.empty().append(default_text);
			}

			if(opts.focusFlag) $headline.focus();

			//�듭뀡由ъ뒪�� �닿린/�リ린
			$headline.unbind();
			$headline
				.bind("click",function(event){
					event.stopPropagation();
					event.preventDefault();
					if($cont.hasClass(opts.onClass)){ selectClose(); }
					else{ selectOpen();}
				})
				.bind("focus",function(){$cont.addClass(opts.focusClass);})
				.bind("blur",function(){$cont.removeClass(opts.focusClass);});

			$(document).bind('click', function() {
				if($cont.hasClass(opts.onClass)){ selectClose(); }
			});

			$list.css("min-width",opts.listWidth-2+"px");
			if($.browser.className=="msie7"){ $list_option_e.css("width", opts.listWidth-($list_option_e.outerWidth()-$list_option_e.width())); }

			//�듭뀡�좏깮�대깽��
			$list_option_e.unbind();
			$list_option_e
				.bind("click",function(event){
					$list_option.removeClass(opts.selectedClass);
					$(this).parent().addClass(opts.selectedClass);

					$headline.empty().append($(this).html());
					if(this.href.indexOf('#none') != -1) event.preventDefault();

					//selectClose();
					if(typeof opts.callBack === 'function') {
						return opts.callBack.call(this);;
					}
				})
				.bind("focus mouseover",function(){
					$cont.addClass(opts.focusClass);
					$(this).parent().addClass("focus");
				})
				.bind("blur mouseout",function(){
					$cont.removeClass(opts.focusClass);
					$(this).parent().removeClass("focus");
				});

			//���됲듃�ㅽ뵂
			function selectOpen(){
				$("."+opts.onClass).removeClass(opts.onClass);
				$cont.addClass(opts.onClass);
				$cont.parents(".wrap").addClass("wrap-on");
				$list.removeClass("hd");
				//selectUlPos();
			}

			//���됲듃close
			function selectClose(){
				$cont.removeClass(opts.onClass);
				$list.addClass("hd");
				$cont.parents(".wrap").removeClass("wrap-on");
				$headline.focus();
			}

			//���됲듃�듭뀡 �ъ���
			function selectUlPos(){
				var containerPosY = $cont.offset().top,
				docHeight = jQuery(window).height(),
				scrollTop = jQuery(window).scrollTop();
				newUIHeight = $list.outerHeight();
				containerPosY = containerPosY - scrollTop + newUIHeight + $cont.outerHeight();
				if($("#footer")) containerPosY += $("#footer").outerHeight()+10;

				if (containerPosY >= docHeight){
					$list.css({
						top : (-1)*newUIHeight
					});
				}
			}

		});
	}

	$.fn.selectdesign.defaults = {
		containerClass : "select-list",
		onClass : "select-on",
		focusClass : "focus",
		headline : ".headline",
		headlineDefault : false,
		list : ".list-option",
		selectEl : "li",
		selectEvent : "a",	//a / input
		selectedClass : "selected",
		listWidth : 220,
		callBack : null,
		focusFlag : false
	};

})(jQuery);