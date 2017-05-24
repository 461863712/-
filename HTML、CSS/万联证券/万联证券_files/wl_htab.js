/**
 * @author LiuFang
 */
$(document).ready(function(){
	var mainli = null;
	
	$('#main_nav li').each(function(){
		var cc = $(this).attr("class");
		if(cc=="nowcurr"){
			mainli = $(this).attr("id");
		}
		
		$(this).mouseover(function(){
			$("div[id^='div_nav_tab']").each(function(){
				$(this).hide();
			});
			var trigger = $(this).attr('id');
			$("#"+trigger).addClass("nowcurr");
			$("#"+trigger+" a").addClass("current");
			$("#div_"+trigger).show();
			
			
			/**
			var liwidth = 0;
			 liwidth = $("#div_"+trigger+" span").width()+24;
						if(liwidth>0)
						{
						    var leftnum = 0;
							//var marginLeft = ($(this).offset().left + $(this).width()/2)-liwidth/2;
						    var marginLeft = (($(this).offset().left-$("#main_nav li:first-child").offset().left )+ $(this).width()/2)-liwidth/2;
							marginLeft = marginLeft - leftnum;
							if(marginLeft+liwidth>$("#main_nav").width())
							{
								marginLeft -= marginLeft+liwidth - $("#main_nav").width();
							}
							marginLeft = marginLeft < 0?0 : marginLeft;
							$("#div_"+trigger).css("margin-left",marginLeft-0);
						}
			**/
			
		});
		
		$(this).mouseleave(function(){
			var trigger = $(this).attr('id');
			$("#"+trigger).removeClass("nowcurr");
			$("#"+trigger+" a").removeClass("current");
			
			$("#"+mainli).addClass("nowcurr");
			$("#"+mainli+" a").addClass("current");
			
			$("#div_"+trigger).mouseover(function(){
				
				$("#"+trigger).addClass("nowcurr");
				$("#"+trigger+" a").addClass("current");
				
				$("#"+mainli).addClass("nowcurr");
				$("#"+mainli+" a").addClass("current");
				
			});
			
			$("#div_"+trigger).mouseleave(function(){
				
				$("#"+trigger).removeClass("nowcurr");
				$("#"+trigger+" a").removeClass("current");
				
				$("#"+mainli).addClass("nowcurr");
				$("#"+mainli+" a").addClass("current");
				
			});
			
		});
		
	});
	
	
	//移动到头部需要隐藏二级栏目
	$('#header').bind("mouseover",function(){
				$("div[id^='div_nav_tab']").each(function(){
				$(this).hide();
			});
	});
	//移动到子元素的时候
	$('#alltab').bind("mouseleave",function(){
			$("div[id^='div_nav_tab']").each(function(){
			$(this).hide();
		});
	});
	
	$('#nav_tab2913').bind("mouseleave",function(){
		$("#div_nav_tab2913").hide();
});
	$("#div_nav_tab2913").bind("mouseover",function(){
		$("#div_nav_tab2913").show();
	});
	
	
	//页面初始化
	 $("#main_nav li:last-child").addClass("last"); 
	 
});


 