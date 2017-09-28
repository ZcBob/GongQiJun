
const css = "myStyle";

//为元素添加删除事件
var EventUtil = {
	addHandler: function(element, type, handler,flag){
		flag = (flag == undefined)?"false":flag;
		if (element.addEventListener){
			element.addEventListener(type,handler,flag);
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeHandler: function(element, type, handler){
		if (element.removeEventListener){
			element.removeEventListener(type,handler,flag);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}
}

//smart-menu的点击事件
function smartMenuClick(smartMenu){
	var line1 = smartMenu.querySelector("div.smart-menu>div.smart-menu-line1"),
		line2 = smartMenu.querySelector("div.smart-menu>div.smart-menu-line2"),
		line3 = smartMenu.querySelector("div.smart-menu>div.smart-menu-line3");
	EventUtil.addHandler(smartMenu,"click",function(){
		//样式变化
		var deg = line2.style.rotate;
		line1.style.transform = "translate(12px,10px)";
		line3.style.transform = "translate(12px,34px)";
		line2.style.transition = "all 0.3s linear";
		line2.style.transform = "translate(12px,22px) rotate(180deg)";
		setTimeout(function(){
			line1.style.transform = "";
			line3.style.transform = "";
			line2.style.transition = "none";
			line2.style.transform = "translate(12px,22px)  rotate(0deg)";
		},300);
		/*真正的执行事件*/
	});
}

//smart-arrow的点击事件
function smartArrowClick(smartArrow){
	
	EventUtil.addHandler(smartArrow,"click",function(){
		var couple1 = smartArrow.querySelector("div>div.smart-arrow-couple1");
			couple2 = smartArrow.querySelector("div>div.smart-arrow-couple2");
		//样式变化
		couple1.style.transform = "translate(0,-5px) rotate(225deg)";
		couple2.style.transform = "translate(0,5px) rotate(-225deg)";
		couple1.style.transition = "all 0.4s linear";
		couple2.style.transition = "all 0.4s linear";
		setTimeout(function(){
			var couple1 = smartArrow.querySelector("div>div.smart-arrow-couple1");
				couple2 = smartArrow.querySelector("div>div.smart-arrow-couple2");
			couple1.style.transition = "none";
			couple2.style.transition = "none";
			couple1.style.transform = "";
			couple2.style.transform = "";
			 setTimeout(function(){
				var couple1 = smartArrow.querySelector("div>div.smart-arrow-couple1");
					couple2 = smartArrow.querySelector("div>div.smart-arrow-couple2");
				couple1.style.transition = "";
				couple2.style.transition = "";
			 },20);
		},400);
		/*真正的执行事件*/
	});
}


EventUtil.addHandler(window,"load",function(){
	var smartMenu = document.querySelector("div.smart-menu");
	smartMenu && smartMenuClick(smartMenu);
	var smartArrow = document.querySelectorAll("div.smart-arrow");
	for (var i = 0; i < smartArrow.length; i++){
		smartArrow[i] && smartArrowClick(smartArrow[i]);
	}
});