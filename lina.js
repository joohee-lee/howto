var pub_ui_common = {};

pub_ui_common.init = function(){
	//gnb
	var gnbOpenBtn = $('#header .btn_allmenu'),
		gnbClseBtn = $('#allmenu .btn_close_menu'),
		gnbDepth01Menu = $('#nav .depth01 strong a');

	//pub_ui_common.gnbResize();

	gnbOpenBtn.on('click', function(){
		pub_ui_common.gnbOpen();
	});

	gnbClseBtn.on('click', function(){
		pub_ui_common.gnbClose();
	});
	
	$('#allmenu').on('click', '.dim', function(){
		pub_ui_common.gnbClose();
	});

	gnbDepth01Menu.on('click', function(){
		menuItem = $(this).closest('li');
		if(menuItem.hasClass('on') == false){
			menuItem.children('ul').slideDown();
			menuItem.addClass('on');
		}
		else{
			menuItem.children('ul').slideUp();
			menuItem.removeClass('on');
		}
	});

	//button style select
	var btnStyleSelect = $('.g_btn_sel > a');
	btnStyleSelect.on('click', function(e){
		e.preventDefault();
		/*if ($(this).hasClass('on'))
		{
			$(this).removeClass('on');
		}else{
			$(this).addClass('on').siblings().removeClass('on');
		}*/
		if ($(this).parent().children().length == 1)
		{
			$(this).toggleClass('on');	
			$('.g_btn_sel.marker_color').toggleClass('active');
		}else{
			$(this).addClass('on').siblings().removeClass('on');
			$('.g_btn_sel.marker_color').removeClass('active');
		}
	});
	
	//tab 
	var tabCont = $('.js_tab_conts > .js_tcont'),
		tabs = $('.js_tabs > li'),
		tabLink = tabs.find('>a'),
		saveHeight = [];

	// 媛��낅갑踰뺤븞�� �붾㈃
	// hide()濡� �명븳 bxslider -> viewport.height:v()�� height:0�쇰줈 �좎뼵�섏뼱 異쒕젰�섏� �딅뒗 踰꾧렇
	// page loading �� tab 媛곴컖�� height媛� 湲곗뼲
	// tabLink cllick �� fixed height媛� viewport inline style濡� �좎뼵
	if ($('.js_tab_conts').hasClass('how2join')==true) {
		tabs.each(function(){ 
			var tabID = $(this).children('a').attr('href');
			var pxHeight = $(tabID).height();
			saveHeight.push(pxHeight);
		});
	};
	function printHeight(item, index){
		var hereTabID = '#tabcont_010' + (index+1);
		var deviceWidth = $('ul.js_tabs').width();
		$(hereTabID).find('.bx-wrapper').css('height',item+20+'px');
		$(hereTabID).find('.bx-viewport').css('height',item+20+'px');
		$(hereTabID).find('.list_guide').find('li').css('width',deviceWidth+'px');
	};
	tabCont.hide();
	tabs.each(function(){
		if($(this).hasClass('on')){
			var tabID = $(this).children('a').attr('href');
			$(tabID).show();
			$(this).children('a').attr('title','�좏깮�� ��');
		}
	});
	tabLink.on('click', function(e){
		e.preventDefault();
		$(this).closest('.js_tab_conts').children('.js_tcont').hide();
		$(this).parent('li').addClass('on').siblings().removeClass('on');
		$(this).parent('li').siblings().children('a').attr('title','');
		var tabID = $(this).attr('href');
		saveHeight.forEach(printHeight);
		$(tabID).show();
		$(this).attr('title','�좏깮�� ��');
		
		//��씠�숈떆 bxslider �믪씠 踰꾧렇 �섏젙
		if(tabID == "#tabcont_0101"){
			var activeTabContH = $(".list_guide li:nth-child(3").height();
			$("#tabcont_0101 .bx-wrapper").css('height',activeTabContH+'px');
			$("#tabcont_0101 .bx-viewport").css('height',activeTabContH+'px');
		}
		pub_ui_common.fnFooterPos();
	});

	var tabStyleSelect = $('[class^="g_tab_"] li a');
	tabStyleSelect.on('click', function(e){
		e.preventDefault();
		$(this).parent().addClass('on').siblings().removeClass('on');
	});

	// tab 媛쒖닔 留롮쓣 寃쎌슦
	/*var manyTabsUl = $('.many_tab_wrap .many_tabs ul'),
		manyTabsLi = manyTabsUl.find('li'),
		manyTabsSumW = 0;
	manyTabsLi.each(function(){
		manyTabsSumW += $(this).outerWidth();
	});
	manyTabsUl.width(manyTabsSumW + 5); */
	
	//faq
	var faqCont = $('.js_faq_conts .js_acont'),
		faqTit = $('.js_faq_conts .js_qtitle > a');
	faqCont.hide();
	faqTit.on('click', function(e){
		e.preventDefault();
		var faqItem = $(this).parent().parent();
		if(faqItem.hasClass('on') == false){
			faqItem.siblings().children('.js_acont').slideUp(100);
			faqItem.siblings().removeClass('on');
			$(this).parent().next().slideDown(100);
			faqItem.addClass('on');
		}
		else{
			faqItem.removeClass('on');
			$(this).parent().next().slideUp(100);
		}

		//�붿궡�쒕줈 而⑦듃濡ㅽ븷 寃쎌슦
		if ($(this).hasClass('btn_toggle'))
		{
			if ($(this).text() == '�쇱묠')
			{
				$(this).text('�묓옒');
			}
			else{
				$(this).text('�쇱묠');
			}
		}
	});
    //$('.faq_test > ul > li').eq(0).find('.js_qtitle a').trigger('click');//if first item displayed, show this line.
	$('.insur_sel_agree > ul > li').eq(0).find('.js_qtitle a').trigger('click');

	//layer box
	var gLayerBox = $('.g_layer_box');
	gLayerBox.hide();
	$('[id^="openLayer"]').on('click', function(e){
		e.preventDefault();
		var layerID = $(this).attr('href');
		$(layerID).show().append('<div class="dim">&nbsp;</div>').focus(); //2016-06-27 �섏젙
		pub_ui_common.layerPop(layerID);
		$('html, body').css({'overflow':'hidden'});
	});

	gLayerBox.on('click', '.btn_layer_close', function(){
		// 湲곗〈 gLayerBox.on('click', '.dim, .btn_layer_close', function(){  // dim �대┃ �� 紐⑤뱺 �덉씠�닿� �ロ엳�� 臾몄젣濡� ��젣
		
		//180712 �앹뾽�� 2媛쒖씠�곸씪 寃쎌슦 �대떦 �앹뾽留� �ロ엳寃� �섏젙
		//gLayerBox.hide();
		var targetId = $(this).parents(".g_layer_box").attr("id");
		$("#"+targetId).hide();
		
		//<!-- 2016-08-29 iOS Safari �섎떒�대컮 踰꾧렇 ����, 媛쒕컻怨�/�댁쁺怨꾩뿉�� zipcode.js �� 異붽��� �쇱씤
		$('.dim, .iSafari_foo_cover').remove();
		$('#gotop').css('z-index','55');
		//--> 2016-08-29
		$('html, body').css({'overflow':''});

		//2016-06-27 異붽�
		var href = $(this).closest('.g_layer_box').attr('id');
		$('[href="#'+href+'"]').focus();
	});

	gLayerBox.on('click', '.btn_layer_close2', function(){
		$(this).closest('.g_layer_box').find('.dim').remove();
		$(this).closest('.g_layer_box').hide();
	});
	
	/*gLayerBox.each(function(){
		//<!-- 2016-08-29 iOS Safari �섎떒�대컮 踰꾧렇 ����, 媛쒕컻怨�/�댁쁺怨꾩뿉�� zipcode.js �� 異붽��� �쇱씤
		$('.btn_wrap_bottom').append('<div class="iSafari_foo_cover">&nbsp;</div>');
		$('#gotop').css('z-index','0');
		//--> 2016-08-29
		pub_ui_common.layerPop(this);
		$(this).attr('tabindex','0');
	});

	//checkbox, radio button
	/*$('#wrap label[for]').on('click', function(e){
		var target = window[this.htmlFor];
		target.checked = !target.checked;
		e.preventDefault();
	});*/
	//20180710 AML 怨좉컼�뺤씤�섎Т �덉씠�댄뙘��
	$('#edd_qs01 ul > li').click(function(){
		var radioNo = $(this).find('label').attr('for');
		var labelText = $('input[data-id="etc"]');
		labelText.prop('disabled', true).addClass('disable');
		$('#'+radioNo).prop('checked',true);
		if(radioNo=='perposes07'){
			$inputInLabel = labelText.prop('disabled');
			if($inputInLabel == true){
				labelText.prop('disabled', false).removeClass('disable');
				setTimeout(function(){
					labelText.focus();
				}, 1);
			}
		}
	});
	
	$('#edd_qs02 ul > li').click(function(){
		var radioNo = $(this).find('label').attr('for');
		var labelText = $('input[data-id="etc2"]');
		labelText.prop('disabled', true).addClass('disable');
		$('#'+radioNo).prop('checked',true);
		if(radioNo=='income05'){
			$inputInLabel = labelText.prop('disabled');
			if($inputInLabel == true){
				labelText.prop('disabled', false).removeClass('disable');
				setTimeout(function(){
					labelText.focus();
				}, 1);
			}
		}
	});
	
	//#DTC 10�� �뚮옯�� 媛쒖꽑 (181019 : �닿�諛쏅뒗湲덉븸�뺤씤�섍린 �먯꽍諛� �꾩튂)
	$(window).on('scroll', function(){
		//湲덉븸�뺤씤�섍린踰꾪듉 �먯꽍諛붾뒗 怨꾩궛 �꾩뿉留� �몄텧
		if($(".fix_tit").length > 0 && ($("#ToggleCon").length == 0 || $("#ToggleCon").css("display") == "none")){
			if($(".cover_cont .btnAssureView3").offset().top < $(".fix_tit").offset().top){				
				$(".fixedInputBox").show();
				$(".float_banner").addClass("view_fixed");
			}else{
				$(".fixedInputBox").hide();
				$(".float_banner").removeClass("view_fixed");
			}	
		}
	});
	
	$(".fixedInputBox .btnConfirView, .fixedInputBox .toggle .btn_toggle").click(function(){
		//$(".fixedInputBox").toggleClass("view");
		
		if($(".fixedInputBox").hasClass("view")) {
			$(".fixedInputBox").removeClass("view");
			$(".dim").fadeOut("800", function(){
				$("#wrap").find(".dim").remove();
			});
			$(".float_banner").removeClass("view");
		}
		else{
			$(".fixedInputBox").addClass("view");
			$("#wrap").append('<div class="dim">&nbsp;</div>');
			$(".dim").fadeIn("800");
			$(".float_banner").addClass("view");
		}
	});

	//top btn
	var goTopBtn = $('#gotop');
	//var floatBanner = $(".float_banner");
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100){
			goTopBtn.fadeIn(200);
			//floatBanner.fadeIn(200);
		}
		else{
			goTopBtn.fadeOut(200);
			//floatBanner.fadeOut(200);
		}
	});
	goTopBtn.on('click', function(){
		$('html, body').animate({scrollTop:0}, 200);
		return false;
	});

	//email
	var iptEmailChk = $('.ipt_email .chk input');
	iptEmailChk.on('change', function(){
		if($(this).is(':checked')){
			$(this).closest('.ipt_email').addClass('on');
		}
		else{
			$(this).closest('.ipt_email').removeClass('on');
		}
	});

	//footer
	$(function(){
		pub_ui_common.fnFooterPos();
	});
	
	//181211 �� 蹂댁옣湲덉븸 �뺤씤�섍린 �대┃�� top�대룞
	$('.js-top-slide').each(function(){
		var _this = $(this);
		_this.on('click',function(e){
			e.preventDefault();
			var _headerHeight = $('#header').height()
			
			$('html,body').stop().animate({scrollTop:_headerHeight + 'px'},200);
			
		});
	});	
};

//gnb
/*pub_ui_common.gnbResize = function(){
	var winH = $(window).height();
	$('#allmenu .inner').height(winH);
}*/
pub_ui_common.gnbOpen = function(){
	var gnbWrap = $('#allmenu'),
		gnbInner = gnbWrap.find('.inner');

	gnbWrap.show();
	gnbWrap.append('<div class="dim">&nbsp;</div>');
	$('html, body').css({'height':'100%', 'overflow':'hidden'});
	gnbInner.animate({left:'0px'});
};
pub_ui_common.gnbClose = function(){
	var gnbWrap = $('#allmenu'),
		gnbInner = gnbWrap.find('.inner'); 

	gnbInner.animate({left:'100%'}, function(){
		gnbWrap.hide();
		$('.dim').remove();
		$('html, body').css({'height':'', 'overflow':''});
	});
}

//layer popup
pub_ui_common.layerPop = function(layerThis){
	var layer = $(layerThis).find('.inner'),
		layerH = layer.outerHeight(), 
		layerCont = layer.find('.g_layer_container'),
		windowRH = $(window).height(),
		windowH = $(window).height() - 60, //60 is layer top/bottom margin.
		layerHeaderH = layer.find('.g_layer_header').height(),
		layerRealH = layer.find('.inside').outerHeight() + layerHeaderH;
	
	/*if ($(layerThis).hasClass('full')){
		layerCont.height(windowRH - layerHeaderH);
	}
	else{*/
		if (layerRealH >= windowH){
			if (windowH < 250)
			{
				windowH = 250; //250 is window min-height.
			}
			layerH = windowH;
			layerCont.height(windowH - layerHeaderH);
		}
		else{
			layerH = layerRealH;
			layerCont.height(layerRealH - layerHeaderH);
		}

		layer.css({'margin-top': -layerH/2});
	//}
};

// 媛꾪렪�ㅺ퀎
pub_ui_common.fnSimpleInsurPlan = function(){
	var btnCalResult = $('.btn_cal_result'),
		btnCalInsur = $('.btn_cal_insur'),
		btnLCalResult = $('.btn_lcal_result'),
		btnLCalInsur = $('.btn_lcal_insur'),
		calInsurBox = $('.cal_insur_box'),
		calInsurInput = $('.cal_insur_input'),
		calInsurResult = $('.cal_insur_result'),
		calInsurResult2 = $('.pr_plan'),
		btnHideInsur = calInsurBox.find('.btn_prd_close'),
		calInsurBoxH = calInsurBox.find('.inside').outerHeight();

	btnCalResult.on('click', function(){
		calInsurResult2.show();
		if($('#head').hasClass('fix_head') == true){
			$('html, body').animate({scrollTop:$('.pr_plan').offset().top - 90}, 500);
		}else{
			//$('html, body').animate({scrollTop:$('.pr_plan').offset().top - 169}, 500);
			//$('html, body').animate({scrollTop:$('.pr_plan').offset().top - 149}, 500);//180717 �섏젙
			$('html, body').animate({scrollTop:$('.pr_plan').offset().top - 204}, 500);//180723 �섏젙
		}
		//prdTabsO2 = $('.prd_desc_wrap .g_tab_02').offset();
	});

	btnCalInsur.on('click', function(){
		calInsurResult.hide();
		calInsurInput.show();
		pub_ui_common.showCalInsur();
	});

	btnLCalResult.on('click', function(){
		calInsurInput.hide();
		calInsurResult.show();
	});

	btnLCalInsur.on('click', function(){
		calInsurResult.hide();
		calInsurInput.show();
	});

	btnHideInsur.on('click', function(){
		pub_ui_common.hideCalInsur();
	});

	$('.cal_insur_box .btn_prd_close2').on('click', function(){
		if(calInsurBox.hasClass('off')){
			calInsurResult.hide();
			calInsurInput.show();
			pub_ui_common.showCalInsur();
		}else{
			pub_ui_common.hideCalInsur();
		}
		
	});

	$('#wrap').on('click', '.dim', function(){
		pub_ui_common.hideCalInsur();
	}); 

	pub_ui_common.chkWinWSize();
};
/*
pub_ui_common.showCalInsur = function(){
	var calInsurBox = $('.cal_insur_box'),
		calInsurBoxH = calInsurBox.find('.inside').outerHeight();
	calInsurBox.attr('tabindex','0');
	$('#wrap').append('<div class="dim">&nbsp;</div>');
	calInsurBox.addClass('on');
	calInsurBox.animate({
		'height': calInsurBoxH
	}, function(){
		$('html, body').css({'height':'100%', 'overflow':'hidden'});
	});
};
pub_ui_common.hideCalInsur = function(){
	var calInsurBox = $('.cal_insur_box');
	calInsurBox.animate({
		'height':'0px',
	}, function(){
		$('html, body').css({'height':'', 'overflow':''});
		$('.dim').remove();
		calInsurBox.removeClass('on');
	});
};
*/
pub_ui_common.showCalInsur = function(){
	var calInsurBox = $('.cal_insur_box'),
		calInsurBoxH = calInsurBox.find('.inside').outerHeight();
	calInsurBox.attr('tabindex','0');
	$('#wrap').append('<div class="dim">&nbsp;</div>');
	calInsurBox.addClass('on');
	calInsurBox.removeClass('off');
	calInsurBox.animate({
		'height': calInsurBoxH,
		'bottom':'0px'
	}, function(){
		$('html, body').css({'height':'100%', 'overflow':'hidden'});
	});
};
pub_ui_common.hideCalInsur = function(){
	var calInsurBox = $('.cal_insur_box'),
		calInsurBoxH = calInsurBox.find('.inside').outerHeight();
	calInsurBox.addClass('off');
	calInsurBox.removeClass('on');
	calInsurBox.animate({
		//'height':'0px',
		'bottom': '-275px',
	}, function(){
		$('html, body').css({'height':'', 'overflow':''});
		$('.dim').remove();
		calInsurBox.removeClass('on');
	});
};

pub_ui_common.chkWinWSize = function(){
	var winW = $(window).width(),
		circlePos = $('.cal_insur_box .btn_prd_close');
	if ((winW % 2) == 1){
		circlePos.addClass('odd');
	}
	else{
		circlePos.removeClass('odd');
	}
}

//footer
pub_ui_common.fnFooterPos = function(){
	var winHeight = $(window).height(),
		justifyContH = winHeight - ($('#header').outerHeight() + $('#footer').outerHeight()),
		realContH = $('#contents').outerHeight() + $('#head').outerHeight();

	if($('body').hasClass('basic')){
	//setTimeout(function(){
		if (realContH >= justifyContH)
		{
			$('#container').height('');
		}
		else{
			$('#container').height(justifyContH);
		}
	//},500);
	}
};

//main
/*180726 �ъ슜�덊븿
pub_ui_common.fnMainAction = function(){
	//banner
	if($.fn.bxSlider){
		var mainRollB = $('.main_roll_banner > ul');
		mainBanSlider = mainRollB.bxSlider({
							controls: false,
							autoControls: true,
							startText: '�쒖옉',
							stopText: '�뺤�',
							autoControlsCombine: true,
							auto: true,
							speed: 500,
							pause: 3000,
							autoStart: true,
							touchEnabled: true
						});
		var mainSlideQty = mainBanSlider.getSlideCount();
		if (mainSlideQty == 1) { mainBanSlider.destroySlider(); }
	}
};
*/
//泥�빟: 蹂댄뿕猷뚯꽕怨�
pub_ui_common.fnInsurChk = function(){
	var showChangeInsurBtn = $('.plan_info_default .btn_show_detail'),
		showChangeInsurBox = $('.plan_info_change');
	showChangeInsurBtn.on('click', function(){
		if($(this).hasClass('expand')){
			showChangeInsurBox.slideUp();
			$(this).removeClass('expand');
		}
		else{
			showChangeInsurBox.slideDown();
			$(this).addClass('expand');
		}
	});
};

//泥�빟: 媛��� �� �뚮┫�섎Т�ы빆
pub_ui_common.fnJoinBeforeChk = function(){
	var joinChkBox = $('.join_before_chk'),
		joinChkBoxItem = joinChkBox.find('>.join_chk_list>li'),
		joinChkSize = joinChkBoxItem.length,
		chkPrevBtn = joinChkBox.find('.prev'),
		chkNextBtn = joinChkBox.find('.next'),
		curr = 0; 

	joinChkBoxItem.hide().first().show();
	chkPrevBtn.hide();

	chkNextBtn.on('click', function(){
		joinChkBoxItem.eq(curr).hide();
		if((curr + 1) < joinChkSize){
			curr += 1;
			if((curr + 1) == joinChkSize){
				chkNextBtn.hide();
			}
			if(curr >= 1){
				chkPrevBtn.show();
			}
		}
		joinChkBoxItem.eq(curr).show(); //show next
	});

	chkPrevBtn.on('click', function(){
		joinChkBoxItem.eq(curr).hide();
		if(curr > 0){
			curr -= 1;
			if(curr == 0){
				chkPrevBtn.hide();
			}
			if(curr < joinChkSize){
				chkNextBtn.show();
			}
		}
		joinChkBoxItem.eq(curr).show(); //show prev
	});
};

//�곹뭹
pub_ui_common.fnProductAction = function(){
	pub_ui_common.prdResizeCont();

	//�곹뭹媛쒖슂: 媛��� �꾩뿉 瑗� �뚯븘�먯꽭��. �꾩퐫�붿뼵�ㅽ���. 
	$('.before_join_info').find('a').trigger('click');//if first item displayed, show this line.
};

/*
pub_ui_common.prdResizeCont = function(){
	var winH = $(window).height(),
		prdHead = $('.product #head'),
		prdTabs = $('.prd_desc_wrap .g_tab_02'),
		prdHeaderH = $('.product #header').height(),
		prdHeadH = $('.product #head').height(),
		prdTabH = $('.product .g_tab_02').height(),
		prdBeniInfo = $('.prd_benefit_info'),
		prdDescTab = prdTabs.find('a'),
		prPlanH = $('.pr_plan').height();
		prdTabsO = prdTabs.offset().top;
	
	prdBeniInfo.height(winH - prdHeaderH - prdHeadH - prdTabH - 1);

	$(window).on('scroll', function(){
		prPlanH2 = $('.pr_plan').outerHeight();
		//fixed head
		if($(window).scrollTop() > 11){
			prdHead.removeClass('prd_head').addClass('fix_head');
		}
		else{
			prdHead.removeClass('fix_head').addClass('prd_head');
		};
		//fixed tab
		if($('.pr_plan').is(':visible') == true){
			if($(window).scrollTop() >= (prdTabsO - 182) + prPlanH2){
				prdTabs.addClass('fix_tab');
			}
			else{
				prdTabs.removeClass('fix_tab');
			}
		}else{
			if($(window).scrollTop() >= (prdTabsO - 182)){
				prdTabs.addClass('fix_tab');
			}
			else{
				prdTabs.removeClass('fix_tab');
			}
		}
	});

	prdDescTab.on('click', function(){
		if($('.pr_plan').is(':visible') == true){
			$('html, body').animate({scrollTop:(prdTabsO - 182 + prPlanH2)}, 200);
		}else{
			$('html, body').animate({scrollTop:(prdTabsO - 182)}, 200);
		}
		//$('html, body').scrollTop(winH - 182);
		//$('html, body').animate({scrollTop:(winH - 182)}, 200);
		return false;
	});
};
*/

pub_ui_common.prdResizeCont = function(){
	var winH = $(window).height(),
	prdHead = $('.product #head'),
	prdTabs = $('.prd_desc_wrap .contTabN'),	//prdTabs = $('.prd_desc_wrap .g_tab_02'),
	prdTabsOT = $('.prd_desc_wrap .contTabN').offset().top,	//prdTabsOT = $('.prd_desc_wrap .g_tab_02').offset().top,
	prdHeaderH = $('.product #header').height(),
	prdHeadH = $('.product #head').height(),
	prdTabH = $('.product .contTabN').height(),	//prdTabH = $('.product .g_tab_02').height(),
	prdBeniInfo = $('.prd_benefit_info'),
	prdDescTab = prdTabs.find('a'),
	prPlanH = $('.pr_plan').height();
	
	if($('.pr_plan').is(':visible') == true){
		prdTabsO = $('.pr_plan').offset().top;
	}
	
	//prdBeniInfo.height(winH - prdHeaderH - prdHeadH - prdTabH - 1);
	
	
	$(window).on('scroll', function(){
		//180717 異붽�
		if($('.pr_plan').is(':visible') == true){
			prdTabsO = $('.pr_plan').offset().top;
			
			//(181001) �ㅼ씠�됲듃 媛꾪렪蹂댄뿕猷� 怨꾩궛 : �먯꽍諛�(諛붾줈媛��낇븯湲곕쾭��) �몄텧 �꾩튂
			if($(".page_title").offset().top < $(".btnBox:visible .btn_05").offset().top ) {
				$('.onlineJoin_box').css('display','none');
				$(".float_banner").removeClass("view_fixed");
			}
			else {
				$('.onlineJoin_box').css('display','block');
				$(".float_banner").addClass("view_fixed");
			}
		}
		
		prPlanH2 = $('.pr_plan').outerHeight();
		tgContH2 = $('#ToggleCon').outerHeight();//180723 異붽�
		
		if($('#ToggleCon').is(':visible') == true){//180723 異붽�
			prd99TabsO = $('#ToggleCon').offset().top;
			//(181001) 9900ONE 媛꾪렪蹂댄뿕猷� 怨꾩궛 : �먯꽍諛�(諛붾줈媛��낇븯湲곕쾭��) �몄텧 �꾩튂
			if($(".page_title").offset().top < $(".btn_full_block a").offset().top ) $('.onlineJoin_box').css('display','none');
			else $('.onlineJoin_box').css('display','block');
		}
		
		//fixed head
		if($(window).scrollTop() > 50){
			prdHead.removeClass('prd_head').addClass('fix_head');
		}
		else{
			prdHead.removeClass('fix_head').addClass('prd_head');
		};
		//fixed tab
		if($('.pr_plan').is(':visible') == true){
			//if($(window).scrollTop() >= (prdTabsO - 203) + prPlanH2){
			if($(window).scrollTop() >= (prdTabsO - 140) + prPlanH2){//(180918) �섏젙
				prdTabs.addClass('fix_tab');
			}
			else{
				prdTabs.removeClass('fix_tab');
			}
		}
		else if($('#ToggleCon').is(':visible') == true){//180723 異붽� : 9900�곹뭹�� 寃쎌슦
			//if($(window).scrollTop() >= (prd99TabsO - 203) + tgContH2){
			if($(window).scrollTop() >= (prd99TabsO - 105) + tgContH2){//(180918) �섏젙
				prdTabs.addClass('fix_tab');
			}
			else{
				prdTabs.removeClass('fix_tab');
			}
		}else{
			//(180918) 媛꾪렪蹂댄뿕猷� 怨꾩궛�� ��퀬�뺥븯�� �꾩튂, snum 異붽�
			var snum = (prdTabs.parents("#container").find("#head").hasClass("goods99")) ? 250:240;
			//if($(window).scrollTop() >= (prdTabsOT - 203)){
			if($(window).scrollTop() >= snum){
				prdTabs.addClass('fix_tab');
			}
			else{
				prdTabs.removeClass('fix_tab');
			}
		}
	});
	
	/*
	prdDescTab.on('click', function(){
		if($('.pr_plan').is(':visible') == true){
			//$('html, body').animate({scrollTop:(prdTabsO - 203 + prPlanH2)}, 0);
		}else{
			//$('html, body').animate({scrollTop:(prdTabsOT - 203)}, 0);
		}
		//$('html, body').scrollTop(winH - 182);
		//$('html, body').animate({scrollTop:(winH - 182)}, 200);
		return false;
	});*/
	if(prdDescTab){//(181012) �대떦��씠 �덈뒗 寃쎌슦留� �ㅽ뻾
		//(180918) �곹뭹�덈궡 �� �대┃ �� ��빻�먯툩 �꾩튂 ��쁺�� �곷떒�쇰줈
		prdDescTab.on('click', function(e){
			e.preventDefault();
			var psNum = (prdTabs.parents("#container").find("#head").hasClass("goods99"))?252:242;//9900:�ㅼ씠�됲듃
			var path = $(this).attr("href");
			if(prdTabs.hasClass("fix_tab")){
				if($('.pr_plan').is(':visible') == true && $('#ToggleCon').is(':visible') == false){
					//�ㅼ씠�됲듃蹂댄뿕 蹂댄뿕猷뚭퀎�고썑
					$('html, body').animate({scrollTop:(prdTabsO - 140 + prPlanH2)}, 0);
				}
				else if($('.pr_plan').is(':visible') == false && $('#ToggleCon').is(':visible') == true){
					//9900ONE蹂댄뿕 蹂댄뿕猷뚭퀎�고썑
					var tabdH = (path == "#tabcont_0102") ? 135 : 120;
					$('html, body').animate({scrollTop:($(path).offset().top - tabdH)}, 0);
				}
				else {//蹂댄뿕猷뚭퀎�곗쟾
					$(window).scrollTop(psNum);
				}
			}
		});
	}
	
	
};

$(document).ready(function(){
	if($('.pr_plan').is(':visible') == true){
		if($('#head').hasClass('fix_head') == true){
			$('html, body').animate({scrollTop:$('.pr_plan').offset().top - 90}, 500);
		}else{
			$('html, body').animate({scrollTop:$('.pr_plan').offset().top - 169}, 500);
		}
	}else{
		
	}	
});

//怨좉컼�쇳꽣: 媛��낅갑踰뺤븞��
pub_ui_common.fnCuJoinGuide = function(){
	if($.fn.bxSlider){
		/*
		//pc
		//180702 �ъ슜�덊븿
		var joinPcGuideRoll = $('.info_pc > .list_guide');
		joinPcGuideSlider = joinPcGuideRoll.bxSlider({
							controls: true,
							pager: false,
							infiniteLoop: false,
							hideControlOnEnd: true,
							touchEnabled: true
						});
		var pcGuideSlideQty = joinPcGuideSlider.getSlideCount();
		if (pcGuideSlideQty == 1) { joinPcGuideSlider.destroySlider(); }
		 */
		//mobile
		var joinMobileGuideRoll = $('.info_mobile > .list_guide');
		if(joinMobileGuideRoll.length > 0){
			joinMobileGuideSlider = joinMobileGuideRoll.bxSlider({
								controls: true,
								pager: false,
								infiniteLoop: false,
								hideControlOnEnd: true,
								touchEnabled: true
							});
			var mobileGuideSlideQty = joinMobileGuideSlider.getSlideCount();
			if (mobileGuideSlideQty == 1) { joinMobileGuideSlider.destroySlider(); }
		}
	}
};

// #DTC 10�� �뚮옯�� 媛쒖꽑 (181010 : �곹뭹�덈궡 tab2)
pub_ui_common.fnGoodsInfoAction = function(){
	// hide()濡� �명븳 bxslider -> viewport.height:v()�� height:0�쇰줈 �좎뼵�섏뼱 異쒕젰�섏� �딅뒗 踰꾧렇
	// �곸쐞��씠�숉썑 tab2�대┃ �� �щ씪�대뱶 �� 而⑦뀗痢� �믪씠媛� �댁쟾 �� 而⑦뀗痢� �믪씠�� 媛숈븘吏��� 臾몄젣
	// tabLink cllick �� fixed height媛� viewport inline style濡� �좎뼵
	//$('.js_tabs.contTabN a, .prd_desc_wrap .js_tabs a').on('click', function(e){
	$('.prd_desc_wrap .js_tabs a').on('click', function(e){
		e.preventDefault();
		var tabID = $(this).attr('href');
		if(tabID == "#tabcont_0102"){
			//�щ씪�대뱶 �숈옉�� �믪씠媛� 諛붾��(adaptiveHeight), 泥섏쓬 �몄텧�섎뒗 �쒖꽦�� �� 而⑦뀗痢좎쓽 �믪씠濡� 吏���
			var ind = parseInt($(".bx-pager-link.active").attr("data-slide-index"))+1;
			var activeTabContH = $("#tabcont_020"+ind).height();
			var deviceW = $('ul.js_tabs').width();
			
			//pc�먯꽌 �뺤씤�� 紐⑤컮�쇰쾭�꾩쑝濡� �꾪솚 �꾩뿉 pc�믪씠�� 留욊쾶 �믪씠媛� 吏��뺣맖. 紐⑤컮�쇨린湲곗뿉�쒕뒗 �곴��놁쑝�� �섎せ�쒓쾬泥섎읆 蹂댁뿬 異붽�
			if(activeTabContH > window.innerHeight) activeTabContH = "313";
			
			$("#tabcont_0102").find(".bx-wrapper .js_tcont").css('width',deviceW+'px');
			$("#tabcont_0102 .bx-viewport").css('height',activeTabContH+'px');
		}
	});
	
	if($.fn.bxSlider){
		var goodsInfoRoll = $('.js_tab_conts > .slider_tab_cont');
		if(goodsInfoRoll.length > 0){
			goodsInfoSlider = goodsInfoRoll.bxSlider({
				mode: "horizontal",
				controls: true,
				autoControls: true,
				autoControlsCombine: true,
				autoStart: false,
				pager:true,
				adaptiveHeight:true,
				adaptiveHeightSpeed:500,
				infiniteLoop:false,
				hideControlOnEnd:true,
				touchEnabled: true,
				preventDefaultSwipeX:true,
				preventDefaultSwipeY:false,
				oneToOneTouch: true
			});
			var goodsInfoSlideQty = goodsInfoSlider.getSlideCount();
			if (goodsInfoSlideQty == 1) { goodsInfoSlider.destroySlider(); }
			
			var deviceW = $('ul.js_tabs').width();
			$("#tabcont_0102").find(".bx-wrapper .js_tcont").css('width',deviceW+'px');
		}
	}
};

//#DTC 10�� �뚮옯�� 媛쒖꽑
pub_ui_common.fnGoodsAction = function(){
	var prdHead = $('.product .cover_title');
	
	$(window).on('scroll', function(){
		//�곹뭹紐� ���댄� �먯꽍諛�
		if($(window).scrollTop() > 50) prdHead.removeClass('prd_head').addClass('fix_head');
		else prdHead.removeClass('fix_head').addClass('prd_head');
		
		//諛붾줈媛��낇븯湲곕쾭�� �먯꽍諛� �몄텧 �꾩튂 : 9900
		if($('#ToggleCon').is(':visible') == true){
			if($(".cover_title .fix_tit").offset().top < $(".btn_sum_join").offset().top ) {
				$('.onlineJoin_box').css('display','none');
				$(".float_banner").removeClass("view_fixed");
			}
			else {
				$('.onlineJoin_box').css('display','block');
				$(".float_banner").addClass("view_fixed");
			}
		}
		
	});
};

//resize
$(window).resize(function(){
	$('.g_layer_box').each(function(){
		pub_ui_common.layerPop(this);
	});
	//pub_ui_common.gnbResize();
	pub_ui_common.fnFooterPos();
	pub_ui_common.chkWinWSize();
	//pub_ui_common.prdResizeCont();
});

// 2017-05-17 異붽�
$(document).ready(function(){
	var btnStyleSelect2 = $('.g_btn_sel_n a');
	btnStyleSelect2.on('click', function(e){
		e.preventDefault();
		/*if ($(this).hasClass('on'))
		{
			$(this).removeClass('on');
		}else{
			$(this).addClass('on').siblings().removeClass('on');
		}*/
		if ($(this).parent().children().length == 1)
		{
			$(this).toggleClass('on');	
			$('.g_btn_sel_n.marker_color').toggleClass('active');
		}else{
			$(this).addClass('on').siblings().removeClass('on');
			$('.g_btn_sel_n.marker_color').removeClass('active');
		}
	});
});

// �뺢��� �대깽��
pub_ui_common.fnEventPop = function(){
	// �뺢��� �대깽�� �덉씠�대같��
	var eVentBan = $('.eventBanner');
	eVentBan.on('click', '.ebClose a', function(){
		$(this).closest('.eventBanner').hide();
	});

	var eVentIn = $('.evB');
	var eVentPop = $('#PlanEvent');
	eVentIn.on('click', function(){
		eVentPop.show();
	});
};

////////////////////// 泥�빟�꾨줈�몄뒪 媛쒖꽑 愿��� js /////////////////////////
// 吏곸뾽李얘린 > 鍮좊Ⅸ 吏곸뾽 李얘린
$(document).ready(function(){
	var qJobBtn = $('.qJobList > li > a');
	qJobBtn.on('click', function(e){
		e.preventDefault();
		if ($(this).parent().parent().children().length == 1){
			alert(this);
			$(this).toggleClass('on');
		}else{
			$(this).addClass('on').parent().siblings().children().removeClass('on');
		}
	});

	//button style select
	var ReBtnSel = $('.btnSel > a');
	ReBtnSel.on('click', function(e){
		e.preventDefault();
		if ($(this).parent().children().length == 1)
		{
			$(this).toggleClass('on');	
			//$('.g_btn_sel.marker_color').toggleClass('active');
		}else{
			$(this).addClass('on').siblings().removeClass('on');
			//$('.g_btn_sel.marker_color').removeClass('active');
		}
	});

	// 異붽��뺤씤�ы빆 泥ル쾲吏� �쒖꽦��
	$('.inSelAgr > ul > li').eq(0).find('.js_qtitle a').trigger('click');

	// �④퀎 �� section
	var secTit = $('#contents .secTitle'),
		secCont = $('#contents .secContent');
		secContBtn = $('#contents .secContent .SeBtnBox a');
		secNeBtn = $('.NeBtnBox');
	if(secTit.length <= 1){
		secNeBtn.show();
	} else {
		secNeBtn.hide();
	}
	
	secTit.hide();
	secCont.hide();
	$('#contents > .secTitle').eq(0).show().addClass('on');
	$('#contents > .secContent').eq(0).show();
	secTit.on('click', function(e){
		e.preventDefault();
		if($(this).hasClass('on') == false){
			secTit.siblings('.secContent').slideUp(500);
			secTit.siblings().removeClass('on');
			var ind = $('#contents > .secTitle').index(this);
			if(ind == 0){
				$(this).next().slideDown(500)
				.queue(function(){
					//$('html, body').animate({scrollTop:$(this).offset().top - 126}, 500)
					$('html, body').animate({scrollTop:$(this).offset().top - 136}, 500)//180719 : �곷떒�щ갚 蹂�寃�
					$(this).dequeue();
				});
			} else {
				$(this).next().slideDown(500)
				.queue(function(){
					//$('html, body').animate({scrollTop:$(this).offset().top - 116}, 500)
					//$('html, body').animate({scrollTop:$(this).offset().top - 124}, 500)//180704
					$('html, body').animate({scrollTop:$(this).offset().top - 134}, 500)//180719 : �곷떒�щ갚 蹂�寃�
					$(this).dequeue();
				});
			};
			$(this).addClass('on').show();
		} else{
			//secTit.removeClass('on');
			//secTit.siblings('.secContent').slideUp(500);
		}
	});
	secContBtn.on('click', function(e){
		e.preventDefault();
		if($(this).hasClass('on') == true){
			secTit.siblings('.secContent').slideUp(500);
			secTit.siblings().removeClass('on');
			$(this).parent().parent().nextAll('.secTitle').eq(0).addClass('on').show();
			$(this).parent().parent().nextAll('.secContent').eq(0).slideDown(500)
			.queue(function(){
				//$('html, body').animate({scrollTop:$(this).offset().top - 116}, 500)
				//$('html, body').animate({scrollTop:$(this).offset().top - 124}, 500)//180704
				$('html, body').animate({scrollTop:$(this).offset().top - 134}, 500)//180719 : �곷떒�щ갚 蹂�寃�
				$(this).dequeue();
			});
		} else {
			//secTit.removeClass('on');
			//secTit.siblings('.secContent').slideUp(500);
		};

		var secLast = $('#contents .secContent').eq(-2).find('.SeBtnBox a');
		if($(this).is(secLast) && $(this).hasClass('on') == true){
			secNeBtn.show();
		}
	});
	
	// ��찓��
	var REtabCont = $('.REjs_tab_conts .REjs_tcont'),
		REtabs = $('.REjs_tabs > li'),
		REtabLink = REtabs.find('>a'),
		REsaveHeight = [];

	if ($('.REjs_tab_conts').hasClass('how2join')==true) {
		REtabs.each(function(){ 
			var REtabID = $(this).children('a').attr('href');
			var REpxHeight = $(REtabID).height();
			REsaveHeight.push(REpxHeight);
		});
	};
	function REprintHeight(item, index){
		var REhereTabID = '#tabcont_010' + (index+1);
		var REdeviceWidth = $('ul.js_tabs').width();
		$(REhereTabID).find('.bx-wrapper').css('height',item+20+'px');
		$(REhereTabID).find('.bx-viewport').css('height',item+20+'px');
		$(REhereTabID).find('.list_guide').find('li').css('width',REdeviceWidth+'px');
	};
	REtabCont.hide();
	REtabs.each(function(){
		if($(this).hasClass('on')){
			var REtabID = $(this).children('a').attr('href');
			$(REtabID).show();
			$(this).children('a').attr('title','�좏깮�� ��');
		}
	});
	REtabLink.on('click', function(e){
		e.preventDefault();
		$(this).parent('li').siblings().children('.REjs_tcont').hide();
		$(this).parent('li').addClass('on').siblings().removeClass('on');
		$(this).parent('li').siblings().children('a').attr('title','');
		var REtabID = $(this).attr('href');
		REsaveHeight.forEach(REprintHeight);
		$(REtabID).show();
		$(this).attr('title','�좏깮�� ��');

		pub_ui_common.fnFooterPos();
		if($('.pr_plan').is(':visible') == true){
			if($('#head').hasClass('fix_head') == true){
				$('html, body').animate({scrollTop:$('.pr_plan').offset().top - 90}, 500);
			}else{
				$('html, body').animate({scrollTop:$('.pr_plan').offset().top - 169}, 500);
			}
		}else{
			
		}	
	});
	
	/*
	// 媛쒖씤(�좎슜)�뺣낫泥섎━ �숈쓽 �꾩퐫�붿뼵
    var LaCont = $('.jsLa_conts .La_acont'),
        LaTit = $('.jsLa_conts .La_tit'),
        LaContBtnA = $('.jsLa_conts1 .La_acont .btnBox input:first-child'),
        LaContBtnB = $('.jsLa_conts2 .La_acont .btnBox input:first-child'),
        LaContBtn2 = $('.jsLa_conts .La_acont .btnBox input:nth-of-type(2)');

    LaCont.hide();
    LaTit.on('click', function(e){
        e.preventDefault();
        var LaItem = $(this).parent();
        if(LaItem.hasClass('on') == false){
            LaItem.siblings().children('.La_acont').slideUp(100);
            LaItem.siblings().removeClass('on');
            $(this).next().slideDown(100);
            $(this).parent().addClass('on');
        }else{
        }
    });

    LaContBtnA.on('click', function(){
        $('.chBx').hide();
        LaCont.slideUp(100);
        LaTit.parent().removeClass('on');
        $(this).parent().parent().parent().nextAll('li').eq(0).children('.La_acont').slideDown(100);
        $(this).parent().parent().parent().nextAll('li').eq(0).addClass('on');
        $(this).parent().parent().parent().nextAll('li').eq(0).find('button').focus();
    });

    LaContBtnB.on('click', function(){
        $('.chBx').show().find('input:first').focus();
    });

    LaContBtn2.on('click', function(){
        if($('.LaCoList1 > li').length < 2){
            $('.chBx').hide();
            $(this).closest('.jsLa_conts').siblings('.SeBtnBox').find('a').focus();
        }else{
        }
    });
	$('.jsLa_conts > ul > li').eq(0).addClass('on');
	$('.jsLa_conts > ul > li').eq(0).children('.La_acont').show();
	 */
	// 媛쒖씤(�좎슜)�뺣낫泥섎━ �숈쓽 �꾩퐫�붿뼵 : 180709 �섏젙
    var LaCont = $('.jsLa_conts .La_acont'),
        LaTit = $('.jsLa_conts .La_tit'),
        LaContBtnA = $('.jsLa_conts .La_acont .btnBox #pachk11_1'),//�숈쓽
        LaContBtnB = $('.jsLa_conts .La_acont .btnBox #pachk11_2');//誘몃룞��

    LaCont.hide();
    LaTit.on('click', function(e){
        e.preventDefault();
        var LaItem = $(this).parent();
        if(LaItem.hasClass('on') == false){
            LaItem.siblings().children('.La_acont').slideUp(100);
            LaItem.siblings().removeClass('on');
            $(this).next().slideDown(100);
            $(this).parent().addClass('on');
        }else{
        }
    });

    LaContBtnA.on('click', function(){ $('.chBx').show(); });
    LaContBtnB.on('click', function(){ $('.chBx').hide(); });

	$('.jsLa_conts > ul > li').eq(0).addClass('on');
	$('.jsLa_conts > ul > li').eq(0).children('.La_acont').show();
	
	// fixed focus Bug
	/*$(function(){
		$('.applicationRe .g_layer_box.l_agree input').each(function(){
			var hp_lay = $('.applicationRe .g_layer_box.l_agree');
			var hp_lay_h = $('.applicationRe .g_layer_box.l_agree .g_layer_header');
			$(this).bind('focus',function(){
				var wh = $(window).scrollTop();
				hp_lay.css('position','absolute');
				hp_lay_h.css('position','absolute');
				$('html, body').css({'height':'100%', 'overflow':'hidden'});
				$('#l_agree').css('top',wh + 'px');
			});
			$(this).bind('blur',function(){
				hp_lay.css('position','fixed');
				hp_lay_h.css('position','fixed');
				$('html, body').css({'height':'', 'overflow':''});
				$('#l_agree').css('top','')
			});
		});
	});*/

//	$(document).on('blur','input',function(){   
//		setTimeout(function(){
//			window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
//		});
//	});
	/*
	// 20180423 line: 932~936 scroll 愿��� �ㅽ겕由쏀듃  �섏젙    
	$(document).on('blur','input',function(){
		if($('.btnBox').hasClass("scrollNo")) {
			return false;
		} else {
			setTimeout(function(){
				window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
			});
		}
	});
	*/
	$(function(){
		$('.l_agree').each(function(){
			var intp = $('.l_agree .LagCode input');
			var update = function(){
				var ic = $('.l_agree .LagCode input').val().length;
				if(ic >= 6){
					intp.closest('.LagCode').siblings('.SeBtnBox').find('a').focus();
				}
			};

			intp.bind('input keyup paste', function(){
				setTimeout(update, 0)
			});
			update();
		});
	});
	
	//180822 : step2 selectbox 湲곕낯媛� 而щ윭 蹂�寃�
	function selectDefaultChange(){
		$(".infoForm select, .secContent select, .applicationRe .g_layer_box select").each(function(){
			//泥ル쾲吏� option媛믪뿉 '�좏깮 or �좏깮�섏꽭�붾벑'�� �덈뒗吏� �뺤씤�섍린 �꾪븳 媛�
			var defaultTxt = $(this).find("option:nth-child(1):contains(�좏깮):selected").text();
			if(defaultTxt) $(this).addClass("default");
			
			$(this).on("change",$(this),function(){
				var defaultTxt = $(this).find("option:nth-child(1):contains(�좏깮):selected").text();
				if(defaultTxt) $(this).addClass("default");
				else $(this).removeClass("default");
			});
		});
	}
	
	selectDefaultChange();
	
	//�숈쟻�앹꽦 selectbox event : 異붽�踰꾪듉 �뚮��� ��
	$(".btn_add").each(function(){
		$(this).on("click",function(){
			//$(".addTbody select").addClass("default");
			$(this).parent().parent().parent().find(".tb_input:last-child select").addClass("default");
			selectDefaultChange();
		});
	});
	
});


/////////////////// 移섏븘蹂댄뿕 �좉퇋 ////////////////////
$(document).ready(function(){
	$('.btInputDown .btnE').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active').siblings('.toggleCon').slideUp(200);
//			$(this).parent().siblings('.bottomTxt').animate({marginTop: '23px'}, 200);
//			$(this).parent().siblings('.btInputDownSex').animate({marginTop: '15px'}, 200);
		} else {
			$(this).addClass('active').siblings('.toggleCon').slideDown(200);
			$(this).parent().siblings().find('.toggleCon').slideUp(200);
			$(this).parent().siblings().find('.btnE').removeClass('active');
//			$(this).parent().siblings('.bottomTxt').animate({marginTop: '79px'}, 200);
//			$(this).parent().siblings('.btInputDownSex').animate({marginTop: '44px'}, 200);
		}
	});
	
//	$('.btInputDown .btM').click(function(){
//		if($(this).hasClass('active')){
//			$(this).parent().siblings('.txt').animate({marginTop: '110px'}, 200);
//		} else {
//			$(this).parent().siblings('.txt').animate({marginTop: '20px'}, 200);
//		}
//	});
//
//	
//	$('.btInputDown .btM2').click(function(){
//		if($(this).hasClass('active')){
//			$(this).parent().siblings('.downCon').animate({marginTop: '80px'}, 200);
//		} else {
//			$(this).parent().siblings('.downCon').animate({marginTop: '40px'}, 200);
//		}
//	});

	$('.prd_benefit_info .btnConfir').click(function(){
		$('#ToggleCon').slideDown(200);
		setTimeout(function(){
			$('body, html').animate({
				scrollTop: 399
			}, 500);
			$('.counter').counterUp({
				delay: 10,
				time: 500
				});
		}, 300);

		setTimeout(function(){
			$('body').addClass('bgOn');	
			$('.onlineJoin_box').css('position','fixed')
		}, 400);		
	});
	
	$('.prd_benefit_info .tooth99_btnConfir').click(function(){
		$('#ToggleCon').slideDown(200);
		setTimeout(function(){
			$('body, html').animate({
				scrollTop: 399
			}, 500);
			$('.counter').counterUp({
				delay: 10,
				time: 500
				});
		}, 300);

		setTimeout(function(){
			$('body').addClass('bgOn');	
			$('.onlineJoin_box').css('position','fixed')
		}, 400);		
	});
	
	/* 9900,�ㅼ씠�됲듃 移섏븘蹂댄뿕 蹂댁쿋�뱀빟(180824 : �명꽣�숈뀡 蹂�寃� �뚯뒪��, �먮낯)
	$('.btnToggleBox .btnToggle .btDown').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active').parent().parent().siblings('.clickTooth').slideUp(200);
			$(this).parent().siblings('.txtChange').find('p:last-child').addClass('on');
			$(this).parent().siblings('.txtChange').find('p:first-child').removeClass('on');
			
		} else {
			$(this).addClass('active').parent().parent().siblings('.clickTooth').slideDown(200);
			$(this).parent().siblings('.txtChange').find('p:first-child').addClass('on');
			$(this).parent().siblings('.txtChange').find('p:last-child').removeClass('on');

		}
	});
	*/
	
	/*(180824) 9900,�ㅼ씠�됲듃 移섏븘蹂댄뿕 蹂댁쿋�뱀빟
	 * slideUp&slideDown �숈옉�� 蹂댁쿋�뱀빟 踰꾪듉�꾩튂媛� window李쎌쓽 �섎떒�� �ㅺ쾶 scroll�꾩튂 蹂�寃�
	 * (180827) �꾩씠�곕넂�닿� �ㅻⅤ寃� �곸슜 : $(window).height() -> window.innerHeight*/
	$('.btnToggleBox .btnToggle .btDown').click(function(){
		var clickToothH;
		var activeH;
		var nonActiveH;
			
		if($(this).parents().hasClass("toggleConInner")) {//9900ONE 移섏븘蹂댄뿕
			clickToothH = $(".clickTooth").height(); activeH = 180; nonActiveH = 160;
		}
		else{//�ㅼ씠�됲듃 移섏븘
			clickToothH = $(".clickTooth").height();
			//(180918) �먯꽍諛붿쑀臾� �꾩튂 �섏젙
			if($(".product .pr_plan").is(":visible") == false) {
				activeH = 113; nonActiveH = 95;//'諛붾줈媛��낇븯湲�'踰꾪듉 �먯꽍諛붽� �놁쓣 �� �꾩튂
			}
			else {
				activeH = 163; nonActiveH = 145;//'諛붾줈媛��낇븯湲�'踰꾪듉 �먯꽍諛붽� �덉쓣 �� �꾩튂
			}
		}
			
		if($(this).hasClass('active')){
			$(this).removeClass('active').parent().parent().siblings('.clickTooth').slideUp('slow');
			$("html,body").stop().animate({scrollTop:($(".btnToggleBox").offset().top - window.innerHeight) - clickToothH + activeH},'0');
				
			$(this).parent().siblings('.txtChange').find('p:last-child').addClass('on');
			$(this).parent().siblings('.txtChange').find('p:first-child').removeClass('on');
		} else {
			$(this).addClass('active').parent().parent().siblings('.clickTooth').slideDown('slow');
			$("html,body").stop().animate({scrollTop:($(".btnToggleBox").offset().top - window.innerHeight) + clickToothH + nonActiveH},'0');
				
			$(this).parent().siblings('.txtChange').find('p:first-child').addClass('on');
			$(this).parent().siblings('.txtChange').find('p:last-child').removeClass('on');
		}
	});
	
	/*2018-02-27*/
	/*
	$('.linkBtn a').click(function(){
		$('body, html').animate({
				scrollTop: 250
			}, 500);
	});
	*/
	/*
	$('#planPonA2 .btn_layer_close ').click(function(){
		$('body, html').animate({
				scrollTop: 250
			}, 500);
	});

	$('#planPonB1 .btn_layer_close ').click(function(){
		$('body, html').animate({
				scrollTop: 250
			}, 500);
	});
	*/
	
	// STEP3 臾몄꽌�뺤씤 怨꾩냽吏꾪뻾踰꾪듉 �쒖뼱
	$("li[id^='confirm_2']").click(function(){
		setTimeout(function(){
			if($("li[id^='confirm_2']").length == $("li[id^='confirm_2'].on").length){
	    		$("#next_btn_2").show();
		    }else{
		    	$("#next_btn_2").hide();
		    }
		},300);		    
	});
	
	if($("li[id^='confirm_2']").length == $("li[id^='confirm_2'].on").length){
	    $("#next_btn_2").show();
	}else{
	    $("#next_btn_2").hide();
    }

});