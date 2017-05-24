var i = 0;
//修改（新）
function popup(message,left,top) 
{
	if(!$("#dialog-box").attr("id")){
		var box = "<div id='dialog-overlay' style='display:none;'></div><div id='dialog-box' style='display:none;'><div class='dialog-content'><div id='dialog-message'></div></div>      </div>";
		$("body").append(box);
	}
	$('#dialog-overlay, #dialog-box').hide();
	if (message)
	{
		$('#dialog-message').html(message);
	}
	
	//$('#dialog-box').show();
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	/** if(!top){
		top = 0;
	}
	var dialogTop =  ($(window).height()/5) + $(document).scrollTop()+top;
	//var dialogLeft = (maskWidth/2) - ($("#dialog-message :first-child").outerWidth()/2);
	var offsetleft = ($("#dialog-message :first-child").outerWidth()/2);
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
	$('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
	$('#dialog-box').show().css({top:dialogTop,left:leftset});
	//alert((maskWidth/2) - ($("#dialog-message :first-child").outerWidth()/2));
	$(window).resize(function()
	{
		movePopup(left,top);
	});*/
	$('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
	centerDiv($('#dialog-box'));
	$(window).resize(function(){
		centerDiv($('#dialog-box'));
	});	
	$('#dialog-box').show();
	
}


function popupOther(message,left,top) 
{
	if(!$("#dialog-box-1").attr("id")){
		var box = "<div id='dialog-box-1' style='display:none;'><div class='dialog-content-1'><div id='dialog-message-1'></div></div></div>";
		$("body").append(box);
	}
	$('#dialog-box-1').hide();
	if (message)
	{
		$('#dialog-message-1').html(message);
	}
	//$('#dialog-box-1').show();
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	if(!top){
		top = 0;
	}
	var dialogTop =  ($(window).height()/5) + $(document).scrollTop()+top;
	//var dialogLeft = (maskWidth/2) - ($("#dialog-message :first-child").outerWidth()/2);
	//$('#dialog-overlay-1').css({height:maskHeight, width:maskWidth}).show();
	var offsetleft = ($("#dialog-message :first-child").outerWidth()/2);
	if(!offsetleft || offsetleft==0 || offsetleft=="0"){
		offsetleft = maskWidth/6;
	}
	if(left){
		offsetleft = left;
	}
	var leftset = (maskWidth/2) - offsetleft;
	if(!jQuery.support.cssFloat){
		leftset = 0;
		if(navigator.userAgent.indexOf("MSIE 8.0")>0 && navigator.userAgent.indexOf("SV1")<0 && $.browser.version=="8.0"){
			leftset = (maskWidth/2) - offsetleft;
		}
	}
	$('#dialog-box-1').show().css({top:dialogTop, left:leftset});
	if(!$('#dialog-overlay').attr("id") || $('#dialog-overlay').css("display")=="none"){
		$('#dialog-overlay').remove();
		var overlay = "<div id='dialog-overlay' style='display:none;'></div>";
		$("body").append(overlay);
		$('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
	}
	//alert((maskWidth/2) - ($("#dialog-message :first-child").outerWidth()/2));
	$(window).resize(function(){
		movePopupOther(left);
	});
}
// alert专用
function popupAlert(message) 
{
	if(!$("#dialog-box-alert").attr("id")){
		var box = "";
		if(!$('#dialog-box').attr("id")){
			box = "<div id='dialog-overlay' style='display:none;'></div>";
		}
		box += "<div id='dialog-box-alert' style='display:none;'><div class='dialog-content-alert'><div id='dialog-message-alert'></div></div></div>";
		$("body").append(box);
	}
	$('#dialog-box-alert').hide();
	if (message)
	{
		$('#dialog-message-alert').html(message);
	}
	//$('#dialog-box-alert').show();
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	var dialogTop =  ($(window).height()/5) + $(document).scrollTop() + 15;
	var offsetleft = 350/2;
	var leftset = (maskWidth/2) - offsetleft;
	if(!jQuery.support.cssFloat){
		leftset = 0;
		if(navigator.userAgent.indexOf("MSIE 8.0")>0 && navigator.userAgent.indexOf("SV1")<0 && $.browser.version=="8.0"){
			leftset = (maskWidth/2) - offsetleft;
		}
	}
	$('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
	$('#dialog-box-alert').show().css({top:dialogTop, left:leftset});
	$(window).resize(function()
	{
		movePopupAlert();
	});
}

function getOutHeight(obj){
	var height = 0;
	if($(obj).children().length){
		i = i+1;
		$(obj).children().each(function(){
			var temp = getOutHeight($(this));
			if(temp){
				height += temp;
			}
		});
	}else{
		var temp = $(obj).outerWidth();
		if(temp){
			height += temp;
		}
	}
	return height;
}

function movePopup(left,top)
{
	if ($('#dialog-box').css("display") != "none")
	{
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		if(!top){
			top = 0;
		}
		var dialogTop =  ($(window).height()/5) + $(document).scrollTop()+top;
		var offsetleft = ($("#dialog-message :first-child").outerWidth()/2);
		if(!offsetleft || offsetleft==0 || offsetleft=="0"){
			offsetleft = maskWidth/6;
		}
		if(left){
			offsetleft = left;
		}
		var leftset = (maskWidth/2) - offsetleft;
		if(!jQuery.support.cssFloat){
			leftset = 0;
			if(navigator.userAgent.indexOf("MSIE 8.0")>0 && navigator.userAgent.indexOf("SV1")<0 && $.browser.version=="8.0"){
				leftset = (maskWidth/2) - offsetleft;
			}
		}
		$('#dialog-overlay').css({height:maskHeight, width:maskWidth});
		$('#dialog-box').css({top:dialogTop, left:leftset});
	}
}
function movePopupOther(left,top)
{
	if ($('#dialog-box-1').css("display") != "none")
	{
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		if(!top){
			top = 0;
		}
		var offsetleft = ($("#dialog-message :first-child").outerWidth()/2);
		if(!offsetleft || offsetleft==0 || offsetleft=="0"){
			offsetleft = maskWidth/6;
		}
		if(left){
			offsetleft = left;
		}
		var dialogTop =  ($(window).height()/5) + $(document).scrollTop()+top;
		var leftset = (maskWidth/2) - offsetleft;
		if(!jQuery.support.cssFloat){
			leftset = 0;
			if(navigator.userAgent.indexOf("MSIE 8.0")>0 && navigator.userAgent.indexOf("SV1")<0 && $.browser.version=="8.0"){
				leftset = (maskWidth/2) - offsetleft;
			}
		}
		$('#dialog-box-1').css({top:dialogTop, left:leftset});
	}
}
function movePopupAlert()
{
	if ($('#dialog-box-alert').css("display") != "none")
	{
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		var offsetleft = 350/2;//($("#dialog-message :first-child").outerWidth()/2);
		
		var dialogTop =  ($(window).height()/5) + $(document).scrollTop() + 15;
		var dialogLeft = (maskWidth/2) - offsetleft;
		var leftset = (maskWidth/2) - offsetleft;
		if(!jQuery.support.cssFloat){
			leftset = 0;
			if(navigator.userAgent.indexOf("MSIE 8.0")>0 && navigator.userAgent.indexOf("SV1")<0 && $.browser.version=="8.0"){
				leftset = (maskWidth/2) - offsetleft;
			}
		}
		$('#dialog-overlay').css({height:maskHeight, width:maskWidth});
		$('#dialog-box-alert').css({top:dialogTop, left:leftset});
	}
}

function hidePopup(){
	if(!$('#dialog-box-1').attr("id") || $('#dialog-box-1').css("display") == "none"){
		$('#dialog-overlay').hide();
	}
	$('#dialog-box').hide();
}
function hidePopupOther(){
	if(!$('#dialog-box').attr("id") || $('#dialog-box').css("display") == "none"){
			$('#dialog-overlay').hide();
	}
	$('#dialog-box-1').hide();
}
function hidePopupAlert(){
	if(!$('#dialog-box').attr("id") || $('#dialog-box').css("display") == "none"){
		if(!$('#dialog-box-1').attr("id") || $('#dialog-box-1').css("display") == "none"){
			$('#dialog-overlay').hide();
		}
	}
	$('#dialog-box-alert').hide();
}
function openInDiv(url){
	makeBackDiv();
	doJumpAjax(url);
}
function makeBackDiv(){
	var boardDiv = "<div id='dnyDiv' style='background:#d5e3f1; filter:alpha(opacity=50); opacity: 0.7; width:"+$(document.body).width()+"px; height:"+$(window).height()+"px; z-index:1; position:absolute; left:0px; top:0px;'></div>";
	$(document.body).append(boardDiv);
}
function destroyDiv(){
	$('#content_div').remove();
	$('#dnyDiv').remove();
}
function doJumpAjax(url){
	$('#content_div').remove();
	var boardDiv = "<div id='content_div' style='position:absolute;background-color:#f8fafc;border:#ff0000 1px solid;z-index:999;'></div>";
	$(document.body).append(boardDiv);
	XMLHttp.asynSetContent("GET", url, "", "content_div",true);
	$('#content_div').css("left",$(document.body).width()/3);
	$('#content_div').css("top",$(document.body).height()/4);
}
function doJumpAjaxPost(url,data){
	XMLHttp.asynSetContent("POST", url, data, "content_div",true);
	$('#content_div').css("left",$(document.body).width()/3);
	$('#content_div').css("top",$(document.body).height()/4);
}

//js(新)
function centerDiv($obj)
{
	 var screenWidth = $(window).width(), screenHeight = $(window).height();
	 var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度  
     var objLeft = (screenWidth - $obj.width())/2 ;  
     var objTop = (screenHeight - $obj.height())/2 + scrolltop; 
	 //var objTop = (screenHeight - $obj.height())/2 // 相对时用
     $obj.css({left: objLeft + 'px', top: objTop + 'px'});  
}