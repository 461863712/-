//window.alert = function(txt,title,func,param){showServerMsg(txt,title,func,param);};
//������sb_input��hb_input��class�µ�input��Ľ�����¼�
function inputTaggle(){
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
//���õ�������ڻ�ɫ��ʾ��Ϣ�Ĵ���
function initGrayText(id,tips){
	if($("#"+id).attr("id")){
		$("#"+id).attr("ntips",tips);
		if(!$("#"+id).val() || $("#"+id).val().length<1 || $("#"+id).val()==tips){
			$("#"+id).css("color","#bbb").val(tips);
		}
		$("#"+id).focus(function(){
			if(!$("#"+id).val() || $("#"+id).val().length<1 || $("#"+id).val()==tips){
				$("#"+id).css("color","").val("");
			}
		}).blur(function(){
			if(!$("#"+id).val() || $("#"+id).val().length<1 || $("#"+id).val()==tips){
				$("#"+id).css("color","#bbb").val(tips);
			}
		});
	}
}
//���ύ����֤֮ǰ������ȥ����ɫ��ʾ��Ϣ
function rmGrayText(){
	$("body input[type='text']").each(function(){
		var now_value = $(this).val();
		var tips = $(this).attr("ntips");
		if(now_value && now_value==tips){
			$(this).val("");
		}
	});
}
//���ύ����֤������Իָ���ɫ��ʾ��Ϣ
function recoverGrayText(){
	$("body input[type='text']").each(function(){
		var id = $(this).attr("id");
		var tips = $(this).attr("ntips");
		if(id && tips){
			initGrayText(id,tips);
		}
	});
}
// ����Ƿ��ѵ�¼
function checkLogin(callback,callback_param){
	$.ajax(
	{
		type: "POST",
		url: "/servlet/user/Login",
		data: "function=AjaxCheckLogin",
		cache: false,
		success: function(jsonstr)
		{
			var json = jQuery.parseJSON(jsonstr);
			var flag = json["msg"];
			if(!flag){
				flag = "";
			}
			if(flag=="succsess"){
				var userinfo = json['userInfo'];
				//loginChange(userinfo);
				//try{loginSuccess(userinfo);}catch(e){}
				return true;
			}else{
				return false;
			}
			if(callback){callback(callback_param);}
		}
	});
}
//����Ƿ��ѽ��׵�¼
function checkTradeLogin(callback,callback_param){
	$.ajax(
	{
		type: "POST",
		url: "/servlet/user/Reg",
		data: "function=AjaxCheckTradeLogin",
		cache: false,
		success: function(jsonstr)
		{
			var json = jQuery.parseJSON(jsonstr);
			var flag = json["msg"];
			if(!flag){
				flag = "";
			}
			if(flag=="succsess"){
				return true;
			}else{
				return false;
			}
			if(callback){callback(callback_param);}
		}
	});
}
// ��ȡ�ֻ���֤��
function getPin(moid,thisid){
	var msg = doCheckParam($("#"+moid));
	if(msg && msg.length>0){
		showValTips(moid,null,msg);
		$("#"+moid).focus().focus();
	}else{
		$.ajax(
		{
		type: "POST",
		url: "/servlet/user/Reg",
		data: "function=AjaxGetPin",
		cache: false,
		success: function(html)
		{
			if(html&&html.length>0){
				showServerMsg(html);
				//alert(html);
			}else{
				//$("#"+thisid).attr("disabled",true);
				//setTimeout('$("#"+thisid).attr("disabled",false);',1000*30);
			}
		}
		});
	}
}

//--------�����Զ��л�ͼƬЧ����ʼ-----------------------------------------------
function initTriggerImgs(showid,boxid){
	if(imgInter){
		imgInter = clearInterval(imgInter);
	}
	$("#"+showid).show();
	$("#"+boxid).show();
	var show_prefix = showid+"img_num_span_";
	var box_prefix = boxid+"img_show_div_";
	$("#"+boxid+" > div").each(function(i){
		$("#"+showid).append("<span id='"+show_prefix+i+"'></span>");
		$(this).attr("id",box_prefix+i).hide();
		if(i==0){
			$(this).show();
			$("#"+show_prefix+i).addClass("hover");
		}
	});
	$("span[id^='"+show_prefix+"']").mouseover(function(){
		showTriggerImgs($(this).attr("id"),show_prefix,box_prefix);
	});
	return setInterval("overNext('"+show_prefix+"','"+box_prefix+"')",5000);
}
function overNext(show_prefix,box_prefix){
	var curid = "";
	var obj = $("span[id^='"+show_prefix+"'][class*='hover'] ~ span");
	if(!obj || !obj.attr("id")){
		curid = $($("span[id^='"+show_prefix+"']").get(0)).attr("id");
	}else{
		curid = obj.attr("id");
	}
	showTriggerImgs(curid,show_prefix,box_prefix);
}
function showTriggerImgs(curid,show_prefix,box_prefix){
	var i = curid.substr(show_prefix.length);
	$("div[id^='"+box_prefix+"']").hide();
	$("#"+box_prefix+i).show();
	$("span[id^='"+show_prefix+"']").removeClass("hover");
	$("#"+curid).addClass("hover");
}
//--------�����Զ��л�ͼƬЧ������-----------------------------------------------

//--------�����л�tabҳ��ʼ------------------------------------------------------
//��ʼ�����е��tabҳ�л�Ч��
function initTriggerTabs(selectObjs,curTabClass,callback,callback_param,tab_parent_level,content_parent_level,default_content_id){
	var prefix = "tab_";
	$(selectObjs).each(function(){
		var id = $(this).attr("id");
		$(this).click(function(){
			triggerTabs(id,curTabClass,callback,callback_param,tab_parent_level,content_parent_level,default_content_id);
		});
	});
}
//��ʼ�����е��tabҳ�л�Ч��(��껬��Ч��)
function initMouseOverTriggerTabs(selectObjs,curTabClass,callback,callback_param,tab_parent_level,content_parent_level,default_content_id){
	var prefix = "tab_";
	$(selectObjs).each(function(){
		var id = $(this).attr("id");
		$(this).mouseover(function(){
			triggerTabs(id,curTabClass,callback,callback_param,tab_parent_level,content_parent_level,default_content_id);
		});
	});
}
//���tabҳ�л�Ч��
function triggerTabs(tabid,curTabClass,callback,callback_param,tab_parent_level,content_parent_level,default_content_id){
	var tab_fixer = "tab_";
	if(tabid&&tabid.indexOf(tab_fixer)!=-1){
		var content_fixer = "content_";
		var prv_id = tabid.substr(tab_fixer.length);
		var tab_tag = $("#"+tabid).attr("tagName");
		if(!tab_tag){
			tab_tag="*";
		}
		if(!tab_parent_level){
			tab_parent_level = 3;
		}
		if(!content_parent_level){
			content_parent_level = 3;
		}
		var tab_parent = $("#"+tabid);
		for(var i=0; i<tab_parent_level; i++){
			tab_parent = tab_parent.parent();
		}
		tab_parent.find(tab_tag+"[id^='"+tab_fixer+"']").removeClass(curTabClass);
		tab_parent.find("* [id='more_tab']").attr("url",$("#"+tabid).attr("url"));
		$("#"+tabid).addClass(curTabClass); // ��ʽ�л�
		var tag = $("#"+content_fixer+prv_id).attr("id");
		//alert($("#"+content_fixer+prv_id).attr("id"));
		if(tag && tag.length>0){ // �ҵ��ж�Ӧ��������ʱ���л�����
			var content_parent = $("#"+content_fixer+prv_id);
			for(var i=0; i<content_parent_level; i++){
				content_parent = content_parent.parent();
			}
			content_parent.find("*[id^='"+content_fixer+"']").hide();
			$("#"+content_fixer+prv_id).show(); // �����л�
		}else{
			var default_content = $("#"+content_fixer+default_content_id);
			tag = default_content.attr("id");
			var content_parent = default_content;
			for(var i=0; i<content_parent_level; i++){
				content_parent = content_parent.parent();
			}
			if(default_content_id && default_content_id.length>0 && default_content.attr("id") && default_content.attr("id").length>0){
				content_parent.find("*[id^='"+content_fixer+"']").hide();
				default_content.show(); // �����л�
			}
		}
		if(callback){callback(callback_param);}
	}
}
//���tabҳ�л���ê��
function initTabTrigger(prefix,objs,contentid,callbefore,callbefore_param,callback,callback_param,content_height){
	if(!prefix){
		prefix = "";
	}
	if(!content_height || content_height==""){
		content_height = 400;
	}
	try{content_height = parseInt(content_height);}catch(e){content_height=400;}
	var firstObj = null;
	$(objs).each(function(i){
		if(i==0){
			firstObj = $(this);
		}
		$(this).click(function(){
			var id = $(this).attr("id");
			var hrefstr = id.substr(prefix.length);
			var url = $(this).attr("url");
			$(objs).removeClass("current");
			$(this).addClass("current");
			if(url&&url.length>0&&url.indexOf("http://")==-1){
				if(callbefore){callbefore(callbefore_param,id);}
				loadAnsyData(url,contentid,null,content_height,function(){if(callback){callback(callback_param);}addhref(hrefstr)});
				//$("#"+contentid).load(url,{},function(){if(callback){callback(callback_param);}addhref(hrefstr)});
			}
		});
	});
	var url = window.location.href;
	if(url.indexOf("#")!=-1 && url.indexOf("#")<url.length-1){
		var tabid = url.substr(url.lastIndexOf("#")+1);
		var focusid = "";
		if(tabid.indexOf("|")!=-1){
			var params = tabid.split("|");
			tabid = params[0];
			if(params.length>1){
				focusid = params[1];
			}
		}
		$("#"+prefix+tabid).click();
	}else{
		if(firstObj){
			firstObj.click();
		}
	}
}
//���tabҳ�л�����ê��
function initTabTriggerWithOutHerf(prefix,objs,contentid,callbefore,callbefore_param,callback,callback_param,content_height){
	if(!prefix){
		prefix = "";
	}
	if(!content_height || content_height==""){
		content_height = 400;
	}
	try{content_height = parseInt(content_height);}catch(e){content_height=400;}
	var firstObj = null;
	$(objs).each(function(i){
		if(i==0){
			firstObj = $(this);
		}
		$(this).click(function(){
			var id = $(this).attr("id");
			var hrefstr = id.substr(prefix.length);
			var url = $(this).attr("url");
			$(objs).removeClass("current");
			$(this).addClass("current");
			if(url&&url.length>0&&url.indexOf("http://")==-1){
				if(callbefore){callbefore(callbefore_param);}
				loadAnsyData(url,contentid,null,content_height,function(){if(callback){callback(callback_param);}});
				//$("#"+contentid).load(url,{},function(){if(callback){callback(callback_param);}addhref(hrefstr)});
			}
		});
	});
	if(firstObj){
		firstObj.click();
	}
}
function addhref(id){
	var url = window.location.href;
	if(url.indexOf("#")!=-1){
		var tabid = url.substr(url.lastIndexOf("#")+1);
		window.location = url.replace("#"+tabid,"#"+id);
	}else{
		window.location = url+"#"+id;
	}
}
//--------�����л�tabҳ����ê�㿪ʼ----------------------------------------------
//--------�����첽���ط�����ʼ---------------------------------------------------
function loadAnsyData(aUrl,id,jsonVal,height,callback,callback_param,isAsync,posttype){
	var obj = $("#"+id);
	var sendType = "POST";
	if(!jsonVal || jsonVal.length<1){
		sendType = "GET";
	}
	if(posttype && posttype.length>0){
		sendType = posttype;
	}
	if(isAsync != false){
		isAsync = true;
	}
	jQuery.ajax({
		type: sendType,
		url: aUrl,
		cache:false,
		async:isAsync,
		data:jsonVal,
		beforeSend: function(XMLHttpRequest){ 
			showLoading(id,height);
		},
		success: function(data, textStatus)
		{
			obj.html(data);
			if(callback){callback(callback_param,data);}
		},
		error: function(){
			//���������
			var height_style = "";
			var padding_height = 0;
			if(height){
				height_style = "height:"+height+"px";
				padding_height = height/2-11;
			}
			obj.html("<div style='font-size:10pt;text-align:center;"+height_style+"'><div style='padding-top:"+padding_height+"px;'>��������ʧ��</div></div>");
		}
	});
}
function showLoading(id,height){
	var height_style = "";
	var padding_height = 0;
	if(height){
		height_style = "height:"+height+"px";
		padding_height = height/2-11;
	}
	$("#"+id).html("<div style='font-size:10pt;text-align:center;"+height_style+"'><div style='padding-top:"+padding_height+"px;'><img src='/images/loading.gif'/>���ڼ��أ����Ժ�......</div></div>");
}		 
//--------�����첽���ط�������---------------------------------------------------
// �л���֤��ͼƬ
function changeImage(id){
	$("#"+id).attr("src","/servlet/img/validateimg?r="+Math.random()*(200-50)+50);
}
//���õ�����ʾ��Ϣ������չʾ���Ƹ�����Ϣ�����ݵĵ����㣩
function showMoreMsg(msg,msgtitle,buttonevent,buttonevent_param,left){
	if(!msgtitle || msgtitle.length<1){
		msgtitle = "��ʾ��Ϣ��";
	}
	var htmlcontent = "<div class=\"pop_txtIntro\"> <a href=\"javascript:void(0);\" class=\"close\" onclick=\"hidePopup();\" id=\"closeElem\"></a> " +
			"<div class=\"pop_txtbox\"> <h1>"+msgtitle+"</h1> <div class=\"poptxt_content\"><p id=\"intro\">"+msg+"</p> </div>";
	popup(htmlcontent,left);
	$('#closeElem').click(function(){
		hidePopup();	
		if(buttonevent){
		    buttonevent(buttonevent_param);
		}
		return false;
	});
}
//���õ�����ʾ��Ϣ�������ڵ��������ٵ����㣩
function showOtherMsg(msg,msgtitle,agreebuttonevent,agreebuttonevent_param,disagreebuttonevent,disagreebuttonevent_param,left){
	if(!msgtitle || msgtitle.length<1){
		msgtitle = "��ʾ��Ϣ��";
	}
	var htmlcontent = "<div class=\"pop_login\"> <div class=\"in_box per_popbox\"> <a href=\"javascript:void(0)\" id=\"closeElemOther\" class=\"close\"></a> <h3>"+msgtitle+"</h3> <dl class=\"mt6\"> "+msg+" </dl> <div class=\"per_btnbox\"><a href=\"javascript:void(0)\" id=\"confirmbutton\" class=\"tr_graybtn wyh\">ȷ��</a><a href=\"javascript:void(0)\" id=\"cancelbutton\" class=\"tr_graybtn wyh\">ȡ��</a></div> </div> </div> ";
	popupOther(htmlcontent,left);
	$('#closeElemOther').click(function(){
		hidePopupOther();
		if(disagreebuttonevent){
			disagreebuttonevent(disagreebuttonevent_param);
		}
		return false;
	});
	$('#cancelbutton').click(function(){
		if(disagreebuttonevent){
			disagreebuttonevent(disagreebuttonevent_param);
		}
		hidePopupOther();
		return false;
	});
	$('#confirmbutton').click(function(){
		if(agreebuttonevent){
			agreebuttonevent(agreebuttonevent_param);
		}
		hidePopupOther();
		return false;
	});
}
//  ���õ�����ʾ��Ϣ�����ڷ��������ص���Ϣ��ʾ��
function showServerMsg(msg,msgtitle,buttonevent,buttonevent_param){

	if(!msgtitle || msgtitle.length<1){
		msgtitle = "��ʾ��Ϣ";
	}
	var htmlcontent = "<div class=\"pop_login\" style=\"width:346px\"> " +
			"<div class=\"in_box com_prompt\"> <a href=\"javascript:void(0)\" id=\"closeElemAlert\" class=\"close\"></a> " +
			"<div class=\"mid\"> <h1>"+msgtitle+"</h1> <div class=\"com_prompt_txt\"> " +
			"<ul class=\"prompt_list\" style=\"word-break:break-all;word-wrap:break-word\"> <li>"+msg+"</li> </ul> </div> " +
			"<div class=\"per_btnbox\"><a href=\"javascript:void(0)\" id=\"confirmbuttonalert\" class=\"com_graybtn wyh\">ȷ��</a></div> </div> </div> </div>";
	popupAlert(htmlcontent);
	$('#closeElemAlert').click(function(){
		hidePopupAlert();
		if(buttonevent){
		    buttonevent(buttonevent_param);
		}
		return false;
	});
	$('#confirmbuttonalert').click(function(){
		hidePopupAlert();
		if(buttonevent){
		    buttonevent(buttonevent_param);
		}
		return false;
	});
}

  //�����㹫�÷���
function loadNewDiv(urlpath,postdata,callback,callback_param,offsettop,offsetleft,focusid)
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
			popup(html,offsetleft,offsettop);
			$('#closeElem').click(function(){
				$('#dialog-overlay, #dialog-box').hide();		
				return false;
			});
			inputTaggle();
			if(focusid && focusid.length>0 && $("#"+focusid).attr("id")){
				$("#"+focusid).focus().focus();
			}
			if(callback){
				callback(callback_param);
			}
		}
	});
}
// С��ͷ��ҳ����
function getSLinkStr(options){
	var defaults = { 
			id : "",
			change_area_id : "",
			loading_height : 400,
			method : "POST",
			curpage: 1,
			totalpage: 0,
			pagerow: 10, 
			data: "",
			maxnum:null,
			shownum:3,
			linkfunction : null,
			check_login : null,
			linkurl: "" 
	};
	var settings = jQuery.extend(defaults, options);
	try{settings.totalpage = parseInt(settings.totalpage);}catch(e){settings.totalpage=1;}
	try{settings.curpage = parseInt(settings.curpage);}catch(e){settings.curpage=0;}
	try{settings.totalpage = parseInt(settings.totalpage);}catch(e){settings.totalpage=0;}
	var total = settings.totalpage;
	var cur = settings.curpage;
	if(settings.id=="" || settings.totalpage==0 || settings.totalpage=="0"  || settings.linkurl=="" || settings.change_area_id==""){
		return;
	}
	var pages = "";
	var maxnum = settings.maxnum;
	if(maxnum && maxnum!=""){
		maxnum = parseInt(maxnum);
	}
	var shownum = settings.shownum;
	if(shownum && shownum!=""){
		shownum = parseInt(shownum);
	}
	var showdots = false;
	var predots = true;
	var nextdots = true;
	if(maxnum && maxnum!="" && total>maxnum){
		total = maxnum;
	}
	if(shownum && shownum!="" && total>shownum){
		showdots = true;
	}
	for(var i=1;total&&i<=total;i++){
		if(showdots  && (i-cur<-3 || i-cur>3) && i>1 && i<total){
			if(predots && i-cur<-3){
				pages += "...";
				predots = false;
			}
			if(nextdots && i-cur>3){
				pages += "...";
				nextdots = false;
			}
		}else{
			if(cur==i){
				pages += "<a href=\"javascript:void(0)\" class=\"cur\" page='"+i+"'>"+i+"</a>";
			}else{
				pages += "<a href=\"javascript:void(0)\" page='"+i+"'>"+i+"</a>";
			}
		}
	}
	var pre = cur - 1;
	if(pre<1){
		pre = 1;
	}
	var next = cur + 1;
	if(next>total){
		next = total;
	}
	var str = "<a href=\"javascript:void(0)\" class=\"prev\" page='"+pre+"'>&nbsp;</a>"+pages+"<a href=\"javascript:void(0)\" class=\"next\" page='"+next+"'>&nbsp;</a>";
	$("#"+settings.id).html("").html(str);
	$("#"+settings.id+" a[page]").click(function(){
		if(settings.check_login){
			if(!check_login()){
				return false;
			}
		}
		if($(this).attr("class")=="cur"){
			return false;
		}
		var pagenum = $(this).attr("page");
		settings.data += "&pagerow="+settings.pagerow+"&curpage="+pagenum;
		if(settings.linkfunction && settings.linkfunction!=null){
			settings.linkfunction(settings);
		}else{
			loadAnsyData(settings.linkurl,settings.change_area_id,settings.data,settings.loading_height);
		}
	});
}
//��ҳ����
function getBLinkStr(options){
	var defaults = { 
			id : "",
			change_area_id : "",
			loading_height : 400,
			method : "POST",
			curpage: 1,
			totalpage: 0,
			pagerow: 10, 
			data: "",
			maxnum:null,
			shownum:10,
			linkfunction : null,
			check_login : null,
			linkurl: "" 
	};
	var settings = jQuery.extend(defaults, options);
	try{settings.totalpage = parseInt(settings.totalpage);}catch(e){settings.totalpage=1;}
	try{settings.curpage = parseInt(settings.curpage);}catch(e){settings.curpage=0;}
	try{settings.totalpage = parseInt(settings.totalpage);}catch(e){settings.totalpage=0;}
	var total = settings.totalpage;
	var cur = settings.curpage;
	if(settings.id=="" || settings.totalpage==0 || settings.totalpage=="0"  || settings.linkurl=="" || settings.change_area_id==""){
		return;
	}
	var pages = "";
	var pre = cur - 1;
	if(pre<=1){
		pre = "";
	}
	var next = cur + 1;
	if(next>=total){
		next = "";
	}
	var str = "<div class=\"go_paging\"><a href=\"javascript:void(0)\" class=\"txt\" page='1'>��ҳ</a>|<a href=\"javascript:void(0)\" class=\"txt\" page='"+pre+"'>��һҳ</a>|<a href=\"javascript:void(0)\" class=\"txt\" page='"+next+"'>��һҳ</a>|<a href=\"javascript:void(0)\" class=\"txt\" page='"+total+"'>ĩҳ</a></div>";
	$("#"+settings.id).html("").html(str);
	$("#"+settings.id+" a[page]").click(function(){
		if(settings.check_login){
			if(!check_login()){
				return false;
			}
		}
		if($(this).attr("class")=="cur"){
			return false;
		}
		var pagenum = $(this).attr("page");
		if(pagenum && pagenum!=""){
			settings.data += "&pagerow="+settings.pagerow+"&curpage="+pagenum;
			if(settings.linkfunction && settings.linkfunction!=null){
				settings.linkfunction(settings);
			}else{
				loadAnsyData(settings.linkurl,settings.change_area_id,settings.data,settings.loading_height);
			}
		}
	});
}
//�����Ķ�Ȩ���жϺ� ҳ����ת
function checkArticle(url){
 if(url!=null && url.length>0 && url.indexOf('javascript:void(0)')<=-1){
   window.open(url);
 }
}
var aim1=false;       	//false�����ڸ�������    
var aim2=false;     	//false�����ڸ�������    
function initShowAim(){
	aim1=true;
	aim2=true;
	$("#webaim").hover(function(){
		$("#top_sitemap").show();
		$("#webaim").addClass("hover");
		aim1=false;
	},function(){
		aim1=true;
		setTimeout("hideaim()",250);
	});
	$("#top_sitemap").hover(function(){
		aim2=false;
	},function(){
		aim2=true;
		setTimeout("hideaim()",255);
	});
}	

function hideaim(){     //��������
	if(aim1&&aim2){
	$("#top_sitemap").hide();
	$("#webaim").removeClass("hover");
	}
}
function paramFilter(param){
	param=param.replace("&","&amp;");
	param=param.replace("<","&lt;");
	param=param.replace(">","&gt");
	param=param.replace("\"","&quot;");
	param=param.replace("\'","&acute;");
	param=param.replace("\\","&#092");
	param=param.replace(" ","&nbsp;");
	return param;
}

/*
  *����loading��ʾ��
*/
function popupLoading(){
 var htmlcontent = "<div class=\"pop_login\" style=\"width:346px;\"> " +
 "<div class=\"in_box com_prompt\"> <a href=\"javascript:void(0)\" id=\"closeElemAlert\" class=\"close\" onclick=\"hidePopupAlert();\"></a> " +
 "<div class=\"mid\"> <h1>��ʾ��Ϣ</h1> <div class=\"com_prompt_txt\"> " +
 "<div class='loading' style='background:none;text-align:center;'>&nbsp;<br><img src='/images/loading.gif' style='vertical-align:middle;'/>�������룬���Ժ󡭡�<br>&nbsp;</div></div></div> </div> </div>";
     popupAlert(htmlcontent);
   }