EventUtil.addHandler(window,"load",running);

function running(){
	var road = document.querySelector(".christmas-road");
	run();
	setInterval(run,5000);
	function run(){
		road.style.transition = "none";
		road.style.right = "400px";
		setTimeout(reset,20);
	}
	function reset(){
		road.style.transition ="";
		road.style.right = "-1800px";
	}
}

var videos = {
	list :null,
	video:null,
	closeX:null,
	init : function(){
		this.video = document.querySelector("div.domain-back");
		this.list = document.querySelectorAll("#photowall .pic-row>div");
		this.closeX = document.querySelector("div.video-close");
		EventUtil.addHandler(this.closeX,"click",this.disappear.bind(this));
		for (var i = 0; i < this.list.length ;i++ ){
			EventUtil.addHandler(this.list[i],"click",this.appear.bind(this));
		}
	},
	appear:function(){
		this.video.style.marginLeft = "-400px";
	},
	disappear:function(){
		this.video.style.marginLeft="";
	}
}
videos.init();

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