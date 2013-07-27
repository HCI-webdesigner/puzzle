window.onload = allFunc;
var num = 3;
var url = "url(img/hehe0.jpg)";

	function allFunc() {
		flashLogo();
		showHint();
		initialize(num);
		clickToScroll();
		document.getElementById("difficulty").value = 3;
		document.getElementById("images").value = 0;
		document.getElementById("answer").style.left="-320px";
	}

	//查看原图
	function showAnswer(){
		var answer=document.getElementById("answer");
		var tri=document.getElementById("tri");
		var lef = parseInt(answer.style.left);
		if(lef==-320){ 
			tri.style.borderStyle="dashed solid dashed dashed";
			tri.style.borderColor="transparent rgb(230, 20, 20) transparent transparent";
			tri.style.right="16px";
			var ans=setInterval(function(){
				if(lef<0){
					lef+=10;
					answer.style.left=lef+'px';
				}else{
					clearInterval(ans);
				}
			},10);
		}
		if(lef==0){
			tri.style.borderStyle="dashed dashed dashed solid";
			tri.style.borderColor="transparent transparent transparent rgb(230, 20, 20)";
			tri.style.right="6px";
			var ans=setInterval(function(){
				if(lef>-320){
					lef-=10;
					answer.style.left=lef+'px';
				}else{
					clearInterval(ans);
				}
			},10);
		}
	}

	//logo闪烁
	function flashLogo(){
		var i=0,j=0;
		var ele = getElementsByClass('logo','letter');
		var color = ['#f06','#33b5e5','#00f','#0f0','#f00','#fff','#fa0','#f03','#0ef','#fc0','#f00'];
		setInterval(function(){
			for(i=0;i<ele.length;i++){
				var random = Math.round(10 * Math.random());
				ele[i].style.color = color[random];
			}
		},1000);
	}

	function getElementsByClass(outer,inner){
		var i=0;
		var result = [];
		var container = document.getElementById(outer);
		var allIn = container.getElementsByTagName('*');
		for(i=0;i<allIn.length;i++){
			if(allIn[i].className == inner){
				result.push(allIn[i]);
			}
		}
		return result;
	}

	// 选择图像
	function setImages() {
		var imag = document.getElementById("images").value;
		url = "url(img/hehe" + imag + ".jpg)";
		var src=url.slice(4,17);
		answer.getElementsByTagName("img")[0].src=src;
		document.getElementById("restart").click();
	}
	// 设置难度
	function setDifficulty() {
		num = document.getElementById("difficulty").value;
		document.getElementById("restart").click();
	}

	//开始时的说明
	function showHint() {
		//关闭遮罩层
		var close = document.getElementById("close-hint");
		close.onclick = function() {
			var i = 1;
			var fade = setInterval(function() {
				hint.style.opacity = i;
				i -= 0.1;
				if (i <= 0) {
					hint.style.display = "none";
					clearInterval(fade);
				}
			}, 10);
			counter();
		} //渐隐动画
	}

	//控制音乐
	function musicControl() {
		var music = document.getElementById("sound-file");
		var button = document.getElementById("sound");
		if (music.paused) {
			music.play();
			button.style.background = "url(img/music.png)";
		} else {
			music.pause();
			button.style.background = "url(img/mute.png)";
		}
	}

	//点击箭头横滚
	function clickToScroll() {
		var l = document.getElementById("left-arrow");
		var r = document.getElementById("right-arrow");
		var target = document.getElementById("dock-inner");
		r.onclick = function() {
			var i=0;
			var interL = setInterval(function() {
				target.scrollLeft += 10;
				i++;
				if (i >= 30) {
					clearInterval(interL);
					i=0;
				}
			}, 5);
		};
		l.onclick = function() {
			var i=0;
			var interR = setInterval(function() {
				target.scrollLeft -= 10;
				i++;
				if ( i>= 30) {
					clearInterval(interR);
					i=0;
				}
			}, 5);
		};
	}

	//秒表
	function counter() {
		var i = 0,
			j = 0,
			k = 0;
		var ti = 0,
			tj = 0,
			tk = 0;
		var stop = 0;
		var done = check(num * num);
		var container = document.getElementById("counter");
		var watchpanel = document.getElementById("watch-panel");
		var curtain = document.getElementById("pause");
		var success = document.getElementById("success");
		var restart = document.getElementById("restart");
		var start = setInterval(startCount, 10);
		container.style.background = "#0f0";

		function startCount() {
			done = check(num * num);
			if (i < 100) {
				i++;
			}
			if (i >= 100) {
				j++;
				i = 0;
			}
			if (j >= 60) {
				k++;
				j = 0;
			}
			ti = addZero(i);
			tj = addZero(j);
			tk = addZero(k);
			container.innerHTML = tk + ':' + tj + ':' + ti;
			if (done) {
				clearInterval(start);
				container.style.background = "#f00";
				stop = 1;
				success.style.display = "block";
			}
		}
		watchpanel.onclick = function() {
			if (stop && !done) {
				start = setInterval(startCount, 10);
				container.style.background = "#0f0";
				curtain.style.display = "none";
				stop = 0;
			} else if (!stop) {
				clearInterval(start);
				container.style.background = "#f00";
				curtain.style.display = "block";
				stop = 1;
			}
		}
		curtain.onclick = function() {
			start = setInterval(startCount, 10);
			container.style.background = "#0f0";
			curtain.style.display = "none";
			stop = 0;
		}
		//重新开始
		restart.onclick = function() {
			var z = 0;
			var dz = document.getElementById("puzzle").getElementsByTagName("div");
			for (z = 0; z < dz.length; z++) {
				dz[z].innerHTML = "";
			}
			initialize(num);
			i = 0, j = 0, k = 0;
			clearInterval(start);
			start = setInterval(startCount, 10);
			container.style.background = "#0f0";
			curtain.style.display = "none";
			success.style.display = "none";
			stop = 0;
		}
	}

	function addZero(num) {
		if (num <= 9) {
			return '0' + num;
		} else {
			return num;
		}
	}

	//拖放
	function allowDrop(ev) {
		ev.preventDefault();
	}

	function drag(ev) {
		ev.dataTransfer.setData("Text", ev.target.id);
	}

	function drop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("Text");
		var targetId = String(ev.target.id);
		var targetBox = document.getElementById(targetId);
		var targetChild = targetBox.getElementsByTagName("div");
		var parent = targetBox.parentNode;
		if (targetId == "slice-container" || targetBox.className == "drop-zone") {
			ev.target.appendChild(document.getElementById(data));
		}
		else if (targetChild.length != 0 || parent.className == "drop-zone"){
			alert("这里已经有一块拼图了哦～～");
		}
		else{
			document.getElementById('slice-container').appendChild(document.getElementById(data));
		}
	}

	//切图
	function initialize(m) {
		var puzzle = document.getElementById("puzzle");
		var container = document.getElementById("slice-container");
		container.style.width = (390+40)*m+"px";
		if (m == 3) {
			puzzle.style.width = "402px";
			puzzle.style.height = "402px";
			container.style.paddingTop = "0px";
		} else if (m == 4) {
			puzzle.style.width = "405px";
			puzzle.style.height = "405px";
			container.style.paddingTop = "20px";
		}else if(m==5){
			puzzle.style.width = "408px";
			puzzle.style.height = "408px";
			container.style.paddingTop = "25px";
		}
		var n = 0;
		var arr = new Array();
		var result = "";
		var px = 390 / m;
		for (var i = 0; i < m; i++) {
			for (j = 0; j < m; j++) {
				arr.push("<div id='slice" + n + "'  class='dz" + n + "'  draggable='true' ondragstart='drag(event)' style='width: " + px + "px;height: " + px + "px;background:" + parseInt(-j * px) + 'px ' + parseInt(-i * px) + "px " + url + "'></div>");
				n++;
			}
		}
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var rand = parseInt(arr.length * Math.random());
			result += arr[rand];
			arr.splice(rand, 1);
		}
		document.getElementById("slice-container").innerHTML = result;
		result = "";
		for (var i = 0; i < n; i++) {
			result += "<div id='dz" + i + "' class='drop-zone' style='width: " + px + "px;height: " + px + "px;' ondrop='drop(event)' ondragover='allowDrop(event)'></div>";
		}
		document.getElementById("puzzle").innerHTML = result;
	}


	//检查完成
	function check(n) {
		for (var i = 0; i < n; i++) {
			var pre = document.getElementById("dz" + i);
			var child = pre.getElementsByTagName("div");
			if (child.length == 0) {
				return false;
			} else if (pre.id != child[0].className) {
				return false;
			}
		}
		return true;
	}