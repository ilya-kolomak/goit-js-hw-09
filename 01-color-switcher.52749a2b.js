!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]"),r=null;o.setAttribute("disabled","disablet");e.addEventListener("click",(function(){r=setInterval(n,1e3),console.log("start"),e.setAttribute("disabled","disablet"),o.removeAttribute("disabled")}));var n=function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))};o.addEventListener("click",(function(){clearInterval(r),console.log("stop"),e.removeAttribute("disabled"),o.setAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.52749a2b.js.map