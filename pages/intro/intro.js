// pages/intro/intro.js

var util = require('../../utils/util.js');
const domainURL = "http://127.0.0.1:8089/"
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
    // 背景高度(无需设置)
    bg_H: 0,
    // 透明度(动画用)
    bf_O: 0,
    // swiper ID
    curr_I: 1,
    // 阻止多次打开
    mapLock: false,
    touchStart: 0,
    openMapToggle: false
  },

  /**
   * 背景图片加载
   */
  bgLoad(e) {
    var imageSize = util.backgroundAutoFit(e)
    this.setData({
      bg_W: imageSize.imageWidth,
      bg_H: imageSize.imageHeight
    })
  },

  /**
   * 背景动画
   */
  pageScrollStart(e) {
    var self = this;
    var selector = wx.createSelectorQuery();
    selector.select('#scroll-animator').boundingClientRect();
    selector.exec(function (res) {
      var top = -res[0].top;
      if (top < 1E-6 && -top < 1E-6) {
        self.setData({openMapToggle: true});
      }
    })
    this.setData({
      touchStart: e.touches[0].pageY
    })
  },

  pageScrollAnimate(e) {
    var self = this;
    var opacity = this.data.bf_O;
    var touchEnd = e.touches[0].pageY;
    var selector = wx.createSelectorQuery();
    selector.select('#scroll-animator').boundingClientRect();
    selector.exec(function (res) {
      var totalHeight = res[0].height;
      var top = -res[0].top;
      console.log(top)
      if (top < 1E-6 && -top < 1E-6) {
        if (self.data.touchStart - touchEnd < 0)
          if (!self.data.mapLock && self.data.openMapToggle) {
            self.openMap();
            self.setData({mapLock:true});
          }
      }
      // opacity = top / (totalHeight - 30);
      // opacity = opacity > 1 ? 1 : opacity;
      // opacity = opacity < 0 ? 0 : opacity;
      // self.setData({
      //   bf_O: opacity
      // });
    })
  },

  /**
   * 监听Swiper滑动
   */
  swiperChange(e) {
    this.setData({
      curr_I: e.detail.current
    })
  },

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
        }
        self.setData({
          spots: spots
        });
        for (var i = 0; i < spots.length; i++) {
          if (spots[i].category == "scenic")
             self.getScenicSpot(self, i, spots[i].id);
          if (spots[i].category == "restaurant")
            self.getRestaurant(self, i, spots[i].id);
          if (spots[i].category == "sb")
            self.getSchoolBuilding(self, i, spots[i].id);
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
   * SchoolBuilding信息获取
   */
  getSchoolBuilding(self, spotIndex, spotId) {
    var spots = self.data.spots;
    wx.request({
      url: getSchoolBuildingURL,
      data: {spotId: spotId},
      success: function(res) {
        var buildings = res.data;
        for (var i = 0; i < buildings.length; i++) {
          buildings[i]["open"] = false;
        }
        spots[spotIndex].info = { courses: [], buildings: buildings, showCourse: false};
        spots[spotIndex].ready = true;
        self.setData({
          spots: spots
        });
      }
    });
  },

  /**
   * 展开楼层
   */
  floorToggle(e) {
    var floor = e.currentTarget.dataset.floor;
    var spotIndex = this.data.curr_I - 1;
    var spots = this.data.spots;
    var buildings = spots[spotIndex].info.buildings;
    for (var i = 0, len = buildings.length; i < len; i++) {
      if (buildings[i].floor == floor) buildings[i].open = !buildings[i].open;
      // else buildings[i].open = false;
    }
    spots[spotIndex].buildings = buildings;
    this.setData({
      spots: spots
    })
  },

  /**
   *  显示课程信息 
   */
  courseShowToggle(e) {
    var self = this;
    wx.request({
      url: getCourseByClassrommURL,
      data: {
        sbId: e.currentTarget.dataset.id
      },
      success: function (result) {
        var spots = self.data.spots;
        var spotIndex = self.data.curr_I - 1;
        spots[spotIndex].info.courses = result.data;
        spots[spotIndex].info.showCourse = true;
        self.setData({ spots: spots });
      }
    });
  },

  /**
   * 关闭课程信息
   */
  courseCloseToggle() {
    var spots = this.data.spots;
    var spotIndex = this.data.curr_I - 1;
    spots[spotIndex].info.showCourse = !spots[spotIndex].info.showCourse;
    this.setData({
      spots: spots
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
    var spotIndex = this.data.curr_I - 1;
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
    var spotIndex = this.data.curr_I - 1;
    var spots = this.data.spots;
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
    // 教学楼
    // this.getSpot(104.07, 30.65, 0.0055);
    // 餐馆
    this.getSpot(104.104005, 30.681519, 0.001);
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
    this.setData({mapLock: false, openMapToggle: false});
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
    this.openMap();
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