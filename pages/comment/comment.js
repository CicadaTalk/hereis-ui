// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputData: '',

    windowHeight: wx.getSystemInfoSync().windowHeight - 80,

    // 背景高度
    bgImg: "",
    name: "",
    briefIntro: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.getCommentList(options.spotId);
    wx.getStorage({
      key: 'commentInfo',
      success: function(res) {
        self.setData({
          spotImg: res.data.spotImg,
          spotName: res.data.spotName,
          spotBriefIntro: res.data.spotBriefIntro
        })
      },
    })
    //将景点信息保存到全局变量中
    this.setData({
      spotId: options.spotId
    })
  },

  /**
   * 获取评论列表数据
   * 
   */
  getCommentList: function (spotId) {
    var that = this;
    wx.request({
      url: 'https://lazyzhou.xin/getCommentsById',
      data: { spotId: spotId },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data);
        that.processData(res.data)
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  /**
   * 处理服务器返回的json格式的数据
   */
  processData: function (commentData) {
    //设置数据
    this.setData({
      comments: commentData,
    })
  },

  /**
   * 获取用户输入的评论数据
   */
  bindTextAreaBlur: function (e) {
    this.setData({
      comment_upload: e.detail.value
    })
  },

  //上传评论到服务器
  formSubmit: function (e) {

    var that = this
    // that.responseAddComment("succes")
    // console.log(e.detail.userInfo)

    if (e.detail.value.comment == "") {
      // console.log("输入内容为空")
      return
    }

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://lazyzhou.xin/addComment',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              code: res.code,
              content: e.detail.value.comment,
              spotId: that.data.spotId,
              nickName: that.data.nickName,
              avatarUrl: that.data.avatarUrl
            },
            success: function (res) {
              // console.log(res.data);
              that.responseAddComment(res.data)
            },
            fail: function (err) {
              console.log(err);
            }
          })
        } else {
          // console.log('评论失败！' + res.errMsg)
          that.responseAddComment("登录失败");
        }
      }
    });
  },

  /**
    * 添加评论事件响应
    */
  responseAddComment: function (result) {

    if (result == "success") {
      wx.showToast({
        title: '评论成功',
        icon: 'success',
        duration: 3000
      });
      //重新获取评论信息
      this.getCommentList(this.data.spotId)
      this.setData({
        inputData:""
      })
    } else {
      wx.showModal({

        content: result,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      })
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


  /**
   * 获取用户信息
   */
  bindGetUserInfo: function (e) {
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
  }
})