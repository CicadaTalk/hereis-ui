// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment_upload: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getCommentList(options.spotId);
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
      url: 'http://127.0.0.1:8089/getCommentsById',
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
    console.log(this.data.comment_upload);

    console.log(e.detail.userInfo)

    if (this.data.comment_upload == "") {
      console.log("输入内容为空")
      return
    }

    var that = this

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
              content: that.data.comment_upload,
              spotId: that.data.spotId,
              nickName: e.detail.userInfo.nickName,
              avatarUrl: e.detail.userInfo.avatarUrl
            },
            success: function (res) {
              console.log(res.data);

              //重新获取评论信息
              that.getCommentList(that.data.spotId)
              //that.processData(res.data)
            },
            fail: function (err) {
              console.log(err);
            }
          })
        } else {
          console.log('评论失败！' + res.errMsg)
        }
      }
    });

    // //上传评论到服务器
    // wx.request({
    //   url: 'http://localhost:8089/addComment',
    //   method: 'POST',
    //   data: {
    //     content: this.data.comment_upload,
    //     spotId: this.data.spotId
    //   },
    //   header: {
    //     "content-type": "json"
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     //that.processData(res.data)
    //   },
    //   fail: function (err) {
    //     console.log(err);
    //   }
    // })

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

  // bindGetUserInfo: function (e) {
  //   console.log(this.data.comment_upload)
  //   console.log(e.detail.userInfo)
  // }
})