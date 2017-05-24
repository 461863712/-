/**
 * 首页广告切换:HomeImgAdvert
 * 其他首页首页广告切换： imgAdvert
 * */		

function changeAdvert(bObjId, mObjId, time){
	var url = window.location.href;
	if(url.indexOf("home")!=-1){
		HomeImgAdvert(bObjId, mObjId, time);
	}else{
		imgAdvert(bObjId, mObjId, time);
	}
}

function imgAdvert(bObjId, mObjId, time){
			//定时任务 点击切换
			var fadeImage = function(){
				var obj = $("#"+mObjId).find(".current").parent().next() ;
				if(obj=="" || obj.length <= 0){
					$("#"+mObjId).children().eq(0).click() ;
				}else{
					obj.click() ;
				}
			};
			
			var interval = setInterval(fadeImage, time); //图片切换定时任务
			var img_height = $("#"+bObjId).height() ; //图片高度
			$("#"+mObjId).find("li").each(function(){
				var index = $(this).index() ;
				$("#"+bObjId).children().eq(index).css("position","relative").css("top","-"+img_height*index+"px") ;
				$("#"+mObjId).css("z-index","99") ;
			}) ;
		
			$("#"+mObjId).find("li").click(function(index){
				var index = $(this).index() ;
				var i = $("#"+mObjId).find(".current").parent().index() ;
				if(i==index){ //当前不能再点击
					return ;
				}
				$("#"+bObjId).children().stop(true,true) ;
				$("#"+mObjId).find(".current").removeClass("current");
				$("#"+mObjId).children().eq(index).find("a").addClass("current");
				
				$("#"+bObjId).find(".current").fadeTo(1000,0,function(){}) ;
				$("#"+bObjId).children().eq(index).fadeTo(1000,1,function(){});
				
				$("#"+bObjId).children().queue(function(){
					$("#"+bObjId).find(".current").css("z-index","0").removeClass("current")  ; 
					$("#"+bObjId).children().eq(index).css("z-index","1").addClass("current")  ; 
					$(this).dequeue(); //队列
				});
				
				clearTimeout(interval);  //关闭定时器  
				interval = setInterval(fadeImage, time); //图片切换定时任务
			});	
			
			$("#"+mObjId).children().each(function(){ //遍历，全部点击一遍 
				$(this).click() ;
			}) ;
			$("#"+mObjId).children(":first").click() ; //回到第一个
			return interval ;
		}
			
		function HomeImgAdvert(bObjId, mObjId, time){
			//定时任务 点击切换
			var fadeImage = function(){
				var obj = $("#"+mObjId).find(".selected").parent().next() ;
				if(obj=="" || obj.length <= 0){
					$("#"+mObjId).children().eq(0).click() ;
				}else{
					obj.click() ;
				}
			};
			
			var interval = setInterval(fadeImage, time); //图片切换定时任务
			var img_height = $("#"+bObjId).height() ; //图片高度
			$("#"+mObjId).find("li").each(function(){
				var index = $(this).index() ;
				$("#"+bObjId).children().eq(index).css("position","relative").css("top","-"+img_height*index+"px") ;
				$("#"+mObjId).css("z-index","9999") ;
			}) ;
		
			$("#"+mObjId).find("li").click(function(index){
				var index = $(this).index() ;
				var i = $("#"+mObjId).find(".selected").parent().index() ;
				if(i==index){ //当前不能再点击
					return ;
				}
				$("#"+bObjId).children().stop(true,true) ;
				$("#"+mObjId).find(".selected").removeClass("selected");
				$("#"+mObjId).children().eq(index).find("a").addClass("selected");
				
				$("#"+bObjId).find(".current").fadeTo(1000,0,function(){}) ;
				$("#"+bObjId).children().eq(index).fadeTo(1000,1,function(){});
				
				$("#"+bObjId).children().queue(function(){
					$("#"+bObjId).find(".current").css("z-index","0").removeClass("current")  ; 
					$("#"+bObjId).children().eq(index).css("z-index","1").addClass("current")  ; 
					$(this).dequeue(); //队列
				});
				
				clearTimeout(interval);  //关闭定时器  
				interval = setInterval(fadeImage, time); //图片切换定时任务
			});	
			
			$("#"+mObjId).children().each(function(){ //遍历，全部点击一遍 
				$(this).click() ;
			}) ;
			$("#"+mObjId).children(":first").click() ; //回到第一个
			return interval ;
		}