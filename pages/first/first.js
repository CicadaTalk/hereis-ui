// pages/first/first.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    currentSpotId: 1,

    firstSpotId: 1,

    categoryIndex: 1,

    start: false,

    systemHeight: 500,

    spots: [
      {
        spotId: 1,
        name: "明远湖",
        brief: "明志致远—明远湖。淡泊以明志，宁静而致远。掐折射出了明远湖的意境—宁静、淡泊。明远湖之水，清澈，宁静，没有任何功利的色彩。明远湖中有荷塘，没有接天莲叶无穷碧的盛况，但却有着莲红荷香的灵动。",
        bgImg: "http://img5.imgtn.bdimg.com/it/u=1839364205,823342860&fm=27&gp=0.jpg",
        category: "景点"
      },
      {
        spotId: 2,
        name: "长桥",
        brief: "位于江安校区内，一座目前中国高校最长的步行桥（418米）——长桥，横跨江安河和明远湖上，连接着知识广场和青春广场。江安河上的白石桥，再加上明远湖畔、人工渠上那些别致的小桥，形成了江安校区的独特的“桥”文化。长桥上面没有任何雕饰，只有地上有些刻有字母的瓷砖方有一些文化气息。",
        bgImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2931931194,4209838617&fm=27&gp=0.jpg",
        category: "景点"
      },
      {
        spotId: 3,
        name: "江安一教A",
        brief: "教室很漂亮，有空调，灯光很亮，就是插座太少了。",
        bgImg: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2905683142,3943715046&fm=27&gp=0.jpg",
        category: "教学楼"
      },
      {
        spotId: 4,
        name: "饭馆",
        brief: "整体装修风格古朴典雅，中式精雕细琢与现代时尚元素完美结合，通透明亮的天井式设计及晒台式环廊景观，配以纯天然绿色植被，为客人营造出绿色环保、温馨舒适的住宿环境，带来充满艺术气息的视觉体验。客房内设中央空调、程控电话、宽带网、室内音响、闭路电视、标准洁具、安全系统等先进设施。",
        bgImg: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1810350561,1865014890&fm=27&gp=0.jpg",
        category: "餐厅"
      }
    ],

    nodes: [{
      name: 'h1',
      attrs: {
        style: 'line-height: 60px; color: #1abc9c; background-color: #c0392b'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
    // 初始化点击坐标
    startPoint: [0, 0]
  },

  /**
   * 获取当前页面spotId
   */
  change: function(e) {
    console.log(e.detail.current);
    this.setData({
      currentSpotId: e.detail.current + this.data.firstSpotId
    })
  },
  
  /**
   * 开始触摸，获取坐标点
   */
  myTouchStart: function(e) {
    this.setData({startPoint: [e.touches[0].pageX, e.touches[0].pageY]});
  },

  /**
   * 触摸点移动
   */
  myTouchMove: function(e) {
    if (this.data.loading) return;
    if (this.data.start) return;

    // 当前坐标
    var curPoint = [e.touches[0].pageX, e.touches[0].pageY];
    var startPoint = this.data.startPoint;
    // 比较
    if (startPoint[1] - curPoint[1] > 30) {
      console.log("start");
      this.data.start = true;
      // 获取当前页面ID，挑战到详细信息页面
      var arr = this.data.spots;
      for (var i = 0; i < arr.length; i++) {
        console.log("spot" + arr[i]);
        if (arr[i].spotId == this.data.currentSpotId) {
          switch (arr[i].category) {
            case "景点":
              this.showScenic(arr[i].spotId);
              break;
            case "餐厅":
              this.showRestaurant(arr[i].spotId);
              break;
            case "教学楼":
              this.showSb(arr[i].spotId);
              break;
            default:
              break;
          }
          break;
        }
      }
    }
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.start = false;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log("下拉")
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      },
    })
  },
  
  /**
   * 显示景点详细信息
   */
  showScenic: function(id) {
    wx.navigateTo({
      url: '../scenicdetail/scenicdetail?spotId=' + id + '&category=景点',
    })
  },

  /**
   * 显示餐馆详细信息
   */
  showRestaurant: function(id) {
    wx.navigateTo({
      url: '../restaurant/restaurant?spotId=' + id + '&category=餐馆',
    })
  },

  /**
   * 显示教学楼课程信息
   */
  showSb: function(id) {
    wx.navigateTo({
      url: '../sb/sb?spotId=' + id + '&category=教学楼',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上啦");
    wx.navigateTo({
      url: 'pages/scenicdetail/scenicdetail',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})