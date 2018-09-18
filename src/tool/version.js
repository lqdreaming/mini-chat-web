import axios from 'axios'
import Conf from '@/conf/conf.js'
var version = ''
export default{
   getVersion(){
     axios.get(Conf.API + '/version/')
       .then(function (response) {
         var responseData = response.data.data;
         if (response.data.code === 0) {
           version = responseData.version
         }
       })
       .catch(function (response) {
         console.log(response)
       })

     return version
   },
}
