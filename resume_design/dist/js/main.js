(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

let uiNavItem = document.querySelectorAll(".ui-nav-container li");

if (uiNavItem) {
    let len = uiNavItem.length;
    let selector = uiNavItem[0];

    // 初始化
    let uiNavCurr = document.querySelector(".ui-nav-container li.nav-curr");
    selector.style.top = uiNavCurr.offsetTop - 6 + "px";

    for (let i = 1; i < len; i++) {
        // 添加事件侦听
        uiNavItem[i].addEventListener('mouseover', () => {
            selector.style.top = uiNavItem[i].offsetTop - 6 + "px";
        });

        uiNavItem[i].addEventListener('mouseout', () => {
            let uiNavCurr = document.querySelector(".ui-nav-container li.nav-curr");
            selector.style.top = uiNavCurr.offsetTop - 6 + "px";
        });
    }
}

'use strict';

})));
//# sourceMappingURL=main.js.map
