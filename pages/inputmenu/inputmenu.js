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
    menus: [
      {
        id: 0,
        category: "",
        name: "",
        price: null,
        imgPath: "../../img/2.jpg"
      }
    ],

    id: 0,
    category: "",
    name: "",
    price: 0.0,

    spotId: 19,

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
   * 点击确定按钮
   */
  confirm: function() {

    var that = this
    if (that.data.category != "" && that.data.price != null && that.data.price != "" && that.data.name != "") {
      var currId = that.data.id
      array[currId].category = that.data.category
      array[currId].name = that.data.name
      array[currId].price = that.data.price
      that.setData({
        menus: array
      })
    }

    // 上传数据到服务器
    that.uploadMenuData();
  },

  /**
   * 点击取消按钮
   */
  cancel: function() {
    // wx.navigateBack({
    //   delta: 2,
    // })
  },

  /**
   * 动态添加菜品
   */
  addMenu: function() {
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
    if (that.data.category != "" && that.data.price != null && that.data.price != ""  && that.data.name != "") {
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
   * 上传菜单数据
   */
  uploadMenuData: function() {
    var that = this
    console.log(array);
    var len = array.length;
    for (var i = 0; i < len; i++) {
      console.log(array[i]);
      wx.request({
        url: "http://localhost:8089/addMenu",
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          id: 0,
          price: array[i].price*1.0,
          category: array[i].category,
          name: array[i].name,
          imgPath: array[i].imgPath,
          spotId: parseInt(that.data.spotId)
        },
        success: function (res) {
          console.log(res.data);
        },
        fail: function (res) {
          console.log(res.data);
        }
      })
    }
  },

  /**
   * 选择图片
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
   * 动态删除菜品
   */
  removeMenu: function() {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      spotId: options.spotId
    })
    console.log(this.data.spotId);
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
  
  }
})