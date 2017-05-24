/**
 * 作者：刘迪椋
 * 说明：万联证券首页JS特效
 * 日期：2014-04-09
 */

var a=1;//商城变量
var i=1;//地图图片切换变量
var index=1;//底部文章变量
//var fir=1;//快捷融资变量
$(document).ready(function(){
	/***********商城开始******************/
	setInterval("changeSc()",5000);
	$("#sc_1_one").click(function(){
		$("#sc_1_two").removeClass();
		$("#sc_1_one").addClass("current");
		$("#sc_2").hide();
		$("#sc_1").show();
	});
	$("#sc_1_two").click(function(){
		$("#sc_2_one").removeClass();
		$("#sc_2_two").addClass("current");
		$("#sc_1").hide();
		$("#sc_2").show();
	});
	$("#sc_2_one").click(function(){
		$("#sc_2_two").removeClass();
		$("#sc_1_one").addClass("current");
		$("#sc_2").hide();
		$("#sc_1").show();
	});
	$("#sc_2_two").click(function(){
		$("#sc_2_one").removeClass();
		$("#sc_2_two").addClass("current");
		$("#sc_1").hide();
		$("#sc_2").show();
	});
	/***********商城结束******************/

	/***********理财净值开始******************/
	var currentPage=1;
	var pageCount=$("#page_count").html();
	var sta;
	$("[id^=tr_]").hide();
	$("[id^=tr_]").slice(0,5).show();
	
	$("#pre").click(function(){
		currentPage--;
		if(currentPage<1)currentPage=1;
		$("#page").html(currentPage);
		sta=(currentPage-1)*5;
		$("[id^=tr_]").hide();
		$("[id^=tr_]").slice(sta,sta+5).show();
	});
	$("#next").click(function(){
		currentPage++;
		if(currentPage>pageCount)currentPage=pageCount;
		$("#page").html(currentPage);
		sta=(currentPage-1)*5;
		$("[id^=tr_]").hide();
		$("[id^=tr_]").slice(sta,sta+5).show();
	});
	/***********理财净值结束******************/


	/***********理财净值公告轮播切换开始******************/
	$("#h_inform").Xslider({
	 unitdisplayed:1,
	 numtoMove:1,
	 loop:"cycle",
	 dir:"V",
	 unitlen:35,
	 autoscroll:2500,
	 speed:300
	});
	/***********理财净值公告轮播切换结束******************/

	/***********营业部公告轮播切换开始******************/
	$("#h_inform2").Xslider({
	 unitdisplayed:1,
	 numtoMove:1,
	 loop:"cycle",
	 dir:"V",
	 unitlen:17,
	 autoscroll:2500,
	 speed:300
	});
	/***********营业部公告轮播切换结束******************/

	/***********地图图片切换开始******************/
	setInterval("changeMap()",6000);
	/***********地图图片切换结束******************/
	
	/***********底部文章轮播切换开始******************/
	var speed=5000;
	var MyMarquee;
	function Marquee(){
		index++;
		if(index>3)
		index=1;
		changeTab(index);
	};
	MyMarquee=setInterval(Marquee,speed);

	$("[id^=tab_]").mouseover(function(){
		clearInterval(MyMarquee);
	});
	$("[id^=tab_]").mouseleave(function(){
		MyMarquee=setInterval(Marquee,speed);
	});

	$("[id^=tabshow_]").mouseover(function(){
		clearInterval(MyMarquee);
	});
	$("[id^=tabshow_]").mouseleave(function(){
		MyMarquee=setInterval(Marquee,speed);
	});

	$("[id^=a_more_]").mouseover(function(){
		clearInterval(MyMarquee);
	});
	$("[id^=a_more_]").mouseleave(function(){
		MyMarquee=setInterval(Marquee,speed);
	});
	/***********底部文章轮播切换结束******************/

	/***********快捷融资开始******************/
	/*var kjrz_speed=3000;
	var kjrz_marquee;
	function kj_marquee(){
		fir++;
		if(fir>3){
			fir=1;
		}
		changeKJRZ(fir);
	};
	kjrz_marquee=setInterval(kj_marquee,kjrz_speed);

	$("[id^=kjrz_]").mouseover(function(){
		clearInterval(kjrz_marquee);
	});
	$("[id^=kjrz_]").mouseleave(function(){
		kjrz_marquee=setInterval(kj_marquee,kjrz_speed);
	});
	$("#show_kjrz_1").mouseover(function(){
		clearInterval(kjrz_marquee);
	});
	$("#show_kjrz_1").mouseleave(function(){
		kjrz_marquee=setInterval(kj_marquee,kjrz_speed);
	});
	$("#show_kjrz_2").mouseover(function(){
		clearInterval(kjrz_marquee);
	});
	$("#show_kjrz_2").mouseleave(function(){
		kjrz_marquee=setInterval(kj_marquee,kjrz_speed);
	});*/
	/***********快捷融资结束******************/

});

//快捷融资切换效果
function changeKJRZ(firid){
//	fir=firid;
	if(firid==1){
		$("[id^=kjrz_]").removeClass();
		$("#kjrz_"+firid).addClass("current");
		$("[id^=show_kjrz_]").hide();
		$("#show_kjrz_"+firid).show();
	}
	else{
		$("[id^=kjrz_]").removeClass();
		$("#kjrz_"+firid).addClass("current");
		$("#kjrz_"+firid+"_"+firid).addClass("current");
		$("#kjrz_2").addClass("current");
		$("[id^=show_kjrz_]").hide();
		$("#show_kjrz_2").show();
		$("#show_kjrz_"+firid+"_"+firid).show();
	}
}


//广告下面快速链接效果
function changePicon(id){
	$("#img_"+id).attr("src","/front/images/icon_i"+id+"on.png");
}
function changePic(id){
	$("#img_"+id).attr("src","/front/images/icon_i"+id+".png");
}

//商城效果切换
function changeSc(){
	//$("#sc_"+a).fadeOut(300);
	//$("#sc_"+a).animate({opacity: 'toggle'}, { duration: 1000 });
	$("#sc_"+a).hide();
	a++;
	if(a>2){a=1;}
	//$("#sc_"+a).fadeIn(800);
	//$("#sc_"+a).animate({opacity: 'toggle'}, { duration: 1000 });
	$("#sc_"+a).show();
}

//交易顾问效果切换
function showX(id){
	if(id=='0'){
		$("[id^=x_]").hide();
	}else{
		$("#x_"+id).show();
	}
}

//地图图片效果切换
function changeMap(){
	$("#map"+i+"_img").animate({opacity: 'toggle'}, { duration: 1000 });
	$("#map"+i+"_img").hide();
	$("#map"+i+"_title").hide();
	i++;
	if(i>1){i=1;}
	$("#map"+i+"_title").show();
	$("#map"+i+"_img").animate({opacity: 'toggle'}, { duration: 2000 });
	$("#map"+i+"_img").show();
}

//底部文章切换效果
function changeTab(id){
	index=id;
	$("[id^=tab_]").removeClass();
	$("#tab_"+id).addClass("current");
	$("[id^=tabshow_]").hide();
	$("#tabshow_"+id).show();
	$("[id^=a_more_]").hide();
	$("#a_more_"+id).show();
}