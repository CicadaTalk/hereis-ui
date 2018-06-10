// pages/intro/intro.js

var util = require('../../utils/util.js');
const domainURL = "https://lazyZhou.xin/"
const getSpotURL = domainURL + "getSpotsByGPS"
const getScenicSpotURL = domainURL + "getScenicSpotById"
const getRestaurantURL = domainURL + "getMenuBySpotId"
const getSchoolBuildingURL = domainURL + "getClassroomListById"
const getCourseByClassrommURL = domainURL + "getCourseByClassroom"
const radius = 5

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 界面属性
    // 背景宽度(无需设置)
    bg_W: 0,
    // 背景高度
    bg_H: wx.getSystemInfoSync().windowWidth / 710 * 360,
    // 透明度(动画用)
    bf_O: 0,
    // swiper ID
    curr_I: 0,
    // 阻止多次打开
    mapLock: false,
    touchPos: 0,
    touchOffset: 0
  },

  /**
   * 监听Swiper滑动
   */
  swiperChange(e) {
    this.setData({
      curr_I: e.detail.current
    })
  },

  // touchStart(e) {
  //   var self = this;
  //   var query = wx.createSelectorQuery();
  //   var spots = this.data.spots;
  //   var spotIndex = this.data.curr_I;
  //   console.log(spotIndex);
  //   var id = "#ruler" + spots[spotIndex].id;
  //   query.select(id).boundingClientRect()
  //   query.exec(function (res) {
  //     console.log(res);
  //     var top = res[0].top;
  //     self.setData({
  //       touchPos: e.touches[0].pageY,
  //       touchOffset: top
  //     });
  //   })
  // },

  // touchMove(e) {
  //   var begin_Y = this.data.touchPos;
  //   var end_Y = e.touches[0].pageY;
  //   if (!this.data.mapLock) {
  //     if ( begin_Y - end_Y < -50) {
  //       if (this.data.touchOffset == 0) {
  //         this.setData({mapLock: true});
  //         this.openMap()
  //       }
  //     }
  //   }
  // },

  /**
   * Spot信息获取
   */
  getSpot(lng, lat, r) {
    console.log("Spot获取")
    var self = this;
    wx.request({
      url: getSpotURL,
      data: {
        gpsLng:lng, 
        gpsLat:lat,
        r: r
      },
      success: function(res) {
        var spots = res.data;
        for (var i = 0; i < spots.length; i++) {
          spots[i]["ready"] = false;
          // spots[i].bgImg = domainURL + "images/" + spots[i].bgImg;
          spots[i].bgImg = spots[i].bgImg;
        }
        self.setData({
          spots: spots
        });
        for (var i = 0; i < spots.length; i++) {
          if (spots[i].category == "scenic")
             self.getScenicSpot(self, i, spots[i].id);
          if (spots[i].category == "restaurant")
            self.getRestaurant(self, i, spots[i].id);
          // if (spots[i].category == "sb")
          //   self.getSchoolBuilding(self, i, spots[i].id);
        }
      }
    });
  },

  /**
   * ScenicSpot信息获取
   */
  getScenicSpot(self, spotIndex, spotId) {
    var spots = self.data.spots;
    wx.request({
      url: getScenicSpotURL,
      data: {spotId: spotId},
      success: function(res) {
        spots[spotIndex].info = res.data;
        spots[spotIndex].ready = true;
        self.setData({
          spots: spots
        });
      }
    });
  },

  /**
   * Restaurant信息获取
   */
  getRestaurant(self, spotIndex, spotId) {
    var spots = self.data.spots;
    wx.request({
      url: getRestaurantURL,
      data: {spotId: spotId},
      success: function(res) {
        var categories = res.data;
        for (var i = 0; i < categories.length; i++) {
          categories[i]["open"] = false;
          for (var j = 0; j < categories[i].menus.length; j++) {
            categories[i].menus[j].imagePath = domainURL + "images/" + categories[i].menus[j].imagePath;
          }
        }
        spots[spotIndex].info = {"categories" : categories};
        spots[spotIndex].ready = true;
        self.setData({
          spots: spots
        });
      }
    })
  },

  /**
   * 展示餐馆信息
   */
  showMenu(e) {
    var category = e.currentTarget.dataset.category;
    var spotIndex = this.data.curr_I;
    var spots = this.data.spots;
    var categories = spots[spotIndex].info.categories;
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].category == category) {
        categories[i].open = !categories[i].open;
      }
    }
    spots[spotIndex].info.categories = categories;
    this.setData({
      spots: spots
    });
  },

  /**
   * 打开评论
   */
  openComment: function (e) {
    var spotIndex = this.data.curr_I;
    var spots = this.data.spots;
    wx.setStorage({
      key: 'commentInfo',
      data: {
        spotImg: spots[spotIndex].bgImg,
        spotName: spots[spotIndex].name,
        spotBriefIntro: spots[spotIndex].briefIntro
      },
    })

    wx.navigateTo({
      url: '../comment/comment?spotId=' + spots[spotIndex].id,
    })
  },

  /**
   * 打开地图
   */
  openMap() {
    console.log("打开地图")
    wx.navigateTo({
      url: '../map/map',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取屏幕高度
    this.setData({
      deviceHeight: wx.getSystemInfoSync().windowHeight,
    }),

      console.log(wx.getSystemInfoSync().windowHeight)

    // 检查用户授权情况
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              console.log("授权成功")
            }
          })
        }
      }
    })

    var that = this
    // 景点
    // this.getSpot(103.800433, 30.944567, 0.1);
    // 餐馆
    // this.getSpot(104.104005, 30.681519, 0.015);
    // this.getSpot(104.26884, 30.557151, 0.01);

    //获取当前位置信息
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)

        that.setData(
          {
            latitude: res.latitude,
            longitude: res.longitude,
          }
        )
        that.getSpot(res.longitude, res.latitude, 0.01);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var spots = this.data.spots;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({mapLock: false});
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