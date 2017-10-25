$(document).ready(function(){

	var moving = (function(){

		var init = function(con,img,cov,obj){

			var defaults = {
				Amplitude: 10,
				minX: -1000,
				maxX: 0,
				minY: -1000,
				maxY: 0
			}

			defaults = $.extend({},defaults,obj);

			var con = $(con),
				img = $(img),
				cov = $(cov);

			//为遮罩层绑定事件
			con.hover(function(){
				cov.css('opacity','0.4');
			},function(){
				cov.css('opacity','0');
			})


			//鼠标移动事件
			var halfW = con.width()/2,				 //容器宽度的一半
				halfH = con.height()/2,              //容器的高度的一半
				mouseX,					             //鼠标距离左侧页面边缘的距离
				mouseY,					             //鼠标距离顶部页面边缘的距离
				conX = con.offset().left,			 //容器距离文档左侧的距离
				conY = con.offset().top,			 //容器距离文档顶部的距离
				diffX,
				diffY,
				posi = img.css('background-position'),  //获得背景图片初始定位
				moveX,                               //背景图片水平方向移动距离
				moveY;								 //背景图片垂直方向移动距离
			console.log(halfW)
			// 将定位返回的字符串转化成为数组,然后获得水平方向和垂直方向的值
			var posiArray = posi.split(" "),
				posiX = parseInt(posiArray[0]),
				posiY = parseInt(posiArray[1]);

			con.on('mousemove',function(e){

				var e = window.event || e;
				mouseX = e.pageX;					       //鼠标距离左侧页面边缘的距离
				mouseY = e.pageY;					       //鼠标距离顶部页面边缘的距离
				diffX = mouseX - conX - halfW;
				diffY = mouseY - conY - halfH;
				moveX = parseInt(diffX / defaults.Amplitude)+ posiX;     //控制图片滚动幅度   
				moveY = parseInt(diffY / defaults.Amplitude)+ posiY;

				//控制移动范围
				moveX = Math.max(Math.min(defaults.maxX,moveX),defaults.minX);
				moveY = Math.max(Math.min(defaults.maxY,moveY),defaults.minY);  
				var x = moveX + 'px',
					y = moveY + 'px';
				
				img.css('background-position',x+" "+y)

			})
		}

		return {
			init:init
		}
	})()

	var obj = {
		Amplitude: 20,
		minX: -330,
		maxX: -270,
		minY: -310,
		maxY: -290
	}
	moving.init(".container",".img",".cover",obj);
})