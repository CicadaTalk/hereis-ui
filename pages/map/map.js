//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: 30.552350997924805,
    longitude: 103.990234375,
    // latitude: 30.560417,
    // longitude: 104.006506,
    // latitude: 30.674137,
    // longitude: 104.044691,
    markers: [{
      iconPath: "/image/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }]
    // controls: [{
    //   id: 1,
    //   iconPath: '/image/add.png',
    //   position: {
    //     left: wx.getSystemInfoSync().windowWidth - 50,
    //     top: wx.getSystemInfoSync().windowHeight - 30 - 20,
    //     width: 40,
    //     height: 40
    //   },
    //   clickable: true
    // }]
  },
  onLoad() {
    var that = this
    
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

        //获取标注信息
        wx.request({
          url: 'https://lazyzhou.xin/getMarkerByGPS',
          data: {
            gpsLng: that.data.longitude,
            gpsLat: that.data.latitude,
            r: 0.01
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            that.setData({
              markers: res.data
            })
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
    

  },

  regionchange(e) {
    console.log(e.type)
  },

  markertap(e) {
    console.log(e.markerId)
  },

  /**
   * 打开录入选择界面
   */
  controltap(e) {
    wx.navigateTo({
      url: '../select/select',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }, 
})