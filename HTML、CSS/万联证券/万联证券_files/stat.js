(function(){
var _SERVER_URL='https://monitor.wlzq.cn/stat/stat';
var _INNER_SITE='none';
var _COOKIE_NAME_CLICK_NUM="tk_stat_a";//记录每次会话点击次数
var _COOKIE_NAME_RE_VISIT_NUM="tk_stat_b";//回访次数
var _COOKIE_NAME_RE_VISIT_TIME="tk_stat_c";//最后访问时间(离开时间)
var _COOKIE_NAME_ENTER_URL="tk_stat_z";//进入该网站的网址
var _COOKIE_NAME_USER_T_CLICK="tk_stat_e"; //记录用户总的点击次数
var _COOKIE_NAME_USER_ID="tk_stat_id"; //用户的唯一性ID
var analyticsQueue=_aq;
var _defaultTracker;
function Tracker() {
}
//Tracker的函数命名约定：以下划线开头的为公开方法,否则为系统内部方法
Tracker.prototype._setSiteId = function(_siteId) {
	this.siteId = _siteId;
};
Tracker.prototype._setCatalogId = function(_catalogId) {
	if(_catalogId == 'null'){
		this.catalogId = '0';
	}else{
		this.catalogId = _catalogId;
	}
};
Tracker.prototype._setChannelId = function(_channelId) {
	if(_channelId == 'null'){
		this.channelId = '0';
	}else{
		this.channelId = _channelId;
	}
};
Tracker.prototype._setChildCatalogId = function(_childCatalogId) {
	if(_childCatalogId == 'null'){
		this.childCatalogId = '0';
	}else{
		this.childCatalogId = _childCatalogId;
	}
};

//set current time
Tracker.prototype.setCurTime=function(){
	var curDate = new Date();
	//curDate.setTime(serverTime); //以服务器端时间为准//TODO:修改
	this.curTime = parseInt(curDate.getTime());
	this.curDate=curDate;
};

//Pageviews of a session
//also named sc.
Tracker.prototype.pageviewsOfSession=function(){
	var sessionPageviews = getCookie(_COOKIE_NAME_CLICK_NUM); //记录每次会话点击次数
	if (sessionPageviews != -1)
	{
	    sessionPageviews = parseInt(sessionPageviews) + 1;
	}
	else
	{
		//TODO:maybe 1 is default value
	    sessionPageviews = 0;
	}
	setCookie(_COOKIE_NAME_CLICK_NUM, sessionPageviews, this.sessionExpires(), "/");
	return sessionPageviews;
};

//计算回访次数、最后访问时间（离开时间）、当前时间和最后一次访问之间相差的秒数
Tracker.prototype.setTime=function(){
	var rt = parseInt(getCookie(_COOKIE_NAME_RE_VISIT_NUM)); //回访次数
	var lt = parseInt(getCookie(_COOKIE_NAME_RE_VISIT_TIME)); //最后访问时间(离开时间)
	if (lt < 1000000)
	{
	    rt = 0;
	    lt = 0;
	}
	if (rt < 1) rt = 0;
	if (((this.curTime - lt) > 500 * 86400) && (lt > 0)) //超过12小时，回访次数增加一下
	{
	    rt++;
	}

	var st = (this.curTime - lt) / 1000; //当前时间和最后一次访问之间相差的秒数
	this.rt=rt;
	this.lt=lt;
	this.st=st;
};

//站点入口
//also named sin
Tracker.prototype.entranceURL=function(){
	var _entranceURL = getCookie(_COOKIE_NAME_ENTER_URL); //进入该网站的网址
	if (_entranceURL == -1)
	{
	    _entranceURL = _INNER_SITE;    
	}
	if(document.referrer.length >0)
	{
	    var domain = document.referrer.split('/')[2];
	    var pos = domain.indexOf(":");
	    if(pos != -1)
	    {
	       domain = domain.substr(0,pos);
	    }
	    if(domain != document.domain)
	    {
	       _entranceURL = document.referrer.substr(0, 512);
	    }
	}
	setCookie(_COOKIE_NAME_ENTER_URL, _entranceURL, this.sessionExpires(), "/");
	return _entranceURL;
};

//记录用户总的点击次数
Tracker.prototype.pageviewsOfVisitor=function(){
	var _pageviews = getCookie(_COOKIE_NAME_USER_T_CLICK); //记录用户总的点击次数
	if (_pageviews != -1)
	{
	    _pageviews = parseInt(_pageviews) + 1;
	}
	else
	{
	    _pageviews = 0;//TODO:maybe default is 1,not 0
	}
	setCookie(_COOKIE_NAME_USER_T_CLICK, _pageviews, this.visitorExpires(), "/");
	return _pageviews;
};

//visitor id
//also named sid
Tracker.prototype.visitorSid=function(){
	var _visitorSid = getCookie(_COOKIE_NAME_USER_ID); //用户的唯一性ID
	if (_visitorSid == -1)
	{
	    _visitorSid=createUUID();//TODO：这里尝试使用JAVASCRIPT生成UUID，可以更改为服务器端生产
	}
	setCookie(_COOKIE_NAME_USER_ID, _visitorSid, this.visitorExpires(), "/");
	return _visitorSid;
};




//将数据拼装成url的参数。
Tracker.prototype.toParams=function(){
	 var params="?id="+this.siteId;
	 params+='&catalogId='+this.catalogId;
	 params+='&channelId='+this.channelId;
	 params+='&childCatalogId='+this.childCatalogId;
	 params+='&url=' + escape(this.getUrl()) + '&r=' + this.getReferer() + '&ntime=' + this.curTime;
	 params+='&stc=' + this.pageviewsOfVisitor() + '&user=' + escape(this.getLoginUser()) +'&sc=' + this.pageviewsOfSession() ;
	 params+='&ltime=' + this.lt + '&rt=' + this.rt + '&sid=' + escape(this.visitorSid()) + '&showp=' + escape(screen.width + 'x' + screen.height)  ;
	 params+='&st=' + this.st+'&sin=' + escape(this.entranceURL()) + '&lang=' + this.getLanguage() + '&tag=' + this.getCurStatTag() + '&res=0'+'&title='+document.title;
	 return params;
};

Tracker.prototype._trackPageview=function(virtualUrl){
	this.setUrl(virtualUrl);
	//TODO:似乎要为虚拟url修正referer
	this.setCurTime();
	this.setTime();
	this.updateCookies();
	postData(_SERVER_URL+this.toParams());
};

//url
Tracker.prototype.setUrl=function(virtualUrl){
	if(virtualUrl && virtualUrl.length > 0){
		this.url=virtualUrl;
	}else{
		this.url=document.location.href;
	}
};
Tracker.prototype.getUrl=function(){
	return this.url;
};
//browser language.
Tracker.prototype.getLanguage=function(){
	return  window.navigator.language ? window.navigator.language:window.navigator.userLanguage;
};

//page source URL
Tracker.prototype.getReferer=function(){
	return escape(document.referrer.substr(0, 512));
};

//tag
Tracker.prototype.getCurStatTag=function(){
	return (typeof(_stat_tag) != 'undefined' && _stat_tag.length > 0)? _stat_tag : "";
};

//登录用户，需要客户网站的配合，即通过cookie对统计系统暴露用户信息
Tracker.prototype.getLoginUser=function(){
	var user = getCookie("tk_stat_user"); //获取当前登录用户信息
	//user = "123456786:yiqf:888888:100";//TODO：delete this line  随机数:用户名:资金账号:营业部
	if(user == -1)
	{
	    user="";
	}
	return user;
};

//session expires:default is 12 hours later.
//ThinkAnalytics的会话与GoogleAnalytics是不同的。
//ThinkAnalytics:固定的过期时间(GMT12小时后)
//Google Analytics:动态的30分钟后
Tracker.prototype.sessionExpires=function(){
	var date=new Date();
	var et = (43200 - this.curDate.getHours() * 3600 - this.curDate.getMinutes() * 60 - this.curDate.getSeconds()); //当前时往后推12小时
	date.setTime(this.curTime + 1000 * (et - this.curDate.getTimezoneOffset() * 60)); //转换为GMT时间
	return date;
};

//visitor expires:default is half year
Tracker.prototype.visitorExpires=function(){
	var date=new Date();
	date.setTime(this.curTime + 1000 * 86400 * 182); //过期时间为半年
	return date;
};

Tracker.prototype.updateCookies=function(){
	//related to session
	//related to visitor
	setCookie(_COOKIE_NAME_RE_VISIT_NUM, this.rt, this.visitorExpires(), "/");//revisits
	setCookie(_COOKIE_NAME_RE_VISIT_TIME, this.curTime, this.visitorExpires(), "/");//time of leaving site.
};

//--------------------Never used------------------

//从远程服务器获取相关信息
//Never used;
function getServerInfo(url){
	var xhr = xhr();
	xhr.onreadystatechange = (function(myxhr) {
		return function() {
			serverInfoCallback(myxhr);
		};
	})(xhr);
	xhr.open('get',url, true);
	xhr.send(null);
}

//从远程服务器获得相关信息之后
//Never used;
function serverInfoCallback(xhr){
	if (myxhr.readyState == 4 && myxhr.status==200) {
		 var json = eval("(" + myxhr.responseText + ")");
		 alert(json.curTime);
	}
}

/*
 * ----------------------helper methods-------------------------------
 */

//send data to server
function postData(url) {
	var image = new Image(1, 1);
	image.src = url;
	image.onload = function() {
		image.onload = null;
	};
};

function setCookie(name, value, expires, path)
{
    var cookieValue = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=" + path;
    document.cookie = cookieValue;
}

function getCookie(name)
{
    var search = name + "=";
    if (document.cookie.length > 0)
    {
        offset = document.cookie.indexOf(search);
        if (offset != -1)
        {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
    return -1;
}

function xhr() {
	if (window.location.protocol !== "file:") {
		try {
			return new window.XMLHttpRequest();
		} catch (xhrError) {
		}
	}
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch (activeError) {
	}
};

//Execute command array through reflection.Now only support one tracker.
//TODO:support multi-tracker.
//脚本入口
(function() {
	_defaultTracker = new Tracker();
	//execute _aq 
	executeCommand(analyticsQueue);
	//override _aq.push implements observer design pattern.
	analyticsQueue.push = function(){
		executeCommand(arguments);
    };
})();

//TODO:优化代码
function executeCommand(array){
	// public function naming:use "_" as prefix.
	// _aq is a global variable.
	var params = [];
	var lastFunc='';
	var commandArray=expand(array);
	for (var i=0;i<commandArray.length;i++) {
		var item=commandArray[i];
		if (isPublicMethod(item) && typeof(_defaultTracker[item])== "function") {
			//execute last function if lastFunc is not empty.
			if(lastFunc!=''){
				_defaultTracker[lastFunc].apply(_defaultTracker,params);
			}
			// update last function to current function.clear parameters array
			lastFunc=item;
			params = [];
			
			//if function is the last index.
			if(i==commandArray.length-1 && lastFunc!=''){
				_defaultTracker[lastFunc].apply(_defaultTracker,params);
			}
		} else {
			// collect parameter
			params.push(item);
			
			if(i==commandArray.length-1 && lastFunc!=''){
				_defaultTracker[lastFunc].apply(_defaultTracker,params);
			}
		}
	}
}

//展开嵌套数组
function expand(array){
	var expanded=[];
	expandArray(array,expanded);
	return expanded;
}

//将嵌套数组转化为一维数组
function expandArray(_array,expanded){
	for(var i=0;i<_array.length;i++){
		if(_array[i].constructor ===Array){
			expandArray(_array[i],expanded);
		}
		else{
			expanded.push(_array[i]);
		}
	}
}

function createUUID(){
	//http://www.ietf.org/rfc/rfc4122.txt
	var s=[];
	var hexDigits="0123456789ABCDEF";
	for(var i=0;i<31;i++){
		s[i]=hexDigits.substr(Math.floor(Math.random()*0x10),1);
		
	}
	s[12]=4;
	s[16]=hexDigits.substr((s[16]&0x3)|0x8,1);
	var uuid=s.join("");
	return uuid;
}

function isPublicMethod(methodName){
	if(methodName!=null && typeof methodName == 'string'&& methodName.length>0 && methodName.indexOf('_')==0){
		return true;
	}else{
		return false;
	}
}

})();
