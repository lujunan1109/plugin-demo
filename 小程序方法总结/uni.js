export default {

    // 返回上一页
    uni.navigateBack({
        fail(e) {
            if (e.errMsg.includes("fail cannot navigate back at first page")) {
                uni.reLaunch({
                    url: `/pages/index/index`// 返回首页
                });
            }
        }
    }),

    // 页面跳转，解决层级过高问题
    navigateTo(url) {
        let pagesArr = getCurrentPages(); // 获取层级
        console.log(pagesArr, pagesArr.length);
        if (pagesArr.length <= 8) {
            wx.navigateTo({
                url,
                fail(e) {
                    console.log('小于8，跳转失败', e)
                }
            })
        } else {
            wx.reLaunch({
                url,
                fail(e) {
                    console.log('大于8，跳转失败', e)
                }
            })
        }
    },

    // 预览照片
    previewImg(originImgList, currentIndex) {
        wx.previewImage({
            current: originImgList[currentIndex], // 当前显示图片的http链接
            urls: originImgList, // 需要预览的图片http链接列表
        });
    },

    // 防抖
    // 场景 input输入框
    // 用完记得在页面销毁阶段清除闭包：将用完的函数或者变量置为null。
    debounce(ctx, fn, interval = 1000) {
        const that = ctx;
        let timeout
        return function () {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                fn.apply(that, arguments);
            }, interval);
        }
    },


    //   https://www.deanhan.cn/js-throttle-debounce.html
    // 防抖节流解释最清楚的文章

    //  节流
    //  使用场景：懒加载监听浏览器滚动位置
    throttle(ctx, fn, delay = 1000) {
        const that = ctx;
        // 保存一个标记
        let canRun = true
        return function () {
            // 说明函数还未运行
            if (!canRun) return
            canRun = false
            setTimeout(() => {
                //https://www.runoob.com/w3cnote/js-call-apply-bind.html (call,apply,bind区别)
                fn.apply(that, arguments)
                // 运行完毕后设置为true，可以进行下次函数
                canRun = true
            }, delay)
        }
    },

    // 订阅普通消息
    requestSubscribeMsg(tmplIds = [], callback) {
        const that = this;
        uni.requestSubscribeMessage({
            tmplIds: tmplIds,
            success(res) {
                let templateIds = [];
                if (!Object.entries)
                    // https://www.jianshu.com/p/6f4537bb89b2   (object.entries)
                    Object.entries = function (obj) {
                        var ownProps = Object.keys(obj),
                            i = ownProps.length,
                            resArray = new Array(i); // preallocate the Array
                        while (i--)
                            resArray[i] = [ownProps[i], obj[ownProps[i]]];

                        return resArray;
                    };
                Object.entries(res).forEach((item) => {
                    if (item[1] === 'accept') {
                        templateIds.push(item[0]);
                    }
                });

                if (templateIds.length > 0) {
                    wx.showToast({
                        title: '订阅成功',
                        icon: 'none',
                        duration: 2000,
                    });
                    // 增加订阅次数
                    // that
                    //     .post(addr.AddTemplateMsgUserData,
                    //         templateIds, 1)
                }
                callback && callback();
            },
            fail(e) {
                console.log('订阅消息错误', e);
                if (e.errMsg.includes('main switch is switched off')) {
                    wx.showModal({
                        title: '订阅提示',
                        content: '需跳转小程序设置-消息订阅中打开接收订阅消息',
                        showCancel: true,
                        success: (res) => {
                            wx.openSetting({
                                success(e) {
                                    console.log('openSetting-success', e);
                                },
                                fail(e) {
                                    console.log('openSetting-fail', e);
                                },
                            });
                        },
                    });
                } else {

                }
                callback && callback();
            },
        });
    },

    // 对option参数转化为对象
    sceneToObj(options) {
        let temp = {};
        if (options && options.scene) {
            const scene = decodeURIComponent(options.scene);
            scene.split('&').forEach((i) => {
                temp[i.split('=')[0]] = i.split('=')[1];
            });
        } else {
            temp = options;
        }
        return temp;
    },

    // 获取定位授权
    getLocationScope(cb, failedCb) {
        uni.getSetting({
            success(res) {
                console.log(res)
                if (!res.authSetting['scope.userLocation']) {
                    uni.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            typeof cb == 'function' && cb()
                        },
                        fail(r) {
                            typeof failedCb == 'function' && failedCb()
                        },
                    });
                } else {
                    typeof cb == 'function' && cb()
                }
            },
        });
    },

    //   位置授权使用
    //   chooseAddress() {
    //     const that = this;
    //     that.$utils.getLocationScope(
    //       () => {
    //         wx.chooseLocation({
    //           success(e) {
    //             that.address = e.address;
    //           }
    //         });
    //       },
    //       () => {
    //         uni.showToast({
    //           title: "获取授权失败，无法定位信息",
    //           duration: 2000,
    //           icon: "none"
    //         });
    //       }
    //     );
    //   },


    // 获取当前页带参数的url（location.href）
    getCurrentPageUrlWithArgs() {
        let pages = getCurrentPages(); //获取加载的页面
        let currentPage = pages[pages.length - 1]; //获取当前页面的对象
        let url = currentPage.route; //当前页面url
        let options = currentPage.options; //如果要获取url中所带的参数可以查看options
        //拼接url的参数
        let urlWithArgs = url + '?shareoper=1&'; //加上分享表示来源
        for (let key in options) {
            let value = options[key];
            urlWithArgs += key + '=' + value + '&';
        }
        urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
        return urlWithArgs;
    },

    // 导航到目标位置
    goAddress( Lat, Lng, Address ) {
        wx.openLocation({
            latitude: Lat,
            longitude: Lng,
            name: Address,
            scale: 15
        })
    },
}

