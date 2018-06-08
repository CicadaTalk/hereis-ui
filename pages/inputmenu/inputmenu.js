var array = [
  {
    id: 0,
    category: "",
    name:"",
    price: 0.0,
    imgPath: "../../img/2.jpg"
  }
];

const menuUrl = "https://lazyzhou.xin/";

// pages/inputmenu/inputmenu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg_H: 210,

    menus: [
      {
        id: 0,
        category: "",
        name: "",
        price: null,
        imgPath: "../../img/2.jpg"
      }
    ],

    // 设置默认图片
    src: "../../image/2.jpg",
    // 设置spottId初始值
    spotId: 19,

    title: "",

    brief: "",

    id: 0,
    name: "",
    price: 0.0,

    resultMessage: "success",
  },

  /**
   * 获取标题
   */
  titleInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      title: e.detail.value
    })
  },

  /**
   * 获取简介
   */
  briefInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      brief: e.detail.value
    })
  },

  /**
   * 获取当前项id
   */
  setCurrentId: function(e) {
    
    var that = this
    var currId = e.currentTarget.dataset.id
    if (that.data.id != currId) {
      this.setData({
        id: e.currentTarget.dataset.id
      })
      console.log(e.currentTarget.dataset.id);
    }
  },

  /**
   * 监听分类输入框内容变化
   */
  categoryInput: function(e) {
    
    this.setData({
      category: e.detail.value
    })
  },
  
  /**
   * 监听菜名输入框内容变化
   */
  nameInput: function(e) {
    // console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 监听价格输入框变化
   */
  priceInput: function(e) {
    this.setData({
      price: e.detail.value
    })
  },

  /**
   * 动态添加菜品
   */
  addMenu: function () {
    var that = this
    var len = that.data.menus.length
    console.log(len);
    var menu = {}
    menu.id = len;
    menu.category = "";
    menu.name = "";
    menu.price = null;
    menu.imgPath = "../../img/2.jpg";
    array.push(menu);
    that.setData({
      menus: array
    })

    // 保存数据
    if (that.data.category != "" && that.data.price != null && that.data.price != "" && that.data.name != "") {
      var currId = that.data.id
      array[currId].category = that.data.category
      array[currId].name = that.data.name
      array[currId].price = that.data.price
      that.setData({
        menus: array
      })
    }
  },

  /**
   * 动态删除菜品
   */
  removeMenu: function () {
    var that = this
    var len = that.data.menus.length
    if (len >= 0) {
      array.pop(len)
      that.setData({
        menus: array
      })
    }
  },

  /**
   * 点击确定按钮
   */
  confirm: function() {

    var that = this
    if (that.data.category != "" && that.data.price != null 
    && that.data.price != "" && that.data.name != "") {
      var currId = that.data.id
      array[currId].category = that.data.category
      array[currId].name = that.data.name
      array[currId].price = that.data.price
      that.setData({
        menus: array
      })
    }

    // console.log("title" + that.data.title);
    // console.log("brief" + that.data.brief);
    // console.log(that.data.menus);
    // 上传简介数据
    that.uploadSpotData();
  },

  /**
   * 点击取消按钮
   */
  cancel: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 上传简介数据
   */
  uploadSpotData: function () {

    var that = this
    var gpsLng = 1.0
    var gpsLat = 1.0
    // 获取gps定位
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        gpsLng = res.longitude
        gpsLat = res.latitude
      },
    })
    
    //发送请求
    wx.request({
      url: menuUrl + "addSpot",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: 0,
        gpsLng: gpsLng,
        gpsLat: gpsLat,
        name: that.data.title,
        briefIntro: that.data.brief,
        bgImg: that.data.src,
        category: "scenic"
      },
      success: function (res) {
        // console.log(res.data);
        if (that.isRealNum(res.data)) {
          // 获取到刚刚插入记录的id
          that.setData({
            spotId: res.data
          })
        }

        if (that.data.spotId == 19) {
          that.responseAddRestaurant("添加失败");
        } else {
          that.uploadImage(that.data.src, res.data);
          // 上传详细数据到服务器
          that.uploadMenuData();
          that.responseAddRestaurant(that.data.resultMessage);
        }
      },
      fail: function (res) {
        that.responseAddRestaurant("添加失败");
        // console.log(res.data);
      }
    })
  },

  /**
   * 判断是否是数字
   */
  isRealNum: function (val) {
    if (val == "" || val == null) {
      return false;
    }

    if (isNaN(val)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 上传菜单数据
   */
  uploadMenuData: function() {
    var that = this
    console.log(array);
    var len = array.length;
    for (var i = 0; i < len; i++) {
      // console.log(array[i]);
      var path = array[i].imgPath
      wx.request({
        url: menuUrl + "addMenu",
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          id: 0,
          price: array[i].price*1.0,
          category: array[i].category,
          name: array[i].name,
          imgPath: path,
          spotId: parseInt(that.data.spotId)
        },
        success: function (res) {
          that.uploadImage(path, res.data);
          // console.log(res.data);
        },
        fail: function (res) {
          // console.log(res.data);
          that.data.resultMessage = "添加失败";
        }
      })
    }
  },

  /**
    * 添加菜单事件响应
    */
  responseAddRestaurant: function (result) {

    if (result == "success") {
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 3000
      });
    } else {
      wx.showModal({
        content: result,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            
          }
        }
      })
    }
  },

  /**
   * 选择背景图片
   */
  chooseBGImage(e) {
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
      fail: function () {
        console.log("failed");
      }
    })
  },

  /**
   * 选择菜单图片
   */
  chooseImage(e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var currId = that.data.id
        array[currId].imgPath = res.tempFilePaths
        that.setData({
            s: array
        })
      },
      fail: function () {
        console.log("failed");
      }
    })
  },

  /**
  * 上传背景图片到服务器
  */
  uploadImage: function (path, id) {

    var that = this
    wx.uploadFile({
      url: menuUrl + "uploadSpotImage",
      filePath: path,
      name: 'file',
      formData: {
        'spotId': id
      },
      success: function (res) {
        // console.log(res.data);
      },
      fail: function (res) {
        // console.log(res.data);
        that.data.resultMessage = "添加失败";
      }
    })
  },
})