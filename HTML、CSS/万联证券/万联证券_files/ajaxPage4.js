
/* page
 * numPerPage
 * ajaxRequestPath :
 * 
 */
function executePage(page,numPerPage,ajaxRequestPath,divId,type,toPos,isCache)
{
	if(page > 0)
	{
		
		if(toPos!==""){
			var t = $(toPos).offset().top;
			$(window).scrollTop(t);
		}
		if((isCache == undefined) || (isCache == "") || (isCache == null))
		{
			isCache = false;	
		}
		jQuery("#"+divId).html("<div class='loading' style='background:none;margin:10px;'><img src='/front/images/loading.gif'/>正在载入……</div>");
		var jsonVal = {'curPage':page,'numPerPage':numPerPage,'type':type};
		jQuery.ajax({
					type: "post",
					url: ajaxRequestPath,
					cache: isCache,
					data: jsonVal,
					
					success: function(data, textStatus)
					{
						jQuery("#"+divId).html(data);
					},
					error: function(){
						showServerMsg("请求数据失败！","提示信息");
					}
			});
	}
}
var exFunc = null;

function executeFunc(param)
{
	exFunc(param);
}

(function(jQuery) {
	jQuery.fn.getLinkStr = function(settings) {

		settings = jQuery.extend({
			type:1,//后加的参数 因一个业务的需要 其他项目可不要该参数 亦可去掉
			curpage:1,//当前页
			pagecount:20,//总页数
			breakpage:8,//总页数<=该值时，全部显示
			isShowPage:true,//是否显示总页数，默认显示
			isShowJump:true,//是否显示跳到第几页，默认显示
			style:"",//空为普通样式，mini：精简
			numPerPage:30,//一页显示的记录数，默认20条
			ajaxRequestPath:"",//异步请求路径
			divId:"",//页面div节点
			toPos:"",//滑动位置 #maninfo
			isCache:false,
		    exFunc:null //回调函数
		}, settings);
		
		$obj = this;
		exFunc = settings.exFunc;
		var createNumber = function(num)
		{	
			if(settings.curpage == num){
				return "<a href='javascript:void(0);'><font color='#FF0000'>"+num+"</font></a>";
			}else{
				if(exFunc != null){
					return "<a href='javascript:void(0);' onClick='executeFunc("+num+");'>" + num + "</a>";
				}else{
					return "<a href='javascript:void(0);' onClick='executePage("+num+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\",\""+settings.isCache+"\");'>" + num + "</a>";
				}
			}
		}
		
		jQuery(this).html("");
		
		var curpage = parseInt(settings.curpage);
		var pagecount = parseInt(settings.pagecount);
		
		//var pagestr= "<span class='skip'><input class='skip_txt' type='text'  name='jump' id='jump' value='"+settings.curpage+"'/><a class='skip_btn' href='javascript:void(0);'>GO</a></span>";
		//pagestr+="<span class='turn'>";
		var pagestr= "";
		if(exFunc != null){
			pagestr += "<a href='javascript:void(0);' class='first' onClick='executeFunc(1);'>首页</a>";
		}else{
			pagestr += "<a href='javascript:void(0);' class='first' onClick='executePage("+1+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>首页</a>";
		}
		//pagestr+="|";
		if(settings.curpage>1)
		{
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='prev' onClick='executeFunc("+(curpage-1)+");'>上一页</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='prev' onClick='executePage("+(curpage-1)+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\",\""+settings.isCache+"\");'>上一页</a>";
			}
			
	//		alert("curpage>1:"+curpage);
			
		}else{
			pagestr +="<a  class='prev' href='javascript:void(0);'>上一页</a>";
		}
		 //pagestr+="|";
		 	//当总页数小于等于breakpage值时，页码全部显示
		if(pagecount <= settings.breakpage)
		{
			for(var i=1;i<=pagecount;i++)
			{
				pagestr += createNumber(i);	
			}
		}
		else
		{
			if(curpage <= 3)
			{
				for(var i=1;i<curpage + 3;i++)
				{
					pagestr += createNumber(i);		
				}
				pagestr += "<span>…</span>";
				pagestr += createNumber(pagecount);		
				
			}
			else if(curpage > 3 && curpage <= pagecount - 3)
			{
				pagestr += createNumber(1);	
				pagestr += "<span>…</span>";
				for(var i=curpage - 1;i<curpage+2;i++)
				{
					pagestr += createNumber(i);		
				}
				pagestr += "<span>…</span>";
				pagestr += createNumber(pagecount);	
			}
			else
			{
				pagestr += createNumber(1);	
				pagestr += "<span>…</span>";
				for(var i=curpage-2;i<=pagecount;i++)
				{
					pagestr += createNumber(i);	
				}
			}
		}
		if(settings.curpage<settings.pagecount)
		{
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='next' onClick='executeFunc("+(curpage+1)+");'>下一页</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='next' onClick='executePage("+(curpage+1)+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\",\""+settings.isCache+"\");'>下一页</a>";
			}
			
	//		alert("settings.curpage<settings.pagecount:"+curpage);
			
		}else{
			pagestr +="<a class='prev' href='javascript:void(0);'>下一页</a>";
		}
		//pagestr+="|";
		if(exFunc != null){
			pagestr +="<a href='javascript:void(0);' class='next' onClick='executeFunc("+settings.pagecount+");'>尾页</a>";
		}else{
			pagestr +="<td><a href='javascript:void(0);' class='next'  onClick='executePage("+settings.pagecount+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>尾页</a>";
		}
	   
		pagestr += '<span class="numTxt">&nbsp;&nbsp;共'+settings.pagecount+'页&nbsp;&nbsp;</span>';
		jQuery(this).html(pagestr);
		if(settings.isShowJump)
		{
			
			var $jump= $('<input name="jump" id="jump" type="text" class="pagenum" maxlength="4" />');
			jQuery(this).append("<span class='numTxt'>跳到第&nbsp;</span>").append($jump).append("<span>&nbsp;页</span>");
			var $btn = jQuery('<a class="btngo" style="cursor:pointer" href="javascript:void(0);"></a>');
			
			
			$btn.append("确定").click(function()
			{
				var jump = $('#jump').val();
				
				if(jQuery.trim(jump).length == 0)
				{
					showServerMsg("请输入跳转页数，共" + settings.pagecount + "页","提示信息");
					$jump.focus();
				}
				else
				{
					if(jump.search("^-?\\d+$") != 0)
					{
						showServerMsg("您输入的页码错误，请输入数字！","提示信息");
						$jump.focus();
					}
					else if(parseInt(jump) < 1 || parseInt(jump) > 	settings.pagecount)
					{
						showServerMsg("您输入的页码超出范围，请重新输入！","提示信息");
						$jump.focus();
					}
					else
					{
						if(exFunc != null){
							executeFunc(jump);
						}else{
							executePage(jump,settings.numPerPage,settings.ajaxRequestPath,settings.divId,settings.type,settings.toPos,settings.isCache);
						}
					}
				}
			 });
			jQuery(this).append($btn);	
		}
	}
})(jQuery);