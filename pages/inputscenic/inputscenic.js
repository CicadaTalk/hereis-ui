
var array = [];
var scenicUrl = "https://lazyzhou.xin/";
// pages/inputdetail/inputdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    activities: [],

    spotId: null,

    id: 1,

    intro: "",

    warning: "",

    name: "",

    activityIntro: "",
  
  },

  /**
   * 获取详细信息
   */
  introInput: function(e) {
    console.log(e.detail.value);
    this.setData({
      intro: e.detail.value
    })
  },

  /**
   * 获取提示信息
   */
  warningInput: function(e) {
    console.log(e.detail.value);
    this.setData({
      warning: e.detail.value
    })
  },

  /**
   * 获取活动名称
   */
  activityNameInput: function(e) {
    console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 获取活动介绍
   */
  activityIntroInput: function(e) {
    console.log(e.detail.value);
    this.setData({
      activityIntro: e.detail.value
    })
  },

  /**
   * 设置当前id
   */
  setCurrentId: function(e) {
    var that = this
    var currId = e.currentTarget.dataset.id
    if (that.data.id != currId) {
      this.setData({
        id: e.currentTarget.dataset.id
      })
      console.log(e.currentTarget.dataset.id);
    }
  },

  /**
   * 动态添加活动
   */
  addActivity(e) {
    var that = this
    var len = that.data.activities.length
    console.log(len);
    var activity = {}
    activity.id = len;
    activity.name = "";
    activity.intro = "";
    activity.endDate = "2018-01-01";
    activity.endTime = "17:00";
    activity.beginDate = "2018-01-01";
    activity.beginTime = "12:00";
    array.push(activity)
    that.setData({
      activities: array
    })

    // 保存数据
    if (that.data.name != "" && that.data.activityIntro != "") {
      var currId = that.data.id
      array[currId].name = that.data.name
      array[currId].intro = that.data.activityIntro
      that.setData({
        activities: array
      })
    }
    // console.log(that.data.activities);
  },

  /**
   * 动态删除活动
   */
  removeActivity(e) {
    var that = this
    var len = that.data.activities.length
    if (len > 0) {
      array.pop(len)
      that.setData({
        activities: array
      })
    }
  },

  /**
   * 监听开始日期选择器
   */
  bindBeginDateChange: function(e) {
    var that = this
    var currId = that.data.id
    array[currId].beginDate = e.detail.value
    that.setData({
      activities: array
    })
  },

  /**
   * 监听开始时间选择器
   */
  bindBeginTimeChange: function(e) {
    var that = this
    var currId = that.data.id
    array[currId].beginTime = e.detail.value
    that.setData({
      activities: array
    })
  },

  /**
   * 监听结束日期选择器
   */
  bindEndDateChange: function (e) {
    var that = this
    var currId = that.data.id
    array[currId].endDate = e.detail.value
    that.setData({
      activities: array
    })
  },

  /**
   * 监听结束时间选择器
   */
  bindEndTimeChange: function (e) {
    var that = this
    var currId = that.data.id
    array[currId].endTime = e.detail.value
    that.setData({
      activities: array
    })
  },

  /**
   * 点击确定按钮
   */
  confirm: function() {
    var that = this;
    // 保存数据
    if (that.data.name != "" && that.data.activityIntro != "") {
      var currId = that.data.id
      array[currId].name = that.data.name
      array[currId].intro = that.data.activityIntro
      that.setData({
        activities: array
      })
    }

    // 上传数据到服务器
    that.uploadScenicData();
  },

  uploadScenicData: function() {
    var that = this
    // 上传景点数据
    wx.request({
      url: "http://localhost:8089/addScenicSpot",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        spotId: parseInt(that.data.spotId),
        intro: that.data.intro,
        warning: that.data.warning,
      },
      success: function (res) {
        console.log(res.data);
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
    // 上传景点活动
    var len = array.length;
    for (var i = 0; i < len; i++) {
      wx.request({
        url: "http://localhost:8089/addActivity",
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          id: 0,
          spotId: parseInt(that.data.spotId),
          intro: array[i].intro,
          endTime: array[i].endDate + " " + array[i].endTime,
          beginTime: array[i].beginDate + " " + array[i].beginTime,
          name: array[i].name
        },
        success: function (res) {
          console.log(res.data);
        },
        fail: function (res) {
          console.log(res.data);
        }
      })
    }
  },

  /**
   * 点击取消按钮
   */
  cancel: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      spotId: options.spotId
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