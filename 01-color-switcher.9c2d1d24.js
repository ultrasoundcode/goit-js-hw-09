document.querySelector("[data-start]").addEventListener("click",(function(){setInterval((function(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),document.querySelector("[data-stop]").addEventListener("click",(function(){clearInterval(interval),this.disabled=!0}));
//# sourceMappingURL=01-color-switcher.9c2d1d24.js.map
