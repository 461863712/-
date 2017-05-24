function loadNewDiv2(urlpath,postdata,callback,callback_param,offsettop,offsetleft,focusid)
{
	var sendType = "POST";
	if(!postdata || postdata.length<1){
		sendType = "GET";
	}
	$.ajax(
	{
		type: sendType,
		url: urlpath,
		data: postdata,
		cache: false,
		success: function(html)
		{ 
			if(offsettop){
				if((offsettop+"").indexOf("px")!=-1){
					offsettop = (offsettop+"").substr(0,(offsettop+"").length-2);
				}
				offsettop = parseInt(offsettop);
			}
			if(offsetleft){
				if((offsetleft+"").indexOf("px")!=-1){
					offsetleft = (offsetleft+"").substr(0,(offsetleft+"").length-2);
				}
				offsetleft = parseInt(offsetleft);
			}
			popup2(html,offsetleft,offsettop);
			$("#closeElem2").click(function(){
				$("#dialog-overlay2,#dialog-box2").hide();		
				return false;
			});
			inputTaggle2();
			if(focusid && focusid.length>0 && $("#"+focusid).attr("id")){
				$("#"+focusid).focus().focus();
			}
			if(callback){
				callback(callback_param);
			}
		}
	});
}



function popup2(message,left,top) 
{
	if(!$("#dialog-box2").attr("id")){
		var box = "<div id='dialog-overlay2' style='display:none;'></div><div id='dialog-box2' style='display:none;'><div class='dialog-content'><div id='dialog-message2'></div></div></div>";
		$("body").append(box);
	}
	$("#dialog-overlay2,#dialog-box2").hide();
	if (message)
	{
		$("#dialog-message2").html(message);
	}
	
//	$("#dialog-box2").show();
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	/*
	if(!top){
		top = 0;
	}
	var dialogTop =  ($(window).height()/5) + $(document).scrollTop()+top;
//	var dialogLeft = (maskWidth/2) - ($("#dialog-message2 :first-child").outerWidth()/2);
	var offsetleft = ($("#dialog-message2 :first-child").outerWidth()/2);
	if(!offsetleft || offsetleft==0 || offsetleft=="0"){
		offsetleft = maskWidth/6;
	}
	if(left){
		offsetleft = left;
	}
	var leftset = (maskWidth/2) - offsetleft;
//	if(!jQuery.support.cssFloat){
//		leftset = 0;
//		if(navigator.userAgent.indexOf("MSIE 8.0")>0 && navigator.userAgent.indexOf("SV1")<0 && $.browser.version=="8.0"){
//			leftset = (maskWidth/2) - offsetleft;
//		}
//	}
	$("#dialog-overlay2").css({height:maskHeight, width:maskWidth}).show();
	$("#dialog-box2").show().css({top:dialogTop,left:leftset});
//	alert((maskWidth/2) - ($("#dialog-message2 :first-child").outerWidth()/2));
	$(window).resize(function()
	{
		movePopup(left,top);
	});
	*/
	$("#dialog-overlay2").css({height:maskHeight, width:maskWidth}).show();
	centerDiv($("#dialog-box2"));
	$(window).resize(function(){
		centerDiv($("#dialog-box2"));
	});	
	$("#dialog-box2").show();
	
}


function inputTaggle2()
{
	$(".sb_input,.hb_input").find("input").focus(function(){
		var parent = $(this).parent().parent();
		$(".sb_input_this").removeClass("sb_input_this").removeClass("sb_input").addClass("sb_input");
		$(".hb_input_this").removeClass("hb_input_this").removeClass("hb_input").addClass("hb_input");
		if(parent.attr("class").indexOf("sb_input")!=-1){
			parent.removeClass("sb_input").addClass("sb_input_this");
		}else if(parent.attr("class").indexOf("hb_input")!=-1){
			parent.removeClass("hb_input").addClass("hb_input_this");
		}
	}).blur(function(){
		var parent = $(this).parent().parent();
		if(parent.attr("class").indexOf("sb_input_this")!=-1){
			parent.removeClass("sb_input_this").addClass("sb_input");
		}else if(parent.attr("class").indexOf("hb_input_this")!=-1){
			parent.removeClass("hb_input_this").addClass("hb_input");
		}
	});
}

function centerDiv($obj)
{
	 var screenWidth = $(window).width(), screenHeight = $(window).height();
	 var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度  
     var objLeft = (screenWidth - $obj.width())/2 ;  
     var objTop = (screenHeight - $obj.height())/2 + scrolltop; 
	 //var objTop = (screenHeight - $obj.height())/2 // 相对时用
     $obj.css({left: objLeft + "px", top: objTop + "px"});  
}