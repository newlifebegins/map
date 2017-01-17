//以下是动画的算法
var effect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - effect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return effect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return effect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}
////////////////////以上都是算法
function toOffset(attr){
	switch(attr){
		case 'left':
			var direction='offsetLeft';
			break;
		case 'top':
			var direction='offsetTop';
			break;
		case 'width':
			var direction='offsetWidth';
			break;
		case 'height':
			var direction='offsetHeight';
			break;
		case 'scrollTop':
			var direction='scrollTop';
			break;
		default:
			alert('不支持此方向的动画效果！');
			throw new Error('不支持此方向的动画效果！');		
	}
	return  direction;		
}
/*
1、ele.style.opacity;//0--1
	ele.style.filter='alpha(opacity=50)'//1-100
2、不存在offsetOpacity
	ele.currentStyle.opacity
	computedStyle(ele,null).opacity
	var opcityValue=ele.cureentStyle?ele.currentStyle.opacity:getComputedStyle(ele,null).opacity
	可以获取到写在css里的opacity的值，
3、根本就没有写css中的opacity的值
	if(typeof opacityValue!='number'){
	 ele.style.opacity=1;
	 ele.style.filter='alpha(opacity=100)'
	}else{
		 ele.style.opacity=opacityValue;
		 ele.style.filter='alpha(opacity='+opacityValue*100+')'
		
	}
	 
	 
*/

//以下是animate运动
function animate(ele,obj,nDuration,effectType,fnCallback){
	
	if(!(ele&&ele.nodeType==1)){
		alert('第一个参数ele错误！');
		throw new Error('第一个参数ele错误！');	
	}
	if(typeof obj !='object'){
		alert('第二个参数obj错误！');
		throw new Error('参数obj错误！');	
	}
	var reg=/^\d+$/
	if(reg.test(nDuration)){
		
	}else if(typeof nDuration =='undefined'){
		nDuration=700;
	}else{
		alert('第三个参数nDuration错误！');
		throw new Error('第三个参数nDuration错误！');
	}
	//effectType 1,2,3,4
	if(!effectType){
		var fn=effect.zfLinear;//直线，匀速的 1
		
	}else if(typeof effectType =='number'){
		switch(effectType){
			case 1:
				var fn=effect.zfLinear;//直线，匀速的 1
				break;
			case 2:
				var fn=effect.Quart.easeInOut;//直线，匀速的 1
				break;
			case 3:
				var fn=effect.Elastic.easeOut;//直线，匀速的 1
				break;
			case 4:
				var fn=effect.zfBounce.easeOut;//直线，匀速的 1
				break;
			default:
			 	alert('目前不支持此数字类型的运动效果！');
				throw new Error('目前不支持此数字类型的运动效果！');
			
			
			
		}
	}else if(effectType instanceof Array){
		if(effectType[0]=='zfLinear'){
		var fn=effect.zfLinear;	
		}else{			
			var fn=effect[effectType[0]][effectType[1]];		
		}		
	}else if(typeof effectType=='function'){
		var fn=effect.zfLinear;		
		fnCallback=effectType;
	}
	var d=nDuration;//总的时间
	var oBegin={};
	var oChange={};
	oChange.length=0;	 
	
	for(var attr in obj){
		if(attr=='opacity'){
			
			if(obj.opacity>1||obj.opacity<0){
				alert('opacity的值超过范围！');
				throw new Error('opacity的值超过范围！');
			}
			if(ele.currentStyle){
				var opacityValue=ele.currentStyle.opacity;//IE
			 }else{
				 var opacityValue=window.getComputedStyle(ele,null).opacity;//标准浏览器
			 }
			 //以上是取opacityValue的值，如果没有写CSS样式的opacity的值，则取不到
			//console.log('opacityValue:'+opacityValue);
			// console.log('type:'+typeof opacityValue);
			 if(typeof opacityValue !='undefined'){//当取不到
				 ele.style.opacity=opacityValue;
				 ele.style.filter='alpha(opacity='+opacityValue*100+')';
			 }else{
				  ele.style.opacity=1;
				 ele.style.filter='alpha(opacity=100)';
			 }
			 //以上这些是初始化不透明度
			 var b=ele.style.opacity;
		 	 var c=obj.opacity-b;
			//处理不透明度的	
		}else{
			var direction=toOffset(attr);
			var b=ele[direction];//起点	
			//需要一个总的移动距离
			var c=obj[attr]-b;//总的移动距离=目的地-起始的位置
				
		}
		if(c){//如果移动的距离不是0，则把各个方向的起始位置和移动的距离存到这两个对象上
				oChange[attr]=c;//在这个方向上移动的总距离
				oBegin[attr]=b;//在这个方向上开始的位置	
				oChange.length++;//如果这个方向上需要运动，则让length大于0;只要length大于0，则运动的一个条件成立。
			}
	}
	var t=0;
	if(document.all)
		var nInterval=15;//IE里用15ms为间隔时间。nInterval可以随意设。
	else
		var nInterval=13;
	_move();//执行动画
	
	function _move(){
		window.clearTimeout(ele.timer);//防止动画积累
		if(t<d&&oChange.length){//运动的条件
			t+=nInterval;
			if(t/d>=1){
				t=d;
			}
			for(var attr in oBegin){
				if(attr=='opacity'){
					var v=fn(t,parseFloat(oBegin[attr]),parseFloat(oChange[attr]),d);
					ele.style[attr]=v;
					ele.style.filter='alpha(opacity='+v*100+')';
				}else if(attr=="scrollTop"){
					ele[attr]=(fn(t,oBegin[attr],oChange[attr],d));
				}else{
					ele.style[attr]=(fn(t,oBegin[attr],oChange[attr],d))+'px';
				}
			}
			ele.timer=window.setTimeout(_move,nInterval);
		}else{
			ele.timer=null;
			if(fnCallback){//如果回调方法存在，则执行
				
				fnCallback.call(ele);	
			}
		}
			
	};
}
//以下是左右轮播
var lunbo={}
E.bind(window,"load",function(){
	var lunbo_leftRight=DOM.getClassName("lunbo_leftRight");
	for(var i=0;i<lunbo_leftRight.length;i++){
		var lunbo_leftRight_left=DOM.getClassName("lunbo_leftRight_left",lunbo_leftRight[i])[0];
		var lunbo_leftRight_right=DOM.getClassName("lunbo_leftRight_right",lunbo_leftRight[i])[0];
		
		var lunbo_leftRight_ul=DOM.getClassName("lunbo_leftRight_ul",lunbo_leftRight[i])[0];
		
		var lunbo_leftRight_list=DOM.getClassName("lunbo_leftRight_list",lunbo_leftRight[i])[0];
		
		var speed=lunbo_leftRight[i].getAttribute("speed")||1000;
		var interval=lunbo_leftRight[i].getAttribute("interval")||3000;
		var auto=lunbo_leftRight[i].getAttribute("auto")||false;
		
		var fangxiang=lunbo_leftRight[i].getAttribute("fangxiang")=="shangxia"?"top":"left";
		var gunlun=lunbo_leftRight[i].getAttribute("gunlun")||false;
		
		var hoverClear=lunbo_leftRight[i].getAttribute("hoverClear")||false;
		var li_w=lunbo_leftRight_ul.getElementsByTagName("li").item(0).offsetWidth;
		if(fangxiang=="top"){
			li_w=lunbo_leftRight_ul.getElementsByTagName("li").item(0).offsetHeight;
		}
		lunbo.leftRight(
			lunbo_leftRight_ul,
			li_w,
			speed,
			interval,
			1,
			"select",
			"",
			"click",
			lunbo_leftRight_list,
			lunbo_leftRight_left,
			lunbo_leftRight_right,
			hoverClear,
			fangxiang,
			auto,
			gunlun
		)
	}
})

lunbo.leftRight=function(lunbo_ul,liWidth,speed,t,effectType,listSelectClass,listOutClass,listOnType,list,left,right,hoverClear,fangxiang,auto,gunlun){
	var index=0
	var timer=null;
	
	var li = DOM.firstEleChild(lunbo_ul).cloneNode(true);
	lunbo_ul.appendChild(li);
	var lis=DOM.siblingsAll(DOM.firstEleChild(lunbo_ul));
	var length=DOM.eleIndex(DOM.lastEleChild(lunbo_ul));
	list=DOM.siblingsAll(DOM.firstEleChild(list));
	lunbo_ul.style.width=length*liWidth+"px";
	if(list){
		if(length-1!=list.length){
			alert("轮播图和序号长度不一致")
		}
		for(var i =0 ;i<list.length;i++){
			list[i].index=i;
			E.bind(list[i],listOnType,function()
				{
					clearInter();
					index=this.index;
					move()
					if(auto){
						starInter()
					}
					
				}
			)
		}			
		var outList=list[0];
	}
	if(left)E.bind(left,"click",rightOnclick)
	if(gunlun){
		window.onmousewheel = gunlun_over;
		window.addEventListener("DOMMouseScroll",gunlun_over);//解决firfox下事件绑定问题
	}
	function gunlun_out(e){var e=e||window.event;e.preventDefault()}
	function gunlun_over(e){
		if(e.wheelDelta >=0||e.detail<0){
			leftOnclick();
		}else{
			rightOnclick();
		}
		window.removeEventListener("DOMMouseScroll",gunlun_over);//解决firfox下事件绑定问题
		window.addEventListener("DOMMouseScroll",gunlun_out);//解决firfox下事件绑定问题
		window.onmousewheel = gunlun_out;
		window.setTimeout(function(){
		window.onmousewheel = gunlun_over;
		window.addEventListener("DOMMouseScroll",gunlun_over);//解决firfox下事件绑定问题
		},1000)
	}
	/*
	if(gunlun){
		E.bind(lunbo_ul,"mouseover",function(){
			window.onmousewheel = gunlun_over;
			try{
				con.addEventListener("DOMMouseScroll",gunlun_over);//解决firfox下事件绑定问题
			}catch(e){}
		})
		E.bind(lunbo_ul,"mouseout",function(){
			window.onmousewheel = null
			try{
				con.removeEventListener("DOMMouseScroll",gunlun_over);//解决firfox下事件绑定问题
			}catch(e){}
		})
	}
	function fn2(event){event.preventDefault()}
	function gunlun_over(e){
		if(e.wheelDelta >=0||e.detail<0){
			leftOnclick();
		}else{
			rightOnclick();
		}
		window.onmousewheel = fn2;
		try{
			con.removeEventListener("DOMMouseScroll",gunlun_over);//解决firfox下事件绑定问题
		}catch(e){}
		
		window.setTimeout(function(){
			window.onmousewheel = gunlun_over;
			try{
				con.addEventListener("DOMMouseScroll",gunlun_over);//解决firfox下事件绑定问题
			}catch(e){}
		},
		1000)
	}*/
	function rightOnclick(){
		clearInter();
		index++
		if(index==length){
			index=1;
			lunbo_ul.style[fangxiang]=0;
		}
		move();
		if(auto){
			starInter()
		}
		
	}
	if(right)E.bind(right,"click",leftOnclick)
	function leftOnclick(){
		clearInter();
		if(index==0){
			index=length-1;
			lunbo_ul.style[fangxiang]=-(length-1)*liWidth+"px";
		}		
		index--;
		move();
		if(auto){
			starInter()
		}
		
	}
	function move(){
		if(list){
			lists=list[index==list.length?0:index];
			lists.className=listSelectClass;
			outList.className=listOutClass;
			outList=lists;
			//////////////////////以上设置轮播图相对应的序号的class名
		}
		if(fangxiang=="left"){
			try{eval(lis[index].getAttribute("fn"))()}catch(e){}
			animate(lunbo_ul,{left:-index*liWidth},speed,effectType);
			
		}else{
			try{eval(lis[index].getAttribute("fn"))()}catch(e){}
			animate(lunbo_ul,{top:-index*liWidth},speed,effectType);
		}
		
		
	}
	function clearInter(){window.clearInterval(timer);}
	function starInter(){timer=window.setInterval(rightOnclick,t)}
	if(auto){
		starInter();
	}
	if(auto&&hoverClear){
		E.bind(lunbo_ul,"mouseover",function()
			{
				clearInter()
			}
		)
		E.bind(lunbo_ul,"mouseout",function()
			{
				starInter()
			}
		)
	}
}
E.bind(window,"load",function(){
	var lunbo_opacity=DOM.getClassName("lunbo_opacity");	
	for(var i=0;i<lunbo_opacity.length;i++){
		var lunbo_opacity_ul=DOM.getClassName("lunbo_opacity_ul",lunbo_opacity[i])[0];
		var lunbo_opacity_left=DOM.getClassName("lunbo_opacity_left",lunbo_opacity[i])[0];
		var lunbo_opacity_right=DOM.getClassName("lunbo_opacity_right",lunbo_opacity[i])[0];
		var lunbo_opacity_list=DOM.getClassName("lunbo_opacity_list",lunbo_opacity[i])[0];
		var speed=lunbo_opacity[i].getAttribute("speed")||1000;
		var interval=lunbo_opacity[i].getAttribute("interval")||3000;
		lunbo.opacity(
			lunbo_opacity_ul,
			speed,interval,
			lunbo_opacity_list,
			"select",
			"",
			"click",
			lunbo_opacity_left,
			lunbo_opacity_right
		);
	}
})
lunbo.opacity=function(lunbo_ul,speed,t,list_ul,listSelectClassName,listOutClassName,listOnType,left,right){		
	var index=0;
	var outIndex=0;
	var timer;
	var lunbo_li=DOM.siblings(DOM.firstEleChild(lunbo_ul));
	lunbo_li.unshift(DOM.firstEleChild(lunbo_ul));
	if(list_ul){
		var list=DOM.siblings(DOM.firstEleChild(list_ul));
		list.unshift(DOM.firstEleChild(list_ul));
	}	
	
	var len=lunbo_li.length;	
	
	if(list&&len!=list.length){
			alert("轮播图和序号长度不一致")
			throw new Errow("轮播图和序号长度不一致");		
	}
	for(var i=0;i<len;i++){
		lunbo_li[i].style.zIndex=len-i;
		lunbo_li[i].style.opacity=0;
		lunbo_li[i].style.filter='alpha(opacity=0)';			
		if(list){
			list[i].index=i;
			E.bind(list[i],listOnType,function(){
				clearInter();
				index=this.index;
				move();
				starInter();
			})
		}
	}
	if(left)E.bind(left,"click",leftOnclick);
	if(right)E.bind(right,"click",rightOnclick);
	function leftOnclick(){
		clearInter();
		index++;
		index=index==len?0:index;
		move();
		starInter();
	}
	function rightOnclick(){
		clearInter();
		index=index==0?len:index;
		index--;
		move();
		starInter();
	}
	function move(){		
		if(outIndex!=index){
			animate(lunbo_li[outIndex],{opacity:0},speed);
			animate(lunbo_li[index],{opacity:1},speed);
			lunbo_li[index].style.zIndex=len;
			lunbo_li[outIndex].style.zIndex=0;
			if(list){			
				list[index].className=listSelectClassName;
				list[outIndex].className=listOutClassName;
			}
			outIndex=index;
		}
	}
	lunbo_li[index].style.opacity=1;
	lunbo_li[index].style.filter="alpha(opacity=100)";
	
	function clearInter(){window.clearInterval(timer);}
	function starInter(){
		timer=window.setInterval(leftOnclick,t)
	}
	starInter();
}

E.bind(window,"load",function(){
	var lunbo_jiaodian=DOM.getClassName("lunbo_jiaodian");
	for(var i=0;i<lunbo_jiaodian.length;i++){
		var lunbo_jiaodian_ul=DOM.getClassName("lunbo_jiaodian_ul",lunbo_jiaodian[i])[0];
		var lunbo_jiaodian_left=DOM.getClassName("lunbo_jiaodian_left",lunbo_jiaodian[i])[0];
		var lunbo_jiaodian_right=DOM.getClassName("lunbo_jiaodian_right",lunbo_jiaodian[i])[0];
		var lunbo_jiaodian_list=DOM.getClassName("lunbo_jiaodian_list",lunbo_jiaodian[i])[0];
		
		var speed=lunbo_jiaodian[i].getAttribute("speed")||1000;
		var interval=lunbo_jiaodian[i].getAttribute("interval")||3000;
		
		var clear=lunbo_jiaodian[i].getAttribute("hoverClear")||false;
		var liWidth=lunbo_jiaodian[i].getAttribute("liWidth")||lunbo_jiaodian_ul.offsetWidth*0.8;
		lunbo.jiaodianlunbo(
			lunbo_jiaodian[i],
			lunbo_jiaodian_ul,
			liWidth,
			speed,
			interval,
			1,
			lunbo_jiaodian_left,
			lunbo_jiaodian_right,
			clear
		);
	}
});

lunbo.jiaodianlunbo=function(div,ul,centerLiWidth,speed,t,animateType,left,right,clear){ 
	var li = DOM.siblings(DOM.lastEleChild(ul));   //取ul 里面最后一个li元素再取出他之外的兄弟元素
	li.push(DOM.lastEleChild(ul));  //把他自己扔进去
	
	//取ul的高  按十进制换算
	var ul_h=parseInt(DOM.getStyle(ul,"height"),10);  
	//取ul的宽  按十进制换算
	var ul_w=parseInt(DOM.getStyle(ul,"width"),10);  
	//算出li的宽度
	var li_w=ul_w/2;
	//取ul里面的第一个li的高
	var li_h=parseInt(DOM.getStyle(li[0],"height"),10);
	
	var _top=(ul_h-li_h)/2;     
	//算出li距离顶部的值 
	
	var len=li.length;    //li的个数
	var left_mask=document.createElement("div");   //创建左侧的遮罩层
	var right_mask=document.createElement("div");   //创建右侧的遮罩层
	var timer										//定义定时器				
	left_mask.style.backgroundColor=right_mask.style.backgroundColor="#fff";
	left_mask.style.filter=right_mask.style.filter="alpha(opacity=30)";
	left_mask.style.position=right_mask.style.position="absolute";
	left_mask.style.height=right_mask.style.height=li_h+"px";
	left_mask.style.cursor=right_mask.style.cursor="pointer";
	left_mask.style.width=right_mask.style.width=li_w+"px";
	left_mask.style.opacity=right_mask.style.opacity=0.3;
	left_mask.style.top=right_mask.style.top=_top+"px";
	left_mask.style.zIndex=right_mask.style.zIndex=4
	left_mask.style.left=0;
	right_mask.style.right=0;
	
	ul.appendChild(left_mask);  //把创建的遮罩层 添加到ul里面的最后一个节点去
	ul.appendChild(right_mask);  //把创建的遮罩层 添加到ul里面的最后一个节点去
	
	for(var i=0;i<len;i++){ 	//初始化所有的li的属性 层级 宽 高 top值
		li[i].index=i;
		li[i].style.top=_top+"px";
		li[i].style.width=li_w+"px";
		if(i==0){  //定义第一个li为中间大图
			li[i].style.zIndex=5;
			li[i].style.left=(ul_w-centerLiWidth)/2+"px"
			li[i].style.top=0;
			li[i].style.width=centerLiWidth+"px"
			li[i].style.height=ul_h+"px";
		}else if(i==len-1){  //定义最后一个li为左边的图
			li[i].style.zIndex=2;
			li[i].style.left=0;
		}else if(i==1){  //定义第二个li为右边的图
			li[i].style.zIndex=2;
			li[i].style.left=li_w+"px";
		}else{	//定义其他看不到的图片
			li[i].style.zIndex=1;
		}
	};
	var now_ele=li[0];  //定义中间的大图
	var pre_ele;		//上一个图片（大图左边的图片）
	var next_ele;		//下一个图片（大图右边的图片）
	var pre_pre_ele;	//上一个的上一个
	var next_next_ele;	//上一个的上一个
	E.bind(left_mask,"click",leftOnclick);  		//绑定click事件
	if(left)E.bind(left,"click",leftOnclick);		//绑定click事件
	if(right)E.bind(right,"click",rightOnclick);    //绑定click事件
	function leftOnclick(){  						//向左运动
		//clearInter();								//清除定时器
		E.unBind(right_mask,"click",rightOnclick);	//卸载右侧的遮罩层的click事件
		now_ele.style.zIndex=3; 		
		
		animate(now_ele,{width:li_w,height:li_h,left:li_w,top:_top},speed,animateType)  //执行动画
		
		pre_ele=now_ele.index==0?li[len-1]:DOM.previousEleChild(now_ele);  //等同上面的注释
		
		next_ele=now_ele.index==len-1?li[0]:DOM.nextEleChild(now_ele)
		next_ele.style.zIndex=2;
		
		next_next_ele=next_ele.index==len-1?li[0]:DOM.nextEleChild(next_ele)
		pre_pre_ele=pre_ele.index==0?li[len-1]:DOM.previousEleChild(pre_ele);

		pre_ele.style.zIndex=5;    		//改变左侧小图的层级
		pre_pre_ele.style.left=0;		//改变左侧小图后面的图的位置
		pre_pre_ele.style.zIndex=1;	 	//改变左侧小图后面的图的层级
		
		animate(pre_ele,{width:centerLiWidth,height:ul_h,left:(ul_w-centerLiWidth)/2,top:0},speed,animateType)
		
		now_ele=pre_ele;  //赋值 把前一个小图换成大图
		//startInter()	  //自动滚
		window.setTimeout(function(){E.bind(right_mask,"click",rightOnclick)},speed);		
	};   //左侧的动画完成
	E.bind(right_mask,"click",rightOnclick);  //右侧动画同理
	function rightOnclick(){
		//clearInter()
		E.unBind(left_mask,"click",leftOnclick);
		animate(now_ele,{width:li_w,height:li_h,left:0,top:_top},speed,animateType);
		now_ele.style.zIndex=3;
		
		next_ele=now_ele.index==len-1?next_ele=li[0]:DOM.nextEleChild(now_ele);
		
		pre_ele=now_ele.index==0?li[len-1]:DOM.previousEleChild(now_ele);
		pre_ele.style.zIndex=2;
		
		pre_pre_ele=pre_ele.index==0?li[len-1]:DOM.previousEleChild(pre_ele);
		pre_pre_ele.style.zIndex=1;
		
		next_next_ele=next_ele.index==len-1?li[0]:DOM.nextEleChild(next_ele);
		next_ele.style.zIndex=5;
		
		next_next_ele.style.left=li_w+"px";
		next_next_ele.style.zIndex=1;
		
		animate(next_ele,{width:centerLiWidth,height:ul_h,left:(ul_w-centerLiWidth)/2,top:0},speed,animateType);
		
		now_ele=next_ele;
		
		//startInter();
		window.setTimeout(function(){E.bind(left_mask,"click",leftOnclick)},speed);
		
	}
	function clearInter(){window.clearInterval(timer);}
	function startInter(){timer=window.setInterval(leftOnclick,t)}
	startInter();
	left_mask.onmouseover=right_mask.onmouseover=function(){  //鼠标放在遮罩层的透明度变化
		this.style.filter="alpha(opacity=10)";
		this.style.opacity=0.1;
	}
	left_mask.onmouseout=right_mask.onmouseout=function(){
		this.style.filter="alpha(opacity=30)";
		this.style.opacity=0.3;
	}
	if(clear){
		E.bind(div,"mouseover",function(){
				clearInter()
			}
		)
		E.bind(div,"mouseout",function(){
				startInter()
			}
		)
	}
}