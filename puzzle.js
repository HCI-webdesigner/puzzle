window.onload = allFunc;

function allFunc(){
	showHint();
	initialize(3);
	clickToScroll();
}

//开始时的说明
function showHint(){
	//关闭遮罩层
	var close = document.getElementById("close-hint");
	close.onclick = function(){
		var i=1;
		var fade = setInterval(function(){
			hint.style.opacity = i;
			i-=0.1;
			if(i<=0){
				hint.style.display = "none";
				clearInterval(fade);
			}
		},10);
		counter();
	}//渐隐动画
}

//控制音乐
function musicControl(){
	var music = document.getElementById("sound-file");
	var button = document.getElementById("sound");
	if(music.paused){
		music.play();
		button.style.background = "url(img/music.png)";
	}
	else{
		music.pause();
		button.style.background = "url(img/mute.png)";
	}
}

//点击箭头横滚
function clickToScroll(){
	var l = document.getElementById("left-arrow");
	var r = document.getElementById("right-arrow");
	var target = document.getElementById("dock-inner");
	l.onclick = function(){
		var interL = setInterval(function(){
			target.scrollLeft+=3;
			if(target.scrollLeft>=340){
				clearInterval(interL);
			}
		},1);
	};
	r.onclick = function(){
		var interR = setInterval(function(){
			target.scrollLeft-=3;
			if(target.scrollLeft<=0){
				clearInterval(interR);
			}
		},1);
	};
}

//秒表
function counter(){
	var i=0,j=0,k=0;
	var ti=0,tj=0,tk=0;
	var stop=0;
	var done = check();
	var container = document.getElementById("counter");
	var watchpanel = document.getElementById("watch-panel");
	var curtain = document.getElementById("pause");
	var success = document.getElementById("success");
	var restart = document.getElementById("restart");
	var start = setInterval(startCount,10);
	container.style.background = "#0f0";
	function startCount(){
		done=check();
		if(i<100){
			i++;
		}
		if(i>=100){
			j++;
			i=0;
		}
		if(j>=60){
			k++;
			j=0;
		}
		ti = addZero(i);
		tj = addZero(j);
		tk = addZero(k);
		container.innerHTML = tk+':'+tj+':'+ti;
		if(done){
			clearInterval(start);
			container.style.background = "#f00";
			stop = 1;
			success.style.display = "block";
		}
	}
	watchpanel.onclick = function(){
		if(stop&&!done){
			start = setInterval(startCount,10);
			container.style.background = "#0f0";
			curtain.style.display = "none";
			stop = 0;
		}
		else if(!stop){
			clearInterval(start);
			container.style.background = "#f00";
			curtain.style.display = "block";
			stop = 1;
		}
	}
	curtain.onclick = function(){
		start = setInterval(startCount,10);
		container.style.background = "#0f0";
		curtain.style.display = "none";
		stop = 0;
	}
	//重新开始
	restart.onclick = function(){
		var z=0;
		var dz = document.getElementById("puzzle").getElementsByTagName("div");
		for(z=0;z<dz.length;z++){
			dz[z].innerHTML = "";
		}
		initialize(3);
		i=0,j=0,k=0;
		clearInterval(start);
		start = setInterval(startCount,10);
		container.style.background = "#0f0";
		curtain.style.display = "none";
		success.style.display = "none";
		stop = 0;
	}
}
function addZero(num){
	if(num<=9){
		return '0'+num;
	}
	else{
		return num;
	}
}

//拖放
function allowDrop(ev){
	ev.preventDefault();
}

function drag(ev){
	ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev){
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	var targetId=String(ev.target.id);
	var targetBox=document.getElementById(targetId);
	var targetChild=targetBox.getElementsByTagName("div");
	var parent=targetBox.parentNode;
	if(targetId=="slice-container"){
		ev.target.appendChild(document.getElementById(data));
	}
	else if(targetChild.length!=0||parent.className=="drop-zone"){
		alert("这里已经有一块拼图了哦～～");
	}
	else{
		ev.target.appendChild(document.getElementById(data));
	}
}

//切图
function initialize(m){
		var n=0;
		var	arr=new Array();
		var	result="";
		for(i=0;i<m;i++){
			for(j=0;j<m;j++){
				arr.push("<div id='slice"+n+"'  class='dz"+n+"'  draggable='true' ondragstart='drag(event)' style='background-position:"+parseInt(-j*130) + 'px '+ parseInt(-i*130) +"px'"+"></div>");
				n++;
			}
		}
		var result = '';
		var len = arr.length;
		for(var i=0;i<len ;i++){
		var rand = parseInt(arr.length*Math.random());
		result += arr[rand];
		arr.splice(rand,1);
		}
		document.getElementById("slice-container").innerHTML=result;
	}

	
//检查完成
function check() {
	var num=0;
	for(var i=0;i<9;i++) {
		var pre=document.getElementById("dz"+i);
		var child=pre.getElementsByTagName("div");
		if(child.length==0){
			break;
		}
		else if(pre.id==child[0].className) {
			num++;
		}
	}
	if(num == 9) {
		return true;
	}
	else {
		return false;
	}
}