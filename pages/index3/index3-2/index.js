//textarea.js
Page({
  data: {
    height: 20,
    focus: false,
    urls: "https://larkersos.com"
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  },
  startRecode: function () {
    var logs = wx.getStorageSync('logs') || []
    var util = require('../../../utils/util.js')
    logs.unshift(util.formatTime(new Date) + " ，开始录音")
    wx.setStorageSync('logs', logs)
    var s = this;
    console.log("start");
    wx.startRecord({
      success: function (res) {
        console.log(res);
        var tempFilePath = res.tempFilePath;
        s.setData({ recodePath: tempFilePath, isRecode: true });
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
        //录音失败
        logs.unshift(util.formatTime(new Date) + " ，录音失败")
        wx.setStorageSync('logs', logs)
      }
    });
  },
  endRecode: function () {//结束录音 
    var s = this;
    var app = getApp;
    console.log("end");
    var logs = wx.getStorageSync('logs') || [];
    var util = require('../../../utils/util.js')
    logs.unshift(util.formatTime(new Date) + " ，结束录音")
    wx.setStorageSync('logs', logs)
    wx.stopRecord();
    s.setData({ isRecode: false });
    wx.showToast();
    setTimeout(function () {
      var urls = s.data.urls + "/Web/UpVoice";
      console.log(s.data.recodePath);
      wx.uploadFile({
        url: urls,
        filePath: s.data.recodePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function (res) {
          var str = res.data;
          var data = JSON.parse(str);
          if (data.states == 1) {
            var cEditData = s.data.editData;
            cEditData.recodeIdentity = data.identitys;
            s.setData({ editData: cEditData });
          }
          else {
            wx.showModal({
              title: '提示',
              content: data.message,
              showCancel: false,
              success: function (res) {

              }
            });
          }
          wx.hideToast();
        },
        fail: function (res) {
          console.log(res);
          var logs = wx.getStorageSync('logs') || []
          var util = require('../../../utils/util.js')
          logs.unshift(util.formatTime(new Date) + " ，网络请求失败")
          wx.setStorageSync('logs', logs)
          wx.showModal({
            title: '这是一个提示',
            content: "网络请求失败，请确保网络是否正常",
            showCancel: false,
            success: function (res) {

            }
          });
          wx.hideToast();
        }
      });
    }, 1000)

  }

})