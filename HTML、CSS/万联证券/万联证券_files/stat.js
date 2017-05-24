(function(){
var _SERVER_URL='https://monitor.wlzq.cn/stat/stat';
var _INNER_SITE='none';
var _COOKIE_NAME_CLICK_NUM="tk_stat_a";//��¼ÿ�λỰ�������
var _COOKIE_NAME_RE_VISIT_NUM="tk_stat_b";//�طô���
var _COOKIE_NAME_RE_VISIT_TIME="tk_stat_c";//������ʱ��(�뿪ʱ��)
var _COOKIE_NAME_ENTER_URL="tk_stat_z";//�������վ����ַ
var _COOKIE_NAME_USER_T_CLICK="tk_stat_e"; //��¼�û��ܵĵ������
var _COOKIE_NAME_USER_ID="tk_stat_id"; //�û���Ψһ��ID
var analyticsQueue=_aq;
var _defaultTracker;
function Tracker() {
}
//Tracker�ĺ�������Լ�������»��߿�ͷ��Ϊ��������,����Ϊϵͳ�ڲ�����
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
	//curDate.setTime(serverTime); //�Է�������ʱ��Ϊ׼//TODO:�޸�
	this.curTime = parseInt(curDate.getTime());
	this.curDate=curDate;
};

//Pageviews of a session
//also named sc.
Tracker.prototype.pageviewsOfSession=function(){
	var sessionPageviews = getCookie(_COOKIE_NAME_CLICK_NUM); //��¼ÿ�λỰ�������
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

//����طô�����������ʱ�䣨�뿪ʱ�䣩����ǰʱ������һ�η���֮����������
Tracker.prototype.setTime=function(){
	var rt = parseInt(getCookie(_COOKIE_NAME_RE_VISIT_NUM)); //�طô���
	var lt = parseInt(getCookie(_COOKIE_NAME_RE_VISIT_TIME)); //������ʱ��(�뿪ʱ��)
	if (lt < 1000000)
	{
	    rt = 0;
	    lt = 0;
	}
	if (rt < 1) rt = 0;
	if (((this.curTime - lt) > 500 * 86400) && (lt > 0)) //����12Сʱ���طô�������һ��
	{
	    rt++;
	}

	var st = (this.curTime - lt) / 1000; //��ǰʱ������һ�η���֮����������
	this.rt=rt;
	this.lt=lt;
	this.st=st;
};

//վ�����
//also named sin
Tracker.prototype.entranceURL=function(){
	var _entranceURL = getCookie(_COOKIE_NAME_ENTER_URL); //�������վ����ַ
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

//��¼�û��ܵĵ������
Tracker.prototype.pageviewsOfVisitor=function(){
	var _pageviews = getCookie(_COOKIE_NAME_USER_T_CLICK); //��¼�û��ܵĵ������
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
	var _visitorSid = getCookie(_COOKIE_NAME_USER_ID); //�û���Ψһ��ID
	if (_visitorSid == -1)
	{
	    _visitorSid=createUUID();//TODO�����ﳢ��ʹ��JAVASCRIPT����UUID�����Ը���Ϊ������������
	}
	setCookie(_COOKIE_NAME_USER_ID, _visitorSid, this.visitorExpires(), "/");
	return _visitorSid;
};




//������ƴװ��url�Ĳ�����
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
	//TODO:�ƺ�ҪΪ����url����referer
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

//��¼�û�����Ҫ�ͻ���վ����ϣ���ͨ��cookie��ͳ��ϵͳ��¶�û���Ϣ
Tracker.prototype.getLoginUser=function(){
	var user = getCookie("tk_stat_user"); //��ȡ��ǰ��¼�û���Ϣ
	//user = "123456786:yiqf:888888:100";//TODO��delete this line  �����:�û���:�ʽ��˺�:Ӫҵ��
	if(user == -1)
	{
	    user="";
	}
	return user;
};

//session expires:default is 12 hours later.
//ThinkAnalytics�ĻỰ��GoogleAnalytics�ǲ�ͬ�ġ�
//ThinkAnalytics:�̶��Ĺ���ʱ��(GMT12Сʱ��)
//Google Analytics:��̬��30���Ӻ�
Tracker.prototype.sessionExpires=function(){
	var date=new Date();
	var et = (43200 - this.curDate.getHours() * 3600 - this.curDate.getMinutes() * 60 - this.curDate.getSeconds()); //��ǰʱ������12Сʱ
	date.setTime(this.curTime + 1000 * (et - this.curDate.getTimezoneOffset() * 60)); //ת��ΪGMTʱ��
	return date;
};

//visitor expires:default is half year
Tracker.prototype.visitorExpires=function(){
	var date=new Date();
	date.setTime(this.curTime + 1000 * 86400 * 182); //����ʱ��Ϊ����
	return date;
};

Tracker.prototype.updateCookies=function(){
	//related to session
	//related to visitor
	setCookie(_COOKIE_NAME_RE_VISIT_NUM, this.rt, this.visitorExpires(), "/");//revisits
	setCookie(_COOKIE_NAME_RE_VISIT_TIME, this.curTime, this.visitorExpires(), "/");//time of leaving site.
};

//--------------------Never used------------------

//��Զ�̷�������ȡ�����Ϣ
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

//��Զ�̷�������������Ϣ֮��
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
//�ű����
(function() {
	_defaultTracker = new Tracker();
	//execute _aq 
	executeCommand(analyticsQueue);
	//override _aq.push implements observer design pattern.
	analyticsQueue.push = function(){
		executeCommand(arguments);
    };
})();

//TODO:�Ż�����
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

//չ��Ƕ������
function expand(array){
	var expanded=[];
	expandArray(array,expanded);
	return expanded;
}

//��Ƕ������ת��Ϊһά����
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
