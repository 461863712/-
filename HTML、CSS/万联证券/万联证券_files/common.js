$(document).ready(function(){
	var name=window.location.href.split("/")[5];
	var obj=$("li[name="+name+"]",parent.document);
	if(obj.length>0){
		obj.siblings().removeClass("current");
		obj.addClass("current");
	}
});

/**
 * ����ҳ����ת
 * pass 1��ֱ����ת�����жϵ�¼
 *      2����Ҫ�ж�ͨ����¼
 *      �ջ��������жϵ�¼
 */
function loadTradeContent(catalogid,linkurl,pass){
	
	if(catalogid != ""){
		$(".tab_nav ul li").removeClass("current");
		$("#functab"+catalogid).addClass("current");
	}
	
	var nowUrl = parent.window.location.href;
	
	nowUrl = encodeURIComponent(nowUrl);
	
	//��ȡ�������Ĵ���
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
			//�����жϣ� ֱ�ӽ���ҵ�����
			$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"fundcode":fundcode},this,true,resizeParentIframe);
			
		}else{
			//����ͨ����¼
			$.ajax(
			{
				type: "POST",
				url: "/servlet/LoginAction?function=AjaxTradeLogin&t="+(new Date()).valueOf(),
				dataType: 'json',
				data: "",
				cache: false,
				beforeSend: function(XMLHttpRequest){
					$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;'><img src='/images/loading.gif'/>���ڽ��е�½��֤�����Ժ�......</div>");
				},
				success: function(json, textStatus)
				{
					if(json == null){
						$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;'>���س������Ժ����ԡ�</div>");
					}else if(json.msg == "2"){
						//ͨ����¼���������ʽ��˺ţ�δ��¼���ף���ʾ���е�¼
						if(pass == "2"){
							//����ҵ�����
							$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"fundcode":fundcode},this,true,resizeParentIframe);
						}else{
							Boxy.load("/servlet/LoginAction?function=TbTradePage&linkurl="+linkurl+"&fundcode="+fundcode,{fixed:false,modal:true,unloadOnHide:true,afterHide:function(){
								$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;color:#ff0000'>��¼��֤δͨ��������Ȩ�޲鿴����Ŀ���ݡ�</div>");
								
							}});
							
						}
						
					}else if(json.msg == "3"){
						//ͨ����¼��δ���ʽ��˺ţ���ʾ�������
						if(pass == "2"){
							//����ҵ�����
							$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"fundcode":fundcode},this,true,resizeParentIframe);
						}else{
							//���Լ��˺���ʾҳ��
							Boxy.load("/servlet/LoginAction?function=TradeBindPage&linkurl="+linkurl+"&fundcode="+fundcode,{fixed:false,modal:true,unloadOnHide:true,afterHide:function(){
								$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;color:#ff0000'>��¼��֤δͨ��������Ȩ�޲鿴����Ŀ���ݡ�</div>");
								
							}});
						}
						
					}else{
						//����ҵ�����
						$("#tradeContent").loadData(linkurl,{"t":(new Date()).valueOf(),"retUrl":nowUrl,"fundcode":fundcode},this,true,resizeParentIframe);
					}
				},
				error: function(){
					$("#tradeContent").html("<div style='margin:30px 20px 20px 20px;font-size:10pt;text-align:left;width:580px;'>���س������Ժ����ԡ�</div>");
				}
			});
		}
		
	}else{
		jAlert("�Ƿ�����");
		$("#tradeContent").html("�Ƿ�����");
	}
}

//����ҳ����ת
function loadTradeContentByProduct(catalogid,linkurl){
	
	if(catalogid != ""){
		$(".tab_nav ul li").removeClass("current");
		$("#functab"+catalogid).addClass("current");
	}
	
	var nowUrl = parent.window.location.href;
	
	nowUrl = encodeURIComponent(nowUrl);
	
	//��ȡ�������Ĵ���
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
//���µ��������ڵ�iframe�߶�
function resizeParentIframe(){
	try{
		window.parent.iFrameHeight();
	}catch(e)
	{}
}
//����iframe�ĸ߶�
function iFrameHeight() {
	//alert("iFrameHeight");
	var obj=document.getElementById("wtframe"); //iframe id
	if (obj && document.getElementById){
		if (obj && !window.opera){
			if (obj.contentDocument && obj.contentDocument.body.offsetHeight){

				//��������ǽ����̬Chrom��load�¼��в������¼���߶�����
				obj.height=10;
				
				obj.height = obj.contentDocument.body.offsetHeight;
				
				//�������н��ie������Ӧ����
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

//���ں�ʱ��
//������������
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
//�õ�����ʱ��
function getTodayTime(){
  //var days=["������","����һ","���ڶ�","������","������","������","������"];
  var today=new Date();
  var str= (today.getYear()<1900?1900+today.getYear():today.getYear())+"��" + getDouble([today.getMonth()+1])+"��" +getDouble(today.getDate()) +"�� &nbsp;"+getDouble(today.getHours())+":"+getDouble(today.getMinutes());
  document.getElementById('datetime').innerHTML=str;
}

// ����Ƿ��ѵ�¼
function checkLogin(callback,callback_param){
	$.ajax(
	{
		type: "POST",
		url: "/servlet/LoginAction?function=AjaxCheckLogin&t="+(new Date()).valueOf(),
		dataType: 'json',
		data: "",
		cache: false,
		beforeSend: function(XMLHttpRequest){
			$("#logintips").text("���ã� Ϊ������¼״̬...");
		},
		success: function(json, textStatus)
		{
			if(json != null && json.msg=="succsess"){
				$("#logintips").html("���ã�<a target=\"wtframe\" href=\"/main/onlinebusiness/accountservice/personal/personaldata/index.shtml\">"+json.username+"</a><span>|</span> <a href=\"javascript:void(0)\" onclick=\"toLoginPage()\">���µ�¼</a> <span>|</span> <a href=\"/servlet/LoginAction?function=LogOut\">�˳�</a>");
				return true;
			}else{
				$("#logintips").html("���ã� <a href=\"javascript:void(0)\" onclick=\"toLoginPage()\">[���¼]</a>");
				if(callback){callback(callback_param);}
				return false;
			}
		},
		error: function(){
			$("#logintips").html("���ã� <a href=\"javascript:void(0)\" onclick=\"toLoginPage()\">[���¼]</a>");
		}
	});
}

//��ת��¼ҳ��
function toLoginPage(){
	var nowUrl = window.location.href;
	window.location.href = "/servlet/LoginAction?retUrl="+encodeURIComponent(nowUrl);
}

//�Ƿ�Ϊ��
function isEmpty(strValue)
{
	strValue = jQuery.trim(strValue);
	return strValue.length == 0;
}

//��ȡ�������
function QueryString(id)
{
	var svalue = location.search.match(new RegExp("[\?\&]" + id + "=([^\&]*)(\&?)", "i"));
	return svalue ? svalue[1] : "";
}

//������ղ��������ж�
function jConfirm_riskvalid() {
	if(Boxy.isModalVisible()){
		return;
	}
	
	Boxy.confirmX("�Բ������ķ��ճ���������������ѹ��ڣ�Ϊ�˲�Ӱ�����Ľ��ף������²�����", function() { 
		window.location.href = "/main/onlinebusiness/businessprocess/riskassessment/questionnaire/index.shtml";
	}, {title:"ȷ����Ϣ"});
}

//�Ƿ��жϣ�ͨ�õ�������ʾ
function jConfirm_Z(msg,url) {
	if(Boxy.isModalVisible()){
		return;
	}
	
	Boxy.confirmZ(msg, function() {
		if(url != ""){
			window.location.href = url;
		}
	}, {title:"ȷ����Ϣ"});
}

//��ѯ������Ϣ
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

//---------------------------js cookie ��ʼ-----------------------------------//
function setCookies(name,value,day)
{
   var Days = 1; //Ĭ�ϴ� cookie����һ��
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

function delCookies(name)//ɾ��cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookies(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}