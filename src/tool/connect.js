import SkyRTC from '@/js/SkyRTC-client.js'

var rtc = SkyRTC()
export default{
   getConnect(){
      return rtc
    },
    connect(url){
      rtc = SkyRTC()
      rtc.connect(url)
    },

}
