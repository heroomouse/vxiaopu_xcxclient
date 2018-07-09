// pages/pay/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopid : '',
    shopname : '',
    productid : '',
    name : '',
    header : '',
    price : '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (info) {
    console.log('enter pay page input = ');
    console.log(info);

    if (info) {
      if (info.shopid) {
        this.setData({
          shopid: info.shopid
        })
      }

      if (info.shopname) {
        this.setData({
          shopname: info.shopname
        })
      }

      if (info.productid) {
        this.setData({
          productid: info.productid
        })
      }

      if (info.name) {
        this.setData({
          name: info.name
        })
      }

      if (info.header) {
        this.setData({
          header: info.header
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  priceinput: function (e) {
    this.setData({
      price : e.detail.value
    })
  },

//发起付款请求
  questPayOrder: function () {
    console.log(this.data.price);
    if (this.data.price == 0) {
      wx.showToast({
        title: '请输入金额',
        image: '../../image/xx.png',
      });
    } else if (this.data.price < 0) {
      wx.showToast({
        title: '填负数也没钱收喔',
        image: '../../image/xx.png',
      });
    } else {
      this.prepayQuest();
    }
  },

  /**
   * 请求预订单
   */
  prepayQuest: function () {
    var that = this
    console.log('prepayQuest');
    //获取预付订单号
    wx.request({
      url: app.globalData.serverHost + '/api/pay/prepay',
      data: {
        openid: app.globalData.userOpenID,
        token: app.globalData.session_key,
        shopid: app.globalData.currentShopID,
        prodid: that.data.productid,
        price: that.data.price * 100,
        mobile: app.globalData.userInfo.mobile,
        nickname: 'mouse'
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log("query 请求成功!")
        console.log(res)
        if (!res.data) {
          wx.showToast({
            title: '付款失败,请重试',
            image: '../../image/xx.png',
          })
          return;
        }
        var orderno = res.data.orderno
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          'success': function (res) {
            console.log(res)
            // that.payCompleteNotify(orderno)
            wx.showToast({
              title: '付款成功',
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '付款失败',
              image: '../../image/xx.png',
            })
          },
          'complete': function (res) { }
        })
        that.setData({

        })
      },
      fail: function () {
        // fail
        console.log("query 请求失败!")
      },
      complete: function () {
        // complete
      }
    })
  },

  /**
   * 支付完成后台通知
   */
  payCompleteNotify: function (orderNumber) {
    var that = this
    //支付完成后台通知
    wx.request({
      url: app.globalData.serverHost + '/api/pay/complete',
      data: {
        orderno: orderNumber
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log("query 请求成功!")
        console.log(res)
      },
      fail: function () {
        // fail
        console.log("query 请求失败!")
      },
      complete: function () {
        // complete
      }
    })
  }
})