(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

// 导航栏select事件

// 上下Nav移动
function storyState() {

    this.storyOutterDOM = document.querySelector(".ui-content-story-outter");
    this.uiNavItems = document.querySelectorAll(".ui-nav-container li");

    // story全部不可见
    this.stories = this.storyOutterDOM.children;
    this.storiesLen = this.stories.length;

    for (let i = 0; i < this.storiesLen; i++) {
        this.stories[i].style.visibility = "hidden";
        this.stories[i].style.display = "none";
        this.stories[i].style.opacity = "0";
        this.stories[i].style.position = "relative";
        this.stories[i].style.left = "-30px";
        // 自己在CSS中添加transition属性
    }

    this.curr = 0;
    this._setCurrIndex(0);

    // 初始化左部导航
    if (this.uiNavItems) {
        let len = this.uiNavItems.length;
        let selector = this.uiNavItems[0];

        // 初始化
        selector.style.top = this.uiNavItems[this.curr + 1].offsetTop - 6 + "px";

        for (let i = 1; i < len; i++) {
            // 添加事件侦听
            this.uiNavItems[i].addEventListener('mouseover', () => {
                selector.style.top = this.uiNavItems[i].offsetTop - 6 + "px";
            });

            this.uiNavItems[i].addEventListener('mouseout', () => {
                if (this.setCurrIndexBlock) {
                    return;
                }
                selector.style.top = this.uiNavItems[this.curr + 1].offsetTop - 6 + "px";
            });

            this.uiNavItems[i].addEventListener('click', () => {
                this._setCurrIndex(i - 1);
            });
        }
    }

    // 滚轮事件
    this._mouseWheel = this._mouseWheel.bind(this);
    this.storyOutterDOM.addEventListener('mousewheel', this._mouseWheel);
    document.addEventListener('mousewheel', this._mouseWheel);

    // TODO 移动端touch事件
}

// 鼠标滚动事件
storyState.prototype._mouseWheel = function (event) {
    event.preventDefault();
    event.stopPropagation();
    let flag = 5;
    let ratio = 5;
    let animation = setInterval(() => {
        this.storyOutterDOM.scrollTop += event.deltaY > 0 ? ratio * flag : -ratio * flag;
        if (flag-- <= 0) {
            clearInterval(animation);
        }
    }, 25);
    // 让内部也随之滚动
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
};

// 设置当前幻灯片
storyState.prototype._setCurrIndex = function (index, cb) {
    // 保护锁
    if (this.setCurrIndexBlock) {
        return;
    }
    this._setUINavPos(index);
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
                    if (typeof cb === "function") {
                        cb();
                    }
                }, 250);
            }, 250);
        }
    }
};

storyState.prototype._getCurrIndex = function (index) {
    return this.curr;
};

storyState.prototype._setUINavPos = function (index) {
    let selector = this.uiNavItems[0];
    selector.style.top = this.uiNavItems[index + 1].offsetTop - 6 + "px";
};

storyState.prototype._goStory = function (index) {
    if (index >= 0 && index < this.storiesLen) {
        this._setCurrIndex(index);
    }
};

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
