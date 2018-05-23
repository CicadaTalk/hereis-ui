// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment_upload:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getCommentList(options.spotId);
  },
  
  /**
   * 获取评论列表数据
   */
  getCommentList: function(spotId) {
    var that = this;
    wx.request({
      url: 'http://39.108.74.138:8080/getCommentsById',
      data: {spotId: spotId},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
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

  formSubmit: function(e) {
    console.log(this.data.comment_upload);
    //上传评论到服务器
    // wx.request({
    //   url: 'http://localhost:8080/insertComment',
    //   method: 'POST',
    //   data: {},
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
  
  }
})