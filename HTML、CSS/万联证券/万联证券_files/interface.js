/**  
*   
* ��Ŀ���ƣ�NewWebCall  
* ������������ӿ�
* �����ˣ��ܿ�  
* ����ʱ�䣺2012-9-4 ����11:22:53  
* �޸��ˣ��ܿ�  
* �޸�ʱ�䣺2012-9-4 ����11:22:53  
* �޸ı�ע��  
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
	w.document.write("<div height=500,width=598 class='loading' style='background:none;text-align:center;padding-top:220px;font-size:12px;'><img src='/front/images/loading.gif' style='vertical-align:middle;'/>�������룬���Ժ󡭡�</div>");
	//var customerId = $.cookie("cj_online_customerId");      //��cookie�в鿴ֵ
	var customerId = null;
    if (customerId == null) 
    {
	    customerId = new Date().getTime() + Math.round(1000, 9999);//�������ID
	    //$.cookie("cj_online_customerId", customerId, {path:"/"});
    }
     var jsonVal='';
    if(branchname==''){
    	jsonVal='{businessId:'+businessId+',token:"token",customerId:'+customerId+',customerName:"�ο�",sex:"δ֪",loginType:"0",attributes:""}';
    }else{
    	jsonVal='{businessId:'+businessId+',token:"token",customerId:'+customerId+',customerName:"�ο�",sex:"δ֪",loginType:"0",attributes:[{key:"branchname",showText:"Ӫҵ������",value:"'+branchname+'",isShowToService:"1"}]}';
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
		alert('������ʹ���ʽ��˺ŵ�½֮��ʹ�øù��ܡ�лл�� \r\n �����ȷ��֮���Զ���ת����½ҳ�桱');
		location.href='http://service.hxzq.cn/main/userLogin.html';
	} else {
		var left = ($(window).width() - 590)/2;
		var top = ($(window).height() - 480)/2 + $(document).scrollTop();
		var w=window.open("",'webcall','height=500,width=598,top=' + top + ',left='+ left +',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes'); 
		w.document.write("<div height=500,width=598 class='loading' style='background:none;text-align:center;padding-top:220px;font-size:12px;'><img src='http://www.hxzq.cn:8081/webcall/web/temp/images/loading.gif' style='vertical-align:middle;'/>�������룬���Ժ󡭡�</div>");
		 $.ajax({type:"POST",url:"http://service.hxzq.cn:8081/servlet/user/Login", data:"function=AjaxCheckLogin", cache:false, success:function (jsonstr) {
		  var jsonVal = null;
		  var jsonArr = jQuery.parseJSON(jsonstr);
	
		  var flag = jsonArr["msg"];
		  if (!flag) {
		   flag = "";
		  }
		  if (flag == "succsess") {
		   var userinfo = jsonArr["userInfo"];
		    jsonVal='{businessId:'+businessId+',token:"token",customerId:"'+userinfo['id']+'",customerName:"'+userinfo['user_name']+'",sex:"δ֪",loginType:"1",attributes:[{key:"level",showText:"����",value:"'+userinfo['client_level']+'",isShowToService:"1"},{key:"branch",showText:"Ӫҵ��",value:"'+userinfo['branch_no']+'",isShowToService:"0"},{key:"branchname",showText:"Ӫҵ������",value:"'+userinfo['branch_name']+'",isShowToService:"1"},{key:"account",showText:"�ʽ��ʺ�",value:"'+userinfo['account']+'",isShowToService:"1"},{key:"score",showText:"����",value:"'+userinfo['score']+'",isShowToService:"1"}]}';

		  } else {
			var customerId = $.cookie("cj_online_customerId");      //��cookie�в鿴ֵ
		    if (customerId == null) 
		    {
			    customerId = new Date().getTime() + Math.round(1000, 9999);//�������ID
			    $.cookie("cj_online_customerId", customerId, {path:"/"});
		    }
		    var jsonVal='{businessId:'+businessId+',token:"token",customerId:'+customerId+',customerName:"�ο�",sex:"δ֪",loginType:"0",attributes:""}';
	    }
	    jsonVal = encodeURIComponent(jsonVal);
		jsonVal = encodeURIComponent(jsonVal);
		w.location='http://www.hxzq.cn:8081/webcall/cgi-bin/webcall/OpenWindowAction?rand='+ rndNum(10)+'&json=' + jsonVal; 
	}});
	}
}*/
//���߿ͷ���ʼ��
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
//���߿ͷ���ʼ״̬��ȡcookie
function initOnline(){
	/*
	 var statu=$.cookie("cj_online_statu");      //��cookie�в鿴״̬
	  if(statu!=null && statu.length>0)
	  {
	   $("#cj_online").css("display",statu);
	  }else{
		
	    var url=window.location.href; 
	    if(url.indexOf("/main/")==-1 || url.indexOf("/main/index.html")>-1){ //��ʼ ��ҳչ��
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
	//���߿ͷ�չʾ״̬
var onlineTs;
function showOnline()
{
    $(".seronline").toggle();
    $.cookie("cj_online_statu",$("#cj_online").css("display"),{path: "/"});//����״̬
    if($("#cj_online").css("display")=="none")
    {
       $(".seronline").show();
       onlineTs=setInterval("hideSmOnline();",5000);
    }
}
//�ر����߿ͷ�����ͼ
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
						// ˫ѡ��Ϊ���޸�chrome ��xhtml����ʱdd.scrollTopΪ 0
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
