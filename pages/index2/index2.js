// pages/index/index2.js
var common = require('../common.js')
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  data: {
    motto: 'Hello World ！这是一个小程序的信息页',
    userInfo: {"sex":"男",nickName:"nickName"},
    array: [{name:"Lilei"}, {name:"hanmeimei"}],
    view: 'MINA',
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'},
    toView: 'red',
    scrollTop: 100,
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
      'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
      'info_circle', 'cancel', 'search', 'clear'
    ]
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      console.log('userInfo'+userInfo)
    })
  },
  onReady:function(){
    // 页面渲染完成
        //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow:function(){
    // 页面显示
     this.setData({
      name:''
    })

  },
  onHide:function(){
    // 页面隐藏
     this.setData({
      name:'页面隐藏'
    })
  },
  onUnload:function(){
    // 页面关闭
    this.setData({
      name:'页面关闭'
    })
  },
onShareAppMessage: function () {
    return {
      title: '这是一个分享标题',
      desc: '自分享描述',
      path: 'pages/index/index'
    }
  },

  changeName: function(e) {
    // sent data change to view
    common.sayHello('MINA')
    this.setData({
      name:'MINA2',
      view:'APP'
    })
  },

  changeTab: function(e) {
    // sent data change to view
    common.sayHello('MINA')
    this.setData({
      name:'MINA2',
      view:'APP'
    })
  }
})
