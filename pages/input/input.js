const spotUrl = "https://lazyzhou.xin/";

// pages/input/input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    items: [
      { name: "scenic", value: "景点", checked: true},
      { name: "restaurant", value: "餐馆"},
      { name: "sb", value: "教学楼"}
    ],
    // 设置默认图片
    src: "../../img/purity.png",
    // 设置spottId初始值
    spotId: 19,
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
   * 上传当前数据到服务器，并获得返回的id，跳转到详细页面
   */
  getSpotData: function(e) {

    var that = this
    var temp = e.detail.value
    var gpsLng = 1.0
    var gpsLat = 1.0
    console.log(temp);
    // 获取gps定位
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        gpsLng = res.longitude
        gpsLat = res.latitude
      },
    })

    

    //发送请求
    wx.request({
      url: "http://localhost:8089/addSpot",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: 0,
        gpsLng: gpsLng,
        gpsLat: gpsLat,
        name: temp.name,
        briefIntro: temp.briefIntro,
        bgImg: "../../img/purity.png",
        category: temp.category
      },
      success: function(res) {
        console.log(res.data);
        // 获取到刚刚插入记录的id
        that.setData({
          spotId: res.data
        })
        that.openDetailInputPage(temp.category);

        // that.uploadImage();           
        // that.openDetailInputPage();
      },
      fail: function(res) {
        console.log(res.data);
      }
    })
  },

  /**
   * 跳转到详情录入界面
   */
  openDetailInputPage: function(temp) {
    switch (temp) {
      case "scenic":
        this.openScenicInputPage();
        break;
      case "restaurant":
        this.openMenuInputPage();
        break;
      case "sb":
        break;
      default:
        break;
    }
  },

  /**
   * 上传图片到服务器
   */
  uploadInmage: function() {

    var that = this
    wx.uploadFile({
      url: spotUrl + "uploadSpotImage",
      filePath: that.data.src,
      name: 'file',
      formData: {
        'spotId': that.data.spotId
      },
      success: function(res) {
        console.log(res.data);
      },
      fail: function(res) {
        console.log(res.data);
      }
    })
  },

  /**
   * 打开景点详细信息录入界面
   */
  openScenicInputPage: function() {
    wx.navigateTo({
      url: '../inputscenic/inputscenic?spotId=' + this.data.spotId,
    })
  },
  
  /**
   * 打开菜单录入界面
   */
  openMenuInputPage: function() {
    wx.navigateTo({
      url: '../inputmenu/inputmenu?spotId=' + this.data.spotId,
    })
  },


  /**
   * 退出
   */
  cancel: function() {
    console.log("exit");
    // wx.navigateBack({
    //   delta: 1,
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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