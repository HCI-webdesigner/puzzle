window.onload = allFunc;
var num = 3

	function allFunc() {
		showHint();
		initialize(num);
		clickToScroll();
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
				var interL = setInterval(function() {
				target.scrollLeft += 5;
				if (target.scrollLeft >= 900) {
					clearInterval(interL);
				}
			}, 1);
		};
		l.onclick = function() {
			var interR = setInterval(function() {
				target.scrollLeft -= 5;
				if (target.scrollLeft <= 0) {
					clearInterval(interR);
				}
			}, 1);
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
		if (targetId == "slice-container") {
			ev.target.appendChild(document.getElementById(data));
		} else if (targetChild.length != 0 || parent.className == "drop-zone") {
			// alert("这里已经有一块拼图了哦～～");
		} else {
			ev.target.appendChild(document.getElementById(data));
		}
	}

	//切图

	function initialize(m) {
		if (m == 3) {
			document.getElementById("puzzle").style.width = "402px";
			document.getElementById("puzzle").style.height = "402px";
			document.getElementById("slice-container").style.paddingTop = "0px";
		} else if (m == 4) {
			document.getElementById("puzzle").style.width = "405px";
			document.getElementById("puzzle").style.height = "405px";
			document.getElementById("slice-container").style.paddingTop = "20px";
		}else if(m==5){
			document.getElementById("puzzle").style.width = "408px";
			document.getElementById("puzzle").style.height = "408px";
			document.getElementById("slice-container").style.paddingTop = "25px";
		}
		var n = 0;
		var arr = new Array();
		var result = "";
		var px = 390 / m;
		for (var i = 0; i < m; i++) {
			for (j = 0; j < m; j++) {
				arr.push("<div id='slice" + n + "'  class='dz" + n + "'  draggable='true' ondragstart='drag(event)' style='width: " + px + "px;height: " + px + "px;background-position:" + parseInt(-j * px) + 'px ' + parseInt(-i * px) + "px'" + "></div>");
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