jQuery.fn.extend({
	loadData:function(aUrl,jsonVal,type,isPost)
	{
		var obj = this;
		
		jsonVal.reqUrl = aUrl;
		var sendType = "post";
		if(!isPost)
		  sendType = "get";
		jQuery.ajax({
			type: sendType,
			url: aUrl,
			cache:false,
			data:jsonVal,
			beforeSend: function(XMLHttpRequest){ 
				obj.showLoading();
			},
			success: function(data, textStatus)
			{
				obj.html(data);
				
			},
			complete: function(XMLHttpRequest, textStatus){
				if(type==true)
				javascript:scroll(0,0); 
			},
			error: function(){
				//���������
				obj.html("<div class='loadbox'>��������ʧ�ܣ�</div>");
			}
		});
	},
	showLoading:function()
	{
		this.html("<div class='loadbox'><div class='loading' style='background:#FFFFFF;'><img src='/front/images/loading.gif' />�������롭��</div></div>");
	}		 
});

