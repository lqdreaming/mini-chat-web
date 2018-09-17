var SkyRTC = function() {
    var PeerConnection = (window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection);
    var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    var nativeRTCIceCandidate = (window.mozRTCIceCandidate || window.RTCIceCandidate);
    var nativeRTCSessionDescription = (window.mozRTCSessionDescription || window.RTCSessionDescription); // order is very important: "RTCSessionDescription" defined in Nighly but useless
    var iceServer = {
        "iceServers": [{
            // "url": "stun:stun.l.google.com:19302"
            // "url": "stun:113.32.111.126:3478" {
            "url": "turn:67.216.194.219:3478",
            "username": "granda",
            "credential": "qwert12345"

        }]
    };

    /**********************************************************/
    /*                                                        */
    /*                       事件处理器                       */
    /*                                                        */
    /**********************************************************/
    function EventEmitter() {
        this.events = {};
    }
    //绑定事件函数
    EventEmitter.prototype.on = function(eventName, callback) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    };
    //触发事件函数
    EventEmitter.prototype.emit = function(eventName, _) {
        var events = this.events[eventName],
            args = Array.prototype.slice.call(arguments, 1),
            i, m;

        if (!events) {
            return;
        }
        console.info('----------'+eventName)
        for (i = 0, m = events.length; i < m; i++) {
            events[i].apply(null, args);
        }
    };


    /**********************************************************/
    /*                                                        */
    /*                   流及信道建立部分                     */
    /*                                                        */
    /**********************************************************/


    /*******************基础部分*********************/
    function skyrtc() {
        //本地media stream
        this.localMediaStream = null;

        this.socket = null;
        // //本地socket的id，由后台服务器创建
        // this.me = null;

        this.peerConnection = null;

        // //初始时需要构建链接的数目
        // this.numStreams = 0;
        // //初始时已经连接的数目
        // this.initializedStreams = 0;

    }
    //继承自事件处理器，提供绑定事件和触发事件的功能
    skyrtc.prototype = new EventEmitter();


    /*************************服务器连接部分***************************/


    //本地连接信道，信道为websocket
    skyrtc.prototype.connect = function(server) {
        var socket,
            that = this;
        socket = this.socket = new WebSocket(server);

        //解析websocket服务器的消息
        socket.onmessage = function(message) {
            var json = JSON.parse(message.data);
            console.info('收到消息：' + json.eventName)
            if (json.eventName) {
                that.emit(json.eventName, json.data);
            } else {
                that.emit("socket_receive_message", socket, json);
            }
        };

        socket.onerror = function(error) {
            that.emit("socket_error", error, socket);
        };

        //关闭连接
        socket.onclose = function(data) {
            // that.localMediaStream.close();
            var pcs = that.peerConnection;

            that.closePeerConnection(pcs);
            that.emit('socket_closed', socket);
        };

        this.on("iceTo", function(data) {
            var candidate = new nativeRTCIceCandidate(data)
            var pc = that.peerConnection
            if (pc != null){
              pc.addIceCandidate(candidate)
              that.emit('get_ice_candidate', candidate)
            }
        });

        this.on('offerTo', function(data) {
            that.receiveOffer(data.fromId, data.sdp);
            that.emit("get_offer", data);
            // this.peerConnection.addStream(this.localMediaStream);
        });

        this.on('answerTo', function(data) {
            that.receiveAnswer(data.sdp);
            // this.peerConnection.addStream(this.localMediaStream);
        });

        this.on('ready', function(mid, uid, type) {
          if (type === "user"){
            that.createPeerConnectionByUser(uid,mid);
            that.addStreams();
            // that.sendOffers(uid, mid)
          }else {
            that.createPeerConnection(uid);
            that.addStreams();
          }
        });
    };


    /*************************流处理部分*******************************/


    //创建本地流
    skyrtc.prototype.createStream = function(options) {
        var that = this;

        options.video = !!options.video;
        options.audio = !!options.audio;

        if (getUserMedia) {
            getUserMedia.call(navigator, options, function(stream) {
                    that.localMediaStream = stream;
                    that.emit("stream_created", stream);
                },
                function(error) {
                    that.emit("stream_create_error", error);
                });
        } else {
            that.emit("stream_create_error", new Error('WebRTC is not yet supported in this browser.'));
        }
    };

    //将本地流添加到所有的PeerConnection实例中
    skyrtc.prototype.addStreams = function() {
        var i, m,
            stream,
            connection;

        this.peerConnection.addStream(this.localMediaStream);
    };

    /***********************信令交换部分*******************************/


    //向所有PeerConnection发送Offer类型信令
    skyrtc.prototype.sendOffers = async function(fromId, toId) {
        // var i, m,
        //     pc,
        //     that = this,
        //     pcCreateOfferCbGen = function(pc, fromId2, toId2) {
        //         return function(session_desc) {
        //             pc.setLocalDescription(session_desc).then(
        //               function(){
        //                 that.socket.send(JSON.stringify({
        //                     "eventName": "Offer",
        //                     "data": {
        //                         "sdp": session_desc,
        //                         "toId": toId2,
        //                         "fromId": fromId2
        //                     }
        //                 }));
        //               }
        //             )
        //
        //         };
        //     },
        //     pcCreateOfferErrorCb = function(error) {
        //         console.log(error);
        //     };

       var pc = this.peerConnection
       // pc.createOffer(pcCreateOfferCbGen(pc, fromId, toId), pcCreateOfferErrorCb)
       var that =  this

       var session_desc =await new Promise((resolve) => {
         resolve(pc.createOffer())
       })
       await new Promise((resolve) => {
         pc.setLocalDescription(session_desc)
         resolve()
       })
       await new Promise((resolve) => {
         that.socket.send(JSON.stringify({
             "eventName": "Offer",
             "data": {
                 "sdp": session_desc,
                 "toId": toId,
                 "fromId": fromId
             }
         }))
         resolve()
       })
    };

    //接收到Offer类型信令后作为回应返回answer类型信令
    skyrtc.prototype.receiveOffer = function(fromId, sdp) {
        this.sendAnswer(fromId, sdp);
    };

    //发送answer类型信令
    skyrtc.prototype.sendAnswer =async function(toId, sdp) {
        var pc = this.peerConnection
        var that = this
        await new Promise((resolve) => {
          pc.setRemoteDescription(new nativeRTCSessionDescription(sdp))
          resolve()
        })
        var session_desc = await new Promise((resolve) => {
          resolve(pc.createAnswer())
        })
        // pc.setRemoteDescription(new nativeRTCSessionDescription(sdp))
        // let session_desc = await pc.createAnswer()
        await new Promise((resolve) => {
          pc.setLocalDescription(session_desc)
          resolve()
        })
        await new Promise((resolve) => {
          that.socket.send(JSON.stringify({
            "eventName": "Answer",
            "data": {
                "toId": toId,
                "sdp": session_desc
            }
          }))
          resolve()
        })
        // pc.setLocalDescription(session_desc);
        // that.socket.send(JSON.stringify({
        //   "eventName": "Answer",
        //   "data": {
        //       "toId": toId,
        //       "sdp": session_desc
        //   }
        // }))
    };

    //接收到answer类型信令后将对方的session描述写入PeerConnection中
    skyrtc.prototype.receiveAnswer = function(sdp) {
        var pc = this.peerConnection;
        pc.setRemoteDescription(new nativeRTCSessionDescription(sdp));
    };


    /***********************点对点连接部分*****************************/

    //创建单个PeerConnection
    skyrtc.prototype.createPeerConnection = function(toId) {
        var that = this;
        this.isNegotiating = true;
        var pc = new PeerConnection(iceServer);
        this.peerConnection = pc;
        pc.onicecandidate = function(evt) {
            //通過websocket傳送到服務器
            if (evt.candidate)
                that.socket.send(JSON.stringify({
                    "eventName": "Ice",
                    "data": {
                        "label": evt.candidate.sdpMLineIndex,
                        "candidate": evt.candidate.candidate,
                        "toId": toId
                    }
                }));
        };

        pc.onaddstream = function(evt) {
            that.emit('pc_add_stream', evt.stream, toId, pc);
        };


        return pc;
    };

    skyrtc.prototype.createPeerConnectionByUser= function(uid,mid) {
        var that = this;
        this.isNegotiating = true;
        var isNegotiating = false;
        console.info('createPeerConnectionByUser')
        var pc = new PeerConnection(iceServer);
        this.peerConnection = pc;
        pc.onicecandidate = function(evt) {
            //通過websocket傳送到服務器
            if (evt.candidate)
                that.socket.send(JSON.stringify({
                    "eventName": "Ice",
                    "data": {
                        "label": evt.candidate.sdpMLineIndex,
                        "candidate": evt.candidate.candidate,
                        "toId": mid
                    }
                }));
        };

        pc.onaddstream = function(evt) {
            that.emit('pc_add_stream', evt.stream, mid, pc);
        };

        pc.onsignalingstatechange = function(evt) { // Workaround for Chrome: skip nested negotiations
          isNegotiating = (pc.signalingState != "stable");
        }

        pc.onnegotiationneeded = function(evt) {
          if (isNegotiating) {
            console.log("SKIP nested negotiations");
            return;
          }
          isNegotiating = true;
          try {
            that.sendOffers(uid, mid)
          } catch (e) {
            console.log(e);
          }
        }

        return pc;
    };

    //关闭PeerConnection连接
    skyrtc.prototype.closePeerConnection = function(pc) {
        if (!pc) return;
        console.info('closePeerConnection')
        pc.close();
        // pc.events = null
        pc = null
        // this.localMediaStream = null

    };

     return new skyrtc();
};

export default SkyRTC;
