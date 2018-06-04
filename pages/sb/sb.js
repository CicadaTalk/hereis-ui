// pages/sb/sb.js
const getCourseByClassrommURL = "https://lazyzhou.xin/getCourseByClassroom"
const getClassroomListURL = "https://lazyzhou.xin/getClassroomList"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 信息数据
    spotId: 2,
    buildings: [
      {
        floor: 1,
        open: true,
        classroomList: [
          {
            id: 1,
            classroom: "A301",
            classroomType: "duomeiti",
            free: true
          },
          {
            id: 2,
            classroom: "A302",
            classroomType: "duomeiti",
            free: true
          },
          {
            id: 3,
            classroom: "A303",
            classroomType: "duomeiti",
            free: true
          },
          {
            id: 4,
            classroom: "A304",
            classroomType: "duomeiti",
            free: true
          },
        ]
      },
      {
        floor: 2,
        open: false,
        classroomList: [
          {
            id: 1,
            classroom: "A301",
            classroomType: "duomeiti",
            free: true
          }
        ]
      },
      {
        floor: 3,
        open: false,
        classroomList: [
          {
            id: 1,
            classroom: "A301",
            classroomType: "duomeiti",
            free: true
          }
        ]
      },
      {
        floor: 4,
        open: false,
        classroomList: [
          {
            id: 1,
            classroom: "A301",
            classroomType: "duomeiti",
            free: true
          }
        ]
      },
      {
        floor: 5,
        open: false,
        classroomList: [
          {
            id: 1,
            classroom: "A301",
            classroomType: "duomeiti",
            free: true
          }
        ]
      },
      {
        floor: 6,
        open: false,
        classroomList: [
          {
            id: 1,
            classroom: "A301",
            classroomType: "duomeiti",
            free: true
          }
        ]
      },
    ],
    courses: [
      {
        id: "1",
        no: "2",
        name: "课程",
        beginTime: 1,
        endTime: 2,
      },
      {
        id: "2",
        no: "2",
        name: "课程",
        beginTime: 1,
        endTime: 2,
      },
      {
        id: "3",
        no: "2",
        name: "课程",
        beginTime: 1,
        endTime: 2,
      },
    ],
    // 页面控制数据
    showCourse: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.spotId = options.spotId;
    console.log(options.spotId);
    console.log(options.category);
    // this.getClassroomList();
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

  /************* 以下为自定义函数 *************/

  /* 获取教室列表 */
  getClassroomList() {
    var self = this;
    wx.request({
      url: getClassroomListURL,
      data: { spotId: self.data.spotId },
      success: function (result) {
        self.setData({ buildings: result.data });
        console.log(result.data);
        console.log(self.data.buildings);
      }
    });
  },

  /* 列表展开与关闭 */
  floorToggle(e) {
    var floor = e.currentTarget.dataset.floor;
    var buildings = this.data.buildings;
    for (var i = 0, len = buildings.length; i < len; i++) {
      if (buildings[i].floor == floor) buildings[i].open = !buildings[i].open;
      // else buildings[i].open = false;
    }

    this.setData({buildings: buildings});
  },

  /* 显示课程信息 */
  courseShowToggle(e) {
    var self = this;
    // TODO: 访问服务器，获取课程信息
    wx.request({
      url: getCourseByClassrommURL,
      data: {
        sbId: e.currentTarget.dataset.id
        },
      success: function(result) {
        self.setData({courses: result.data});
      }
    });
    this.setData({
      showCourse: !this.data.showCourse
    });
    console.log(!this.data.showCourse);
  },

  /* 关闭课程信息 */
  courseCloseToggle() {
    console.log("close " + this.data.showCourse);
    this.setData({
      showCourse: false
    });
  },
})