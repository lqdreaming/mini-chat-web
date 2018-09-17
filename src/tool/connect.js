import SkyRTC from '@/js/SkyRTC-client.js'

var rtc = SkyRTC()
export default{
     getConnect(){
        return rtc
     },
    connect(url){
      if (rtc.socket != null){
        rtc.socket.close()
      }

      rtc = SkyRTC()
      rtc.connect(url)
    },

}
