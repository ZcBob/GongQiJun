
EventUtil.addHandler(window,"scroll",function(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if (scrollTop > 650 && scrollTop < 3900){
		document.querySelector("div.header-fixed").className = "header-fixed header-down clear";
	}else{
		document.querySelector("div.header-fixed").className = "header-fixed header-transparent clear";
	}

});

EventUtil.addHandler(window,"load",autoWrite);
EventUtil.addHandler(window,"scroll",disperse);

function autoWrite(){
	var sentences = ["圣诞到了,许个愿,也许会有惊喜哦","走进宫崎骏的世界","生命可以随心所欲，但不能随波逐流","我们很努力的活，只是你们不知道而已"];
	var span = document.querySelector("#auto-write");
	var sentenceOrder = 0;
	var wordOrder = 0;
	var speed = 200;//写字速度
	var clearDelay = 1500;	//清空句子延迟
	var writeDelay = 1500;	//开始写新句子延迟
	var timeId;
	setTimeout(write,100);

	function write(){
		timeId = setTimeout(word,writeDelay);
	}

	function word(){
		var s = sentences[sentenceOrder].slice(0,wordOrder+1);
		span.innerHTML = s;
		if (wordOrder + 1 == sentences[sentenceOrder].length){
			//写完了一句话
			timeId = setTimeout(clearWrite,clearDelay);
		}else{
			wordOrder = wordOrder + 1;
			timeId = setTimeout(word,speed + Math.floor(Math.random()*400));
		}
	}
	function clearWrite(){
		span.innerHTML = "";
		wordOrder = 0;
		sentenceOrder = (sentenceOrder + 1) % sentences.length;
		write();
	}
	//input的动作.
	var input = document.querySelector(".input-wraper>input");
	EventUtil.addHandler(input,"focus",function(){
		clearTimeout(timeId);
		span.innerHTML = "";
		wordOrder = 0;
	});
	EventUtil.addHandler(input,"blur",function(){
		input.value = "";
		timeId = setTimeout(write,100);
	});
}

function disperse(){
	var particles = document.querySelectorAll(".domain-device .particles>div");
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if (scrollTop > 640 && scrollTop<1100){
		for (var i = 0;i < particles.length ;i++ ){
			particles[i].className = "particles" + (i+1);
		}
	}else{
		for (var i = 0;i < particles.length ;i++ ){
			particles[i].className = "";
		}
	}
	
	var last_poto = document.querySelector("#main .last_poto");
	var mian_left = document.querySelector("#main .mian_left");
	var mian_right = document.querySelector("#main .mian_right");
	var ctr_bottom = document.querySelector("#main .ctr_bottom");
	if (scrollTop>1600){
		mian_left.style.left = "0px";
		ctr_bottom.style.bottom = "-280px";
		mian_right.style.right = "-10px";
	}
	if (scrollTop>3020)	{
		last_poto.style.marginRight = "-41%";
	}

}

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