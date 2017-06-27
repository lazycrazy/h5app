import FastClick from 'fastclick'

(function(doc, win) {
	return
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window)

export default function  obj2string(o) {     
	var  r = [];     
	if(typeof  o == "string") {         
		return  "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";     
	}     
	if(typeof  o == "object") {         
		if(!o.sort) {             
			for(var  i  in  o) {                 
				r.push(i + ":" + obj2string(o[i]));             
			}             
			if(!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {                 
				r.push("toString:" + o.toString.toString());             
			}             
			r = "{" + r.join() + "}";         
		} else {             
			for(var  i = 0; i < o.length; i++) {                 
				r.push(obj2string(o[i]))             
			}             
			r = "[" + r.join() + "]";         
		}          
		return  r;     
	}      
	return  o.toString(); 
}

export function InitApp() {

	var _domReady = false;
	var _adjust = false;

	function plusReady() {
		if(!window.plus || !_domReady) return;
		//				plus.navigator.closeSplashscreen();
		plus.webview.currentWebview().setStyle({
			scrollIndicator: 'none'
		});

		plus.key.addEventListener('backbutton', function() {
			if(confirm('确认退出？')) {
				plus.runtime.quit();
			}
		}, false);
		document.addEventListener('touchstart', function() {
			return false;
		}, true);
		document.oncontextmenu = function() {
			return false;
		}
	};

	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}

	document.addEventListener('DOMContentLoaded', function() {
		_domReady = true;
		plusReady();
		compatibleAdjust();
		FastClick.attach(document.body);
	}, false);

	function compatibleAdjust() {
		if(_adjust || !window.plus || !_domReady)
			return;

		_adjust = true;
		plus.navigator.setStatusBarBackground('#ffffff');
		if(plus.navigator.isImmersedStatusbar()) {
			plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackOpaque')
		}

		setTimeout(function() {
			plus.navigator.closeSplashscreen();
		}, 20);
	}
}