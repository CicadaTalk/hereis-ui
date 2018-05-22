//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categories: [
      {
        category: "热菜",
        menus: [
          {
            name: "炒白菜",
            price: 25.00,
            imagePath: "/image/2.png",
          },
          {
            name: "回锅肉",
            price: 50.00,
            imagePath: null,
          },
        ]
      },
      {
        category: "冷菜",
        menus: [
          {
            name: "凉拌豆腐",
            price: 28.00,
            imagePath: null,
          },
          {
            name: "糖醋里脊",
            price: 28.00,
            imagePath: null,
          },
        ]
      },
    ],
    isFold: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  //传入餐馆的spotId，从服务器上获取数据
  display: function (spotId) {

    var that = this

    wx.request({
      url: 'http://39.108.74.138:8080/getMenuBySpotId',
      method: 'GET',
      data: {
        spotId: spotId,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        console.log(res.data)
        that.setData(
          {
            categories: res.data
          }
        )
      }
    })
  },
  onLoad: function () {
    // this.display(1);
  },
})