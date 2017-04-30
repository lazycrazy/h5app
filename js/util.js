export function isPrimitive(value) {

    return value == null || (typeof value !== 'object' && typeof value !== 'function')

}

export function objectValueToString(s) {
    for (let v in Object.values(s)) {
        if (!isPrimitive(v)) {
            v = JSON.stringify(v)
        }
    }
    return s
}

export const loadMore = (el) => {
    return new Promise((resolve, reject) => {
        let windowHeight = window.screen.height
        let height
        let top
        let paddingBottom = getStyle(element, 'paddingBottom')
        let marginBottom = getStyle(element, 'marginBottom')
        let requestFrame
        let oldScrollTop
        const load = () => {
            //数据内容底部小于等于屏幕底部，加载
            if (document.body.scrollTop + windowHeight >= height + top + paddingBottom + marginBottom) {
                resolve()
            }
        }
        document.body.addEventListener('scroll', load, false)
            //运动开始时获取元素 高度 和 offseTop, pading, margin
        element.addEventListener('touchstart', () => {
            height = element.offsetHeight
            top = element.offsetTop
        }, { passive: true })

        //运动过程中保持监听 scrollTop 的值判断是否到达底部
        element.addEventListener('touchmove', () => {
            load();
        }, { passive: true })

        //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
        element.addEventListener('touchend', () => {
            oldScrollTop = document.body.scrollTop
            moveEnd()
        }, { passive: true })

        const moveEnd = () => {
            cancelAnimationFrame(requestFrame)
            requestFrame = requestAnimationFrame(() => {
                if (document.body.scrollTop > oldScrollTop) {
                    oldScrollTop = document.body.scrollTop;
                    load()
                    moveEnd()
                } else {
                    cancelAnimationFrame(requestFrame)
                        //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
                    height = element.offsetHeight;
                    load()
                }
            })
        }

    })
}

export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    if (!target)
        return 0
            //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

export const animate = (el, target, duration = 400, mode = 'ease-out') => {
    const attrStyle = attr => {
        return attr === 'opacity' ? Math.round(getStyle(element, attr, 'float') * 100) : getStyle(element, attr)
    }
    const rootSize = parseFloat(document.documentElement.style.fontSize)
    const unit = {}
    const initState = {}
    for (let [k, v] of Object.entries(target.entrys)) {
        if (/[^\d^\.]+/gi.test(v)) {
            unit[k] = v.match(/[^\d^\.]+/gi)[0] || 'px';
        } else {
            unit[k] = 'px';
        }
        initState[k] = attrStyle(k);
        if (unit[k] == 'rem') {
            target[k] = Math.ceil(parseInt(v) * rootSize);
        } else {
            target[k] = parseInt(v);
        }
    }

    let flag = true
    const remberSpeed = {}



    return new Pormise(function(resolve, reject) {

        element.timer = setInterval(() => {
            Object.keys(target).forEach(attr => {
                let iSpeed = 0; //步长
                let status = false; //是否仍需运动
                let iCurrent = attrStyle(attr) || 0; //当前元素属性址
                let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
                let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
                switch (mode) {
                    case 'ease-out':
                        speedBase = iCurrent;
                        intervalTime = duration * 5 / 400;
                        break;
                    case 'linear':
                        speedBase = initState[attr];
                        intervalTime = duration * 20 / 400;
                        break;
                    case 'ease-in':
                        let oldspeed = remberSpeed[attr] || 0;
                        iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
                        remberSpeed[attr] = iSpeed
                        break;
                    default:
                        speedBase = iCurrent;
                        intervalTime = duration * 5 / 400;
                }
                if (mode !== 'ease-in') {
                    iSpeed = (target[attr] - speedBase) / intervalTime;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                }
                //判断是否达步长之内的误差距离，如果到达说明到达目标点
                switch (mode) {
                    case 'ease-out':
                        status = iCurrent != target[attr];
                        break;
                    case 'linear':
                        status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                        break;
                    case 'ease-in':
                        status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                        break;
                    default:
                        status = iCurrent != target[attr];
                }

                if (status) {
                    flag = false;
                    //opacity 和 scrollTop 需要特殊处理
                    if (attr === "opacity") {
                        element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                        element.style.opacity = (iCurrent + iSpeed) / 100;
                    } else if (attr === 'scrollTop') {
                        element.scrollTop = iCurrent + iSpeed;
                    } else {
                        element.style[attr] = iCurrent + iSpeed + 'px';
                    }
                } else {
                    flag = true;
                }

                if (flag) {
                    clearInterval(element.timer)
                    resolve()
                }
            })
        }, 20)
    })
}


export const showBackTop = callback => {
    let requestFrame;
    let oldScrollTop;

    document.addEventListener('scroll', () => {
        showBackFun();
    }, false)
    document.addEventListener('touchstart', () => {
        showBackFun();
    }, { passive: true })

    document.addEventListener('touchmove', () => {
        showBackFun();
    }, { passive: true })

    document.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    }, { passive: true })

    //准确记录 oldScrollTop
    const moveEnd = () => {
            requestFrame = requestAnimationFrame(() => {
                if (document.body.scrollTop != oldScrollTop) {
                    oldScrollTop = document.body.scrollTop;
                    moveEnd();
                } else {
                    cancelAnimationFrame(requestFrame);
                }
                showBackFun();
            })
        }
        //回到顶部效果
    function back() {
        cancelAnimationFrame(requestFrame)
        requestFrame = requestAnimationFrame(() => {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
                back()
            } else {
                cancelAnimationFrame(requestFrame);
            }
        })
    }
    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        } else {
            callback(false);
        }
    }
}
