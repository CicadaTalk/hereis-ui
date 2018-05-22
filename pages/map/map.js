//获取应用实例
const app = getApp()

Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
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
        width: 20,
        height: 20
      },
      clickable: true
    }]
  },
  onLoad() {
    
    //获取当前位置信息
    var that = this
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

        // //显示位置
        // wx.openLocation({
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   scale: 16
        // })
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
      url: '../restaurant/restaurant',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})