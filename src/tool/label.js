import axios from 'axios'
import Conf from '@/conf/conf.js'
var labels = []
var ok = false
export default{
   getLabels(){
     // console.info(labels)
     if (ok == false){

       axios.get(Conf.API + '/label/')
         .then(function (response) {
           var responseData = response.data.data;
           if (response.data.code === 0) {
             labels = responseData
             ok = true
           }
         })
         .catch(function (response) {
           console.log(response)
         })
     }
     return labels
   },
   getOk(){
     return ok
   }
}
