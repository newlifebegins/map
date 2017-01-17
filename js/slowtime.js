// JavaScript Document
window.onload=function(){
	var img_width=$(".left_list_img").width();
	var left_div=$(".left_div")
	var left_con=$(".left_con");
	var content=$(".content");
	var con_h=content.height();
	$(".center_biaoti").html($(".left_list_biaoti:last").html())
	left_con.append($(".left_list_div").clone())//把所有left_list_div复制一份追加到最后，做好循环准备
	
	$(".content").append($(".left_div").clone());//把left_div复制一份，放到右边
	
	//将所有右边class名里有left的换为right
	$(".left_div").eq(1).attr("class","right_div")
	$(".right_div").css({"left":"100%"}).find("*").each(function(index, element) {
		if($(this).attr("class")){
			$(this).attr("class",$(this).attr("class").replace("left","right"))
		}
	});
	//查找最后一个left_list_div循环里所有的img，并获取到中间大图UL创建li添加img
	$(".left_list_div:last .left_list_img").each(function(index, element) {
		$(this).find("img").attr("src",$(this).find("img").next().val());
		// $(this).find("img").attr("src",$(this).find("img").attr("src").replace("small","big"));
		var lunbo_shangxia_ul=$(".lunbo_shangxia_nav[class$=select]").find(".lunbo_shangxia_ul")
		lunbo_shangxia_ul.append("<li></li>")
		lunbo_shangxia_ul.find(">li:last").append($(this).find("img").clone())
		var dec=$(lunbo_shangxia_ul).find("img").attr("dec");
		var href=$(lunbo_shangxia_ul).find("img").attr("_href");
		$(".center_dec a").attr("href",href)
		$(".center_dec p").html(dec)
	});
	
	$(".lunbo_shangxia_ul>li").css("height",con_h+"px");
	var left_list_div=$(".left_list_div");
	var left_list_img=$(".left_list_img");
	
	var right_list_div=$(".right_list_div");
	var right_list_img=$(".right_list_img");
	var right_con=$(".right_con")
	
	var left_list_div_h=left_list_div.eq(0).width()
	
	//给左右left_con和right_con设置总宽
	$(".left_con,.right_con").css("width",left_list_div.length*left_list_div_h+"px");
	//右right_con 左移隐藏一个
	$(".right_con").css("left",-img_width+"px");
	
	var left_list_div_num=0;//当前点击div索引
	var list_img_num=0;//当前点击img索引
	
	var left_list_div_numOut=0;//上次点击DIV索引
	
	var right_list_div_num=0;
	
	var right_list_div_numOut=1
	
	left_list_img.click(left_click);
	right_list_img.click(right_click);
	
	function left_click(){
		xiezaiClick();
		list_img_num=$(this).parent().find(".left_list_img").index($(this))//当前点击img索引
		left_list_div_num=left_list_div.index($(this).parent());//当前点击div索引
		var _jiange=(left_list_div_num+1)-left_list_div_numOut;
		//var _jiange=1;
		center_clone($(this).parent())
		left_click_right(_jiange);
		if(left_list_div_num+3<left_list_div.length){
			left_con.animate({"right":"-="+(_jiange*img_width)+"px"},500);
			left_list_div_numOut=left_list_div_num+1;
		}else{
			var chazhi=left_list_div_numOut-(left_list_div.length/2)
			left_con.css("right",-(chazhi*img_width)+"px");
			left_con.animate({"right":"-="+(_jiange*img_width)+"px"},500);
			left_list_div_numOut=chazhi+_jiange
		}
	}
	
	function left_click_right(num){
		if(right_list_div_numOut<3){
			var chazhi=right_list_div_numOut+(right_list_div.length/2)		
			right_con.css({"left":-(chazhi*img_width)+"px"})
			right_list_div_numOut=chazhi;
		}
		right_list_div_numOut-=num;
		right_con.animate({"left":"+="+(num*img_width)+"px"},500);
	}
	
	function right_click(){
		xiezaiClick();
		list_img_num=$(this).parent().find(".right_list_img").index($(this))
		//获取点击图片在当前列的索引
		right_list_div_num=right_list_div.index($(this).parent());
		right_list_div_num=right_list_div.length-1-right_list_div_num
		var _jiange=right_list_div_num+1-right_list_div_numOut;
		
		
		//var _jiange=1
		right_click_left(_jiange);
		center_clone($(this).parent())
		if(right_list_div_num<right_list_div.length-3){
			right_con.animate({"left":"-="+(_jiange*img_width)+"px"},500);
			right_list_div_numOut=right_list_div_num+1
		}else{
			var chazhi=right_list_div_numOut-(right_list_div.length/2)
			right_con.css("left",-(chazhi*img_width)+"px");
			right_con.animate({"left":"-="+(_jiange*img_width)+"px"},500);
			right_list_div_numOut=chazhi+_jiange
		}
	}
	function right_click_left(num){
		if(left_list_div_numOut<3){
			var chazhi=left_list_div_numOut+(left_list_div.length/2)		
			left_con.css({"right":-(chazhi*img_width)+"px"})
			left_list_div_numOut=chazhi;
		}
		left_list_div_numOut-=num;
		left_con.animate({"right":"+="+(num*img_width)+"px"},500);
	}
	
	
	function center_clone(list_div){
		var img_className,fangxiang;
		if(list_div.attr("class").indexOf("left")==-1){
			//如果查找不到left  说明是right
			img_className="right_list_img"
			fangxiang=100;
		}else{
			img_className="left_list_img"
			fangxiang=-100;
		}
		$(".center_biaoti").html(list_div.find("[class$=list_biaoti]").html())
		var list_img=$(list_div).find(">."+img_className);
		var lunbo_shangxia_nav=$(".lunbo_shangxia_nav[class$=select]");
		var lunbo_shangxia_nav_left=$(".lunbo_shangxia_nav[class$=nav]");
		
		lunbo_shangxia_nav_left.css("left",fangxiang+"%");
		lunbo_shangxia_nav_left.find(".lunbo_shangxia_ul").css("top","0px");//top==0
		lunbo_shangxia_nav_left.find(".lunbo_shangxia_ul").empty();//清空
		suoyin=0
		for(var i=0;i<list_img.length;i++){
			lunbo_shangxia_nav_left.find(".lunbo_shangxia_ul").append("<li><a sty='display:block;width:100%;height:100%'></a></li>")
			var last_a=lunbo_shangxia_nav_left.find(".lunbo_shangxia_ul>li>a:last")
			last_a.append(list_img.eq(i).find("img").clone())
			last_a.append(list_img.eq(i).find("input").clone())
			var zuihouyizhang=lunbo_shangxia_nav_left.find(".lunbo_shangxia_ul img:last")
			zuihouyizhang.attr("src",zuihouyizhang.next().val())
			// zuihouyizhang.attr("src",zuihouyizhang.attr("src").replace("small","big"))
			$(".center_dec a").attr("href",list_img.eq(i).find("img").eq(0).attr("_href"))
			$(".center_dec p").html(list_img.eq(suoyin).find("img").attr("dec"))
			
			
		}
		$(".lunbo_shangxia_ul>li").css("height",con_h+"px");
		lunbo_shangxia_nav_left.animate({"left":"0"},500,"linear",function(){
			$(this).addClass("select");
					/*$(".lunbo_shangxia_nav[class$=select]").find(".lunbo_shangxia_ul").animate({"top":"-"+(list_img_num*con_h)+"px"},1000);*/
			//suoyin=list_img_num
			//alert(suoyin)
			/*for(var i=0;i<list_img_num;i++){
				window.setTimeout(function(){
					lunbo_shangxia_downBtn.trigger("click")
				},i*500);
				
			}*/
		})
		lunbo_shangxia_nav.animate({"left":-fangxiang+"%"},500,"linear",function(){
			$(this).removeClass("select")
		});
	}
	
	function xiezaiClick(){
		
		//卸载事件 所有的left right  img绑定的事件
		right_list_img.unbind("click")
		left_list_img.unbind("click")
		window.setTimeout(function(){
			right_list_img.click(right_click);
			left_list_img.click(left_click);
		},700)
		//500ms之后再绑定
	}
	
	var con_w=content.width()
	var lunbo_shangxia_nav=$(".lunbo_shangxia_nav[class$=select]");
	var lunbo_shangxia_ul=lunbo_shangxia_nav.find(".lunbo_shangxia_ul");
	var lunbo_shangxia_li=lunbo_shangxia_ul.find(">li");
	
	var suoyin=0
	var lunbo_shangxia_downBtn=$(".lunbo_shangxia_downBtn")
	var lunbo_shangxia_topBtn=$(".lunbo_shangxia_topBtn")
	lunbo_shangxia_topBtn.click(function(){
		
		var lunbo_shangxia_nav=$(".lunbo_shangxia_nav[class$=select]");
		var lunbo_shangxia_ul=lunbo_shangxia_nav.find(".lunbo_shangxia_ul");
		var lunbo_shangxia_li=lunbo_shangxia_ul.find(">li");
		if(suoyin<=0){return;}
		suoyin--;
		lunbo_shangxia_ul.animate({"top":"+="+con_h+"px"},500);
		
		var dec=$(lunbo_shangxia_ul).find("img").eq(suoyin).attr("dec");
		$(".center_dec").stop().animate({marginBottom:"-41px"},500,function(){
			$(".center_dec").stop().delay(500).animate({marginBottom:"0"},600)
			$(".center_dec p").html(dec)
		})
	})
	lunbo_shangxia_downBtn.click(function(){
		var lunbo_shangxia_nav=$(".lunbo_shangxia_nav[class$=select]");
		var lunbo_shangxia_ul=lunbo_shangxia_nav.find(".lunbo_shangxia_ul");
		var lunbo_shangxia_li=lunbo_shangxia_ul.find(">li");
		
		if(suoyin>=lunbo_shangxia_li.length-1){return;}
		suoyin++;
		lunbo_shangxia_ul.animate({"top":"-="+con_h+"px"},500);
		
		var dec=$(lunbo_shangxia_ul).find("img").eq(suoyin).attr("dec");
		$(".center_dec").stop().animate({marginBottom:"-41px"},500,function(){
			$(".center_dec").stop().delay(500).animate({marginBottom:"0"},600)
			$(".center_dec p").html(dec)
		})
	})
	
	var right=$(".right");
	var left=$(".left");
	
	right.click(right_c);
	left.click(left_c);
	function right_c(){
		xiezaiC();
		right_list_div_num=right_list_div_numOut
		var _jiange=1
		right_click_left(_jiange);
		var right_num=right_list_div.length-right_list_div_numOut-1;
		center_clone(right_list_div.eq(right_num))
		if(right_list_div_num<right_list_div.length-3){
			right_con.animate({"left":"-="+(_jiange*img_width)+"px"},500);
			right_list_div_numOut=right_list_div_num+1
		}else{
			var chazhi=right_list_div_numOut-(right_list_div.length/2)
			right_con.css("left",-(chazhi*img_width)+"px");
			right_con.animate({"left":"-="+(_jiange*img_width)+"px"},500);
			right_list_div_numOut=chazhi+_jiange
		}
	}
	function left_c(){
		xiezaiC();
		left_list_div_num=left_list_div_numOut
		var _jiange=1
		//var _jiange=1;
		center_clone(left_list_div.eq(left_list_div_num))
		left_click_right(_jiange);
		if(left_list_div_num+3<left_list_div.length){
			left_con.animate({"right":"-="+(_jiange*img_width)+"px"},500);
			left_list_div_numOut=left_list_div_num+1;
		}else{
			var chazhi=left_list_div_numOut-(left_list_div.length/2)
			left_con.css("right",-(chazhi*img_width)+"px");
			left_con.animate({"right":"-="+(_jiange*img_width)+"px"},500);
			left_list_div_numOut=chazhi+_jiange
		}
	}
	function xiezaiC(){
		right.unbind("click")
		left.unbind("click")
		window.setTimeout(function(){
			right.click(right_c);
			left.click(left_c);
		},500)
		//500ms之后再绑定
	}
}