// pages/scenicdetail/scenicdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spotId: 19,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getScenicSpotDetail(this.data.spotId);
  },

  /**
   * 获取景点详细数据
   */
  getScenicSpotDetail: function (spotId) {
    var that = this;
    wx.request({
      url: 'http://39.108.74.138:8080/getScenicSpotById',
      method: 'GET',
      data: { spotId: spotId},
      header: {
        "content-type": "json"
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
  processData: function(scenicSpotData) {

    // for (activity in scenicSpotData.activities) {
    //   console.log(activity.beginTime)
    //   console.log(activity.endTime)
    //   activity.beginTime = formatDate(activity.beginTime)
    //   activity.endTime = formatDate(activity.endTime)
    //   console.log(activity.beginTime)
    //   console.log(activity.endTime)
    // }
    //设置数据
    this.setData({
      scenicSpotDetail: scenicSpotData.intro,
      scenicSpotWarning: scenicSpotData.warning,
      activityData: scenicSpotData.activities,
    })
  },

  // formatDate: function(data) {
  //   var date = new Date(Date.parse(data));
  //   const month = date.getMonth() + 1
  //   const day = date.getDate()
  //   const hour = date.getHours()
  //   const minute = date.getMinutes()
  //   return [month, day].join('-') + " " + [hour, minute].join(':')
  // },

  /**
   * 打开评论界面
   */
  openComment: function (e) {
    wx.navigateTo({
      url: '../comment/comment?spotId=19',
    })
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