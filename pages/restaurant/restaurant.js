//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categories: [
      {
        category: "热菜",
        open: true,
        menus: [
          {
            menuId: 1,
            name: "炒白菜",
            price: 25.00,
            imagePath: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331420538,2707636021&fm=200&gp=0.jpg",
          },
          {
            menuId: 2,
            name: "回锅肉",
            price: 50.00,
            imagePath: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=339440504,1828286018&fm=27&gp=0.jpg",
          },
        ]
      },
      {
        category: "冷菜",
        open: false,
        menus: [
          {
            menuId: 3,
            name: "凉拌豆腐",
            price: 28.00,
            imagePath: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2002190657,1641198659&fm=27&gp=0.jpg",
          },
          {
            menuId: 4,
            name: "糖醋里脊",
            price: 28.00,
            imagePath: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2002190657,1641198659&fm=27&gp=0.jpg",
          },
        ]
      },
    ],
    isFold: false
  },
  /**
   * 事件处理函数
   */
  bindViewTap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },

  /**
   * 展示菜单详情
   */
  showMenu(e) {

    var category = e.currentTarget.dataset.category;
    var categories = this.data.categories;
    for (var i = 0, len = categories.length; i < len; i++) {
      if (categories[i].category == category) categories[i].open = !categories[i].open;
      // else buildings[i].open = false;
    }

    this.setData({ categories: categories });
  },

  /**
   * 传入餐馆的spotId，从服务器上获取数据
   */
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

  onLoad: function (options) {
    console.log(options.spotId);
    console.log(options.category);
    // this.display(1);
  },

  /**
   * 打开评论界面
   */
  openComment: function(e) {
    wx.navigateTo({
      url: '../comment/comment?spotId=' + 19,
    })
  }
})