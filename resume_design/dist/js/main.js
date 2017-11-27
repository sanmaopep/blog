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
        this.stories[i].style.position = "relative";
        this.stories[i].style.left = "-30px";
        // 在CSS中添加transition属性
    }

    this.curr = 0;
    this._setCurrIndex(0);

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

storyState.prototype._setCurrIndex = function (index, cb) {
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
                this.stories[index].style.left = "0px";
                this.setCurrIndexBlock = false;
            }, 250);
        } else {
            // 隐藏
            this.stories[this.curr].style.visibility = "hidden";
            this.stories[this.curr].style.opacity = "0";
            this.stories[this.curr].style.left = "-30px";

            this.setCurrIndexBlock = true;
            setTimeout(() => {
                // 隐藏
                this.stories[this.curr].style.display = "none";
                this.stories[index].style.display = "block";
                setTimeout(() => {
                    this.stories[index].style.visibility = "visible";
                    this.stories[index].style.opacity = "1";
                    this.stories[index].style.left = "0px";
                    this.setCurrIndexBlock = false;
                    this.curr = index;
                    cb();
                }, 250);
            }, 250);
        }
    }
};

storyState.prototype._getCurrIndex = function (index) {
    return this.curr;
};

storyState.prototype._goStory = function (index) {};

storyState.prototype._upStory = function () {
    if (this._getCurrIndex() > 0) {
        this._setCurrIndex(this._getCurrIndex() - 1, () => {
            let offsetHeight = this.storyOutterDOM.offsetHeight;
            let scrollHeight = this.storyOutterDOM.scrollHeight;
            this.storyOutterDOM.scrollTop = scrollHeight - offsetHeight;
        });
    }
};

storyState.prototype._downStory = function () {
    if (this._getCurrIndex() < this.storiesLen - 1) {
        this._setCurrIndex(this._getCurrIndex() + 1, () => {
            this.storyOutterDOM.scrollTop = 0;
        });
    }
};

let _storyState = new storyState();

'use strict';

})));
//# sourceMappingURL=main.js.map
