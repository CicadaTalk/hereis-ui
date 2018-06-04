//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: 30.560417,
    longitude: 104.006506,
    markers: [{
      iconPath: "/image/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    controls: [{
      id: 1,
      iconPath: '/image/add_button.png',
      position: {
        left: 10,
        top: 10,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },
  onLoad() {
    var that = this
    
    //获取当前位置信息
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: function (res) {
    //     console.log(res)

    //     that.setData(
    //       {
    //         latitude: res.latitude,
    //         longitude: res.longitude,
    //       }
    //     )
    //   }
    // })
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
          markers:res.data
        })
      },
      fail: function (err) {
        console.log(err);
      }
    })

  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    wx.navigateTo({
      url: '../input/input',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})