const app = getApp()
// pages/addRestaurnant/addRestaurant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"/image/2.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },


  /**
   * 上传图片事件
   */
  uploadImage: function(){
    console.log("上传图片")
  },

  /**
   * 表单提交函数
   */
  formSubmit: function(e) {
    
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        //进行网络请求
        console.log(e.detail.value)
        console.log(res.latitude)
        console.log(res.longitude)

        // var a = {
        //   gpsLng: res.longitude,
        //     gpsLat:res.latitude,
        //       name: e.detail.value.titleInput,
        //         briefIntro: e.detail.value.introductionInput,
        //           bgImg:"1.png",
        //             category:"restaurant"
        // }
        // console.log(a)

        wx.request({
          url: "http://39.108.74.138:8080/addSpot",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" },  
          data: {
            gpsLng:res.longitude,
            gpsLat:res.latitude,
            name: e.detail.value.titleInput,
            briefIntro: e.detail.value.introductionInput,
            bgImg:"1.png",
            category:"restaurant"
          },
          complete: function (res) {
            // that.setData({
            //   toastHidden: false,
            //   toastText: res.data.reason,
            //   city_name: res.data.result.data.realtime.city_name,
            //   date: res.data.result.data.realtime.date,
            //   info: res.data.result.data.realtime.weather.info,
            // });
            // if (res == null || res.data == null) {
            //   console.error('网络请求失败');
            //   return;
            // }
          }
        })


      }
    })

  },

})