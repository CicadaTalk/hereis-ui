const spotUrl = "https://lazyzhou.xin/";
var array = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {

    bg_H: 210,

    bg_Img: "../../image/scenic.jpg",

    // 设置默认图片
    src: "../../img/purity.png",
    // 设置spottId初始值
    spotId: 19,
    
    activities: [],

    id: 0,

    title: "",

    brief: "",

    intro: "",

    warning: "",

    activityname: "",

    activityIntro: "",

    // 服务响应消息
    resultMessage: "success",
  },

  /**
   * 获取标题
   */
  titleInput: function(e) {
    // console.log(e.detail.value);
    this.setData({
      title: e.detail.value
    })
  },

  /**
   * 获取简介
   */
  briefInput: function(e) {
    // console.log(e.detail.value);
    this.setData({
      brief: e.detail.value
    })
  },

  /**
   * 获取详细信息
   */
  introInput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      intro: e.detail.value
    })
  },

  /**
   * 获取提示信息
   */
  warningInput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      warning: e.detail.value
    })
  },

  /**
   * 获取活动名称
   */
  activityNameInput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      activityname: e.detail.value
    })
  },

  /**
   * 获取活动介绍
   */
  activityIntroInput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      activityIntro: e.detail.value
    })
  },

  /**
   * 设置当前id
   */
  setCurrentId: function (e) {
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
    if (that.data.activityname != "" && that.data.activityIntro != "") {
      var currId = that.data.id
      array[currId].name = that.data.activityname
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
  bindBeginDateChange: function (e) {
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
  bindBeginTimeChange: function (e) {
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
  confirm: function () {
    var that = this;
    // 保存数据
    if (that.data.activityname != "" && that.data.activityIntro != "") {
      var currId = that.data.id
      array[currId].name = that.data.activityname
      array[currId].intro = that.data.activityIntro
      that.setData({
        activities: array
      })
    }

    // 将注意事项转换为json字符串
    var tempArray = that.data.warning.split("\n");
    var len = tempArray.length;
    var tempwarning = "[";
    for (var i = 0; i < len; i++) {
      tempwarning += "\"" + tempArray[i] + "\""
      if (i < len-1) {
        tempwarning += ","
      }
    }
    tempwarning += "]"
    that.setData({
      warning: tempwarning
    })

    // 上传数据到服务器
    that.uploadSpotData();
    // console.log("title" + that.data.title);
    // console.log("brief" + that.data.brief);
    // console.log("intro" + that.data.intro);
    console.log("warning" + that.data.warning);
    // console.log(that.data.activities);
  },

  /**
   * 上传简介数据
   */
  uploadSpotData: function() {

    var that = this
    var gpsLng = 1.0
    var gpsLat = 1.0
    // 获取gps定位
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        gpsLng = res.longitude
        gpsLat = res.latitude
      },
    })

    //发送请求
    wx.request({
      url: spotUrl + "addSpot",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: 0,
        gpsLng: gpsLng,
        gpsLat: gpsLat,
        name: that.data.title,
        briefIntro: that.data.brief,
        bgImg: "../../img/purity.png",
        category: "scenic"
      },
      success: function(res) {
        // console.log(res.data);
        var temp = res.data
        if (that.isRealNum(temp)) {
          // 获取到刚刚插入记录的id
          that.setData({
            spotId: res.data
          })
        }

        if (that.data.spotId == 19) {
          that.responseAddScenic("添加失败");
        } else {
          that.uploadImage();
          that.uploadScenicData();
          that.responseAddScenic(that.data.resultMessage);
        }
      },
      fail: function(res) {
        // console.log(res.data);
        that.responseAddScenic("添加失败");
      }
    })
  },

  /**
   * 判断是否是数字
   */
  isRealNum: function (val) {
    if (val == "" || val == null) {
      return false;
    }

    if (isNaN(val)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 上传详细数据
   */
  uploadScenicData: function () {
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
        // console.log(res.data);
        
      },
      fail: function (res) {
        // console.log(res.data);
        // that.responseAddScenic("添加失败");
        that.data.resultMessage = "添加失败";
      }
    })
    // 上传景点活动
    var len = array.length;
    for (var i = 0; i < len; i++) {
      wx.request({
        url: spotUrl + "addActivity",
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
          // console.log(res.data);
          
        },
        fail: function (res) {
          // console.log(res.data);
          that.data.resultMessage = "添加失败";
        }
      })
    }
  },

  /**
   * 点击取消按钮
   */
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
    * 添加景点信息事件响应
    */
  responseAddScenic: function (result) {

    if (result == "success") {
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 3000
      });
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
   * 选择图片
   */
  chooseImage(e) {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {    
        _this.setData({
          src: res.tempFilePaths
        })
      },
      fail: function() {
        console.log("failed");
      }
    })
  },

  /**
   * 上传图片到服务器
   */
  uploadImage: function() {

    var that = this
    wx.uploadFile({
      url: spotUrl + "uploadSpotImage",
      filePath: that.data.src,
      name: 'file',
      formData: {
        'spotId': that.data.spotId
      },
      success: function(res) {
        // console.log(res.data);
        
      },
      fail: function(res) {
        // console.log(res.data);
        that.data.resultMessage = "添加失败";
      }
    })
  },
})