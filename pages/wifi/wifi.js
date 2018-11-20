// pages/wifi/wifi.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        "longitude": 0,
        "latitude": 0,
        "markers": [],
        "wifiUrl": app.globalData.wifiUrl,
        "wifikey": app.globalData.wifikey,
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.getLocation({
            "altitude": true,
            success: function(res) {
                var mks = that.data.markers;
                mks.push({
                    "id": 0,
                    "longitude": res.longitude,
                    "latitude": res.latitude,
                    "iconPath": "../img/h4.jpg",
                    "height": 40,
                    "width": 40,
                });
                that.setData({
                    "longitude": res.longitude,
                    "latitude": res.latitude,
                    "markers": mks
                });
                console.log(that.data);

                wx.request({
                    url: that.data.wifiUrl,
                    method: "GET",
                    data: {
                        "lon": res.longitude,
                        "lat": res.latitude,
                        "gtype": 1,
                        "r": 1000,
                        "key": that.data.wifikey
                    },
                    success: function(res) {
                        console.log(res);
                        var mks = that.data.markers;
                        if (res.data.result != null) {
                            for (var i = 0; i < res.data.result.data.length; i++) {
                                var item = res.data.result.data[i];
                                mks.push({
                                    "id": i + 1,
                                    "longitude": item.google_lon,
                                    "latitude": item.google_lat,
                                    "icopath": "../img/wifi1.png",
                                    "width": "40px",
                                    "height": "40px"

                                });
                               
                            }
                            that.setData({
                                markers: mks
                            });
                        }

                    }
                })

            },

        })
    }
})