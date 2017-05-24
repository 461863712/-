/**  
*   
* 项目名称：NewWebCall  
* 类描述：对外接口
* 创建人：熊凯  
* 创建时间：2012-9-4 上午11:22:53  
* 修改人：熊凯  
* 修改时间：2012-9-4 上午11:22:53  
* 修改备注：  
* @version   
*   
*/ 
function rndNum(n){
	var rnd="";
	for(var i=0;i<n;i++)
	rnd+=Math.floor(Math.random()*10);
	return rnd;
}

function openWindow(businessId,branchname) 
{
	var left = ($(window).width() - 590)/2;
	var top = ($(window).height() - 480)/2 + $(document).scrollTop();
	var w=window.open("",'webcall','height=500,width=598,top=' + top + ',left='+ left +',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes'); 
	w.document.write("<div height=500,width=598 class='loading' style='background:none;text-align:center;padding-top:220px;font-size:12px;'><img src='/front/images/loading.gif' style='vertical-align:middle;'/>正在载入，请稍后……</div>");
	//var customerId = $.cookie("cj_online_customerId");      //从cookie中查看值
	var customerId = null;
    if (customerId == null) 
    {
	    customerId = new Date().getTime() + Math.round(1000, 9999);//生存随机ID
	    //$.cookie("cj_online_customerId", customerId, {path:"/"});
    }
     var jsonVal='';
    if(branchname==''){
    	jsonVal='{businessId:'+businessId+',token:"token",customerId:'+customerId+',customerName:"游客",sex:"未知",loginType:"0",attributes:""}';
    }else{
    	jsonVal='{businessId:'+businessId+',token:"token",customerId:'+customerId+',customerName:"游客",sex:"未知",loginType:"0",attributes:[{key:"branchname",showText:"营业部名称",value:"'+branchname+'",isShowToService:"1"}]}';
    }
    jsonVal = encodeURIComponent(jsonVal);
	jsonVal = encodeURIComponent(jsonVal);
	w.location='http://service.wlzq.cn/webcall/cgi-bin/webcall/OpenWindowAction?rand='+ rndNum(10)+'&json=' + jsonVal; 
	/*$.ajax({
		  url: "http://service.wlzq.cn/webcall/cgi-bin/webcall/OpenWindowAction",
		  cache: false,
		  data: {"rand":rndNum(10),"json":jsonVal},
		  success: function(html){
			  w.document.body.innerHTML="";
			  w.document.write(html);
		  }
		});*/
}
/*function openWindow(businessId) 
{ 	var isEmpty=false;
	if (isEmpty) {
		alert('请在先使用资金账号登陆之后，使用该功能。谢谢！ \r\n 点击“确定之后将自动跳转到登陆页面”');
		location.href='http://service.hxzq.cn/main/userLogin.html';
	} else {
		var left = ($(window).width() - 590)/2;
		var top = ($(window).height() - 480)/2 + $(document).scrollTop();
		var w=window.open("",'webcall','height=500,width=598,top=' + top + ',left='+ left +',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes'); 
		w.document.write("<div height=500,width=598 class='loading' style='background:none;text-align:center;padding-top:220px;font-size:12px;'><img src='http://www.hxzq.cn:8081/webcall/web/temp/images/loading.gif' style='vertical-align:middle;'/>正在载入，请稍后……</div>");
		 $.ajax({type:"POST",url:"http://service.hxzq.cn:8081/servlet/user/Login", data:"function=AjaxCheckLogin", cache:false, success:function (jsonstr) {
		  var jsonVal = null;
		  var jsonArr = jQuery.parseJSON(jsonstr);
	
		  var flag = jsonArr["msg"];
		  if (!flag) {
		   flag = "";
		  }
		  if (flag == "succsess") {
		   var userinfo = jsonArr["userInfo"];
		    jsonVal='{businessId:'+businessId+',token:"token",customerId:"'+userinfo['id']+'",customerName:"'+userinfo['user_name']+'",sex:"未知",loginType:"1",attributes:[{key:"level",showText:"级别",value:"'+userinfo['client_level']+'",isShowToService:"1"},{key:"branch",showText:"营业部",value:"'+userinfo['branch_no']+'",isShowToService:"0"},{key:"branchname",showText:"营业部名称",value:"'+userinfo['branch_name']+'",isShowToService:"1"},{key:"account",showText:"资金帐号",value:"'+userinfo['account']+'",isShowToService:"1"},{key:"score",showText:"积分",value:"'+userinfo['score']+'",isShowToService:"1"}]}';

		  } else {
			var customerId = $.cookie("cj_online_customerId");      //从cookie中查看值
		    if (customerId == null) 
		    {
			    customerId = new Date().getTime() + Math.round(1000, 9999);//生存随机ID
			    $.cookie("cj_online_customerId", customerId, {path:"/"});
		    }
		    var jsonVal='{businessId:'+businessId+',token:"token",customerId:'+customerId+',customerName:"游客",sex:"未知",loginType:"0",attributes:""}';
	    }
	    jsonVal = encodeURIComponent(jsonVal);
		jsonVal = encodeURIComponent(jsonVal);
		w.location='http://www.hxzq.cn:8081/webcall/cgi-bin/webcall/OpenWindowAction?rand='+ rndNum(10)+'&json=' + jsonVal; 
	}});
	}
}*/
//在线客服初始化
$(document).ready(function()
{
	/*
	$(".footer").after("<div id=\"cj_onlineDiv\"></div>"); 
	$("#cj_onlineDiv").load("http://172.18.13.170:8080/webcall/cgi-bin/webcall/BusinessList?site_id=1", {}, function(msg)
	{
	      initOnline();
	}); 
	*/
	/*$.getJSON("http://service.wlzq.cn/webcall/cgi-bin/webcall/BusinessList?site_id=1&jsonpcallback=?",function(data){
		for(var i=0;i<data.length;i++)
		{
			var temp = "<a href='javascript:openWindow(\""+data[i].group_id+"\")'>"+data[i].group_name+"</a><br>";
			$("#business_items").append(temp);
		}
		initOnline();
	});*/
});
//在线客服初始状态读取cookie
function initOnline(){
	/*
	 var statu=$.cookie("cj_online_statu");      //从cookie中查看状态
	  if(statu!=null && statu.length>0)
	  {
	   $("#cj_online").css("display",statu);
	  }else{
		
	    var url=window.location.href; 
	    if(url.indexOf("/main/")==-1 || url.indexOf("/main/index.html")>-1){ //初始 首页展开
	      $("#cj_online").show();
	    }
	  }
	  */
   $(".seronline").show();
   scrollx({
   id:'seronline',
   r:10,
   t:211,
   f:1
   });
}
	//在线客服展示状态
var onlineTs;
function showOnline()
{
    $(".seronline").toggle();
    $.cookie("cj_online_statu",$("#cj_online").css("display"),{path: "/"});//保存状态
    if($("#cj_online").css("display")=="none")
    {
       $(".seronline").show();
       onlineTs=setInterval("hideSmOnline();",5000);
    }
}
//关闭在线客服缩略图
function hideSmOnline()
{
  $("#.seronline").hide();
  clearInterval(onlineTs);
}

	
function scrollx(p) {
	var d = document, dd = d.documentElement, db = d.body, w = window, o = d
			.getElementById(p.id), ie6 = /msie 6/i.test(navigator.userAgent), style, timer;
	if (o) {
		o.style.cssText += ";position:" + (p.f && !ie6 ? 'fixed' : 'absolute')
				+ ";"
				+ (p.l == undefined ? 'right:5px;' : 'left:' + p.l + 'px;')
				+ (p.t != undefined ? 'top:' + p.t + 'px' : 'bottom:0');
		if (p.f && ie6) {
			o.style.cssText += ';'
					+ (p.l == undefined ? 'right:5px;' : 'left:' + p.l + 'px;')
					+ '+ "px");top:expression(documentElement.scrollTop +'
					+ (document.documentElement.clientHeight - o.offsetHeight)
					+ '+ "px" );';
			dd.style.cssText += ';background-image: url(about:blank);background-attachment:fixed;';
		} else {
			if (!p.f) {
				w.onresize = w.onscroll = function() {
					clearInterval(timer);
					timer = setInterval(function() {
						// 双选择为了修复chrome 下xhtml解析时dd.scrollTop为 0
						var st = (dd.scrollTop || db.scrollTop), c;
						c = st
								- o.offsetTop
								+ (p.t != undefined ? p.t
										: (w.innerHeight || dd.clientHeight)
												- o.offsetHeight);
						if (c != 0) {
							o.style.top = o.offsetTop
									+ Math.ceil(Math.abs(c) / 10)
									* (c < 0 ? -1 : 1) + 'px';
						} else {
							clearInterval(timer);
						}
					}, 10)

				}
			}
		}
	}
} 
