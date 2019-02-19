/*
*Vue-drag.js v1.1.0
*By BosenY
*/
function detectmob() {
	if( navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)
	){
		return true;
	}
	else {
		return false;
	}
}
(function () {
	var vueDrag = {}
	vueDrag.install = function (Vue) {
		Vue.directive("drag", {
			bind: function (el, binding) {
				// console.log(binding)
				el.style.position = "absolute"
				var isChildDom
				if (binding.value !== undefined) {
					isChildDom = true
				} else {
					isChildDom = false
				}
				var offsetX = 0
				var offsetY = 0

                var width = el.style.width.split("px")[0];
                var height = el.style.height.split("px")[0];
                
				function down(e) {
					offsetX = (e.pageX - el.offsetLeft)
					offsetY = (e.pageY - el.offsetTop)
					if (isChildDom) {
						var childdom = el.querySelector(binding.value)
						childdom.style.position = "relative"

						if(binding.modifiers.cursor) childdom.style.cursor = "move"
						var barStyle = childdom.currentStyle
							? childdom.currentStyle
							: window.getComputedStyle(childdom, null)
						var boxStyle = el.currentStyle
							? el.currentStyle
							: window.getComputedStyle(el, null)
						var left = Number(barStyle.getPropertyValue("left").replace("px", "")) + Number(boxStyle.getPropertyValue("left").replace("px", "")) + Number(boxStyle.getPropertyValue("border-left-width").replace("px", ""))
						var right = left + Number(barStyle.getPropertyValue("width").replace("px", ""))
						var top = Number(barStyle.getPropertyValue("top").replace("px", "")) + Number(boxStyle.getPropertyValue("top").replace("px", "")) + Number(boxStyle.getPropertyValue("border-top-width").replace("px", ""))
						var bottom = top + Number(barStyle.getPropertyValue("height").replace("px", ""))
						// console.log(`left:${left}`)
						// console.log(`right:${right}`)
						// console.log(`top:${top}`)
						// console.log(`bottom:${bottom}`)
						// console.log(`clientX: ${e.clientX}`)
						// console.log(`clientY: ${e.clientY}`)
						if (e.clientX <= right && e.clientX >= left && e.clientY >= top && e.clientY <= bottom) {
							addEventListener("mousemove", move)
							addEventListener("mouseup", up)
						}
					} else {
						if(binding.modifiers.cursor) el.style.cursor = "move"
						addEventListener("mousemove", move)
						addEventListener("mouseup", up)
					}
				}
				function move(e) {
					el.style.left = (e.pageX - offsetX) + "px"
					el.style.top = (e.pageY - offsetY) + "px"

                    if (e.pageX - offsetX < 0) {
                    	e1.style.left = "0px";
                    }
                    if (e.pageX - offsetX + width > 1280) {
                        e1.style.left = (1280 - width) + "px";
                    }

                    if (e.pageY - offsetY < 0) {
                        e1.style.top = "0px";
                    }
                    if (e.pageY - offsetY + height > 720) {
                        e1.style.top = (720 - height) + "720px";
                    }
				}
				function up() {
					removeEventListener("mousemove", move)
					removeEventListener("mouseup", up)
				}
				el.addEventListener("mousedown", down)
			}
		})
	}
	if (typeof exports == "object") {
		module.exports = vueDrag
	} else if (typeof define == "function" && define.amd) {
		define([], function () {
			return vueDrag
		})
	} else if (window.Vue) {
		window.vueDrag = vueDrag
		Vue.use(vueDrag)
	}
})()
