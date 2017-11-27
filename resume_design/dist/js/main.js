(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

let uiNavItem = document.querySelectorAll(".ui-nav-container li");

// 导航栏select事件
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

// 上下Nav移动
function storyState() {

    this.storyOutterDOM = document.querySelector(".ui-content-story-outter");
    this.uiNavItems = uiNavItem;

    // story全部不可见
    this.stories = this.storyOutterDOM.children;
    this.storiesLen = this.stories.length;

    for (let i = 0; i < this.storiesLen; i++) {
        this.stories[i].style.visibility = "hidden";
        this.stories[i].style.display = "none";
        this.stories[i].style.opacity = "0";
        // 在CSS中添加transition属性
    }

    // 设置currIndex
    Object.defineProperty(this, 'currIndex', {
        set(index) {
            // 保护锁
            if (this.setCurrIndexBlock) {
                return;
            }
            if (typeof index === "number") {
                if (this.curr === index) {
                    this.stories[index].style.display = "block";

                    this.setCurrIndexBlock = true;
                    setTimeout(() => {
                        this.stories[index].style.visibility = "visible";
                        this.stories[index].style.opacity = "1";
                        this.setCurrIndexBlock = false;
                    }, 250);
                } else {
                    // 隐藏
                    this.stories[this.curr].style.visibility = "hidden";
                    this.stories[this.curr].style.opacity = "0";

                    this.setCurrIndexBlock = true;
                    setTimeout(() => {
                        // 隐藏
                        this.stories[this.curr].style.display = "none";
                        this.stories[index].style.display = "block";
                        setTimeout(() => {
                            this.stories[index].style.visibility = "visible";
                            this.stories[index].style.opacity = "1";

                            this.setCurrIndexBlock = false;
                            this.curr = index;
                        }, 250);
                    }, 250);
                }
            }
        },
        get() {
            return this.curr;
        }
    });

    this.curr = 0;
    this.currIndex = 0;

    // 滚轮事件
    this.storyOutterDOM.addEventListener('mousewheel', event => {
        event.stopPropagation();
        if (event.deltaY < 0) {
            //判断是否滚到头部
            if (this.storyOutterDOM.scrollTop === 0) {
                this._upStory();
            }
        } else if (event.deltaY > 0) {
            // 判断是否滚到底部
            let scrollTop = this.storyOutterDOM.scrollTop;
            let offsetHeight = this.storyOutterDOM.offsetHeight;
            let scrollHeight = this.storyOutterDOM.scrollHeight;

            if (scrollTop + offsetHeight >= scrollHeight) {
                this._downStory();
            }
        }
    });

    // TODO 移动端touch事件
}

storyState.prototype._goStory = function (index) {};

storyState.prototype._upStory = function () {
    if (this.currIndex > 0) {
        this.currIndex = this.currIndex - 1;
    }
};

storyState.prototype._downStory = function () {
    if (this.currIndex < this.storiesLen - 1) {
        this.currIndex = this.currIndex + 1;
    }
};

let _storyState = new storyState();

'use strict';

})));
//# sourceMappingURL=main.js.map
