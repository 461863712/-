$(document).ready(function(){
	var name=window.location.href.split("/")[5];
	var obj=$("li[name="+name+"]",parent.document);
	if(obj.length>0){
		obj.siblings().removeClass("current");
		obj.addClass("current");
	}
});

/**
 * 功能页面跳转
 * pass 1：直接跳转，不判断登录
 *      2：需要判断通宝登录
 *      空或其他：判断登录
 */
function loadTradeContent(catalogid,linkurl,pass){
	
	if(catalogid != ""){
		$(".tab_nav ul li").removeClass("current");
		$("#functab"+catalogid).addClass("current");
	}
	
	var nowUrl = parent.window.location.href;
	
	nowUrl = encodeURIComponent(nowUrl);
	
	//获取带过来的代码
	var fundcode = QueryString("fundcode");
	if(fundcode == "" || fundcode == "undefined"){
		if($("#fundcode").val()){
			fundcode=$("#fundcode").val();
		}else{
			fundcode="";
		}
	}
	//alert(fundcode);
	if(linkurl != ""){
		if(pass == "1"){
			//不做判断， 直接进入业务界面
			$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"fundcode":fundcode},this,true,resizeParentIframe);
			
		}else{
			//兼容通宝登录
			$.ajax(
			{
				type: "POST",
				url: "/servlet/LoginAction?function=AjaxTradeLogin&t="+(new Date()).valueOf(),
				dataType: 'json',
				data: "",
				cache: false,
				beforeSend: function(XMLHttpRequest){
					$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;'><img src='/images/loading.gif'/>正在进行登陆验证，请稍候......</div>");
				},
				success: function(json, textStatus)
				{
					if(json == null){
						$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;'>加载出错，请稍后再试。</div>");
					}else if(json.msg == "2"){
						//通宝登录，并绑定了资金账号，未登录交易，提示进行登录
						if(pass == "2"){
							//进入业务界面
							$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"fundcode":fundcode},this,true,resizeParentIframe);
						}else{
							Boxy.load("/servlet/LoginAction?function=TbTradePage&linkurl="+linkurl+"&fundcode="+fundcode,{fixed:false,modal:true,unloadOnHide:true,afterHide:function(){
								$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;color:#ff0000'>登录验证未通过，您无权限查看该栏目内容。</div>");
								
							}});
							
						}
						
					}else if(json.msg == "3"){
						//通宝登录，未绑定资金账号，提示开户或绑定
						if(pass == "2"){
							//进入业务界面
							$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"fundcode":fundcode},this,true,resizeParentIframe);
						}else{
							//绑定自己账号提示页面
							Boxy.load("/servlet/LoginAction?function=TradeBindPage&linkurl="+linkurl+"&fundcode="+fundcode,{fixed:false,modal:true,unloadOnHide:true,afterHide:function(){
								$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;color:#ff0000'>登录验证未通过，您无权限查看该栏目内容。</div>");
								
							}});
						}
						
					}else{
						//进入业务界面
						$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"fundcode":fundcode},this,true,resizeParentIframe);
					}
				},
				error: function(){
					$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;'>加载出错，请稍后再试。</div>");
				}
			});
		}
		
	}else{
		jAlert("非法访问");
		$("#tradeContent").html("非法访问");
	}
}

//功能页面跳转
function loadTradeContentByProduct(catalogid,linkurl){
	
	if(catalogid != ""){
		$(".tab_nav ul li").removeClass("current");
		$("#functab"+catalogid).addClass("current");
	}
	
	var nowUrl = parent.window.location.href;
	
	nowUrl = encodeURIComponent(nowUrl);
	
	//获取带过来的代码
	var productcode = QueryString("productcode");
	if(productcode==""){
		productcode=$("#productcode").val();
	}
	//alert(fundcode);
	//&& linkurl != "/servlet/trade/fund/FundAction"
	if(linkurl != ""){
		$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"productcode":productcode},this,true,resizeParentIframe);
	}
}
//重新调整父窗口的iframe高度
function resizeParentIframe(){
	try{
		window.parent.iFrameHeight();
	}catch(e)
	{}
}
//调整iframe的高度
function iFrameHeight() {
	//alert("iFrameHeight");
	var obj=document.getElementById("wtframe"); //iframe id
	if (obj && document.getElementById){
		if (obj && !window.opera){
			if (obj.contentDocument && obj.contentDocument.body.offsetHeight){

				//下面这句是解决变态Chrom的load事件中不能重新计算高度问题
				obj.height=10;
				
				obj.height = obj.contentDocument.body.offsetHeight;
				
				//下面两行解决ie下自适应问题
				if(obj.contentDocument.body.offsetHeight!=obj.contentWindow.document.body.scrollHeight)
				obj.height=obj.contentWindow.document.body.scrollHeight;


			}else if(obj.Document && obj.Document.body.scrollHeight){
				obj.height = obj.Document.body.scrollHeight;
			}
			if(obj.height<400){
				obj.height=400;
			}
		}else {
			obj.height = 600;
		}
	}

	/*
	 * 	var ifm = document.getElementById("wtframe");   
		var subWeb = document.frames ? document.frames["wtframe"].document : ifm.contentDocument; 
		if(ifm != null && subWeb != null) {
			var content_height =  subWeb.body.scrollHeight;
			ifm.height = subWeb.body.scrollHeight;
			//if(content_height > 400){
			//	ifm.height = subWeb.body.scrollHeight;
			//}else{
			//	ifm.height = "400";
			//}
		}
		//alert(ifm.height);
	 */
}

//日期和时间
//单个数字配零
function getDouble(number){
  var numbers=["0","1","2","3","4","5","6","7","8","9"];
  for(var i=0;i<numbers.length;i++){
   if(numbers[i]==number){
    return "0"+numbers[i];
   }else if(i==9){
    return number;
   }
  }
}
//得到当天时间
function getTodayTime(){
  //var days=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  var today=new Date();
  var str= (today.getYear()<1900?1900+today.getYear():today.getYear())+"年" + getDouble([today.getMonth()+1])+"月" +getDouble(today.getDate()) +"日 &nbsp;"+getDouble(today.getHours())+":"+getDouble(today.getMinutes());
  document.getElementById('datetime').innerHTML=str;
}

// 检测是否已登录
function checkLogin(callback,callback_param){
	$.ajax(
	{
		type: "POST",
		url: "/servlet/LoginAction?function=AjaxCheckLogin&t="+(new Date()).valueOf(),
		dataType: 'json',
		data: "",
		cache: false,
		beforeSend: function(XMLHttpRequest){
			$("#logintips").text("您好！ 为您检测登录状态...");
		},
		success: function(json, textStatus)
		{
			if(json != null && json.msg=="succsess"){
				$("#logintips").html("您好！<a target=\"wtframe\" href=\"/main/onlinebusiness/accountservice/personal/personaldata/index.shtml\">"+json.username+"</a><span>|</span> <a href=\"javascript:void(0)\" onclick=\"toLoginPage()\">重新登录</a> <span>|</span> <a href=\"/servlet/LoginAction?function=LogOut\">退出</a>");
				return true;
			}else{
				$("#logintips").html("您好！ <a href=\"javascript:void(0)\" onclick=\"toLoginPage()\">[请登录]</a>");
				if(callback){callback(callback_param);}
				return false;
			}
		},
		error: function(){
			$("#logintips").html("您好！ <a href=\"javascript:void(0)\" onclick=\"toLoginPage()\">[请登录]</a>");
		}
	});
}

//跳转登录页面
function toLoginPage(){
	var nowUrl = window.location.href;
	window.location.href = "/servlet/LoginAction?retUrl="+encodeURIComponent(nowUrl);
}

//是否为空
function isEmpty(strValue)
{
	strValue = jQuery.trim(strValue);
	return strValue.length == 0;
}

//获取请求参数
function QueryString(id)
{
	var svalue = location.search.match(new RegExp("[\?\&]" + id + "=([^\&]*)(\&?)", "i"));
	return svalue ? svalue[1] : "";
}

//基金风险测评过期判断
function jConfirm_riskvalid() {
	if(Boxy.isModalVisible()){
		return;
	}
	
	Boxy.confirmX("对不起，您的风险承受能力测评结果已过期，为了不影响您的交易，请重新测评。", function() { 
		window.location.href = "/main/onlinebusiness/businessprocess/riskassessment/questionnaire/index.shtml";
	}, {title:"确认信息"});
}

//是否判断，通用弹出层提示
function jConfirm_Z(msg,url) {
	if(Boxy.isModalVisible()){
		return;
	}
	
	Boxy.confirmZ(msg, function() {
		if(url != ""){
			window.location.href = url;
		}
	}, {title:"确认信息"});
}

//查询基金信息
function doSingleFundQry(fund_code){
	$.ajax({
			type: "post",
			url:"/servlet/trade/FundCommon?function=AjaxFundInfo&t="+(new Date()).valueOf(),
			dataType: 'json',
			cache:false,
			data: {"fund_code":fund_code},
			beforeSend: function(XMLHttpRequest){
				$("#fund_name").val("");
				$("#nav").val("");
				$("#type_name").val("");
				$("#charge_type").val("");
				$("#fund_company").val("");
				$("#exchange_name").val("");
			},
			success: function(json, textStatus)
			{
				if(json != null){
					$("#fund_name").val(json.fund_name);
					$("#nav").val(json.nav);
					$("#type_name").val(json.type_name);
					$("#charge_type").val(json.charge_type);
					$("#fund_company").val(json.fund_company);
					$("#exchange_name").val(json.exchange_name);
				}
				
			}
		});
}

$(document).ready(function(){
	/*
	$(".scroll_btn a").mouseover(
		function(){
		$(this).stop();
		$(this).animate({width: '113px'},800);
	}).mouseleave(
		function(){
		$(this).stop();
		$(this).animate({width: '30px'},500);
		}
	);
	*/
	$("a").focus(function(){this.blur();});
	
});

//---------------------------js cookie 开始-----------------------------------//
function setCookies(name,value,day)
{
   var Days = 1; //默认此 cookie保存一天
   if(day != null && day != ""){
	   Days = day;
   }
   var exp   = new Date();     //new Date("December 31, 9998");
   exp.setTime(exp.getTime() + Days*24*60*60*1000);
   document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString();
}

function getCookies(name)
{
   var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
   if(arr != null) return unescape(arr[2]); return null;
}

function delCookies(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookies(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}