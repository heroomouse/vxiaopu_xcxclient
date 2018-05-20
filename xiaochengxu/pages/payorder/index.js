// pages/payorder/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //orderList[] : 订单列表
      //day : 日期
      //total : 总笔数
      //totalprice : 总金额
      //detailList[] : 数据列表
        //price : 金额
        //updatetime : 时间
        //nickname : 昵称
    incomelist:[],
    shopid: '',
    productid: '',
    currentpage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('enter pay page input = ');
    console.log(options);

    if (options) {
      if (options.shopid) {
        this.data.shopid = options.shopid;
      }

      if (options.productid) {
        this.data.productid = options.productid;
      }
    }

    this.loadIncomeList();
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
    that.setData({
      currentpage: 1
    })
    this.loadIncomeList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadIncomeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  loadIncomeList: function () {
    var that = this
    //获取当前理发师收款记录
    wx.request({
      url: app.globalData.serverHost + '/api/user/receiptorder',
      data: {
        openid: app.globalData.userOpenID,
        token: app.globalData.session_key,
        shopid: app.globalData.currentShopID,
        page: that.data.currentpage
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log("query 请求成功!")
        console.log(res)
        var pageNum = that.data.currentpage
        var incomlist = that.data.incomelist;
        if (pageNum == 1) {
          incomlist = res.data.orderList;
        } else {
          incomlist = incomlist.concat(res.data.orderList);
        }

        if (res.data.orderList.length > 0) {
          pageNum += 1
        }
        that.setData({
          incomelist: incomlist,
          currentpage: pageNum
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

})