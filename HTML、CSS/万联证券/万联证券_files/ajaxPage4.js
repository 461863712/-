
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
		jQuery("#"+divId).html("<div class='loading' style='background:none;margin:10px;'><img src='/front/images/loading.gif'/>�������롭��</div>");
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
						showServerMsg("��������ʧ�ܣ�","��ʾ��Ϣ");
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
			type:1,//��ӵĲ��� ��һ��ҵ�����Ҫ ������Ŀ�ɲ�Ҫ�ò��� ���ȥ��
			curpage:1,//��ǰҳ
			pagecount:20,//��ҳ��
			breakpage:8,//��ҳ��<=��ֵʱ��ȫ����ʾ
			isShowPage:true,//�Ƿ���ʾ��ҳ����Ĭ����ʾ
			isShowJump:true,//�Ƿ���ʾ�����ڼ�ҳ��Ĭ����ʾ
			style:"",//��Ϊ��ͨ��ʽ��mini������
			numPerPage:30,//һҳ��ʾ�ļ�¼����Ĭ��20��
			ajaxRequestPath:"",//�첽����·��
			divId:"",//ҳ��div�ڵ�
			toPos:"",//����λ�� #maninfo
			isCache:false,
		    exFunc:null //�ص�����
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
			pagestr += "<a href='javascript:void(0);' class='first' onClick='executeFunc(1);'>��ҳ</a>";
		}else{
			pagestr += "<a href='javascript:void(0);' class='first' onClick='executePage("+1+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>��ҳ</a>";
		}
		//pagestr+="|";
		if(settings.curpage>1)
		{
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='prev' onClick='executeFunc("+(curpage-1)+");'>��һҳ</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='prev' onClick='executePage("+(curpage-1)+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\",\""+settings.isCache+"\");'>��һҳ</a>";
			}
			
	//		alert("curpage>1:"+curpage);
			
		}else{
			pagestr +="<a  class='prev' href='javascript:void(0);'>��һҳ</a>";
		}
		 //pagestr+="|";
		 	//����ҳ��С�ڵ���breakpageֵʱ��ҳ��ȫ����ʾ
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
				pagestr += "<span>��</span>";
				pagestr += createNumber(pagecount);		
				
			}
			else if(curpage > 3 && curpage <= pagecount - 3)
			{
				pagestr += createNumber(1);	
				pagestr += "<span>��</span>";
				for(var i=curpage - 1;i<curpage+2;i++)
				{
					pagestr += createNumber(i);		
				}
				pagestr += "<span>��</span>";
				pagestr += createNumber(pagecount);	
			}
			else
			{
				pagestr += createNumber(1);	
				pagestr += "<span>��</span>";
				for(var i=curpage-2;i<=pagecount;i++)
				{
					pagestr += createNumber(i);	
				}
			}
		}
		if(settings.curpage<settings.pagecount)
		{
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='next' onClick='executeFunc("+(curpage+1)+");'>��һҳ</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='next' onClick='executePage("+(curpage+1)+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\",\""+settings.isCache+"\");'>��һҳ</a>";
			}
			
	//		alert("settings.curpage<settings.pagecount:"+curpage);
			
		}else{
			pagestr +="<a class='prev' href='javascript:void(0);'>��һҳ</a>";
		}
		//pagestr+="|";
		if(exFunc != null){
			pagestr +="<a href='javascript:void(0);' class='next' onClick='executeFunc("+settings.pagecount+");'>βҳ</a>";
		}else{
			pagestr +="<td><a href='javascript:void(0);' class='next'  onClick='executePage("+settings.pagecount+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>βҳ</a>";
		}
	   
		pagestr += '<span class="numTxt">&nbsp;&nbsp;��'+settings.pagecount+'ҳ&nbsp;&nbsp;</span>';
		jQuery(this).html(pagestr);
		if(settings.isShowJump)
		{
			
			var $jump= $('<input name="jump" id="jump" type="text" class="pagenum" maxlength="4" />');
			jQuery(this).append("<span class='numTxt'>������&nbsp;</span>").append($jump).append("<span>&nbsp;ҳ</span>");
			var $btn = jQuery('<a class="btngo" style="cursor:pointer" href="javascript:void(0);"></a>');
			
			
			$btn.append("ȷ��").click(function()
			{
				var jump = $('#jump').val();
				
				if(jQuery.trim(jump).length == 0)
				{
					showServerMsg("��������תҳ������" + settings.pagecount + "ҳ","��ʾ��Ϣ");
					$jump.focus();
				}
				else
				{
					if(jump.search("^-?\\d+$") != 0)
					{
						showServerMsg("�������ҳ��������������֣�","��ʾ��Ϣ");
						$jump.focus();
					}
					else if(parseInt(jump) < 1 || parseInt(jump) > 	settings.pagecount)
					{
						showServerMsg("�������ҳ�볬����Χ�����������룡","��ʾ��Ϣ");
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