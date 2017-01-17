// JavaScript Document
$(function(){
	$(".wrap").css({"width":$(window).width(),"height":$(window).height()});
	$(window).resize(function(){
		$(".map").css({"width":$(window).width(),"height":$(window).height()});
		$(".wrap").css({"width":$(window).width(),"height":$(window).height()});

	// 区域分布图
    $(".navLeft").css("width",$(window).width()-636+"px");
  	$('.nav').css("width",$(window).width()-636+"px");
  	$('.nav li').css("width",($(window).width()-636)/5+"px");
	})
	$(".map").css({"width":$(document).width(),"height":$(document).height()});
	var sw=$(document).width();
	var sh=$(document).height();
	
	var chaW=$("#map img").width()-$(document).width();
	var chaH=$("#map img").height()-$(document).height();
	
	/*if(sw<1440){
		var chaW=$("#map img").width()-$(document).width();
	}else{
		var chaW=$("#map img").width()-1440;
	}*/
	if(chaH<0) chaH=0;
	/*var chaW=$("#map img").width()-$(window).width();
	var chaH=$("#map img").height()-$(window).height();*/
	
	$(".fullView img,.hover").hover(function(){
		/*$(".hover").css({"opacity":"1","display":"block"});*/
		$(".hover").css("display","block");
		$(".hover").stop().animate({opacity:"1"},1000)
	},function(){
		$(".hover").stop().animate({opacity:"0"},1000,function(){
			$(this).css("display","none");
		})
	});
	
	
	var swCha=$(".small img").width()-$("#floatDiv").width();
	var shCha=$(".small img").height()-$("#floatDiv").height();
	
	var percentT=chaH/shCha;
	var percentL=chaW/swCha;
	var pT=shCha/chaH;     
	var pL=swCha/chaW;
	//偏移除以偏移 算比例
	
	function IsPC() 
	{ 
		var userAgentInfo = navigator.userAgent; 
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
		var flag = true; 
		for (var v = 0; v < Agents.length; v++) { 
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
		} 
		return flag; 
	}
	if(IsPC()){
		 var dragging = false;
		 var drag = false;
		 var iX, iY; 
		 var sX, sY; 
		 $("#map").mousedown(function(e) {
			  dragging = true;
			  iX = e.clientX - this.offsetLeft;
			  iY = e.clientY - this.offsetTop;
			  this.setCapture && this.setCapture();
			  return false;
		 });
		 $("#floatDiv").mousedown(function(e) {
			  drag = true;
			  sX = e.clientX - this.offsetLeft;
			  sY = e.clientY - this.offsetTop;
			  this.setCapture && this.setCapture();
			  return false; 
		 });
		 document.onmousemove=function(e) {
		  if (dragging) {
		   var e = e || window.event;
		   var oX = e.clientX - iX;
		   var oY = e.clientY - iY;
		   if(oX>0)oX=0;
		   if(oY>0)oY=0;
		   if(Math.abs(oX)>chaW) oX=-chaW;
		   if(Math.abs(oY)>chaH) oY=-chaH;
		   $("#map").css({"left":oX + "px", "top":oY + "px"});
		   var opX=-oX*pL;
		   var opY=-oY*pT;
		   if(opX<5)opX=5;
		   if(opY<5)opY=5;
		   if(opX>swCha)opX=swCha;
		   if(opY>shCha)opY=shCha;
		   
		   $("#floatDiv").css({"left":opX + "px", "top":opY + "px"});
		   return false;
		  }
		  
		 };
		 $("#floatDiv").mousemove(function(e){
			   if (drag) {
			   dragging=false;
			   var e = e || window.event;
			   var soX = e.clientX - sX;
			   var soY = e.clientY - sY;
			   console.log(soX+"...."+soY)
			   if(soX<5)soX=5;
			   if(soY<5)soY=5;
			   if(soX>swCha)soX=swCha;
			   if(soY>shCha)soY=shCha;
			   var sopX,sopY;
			   sopX=soX*percentL;
			   sopY=soY*percentT;
			   $("#floatDiv").css({"left":soX + "px", "top":soY + "px"});
			   $("#map").css({"left":-sopX+ "px", "top":-sopY + "px"});
			   return false;;
			  }	 
		 })
		 $(document).mouseup(function(e) {
		  dragging = false;
		  //$("#map")[0].releaseCapture();
		  e.cancelBubble = true;
		 })
		 $("#floatDiv").mouseup(function(e) {
		  drag = false;
		  //$("#map")[0].releaseCapture();
		  e.cancelBubble = true;
		 })
	}else{
		/*$("body").css({"width":$(window).width(),"height":$(window).height(),"overflow":"hidden"});*/
		var scH=$(window).height();
		if(scH<470)
			$(".navLeft").css("top",(scH-453)/2);
		document.addEventListener("touchstart",touchStart,false);
		document.addEventListener("touchmove",touchMove,false);
		document.addEventListener("touchend",touchEnd,false);
		var sx,sy,isdrag;
		var oY;
		isdrag=false;
		function touchStart(e){
			var t=e.targetTouches[0];
			isdrag=true;
			sx=t.pageX - parseInt($("#map").css("left"));
			sy=t.pageY - parseInt($("#map").css("top"));
		}
		function touchMove(e){
			var t=e.targetTouches[0];
			e.preventDefault();
			if(isdrag){
			   var oX = t.pageX - sx;
			   oY = t.pageY - sy;
			   if(oX>0)oX=0;
			   if(oY>0)oY=0;
			   if(Math.abs(oX)>Math.abs(chaW)) oX=-chaW;
			   if(Math.abs(oY)>Math.abs(chaH)&& $("#map").height()>$(window).height()){
				   oY=-chaH;
				   $(".map").css({"width":$(window).width(),"height":$(window).height()});
			   }
			   else{
			       oY=0;
				   $(".map").css({"width":$(window).width(),"height":"750px"});
			   }
			   $("#map").css({"left":oX + "px", "top":oY+"px"});
			}
		}
		function touchEnd(e){}
	}
})