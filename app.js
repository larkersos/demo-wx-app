//app.js
App({
  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //logs.unshift("app onLaunch")
    var util = require('./utils/util.js')
    logs.unshift(util.formatTime(new Date) + " : onLaunch")
    wx.setStorageSync('logs', logs)
    console.log(appInstance.globalData) // I am global data
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  onError: function(msg) {
    // console.log(msg)
  },
  globalData:{
    userInfo:null,
    
  }
})