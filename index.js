
EventUtil.addHandler(window,"load",turnPlay1);
EventUtil.addHandler(window,"load",turnPlay2);
EventUtil.addHandler(window,"load",customerMove);
EventUtil.addHandler(window,"scroll",function(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if (scrollTop > 650){
		document.querySelector("div.header-fixed").className = "header-fixed header-down clear";
	}else{
		document.querySelector("div.header-fixed").className = "header-fixed header-transparent clear";
	}

});
EventUtil.addHandler(window,"scroll",function(event){
	var pics = document.querySelectorAll("#authors .author-pic");
	for (var i = 0; i < pics.length; i++){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (scrollTop>2000 && scrollTop<3000){
			var height = scrollTop - 2000;
			pics[0].style.transform = "translate3d(0px,"+ (-height*0.08) + "px,0px )";
			pics[1].style.transform = "translate3d(0px,"+ (-height*0.12) + "px,0px )";
			pics[2].style.transform = "translate3d(0px,"+ (-height*0.2) + "px,0px )";
		}
	}
});



function turnPlay1(){
	var durationTime =  1000,	//动态的图片移动时间1s;
	delay = 5000,		//时间间隔5s
	ul = document.querySelector("ul.turn-play-1"),	
	children = ul.children,			
	length = children.length,		//length为6
	leftArrow = document.querySelector(".col-left>.smart-arrow"),
	rightArrow = document.querySelector(".col-right>.smart-arrow"),
	centerActive = 4,		//当前centerAcitve活动图片在children中的下标位置
	child = [], lastChild = [];
	for (var i = 0;i < 3 ;i++ )	{
		child[i] = children[i].cloneNode(true);
		lastChild[i] = children[length-i-1].cloneNode(true);
	}
	for(var i = 0; i < 3; i++){
		ul.appendChild(child[i]);
		ul.insertBefore(lastChild[i],ul.firstChild);
	}
	var style = ul.style;
	style.marginLeft = "-2850px";	//-900-650*3
	style.transition = "none";

	var timeId;	//轮播定时器id
	function turnMove(){
		moveLeft();
		timeId = setTimeout(turnMove,delay);
	}
	timeId = setTimeout(turnMove,delay);//开始自动向左轮播
	
	/*************/
	for (var i = 0; i < children.length ; i++){
		EventUtil.addHandler(children[i],"click",prevNextClick);
	}

	function prevNextClick(event){
		if (event.currentTarget.className == "prev-active"){
			clearTimeout(timeId);
			moveLeft();
			timeId = setTimeout(turnMove,delay);
		}else if (event.currentTarget.className == "next-active"){
			clearTimeout(timeId);
			moveRight();
			timeId = setTimeout(turnMove,delay);
		}
	}

	/***************/

	//为左右箭头绑定事件
	EventUtil.addHandler(leftArrow,"click",function(){
		clearTimeout(timeId);
		moveLeft();
		timeId = setTimeout(turnMove,delay);
	});
	EventUtil.addHandler(rightArrow,"click",function(){
		clearTimeout(timeId);
		moveRight();	
		timeId = setTimeout(turnMove,delay);
	});
	

	function changeActive(centerActive){
		for (var i = 0; i < children.length ; i++){
			children[i].className = "";
		}
		children[centerActive-1].className = "prev-active";
		children[centerActive].className = "center-active";
		children[centerActive+1].className = "next-active";
	}

	
	function moveLeft(){
		style.transition = "";
		var marginLeft = parseInt(style.marginLeft) - 650;
		style.marginLeft = marginLeft + "px";
		if (marginLeft <= -6750){	//-900-650*3  - 650*6
			changeActive(centerActive = 4);
			setTimeout(function(){
				style.transition = "none";
				style.marginLeft = "-2850px";	//-900-650*3
			},durationTime + 10);
		}else{
			changeActive(++centerActive);
		}
	}
	function moveRight(){
		style.transition = "";
		var marginLeft = parseInt(style.marginLeft) + 650;
		style.marginLeft = marginLeft + "px";
		if (marginLeft >= -900){	//
			changeActive(centerActive = 7);
			setTimeout(function(){
				style.transition = "none";
				style.marginLeft = "-4800px";	//-900-650*6
			},durationTime + 10);
		} else{
			changeActive(--centerActive);
		}
	}
	
}


function turnPlay2(){
	var intros = document.querySelectorAll("div.vertical-imgs .intro-left"),
	pics = document.querySelectorAll("div.vertical-imgs .imagery-right img"),	//轮播的图片子集
	dots = document.querySelectorAll("div.vertical-imgs .dot"),
	order = 0,			//播放顺序
	total = 4,			//总共要轮播的图片总数
	delay = 5000,		//时间间隔5s
	flyOut = "rotateX(80deg) rotate(45deg) rotateX(-20deg) rotateY(25deg) translateX(-300px)",
	stay = "rotateX(80deg) rotate(45deg) rotateX(-20deg) rotateY(25deg) translateX(0)",
	changeId,
	timeId;
	changeOrder(0);
	timeId = setTimeout(turnMove,delay);
	for (var i = 0; i < dots.length; i++){
		(function(newOrder){
			EventUtil.addHandler(dots[newOrder], "click", function(event){
				changeId && clearTimeout(changeId);
				clearTimeout(timeId);				
				changeOrder(newOrder);
				timeId = setTimeout(turnMove,delay);
			});
		})(i);
	}
	
	
	
	function turnMove(){
		var newOrder = (order + 1)% (total + 1);
		changeOrder(newOrder);
		timeId = setTimeout(turnMove,delay);
	}
	//图片轮播,播放order顺序
	function changeOrder(newOrder){
		//order的图片飞出
		pics[order].style.transform = flyOut;
		pics[order].style.opacity = 0;	
		dots[order].style.opacity = "";
		intros[order].style.opacity = 0;
		changeId = setTimeout(function(){
			pics[newOrder].style.transform = stay;
			pics[newOrder].style.opacity = 1;
			dots[newOrder].style.opacity = 1;
			intros[newOrder].style.opacity = 1;
		},200);
		order = newOrder;
	}
}



function customerMove(){
	var WIDTH = 400,		//elem.offsetWidth
		HEIGHT = 250;		//elem.offsetHeight
	var imgs = document.querySelectorAll("#customer .customer-img");

	for (var i = 0; i < imgs.length; i++)	{
		EventUtil.addHandler(imgs[i],"mouseenter",moveenter);
		EventUtil.addHandler(imgs[i],"mouseleave",moveleave);
	}
	
	function moveenter(event){
		var pageX = event.pageX,
			pageY = event.pageY,
			elem = event.currentTarget;
		if (event.currentTarget.contains(event.target) &&event.currentTarget!=event.target) return;
		var className =  getDirection(pageX,pageY,elem.offsetLeft,elem.offsetTop);
		elem.querySelector(".customer-wraper").style.transition = "none";
		elem.querySelector(".customer-wraper").className = "customer-wraper" + className;
		setTimeout(function(){
			elem.querySelector(".customer-wraper").style.transition = "";
			elem.querySelector(".customer-wraper").className = "customer-wraper customer-to-center";
		},20);
		
	}

	function moveleave(event){
		var pageX = event.pageX,
			pageY = event.pageY,
			elem = event.currentTarget;
		if (event.currentTarget.contains(event.target) &&event.currentTarget!=event.target) return;
		var className =  getDirection(pageX,pageY,elem.offsetLeft,elem.offsetTop);
		elem.querySelector(".customer-wraper").className = "customer-wraper" + className;
		setTimeout(function(){
			elem.querySelector(".customer-wraper").className = "customer-wraper";
		},300);
	}

	//pageX,pageY:是鼠标的坐标	x,y:是元素的左上角坐标
	function getDirection(pageX,pageY,x,y){
		if (abs(pageX,x) && pageY>y && pageY<y+250) return " customer-to-right";
		if (abs(pageX,x+400) && pageY>y && pageY<y+250) return " customer-to-left";
		if (abs(pageY,y) && pageX>x && pageX<x+400) return " customer-to-bottom";
		if (abs(pageY,y+250) && pageX>x && pageX<x+400) return " customer-to-top";
		return " customer-wraper";
	}
	function abs(a,b){
		return (Math.abs(a-b)<=50);
	}
}

var shops = {
	imgs:null,		//img的数组对象
	DURATION:1000,	//过渡时间
	DELAY:3000,
	imgUp:null,
	impDown:null,
	change:function(){
		//随机选出某一个imgs格子
		//让格子中imgUp和imgDown同时往上移动,最终imgDown完全在容器里显示.top:top-150px
		//动作完成后,将imgUp和imgDown重置
		this.random();
		this.imgUp.style.transition = "";
		this.imgDown.style.transition = "";
		this.imgUp.style.top = parseInt(getComputedStyle(this.imgUp).top) - 150 + "px";
		this.imgDown.style.top = parseInt(getComputedStyle(this.imgDown).top) - 150 + "px";
		var fun = (function(obj,imgUp,imgDown){
					return obj.changeStyle.bind(obj,imgUp,imgDown);
				}(this,this.imgUp,this.imgDown));
		setTimeout(fun,this.DURATION+10);
	},
	changeStyle:function(imgUp,imgDown){
		imgUp.style.transition = "opacity 0.5s cubic-bezier(.694,.0482,.335,1),transform 0.5s cubic-bezier(.694,.0482,.335,1)";
		imgUp.style.top = "";
		imgDown.style.transition = "opacity 0.5s cubic-bezier(.694,.0482,.335,1),transform 0.5s cubic-bezier(.694,.0482,.335,1)";
		imgDown.style.top = "";
	},
	init:function(){
		this.imgs = document.querySelectorAll("#related ul li");
		setInterval(function(){
			this.change();
			this.change();
		}.bind(this),this.DELAY);
	},
	random:function(){
		//随机取出图片数组中的一个,赋值给imgUp和imgDown
		var randomN = Math.floor(Math.random()*(this.imgs.length));
		this.imgUp = this.imgs[randomN].firstElementChild;
		this.imgDown = this.imgs[randomN].lastElementChild;
	}
}
shops.init();

var smartMenu = {
	menu: null,
	header:null,
	hidden:false,
	wrapper:null,
	init: function(){
		this.menu = document.querySelector("div.smart-menu");
		this.header = document.querySelector("div.header-fixed");
		this.wrapper = document.querySelector("div.header-fixed-wrapper");
		EventUtil.addHandler(this.menu,"click",this.disappear.bind(this));
		EventUtil.addHandler(this.wrapper,"mouseover",this.appear.bind(this));
	},
	disappear: function(){
		this.header.style.top = " -100px";
		setTimeout(function(){this.hidden = true;}.bind(this),1000);

	},
	appear: function(){
		if (this.hidden){
			this.hidden = false;
			this.header.style.top = "";
		}
	}
}
smartMenu.init();