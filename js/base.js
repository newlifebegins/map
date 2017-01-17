//=================================全局变量============================

 //判定浏览器类型
var isQuirks = document.compatMode == "BackCompat";
var isStrict = document.compatMode == "CSS1Compat";
var isGecko = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;
var isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") != -1;
var isOpera = navigator.userAgent.toLowerCase().indexOf("opera") != -1;
var isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1 && !isOpera;
var isIE8 = navigator.userAgent.toLowerCase().indexOf("msie 8") != -1 && !!window.XDomainRequest && !!document.documentMode;
var isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 && !isIE8;
var isIE6 = isIE && parseInt(navigator.userAgent.split(";")[1].replace(/(^\s*)|(\s*$)/g,"").split(" ")[1])<7;
var isBorderBox = isIE && isQuirks;

//=================================自动加载脚本，样式等===================
var Server = {};
Server.ContextPath = "/webpage/ch/cms/Public/";
Server.importScript = function(url){
	if(!document.body){
		document.write('<script type="text/javascript" src="' + Server.ContextPath+url + '"><\/script>') ;
	}else{
		Server.loadScript(Server.ContextPath+url);
	}
}
Server.importCSS = function(url){
	if(!document.body){
		document.write('<link rel="stylesheet" type="text/css" href="' + Server.ContextPath+url + '" />') ;
	}else{
		Server.loadCSS(Server.ContextPath+url);
	}
}
Server.loadScript = function(url){//在页面载入后添加script
	var e = document.createElement('SCRIPT') ;
	e.type	= 'text/javascript' ;
	e.src	= url ;
	e.defer	= true ;
	document.getElementsByTagName("HEAD")[0].appendChild(e);
}
Server.loadCSS = function(url){//在页面载入后添加script
	if(isGecko){
		var e = document.createElement('LINK') ;
		e.rel	= 'stylesheet' ;
		e.type	= 'text/css' ;
		e.href	= url ;
		document.getElementsByTagName("HEAD")[0].appendChild(e) ;
	}else{
		document.createStyleSheet(url);
	}
}

//==================================自动加载样式脚本等=================

/*START_LOADSCRIPT*/
if(!window.DisableScriptAutoLoad){
	Server.importCSS("css/reset.css");				//清除所有标签默认样式，定义公共样式
	Server.importScript("js/jquery-1.9.1.min.js");
	Server.importScript("js/DOM.js");
	Server.importScript("js/animate.js");
	Server.importScript("js/weixin.js");
	Server.importScript("js/slowtime.js");
	Server.importScript("js/yemian.js");
}
/*END_LOADSCRIPT*/

//=============================取值函数================================

//文档宽高
function doc_wh() {
	return {
		w: document.body.scrollWidth,
		h: document.body.scrollHeight
	};
};

function ispc(){ 
	var userAgentInfo = navigator.userAgent; 
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
	var flag = true; 
	for (var v = 0; v < Agents.length; v++) { 
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
	} 
	return flag; 
}
var body_w=document.documentElement.clientWidth || document.body.clientWidth;
var body_h=document.documentElement.clientHeight || document.body.clientHeight;
//滚动条的位置
function scroll_y() { 
	return document.body.scrollTop || document.documentElement.scrollTop;
};